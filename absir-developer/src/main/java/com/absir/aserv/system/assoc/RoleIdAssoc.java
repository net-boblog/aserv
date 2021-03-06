/**
 * Copyright 2013 ABSir's Studio
 * <p/>
 * All right reserved
 * <p/>
 * Create on 2013-11-27 上午9:39:31
 */
package com.absir.aserv.system.assoc;

import com.absir.aserv.jdbc.JdbcCondition;
import com.absir.aserv.jdbc.JdbcCondition.Conditions;
import com.absir.aserv.system.bean.proxy.JiUserBase;
import com.absir.aserv.system.dao.IAssocDao;
import com.absir.aserv.system.helper.HelperCondition;
import com.absir.orm.value.JePermission;
import com.absir.orm.value.JiAssoc;

@Deprecated
public class RoleIdAssoc implements IAssocDao {

    @Override
    public boolean supportAssocClass(Class<? extends JiAssoc> assocClass, String rootEntityName, JiUserBase user, JePermission permission) {
        return user != null;
    }

    @Override
    public void assocConditions(String rootEntityName, JiUserBase user, JePermission permission, Object strategies, JdbcCondition jdbcCondition, Conditions includeConditions,
                                Conditions excludeConditions) {
        HelperCondition.concatOR(includeConditions, jdbcCondition.getCurrentPropertyAlias() + ".userId");
        includeConditions.add(user.getUserId());
    }
}
