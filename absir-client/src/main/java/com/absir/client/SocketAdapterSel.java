/**
 * Copyright 2015 ABSir's Studio
 * <p/>
 * All right reserved
 * <p/>
 * Create on 2015年10月27日 下午7:20:15
 */
package com.absir.client;

import com.absir.core.base.Environment;
import com.absir.core.kernel.KernelByte;
import com.absir.core.kernel.KernelLang.ObjectTemplate;
import com.absir.core.util.UtilActivePool;
import com.absir.core.util.UtilAtom;
import com.absir.core.util.UtilContext;
import com.absir.core.util.UtilPipedStream;
import com.absir.core.util.UtilPipedStream.NextOutputStream;

import java.io.IOException;
import java.io.InputStream;
import java.io.PipedInputStream;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.SocketChannel;
import java.util.Iterator;

public class SocketAdapterSel extends SocketAdapter {

    public static final long PIPED_STREAM_TIMEOUT = 30000;

    public static final int POST_BUFF_LEN = 1024;

    private static int buffSize = 1024;

    private static Selector selector;

    private static UtilAtom atom;

    private UtilPipedStream pipedStream;

    private UtilActivePool activePool;

    public static void setBuffSize(int size) {
        if (size < 16) {
            size = 16;
        }

        buffSize = size;
    }

    protected static Selector getAdapterSelector() {
        if (selector == null) {
            try {
                synchronized (SocketAdapterSel.class) {
                    if (selector == null) {
                        selector = Selector.open();
                        atom = new UtilAtom();
                        Thread thread = new Thread() {

                            public void run() {
                                byte[] array = new byte[buffSize];
                                ByteBuffer buffer = ByteBuffer.wrap(array);
                                while (Environment.isStarted()) {
                                    try {
                                        atom.await();
                                        selector.select();
                                        Iterator<SelectionKey> iterator = selector.selectedKeys().iterator();
                                        while (iterator.hasNext()) {
                                            SelectionKey key = iterator.next();
                                            SocketAdapter socketAdapter = null;
                                            SocketChannel socketChannel = null;
                                            try {
                                                socketAdapter = (SocketAdapter) key.attachment();
                                                socketChannel = (SocketChannel) key.channel();
                                                buffer.clear();
                                                int length = socketChannel.read(buffer);
                                                if (length > 0) {
                                                    socketAdapter.receiveByteBuffer(socketChannel.socket(), array, 0,
                                                            length);
                                                    continue;
                                                }

                                            } catch (Exception e) {
                                                if (Environment.getEnvironment() == Environment.DEVELOP) {
                                                    e.printStackTrace();
                                                }
                                            }

                                            key.cancel();
                                            if (socketAdapter != null && socketChannel != null) {
                                                final SocketAdapter adapter = socketAdapter;
                                                final Socket socket = socketChannel.socket();
                                                UtilContext.executeSecurity(new Runnable() {

                                                    @Override
                                                    public void run() {
                                                        adapter.disconnect(socket);
                                                    }
                                                });
                                            }
                                        }

                                    } catch (Exception e) {
                                        if (Environment.getEnvironment() == Environment.DEVELOP) {
                                            e.printStackTrace();
                                        }

                                        break;
                                    }
                                }
                            }

                            ;
                        };

                        thread.setDaemon(true);
                        thread.setName("SocketAdapter.Selector");
                        thread.start();
                    }
                }

            } catch (IOException e) {
                if (Environment.getEnvironment() == Environment.DEVELOP) {
                    e.printStackTrace();
                }
            }
        }

        return selector;
    }

    public UtilPipedStream getPipedStream() {
        if (pipedStream == null) {
            pipedStream = new UtilPipedStream(PIPED_STREAM_TIMEOUT);
        }

        return pipedStream;
    }

    public UtilActivePool getActivePool() {
        if (activePool == null) {
            activePool = new UtilActivePool();
        }

        return activePool;
    }

    @Override
    public void close() {
        super.close();
        if (pipedStream != null) {
            pipedStream.close();
            pipedStream = null;
        }

        if (activePool != null) {
            activePool.clear();
        }
    }

    @Override
    public boolean sendData(byte[] buffer, int offset, int length) {
        Socket socket = getSocket();
        if (socket != null) {
            SocketChannel socketChannel = getSocket().getChannel();
            if (socketChannel != null && !socketChannel.isBlocking()) {
                ByteBuffer byteBuffer = ByteBuffer.wrap(buffer, offset, length);
                synchronized (socketChannel) {
                    try {
                        SocketNIO.writeTimeout(socketChannel, byteBuffer);
                        return true;

                    } catch (Exception e) {
                        if (Environment.getEnvironment() == Environment.DEVELOP) {
                            e.printStackTrace();
                        }
                    }
                }

                disconnect(socket);
                return false;
            }
        }

        return super.sendData(buffer, offset, length);
    }

