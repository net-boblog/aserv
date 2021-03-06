/**
 * Copyright 2013 ABSir's Studio
 * <p/>
 * All right reserved
 * <p/>
 * Create on 2013-9-5 下午2:36:52
 */
package com.absir.aserv.menu;

import com.absir.aserv.menu.value.MaFactory;
import com.absir.server.route.RouteMatcher;

public interface IMenuFactory {

    public void process(String route, MenuBeanRoot menuBeanRoot, RouteMatcher routeMatcher, MaFactory maFactory);

}
