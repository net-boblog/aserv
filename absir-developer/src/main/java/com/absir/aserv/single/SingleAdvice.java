package com.absir.aserv.single;

import com.absir.aserv.advice.AdviceInvoker;
import com.absir.aserv.advice.IMethodAdvice;
import com.absir.aserv.system.bean.JSingle;
import com.absir.aserv.system.service.BeanService;
import com.absir.bean.basis.Base;
import com.absir.bean.inject.value.Bean;
import com.absir.bean.inject.value.Value;
import com.absir.client.helper.HelperJson;
import com.absir.context.core.ContextUtils;

import java.lang.reflect.Method;

/**
 * Created by absir on 16/5/30.
 */
@Base
@Bean
public class SingleAdvice implements IMethodAdvice {

    @Value("single.idle.time")
    protected long idleTime = 30000;

    @Value("single.delay.time")
    protected long delayTime = 15000;

    public String getMethodSingleId(Object proxy, Method method, Object[] args) {
        return method.toString() + "@" + HelperJson.encodeNull(args);
    }

    @Override
    public boolean matching(Class<?> beanType, Method method) {
        return false;
    }

    @Override
    public Object before(AdviceInvoker invoker, Object proxy, Method method, Object[] args) throws Throwable {
        String singleId = getMethodSingleId(proxy, method, args);
        JSingle single = BeanService.ME.get(JSingle.class, singleId);
        if (single != null) {
            if (single.getPassTime() > ContextUtils.getContextTime()) {
                return null;
            }

            
        }

        single = new JSingle();
        single.setId(singleId);
        single.setPassTime(ContextUtils.getContextTime() + idleTime + delayTime);
        //BeanService.ME.persist();
        invoker.invoke(proxy);

        //return AopProxyHandler.VOID;
        return null;
    }

    @Override
    public Object after(Object proxy, Object returnValue, Method method, Object[] args, Throwable e) throws Throwable {
        return returnValue;
    }

    @Override
    public int getOrder() {
        return -2048;
    }
}