    protected NextOutputStream createNextOutputStream(int hashIndex) {
        return getPipedStream().createNextOutputStream(hashIndex);
    }

    @Override
    public void receiveCallback(int offset, byte[] buffer, byte flag, Integer callbackIndex) {
        if ((flag & STREAM_CLOSE_FLAG) != 0 && buffer.length == offset + 4) {
            int hashIndex = KernelByte.getLength(buffer, offset);
            if ((flag & POST_FLAG) != 0) {
                if (activePool != null) {
                    getActivePool().remove(hashIndex);
                }

            } else {
                NextOutputStream outputStream = getPipedStream().getOutputStream(hashIndex);
                if (outputStream != null) {
                    try {
                        outputStream.close();

                    } catch (IOException e) {
                        if (Environment.getEnvironment() == Environment.DEVELOP) {
                            e.printStackTrace();
                        }
                    }
                }
            }

            return;
        }

        super.receiveCallback(offset, buffer, flag, callbackIndex);
    }

    @Override
    public void receiveCallback(CallbackAdapter callbackAdapter, int offset, byte[] buffer, byte flag,
                                Integer callbackIndex) {
        if ((flag & STREAM_FLAG) != 0) {
            int length = buffer.length;
            int offsetIndex = offset + 4;
            if (length > offsetIndex) {
                // 写入流信息
                int hashIndex = KernelByte.getLength(buffer, offset);
                NextOutputStream outputStream = getPipedStream().getOutputStream(hashIndex);
                if (outputStream != null) {
                    try {
                        outputStream.write(buffer, offsetIndex, length);
                        return;

                    } catch (IOException e) {
                        if (Environment.getEnvironment() == Environment.DEVELOP) {
                            e.printStackTrace();
                        }
                    }
                }

                sendData(sendDataBytes(0, KernelByte.getLengthBytes(hashIndex), true, false, STREAM_CLOSE_FLAG, 0,
                        null));
                return;

            } else if (length == offsetIndex) {
                if (callbackAdapter instanceof CallbackAdapterStream) {
                    try {
                        int hashIndex = KernelByte.getLength(buffer, offset);
                        NextOutputStream outputStream = createNextOutputStream(hashIndex);
                        if (outputStream == null) {
                            sendData(sendDataBytes(0, KernelByte.getLengthBytes(hashIndex), true, false,
                                    STREAM_CLOSE_FLAG | POST_FLAG, 0, null));

                        } else {
                            PipedInputStream inputStream = new PipedInputStream();
                            outputStream.connect(inputStream);
                            CallbackAdapterStream callbackAdapteStream = (CallbackAdapterStream) callbackAdapter;
                            callbackAdapter = null;
                            callbackAdapteStream.doWith(this, offset, buffer, inputStream);
                            return;
                        }

                    } catch (Exception e) {
                        LOGGER.error("receiveCallbackStream", e);
                    }

                    if (callbackAdapter != null) {
                        callbackAdapter.doWith(this, offset, null);
                    }

                    return;
                }
            }
        }

        super.receiveCallback(callbackAdapter, offset, buffer, flag, callbackIndex);
    }

    @Override
    public synchronized void receiveSocketChannelStart() {
        if (receiveStarted) {
            return;
        }

        SocketChannel socketChannel = getSocket().getChannel();
        if (socketChannel != null) {
            receiveStarted = true;
            try {
                clearReceiveBuff();
                registerSelector(socketChannel);

            } catch (IOException e) {
                if (Environment.getEnvironment() == Environment.DEVELOP) {
                    e.printStackTrace();
                }
            }
        }
    }

    protected void registerSelector(SocketChannel socketChannel) throws IOException {
        socketChannel.configureBlocking(false);
        Selector selector = getAdapterSelector();
        try {
            atom.increment();
            selector.wakeup();
            socketChannel.register(selector, SelectionKey.OP_READ, this);

        } finally {
            atom.decrement();
        }
    }

    protected int getPostBuffLen() {
        return 1024;
    }

