/**
 * Copyright 2015 ABSir's Studio
 * <p/>
 * All right reserved
 * <p/>
 * Create on 2015年4月13日 下午2:51:49
 */
package com.absir.aserv.master.service;

import com.absir.bean.basis.Base;
import com.absir.bean.inject.value.Bean;
import com.absir.master.resolver.MasterServerResolver;
import com.absir.server.socket.SelSession;

import java.nio.channels.SocketChannel;

@Base
@Bean
public class MasterResolverService extends MasterServerResolver {

    @Override
    public String idForMaster(String[] params, SocketChannel socketChannel, SelSession selSession) {
        return super.idForMaster(params, socketChannel, selSession);
    }
}
