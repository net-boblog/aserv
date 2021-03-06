package com.absir.core.test;

import com.absir.core.util.UtilObjectPool;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(value = JUnit4.class)
public class KernelUtilObjectPool {

    private UtilObjectPool<String> objectPool = new UtilObjectPool<String>(1, 5);

    @Test
    public void test() {
        testPool(true, "a");
        testPool(true, "b");
        testPool(true, "c");
        testPool(true, "d");
        testPool(true, "e");
        testPool(true, "f");
        testPool(false, "a");
        objectPool.gc(1);
        testPool(false, "a");
        objectPool.gc(255);
        testPool(false, "a");
        testPool(false, "a");
    }

    protected void testPool(boolean add, String addStr) {
        if (add) {
            System.out.println("addStr=>" + addStr);
            objectPool.freeObject(addStr);

        } else {
            String str = objectPool.getObject();
            System.out.println("getStr=>" + str + " : " + addStr);
        }
    }

}
