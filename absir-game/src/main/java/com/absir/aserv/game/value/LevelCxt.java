/**
 * Copyright 2013 ABSir's Studio
 * <p/>
 * All right reserved
 * <p/>
 * Create on 2013-10-15 下午1:38:44
 */
package com.absir.aserv.game.value;

public class LevelCxt<T extends ILevel> {

    public int getLevel(T obj) {
        return obj.getLevel();
    }

    public void setLevel(T obj, int level) {
        obj.setLevel(level);
    }
}