    protected RegisteredRunnable sendStream(byte[] dataBytes, boolean head, boolean debug, final int callbackIndex,
                                            final InputStream inputStream, final CallbackTimeout callbackTimeout, final long timeout) {
        connect();
        boolean sended = false;
        ObjectTemplate<Integer> nextIndex = getActivePool().addObject();
        final ObjectTemplate<ObjectTemplate<Integer>> nextTemplate = new ObjectTemplate<ObjectTemplate<Integer>>(
                nextIndex);
        if (nextIndex == null) {
            return null;
        }

        try {
            final byte[] buffer = sendDataBytes(4, dataBytes, head, debug, STREAM_FLAG, callbackIndex, null);
            System.arraycopy(buffer, 8, buffer, 4, buffer.length - 8);
            KernelByte.setLength(buffer, buffer.length - 4, nextIndex.object);
            final Runnable postRunable = new Runnable() {

                @Override
                public void run() {
                    ObjectTemplate<Integer> nextIndex = nextTemplate.object;
                    int streamIndex = nextIndex.object;
                    try {
                        int postBuffLen = getPostBuffLen();
                        byte[] sendBufer = sendDataBytes(4 + postBuffLen, null, true, false, STREAM_FLAG | POST_FLAG, 0,
                                null);
                        sendBufer[4] = sendBufer[4 + postBuffLen];
                        KernelByte.setLength(sendBufer, 5, streamIndex);
                        int len;
                        try {
                            while ((len = inputStream.read(sendBufer, 9, sendBufer.length)) > 0) {
                                len += 5;
                                KernelByte.setLength(sendBufer, 0, len);
                                if (nextIndex.object == null || !sendData(sendBufer, 0, len + 9)) {
                                    return;
                                }

                                if (callbackTimeout != null) {
                                    callbackTimeout.timeout = UtilContext.getCurrentTime() + timeout;
                                }
                            }

                        } catch (Exception e) {
                            if (Environment.getEnvironment() == Environment.DEVELOP) {
                                e.printStackTrace();
                            }

                            return;
                        }

                    } finally {
                        activePool.remove(streamIndex);
                        UtilPipedStream.closeCloseable(inputStream);
                    }

                    sendData(sendDataBytes(0, KernelByte.getLengthBytes(streamIndex), true, false,
                            STREAM_CLOSE_FLAG | POST_FLAG, 0, null));
                }
            };

            if (registered && sendData(buffer)) {
                UtilContext.getThreadPoolExecutor().execute(postRunable);
                sended = false;
                return null;
            }

            RegisteredRunnable runnable = new RegisteredRunnable() {

                @Override
                public void doRun() {
                    ObjectTemplate<Integer> nextIndex = getActivePool().addObject();
                    if (nextIndex == null) {
                        failed = true;
                        return;
                    }

                    boolean sended = false;
                    try {
                        KernelByte.setLength(buffer, buffer.length - 4, nextIndex.object);
                        failed = !sendData(buffer);
                        if (!failed) {
                            nextTemplate.object = nextIndex;
                            UtilContext.getThreadPoolExecutor().execute(postRunable);
                            sended = true;
                        }

                    } finally {
                        if (!sended) {
                            activePool.remove(nextIndex.object);
                            UtilPipedStream.closeCloseable(inputStream);
                        }
                    }
                }
            };

            registeredRunnables.add(runnable);
            lastedResgiter();
            return runnable;

        } finally {
            if (!sended) {
                activePool.remove(nextIndex.object);
                UtilPipedStream.closeCloseable(inputStream);
            }
        }
    }

    /**
     * 发送目标数据
     *
     * @param callbackIndex
     * @param dataBytes
     * @param head
     * @param debug
     * @param inputStream
     * @param timeout
     * @param callbackAdapter
     */
    public void sendStreamIndex(int callbackIndex, byte[] dataBytes, boolean head, boolean debug,
                                InputStream inputStream, int timeout, CallbackAdapter callbackAdapter) {
        if (callbackIndex == 0 || inputStream == null) {
            sendDataIndex(callbackIndex, dataBytes, head, debug, null, timeout, callbackAdapter);

        } else {
            CallbackTimeout callbackTimeout = null;
            if (callbackAdapter != null) {
                callbackTimeout = putReceiveCallbacks(callbackIndex, timeout, callbackAdapter);
            }

            RegisteredRunnable registeredRunnable = sendStream(dataBytes, head, debug, callbackIndex, inputStream,
                    callbackTimeout, timeout);
            if (callbackTimeout != null) {
                callbackTimeout.registeredRunnable = registeredRunnable;
            }
        }
    }

    public static interface CallbackAdapterStream extends CallbackAdapter {

        public void doWith(SocketAdapter adapter, int offset, byte[] buffer, InputStream inputStream);
    }

}
