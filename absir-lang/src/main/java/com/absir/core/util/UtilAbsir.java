/**
 * Copyright 2013 ABSir's Studio
 * <p/>
 * All right reserved
 * <p/>
 * Create on 2013-11-14 下午1:31:09
 */
package com.absir.core.util;

import java.io.Serializable;
import java.util.Map;

@SuppressWarnings({"rawtypes", "unchecked"})
public class UtilAbsir {

    public static final long DAY_TIME = 24 * 3600000;

    public static final long WEEK_TIME = 7 * DAY_TIME;

    public static String getId(Class<?> cls, Serializable id) {
        return cls.getName() + '@' + id;
    }

    public static Object getToken(Object id, Map<?, ?> tokenMap) {
        Object token = tokenMap.get(id);
        if (token == null) {
            synchronized (tokenMap) {
                token = tokenMap.get(id);
                if (token == null) {
                    token = new Object();
                    ((Map) tokenMap).put(id, token);
                }
            }
        }

        return token;
    }

    public static Object clearToken(Object id, Map<?, ?> tokenMap) {
        synchronized (tokenMap) {
            return tokenMap.remove(id);
        }
    }

    public static Object getToken(Class<?> cls, Serializable id, Map<?, ?> tokenMap) {
        return getToken(getId(cls, id), tokenMap);
    }
}
