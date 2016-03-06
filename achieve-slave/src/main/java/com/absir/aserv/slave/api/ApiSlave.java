/**
 * Copyright 2015 ABSir's Studio
 * 
 * All right reserved
 *
 * Create on 2015年4月13日 下午4:10:30
 */
package com.absir.aserv.slave.api;

import com.absir.aserv.system.api.ApiServer;
import com.absir.aserv.system.bean.proxy.JiUserBase;
import com.absir.aserv.system.security.SecurityContext;
import com.absir.server.exception.ServerException;
import com.absir.server.exception.ServerStatus;
import com.absir.server.in.Input;
import com.absir.slave.InputSlave;

/**
 * @author absir
 *
 */
public class ApiSlave extends ApiServer {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.absir.aserv.system.api.ApiServer#onAuthentication(com.absir.server
	 * .in.Input)
	 */
	@Override
	protected SecurityContext onAuthentication(Input input) throws Throwable {
		SecurityContext context = super.onAuthentication(input);
		JiUserBase userBase = context == null ? null : context.getUser();
		if (userBase == null || !userBase.isDeveloper()) {
			if (!InputSlave.onAuthentication(input)) {
				throw new ServerException(ServerStatus.ON_DENIED);
			}
		}

		return context;
	}

}