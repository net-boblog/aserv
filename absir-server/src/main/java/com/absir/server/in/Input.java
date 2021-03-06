/**
 * Copyright 2013 ABSir's Studio
 * <p>
 * All right reserved
 * <p>
 * Create on 2013-12-18 下午5:40:49
 */
package com.absir.server.in;

import com.absir.bean.core.BeanConfigImpl;
import com.absir.bean.core.BeanFactoryUtils;
import com.absir.bean.inject.value.Inject;
import com.absir.binder.BinderData;
import com.absir.context.core.Bean;
import com.absir.context.core.ContextUtils;
import com.absir.context.lang.LangBundle;
import com.absir.core.base.Environment;
import com.absir.core.helper.HelperIO;
import com.absir.core.kernel.KernelDyna;
import com.absir.server.on.OnPut;
import com.absir.server.route.RouteAction;
import com.absir.server.route.RouteEntry;
import com.absir.server.route.RouteMatcher;
import com.absir.server.route.returned.ReturnedResolver;
import com.absir.server.route.returned.ReturnedResolverView;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.lang.reflect.Type;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;

@SuppressWarnings("rawtypes")
@Inject
public abstract class Input extends Bean<Serializable> implements IAttributes {

    protected IFacade facade;

    protected Map<String, String> resourceBundle;

    protected BinderData binderData;

    private InModel model;

    private Locale locale;

    private Integer localCode;

    private String address;

    private IDispatcher dispatcher;

    private RouteMatcher routeMatcher;

    public Input(InModel model) {
        this.model = model;
    }

    public InModel getModel() {
        return model;
    }

    public IFacade getFacade() {
        if (facade == null) {
            facade = InFacadeFactory.forFacade(this);
        }

        return facade;
    }

    public boolean isInFacade() {
        return getFacade() != InFacadeFactory.IN_FACADE;
    }

    public Locale getLocale() {
        if (locale == null) {
            locale = LangBundle.ME.getLocale(getLocalCode());
        }

        return locale;
    }

    public Integer getLocalCode() {
        if (localCode == null) {
            localCode = KernelDyna.to(getFacade().getSession("localCode"), Integer.class);
            if (localCode == null) {
                localCode = getFacade().getLocaleCode();
                if (localCode != null) {
                    getFacade().setSession("localCode", localCode);
                }
            }

            if (localCode == null) {
                localCode = 0;
            }
        }

        return localCode;
    }

    public void setLocaleCode(Integer code) {
        locale = LangBundle.ME.getLocale(code);
        if (locale == LangBundle.ME.getLocale()) {
            code = 0;
        }

        localCode = code;
    }

    public String getLang(String lang) {
        Locale locale = getLocale();
        if (resourceBundle == null) {
            resourceBundle = LangBundle.ME.getResourceBundle(locale);
        }

        return LangBundle.ME.getLangResource(lang, resourceBundle, locale);
    }

    public String getLangValue(String lang) {
        return getLangValue(lang, lang);
    }

    public String getLangValue(String lang, String value) {
        LangBundle.ME.getResourceBundle().put(lang, value);
        return getLang(lang);
    }

    public <T> T get(String name, String beanName, Class<T> toClass) {
        return BeanConfigImpl.getMapValue(model, name, beanName, toClass);
    }

    public Object get(String name, String beanName, Type toType) {
        return BeanConfigImpl.getMapValue(model, name, beanName, toType);
    }

    public IDispatcher getDispatcher() {
        return dispatcher;
    }

    public void setDispatcher(IDispatcher dispatcher) {
        this.dispatcher = dispatcher;
    }

    public RouteMatcher getRouteMatcher() {
        return routeMatcher;
    }

    public void setRouteMatcher(RouteMatcher routeMatcher) {
        this.routeMatcher = routeMatcher;
    }

    public RouteAction getRouteAction() {
        return routeMatcher == null ? null : routeMatcher.getRouteAction();
    }

    public RouteEntry getRouteEntry() {
        RouteAction routeAction = getRouteAction();
        return routeAction == null ? null : routeAction.getRouteEntry();
    }

    public OnPut intercept(Iterator<Interceptor> iterator) throws Throwable {
        RouteEntry routeEntry = getRouteEntry();
        return routeEntry == null ? null : routeEntry.intercept(iterator, this);
    }

    public BinderData getBinderData() {
        if (binderData == null) {
            binderData = new BinderData();
        }

        return binderData;
    }

    protected Locale getLocaled() {
        return LangBundle.ME.getLocale();
    }

    public final String getAddress() {
        if (address == null) {
            address = getFacade().getAddress();
            if (address != null) {
                address = getRemoteAddr();
            }
        }

        return address;
    }

    public abstract String getRemoteAddr();

    public abstract String getUri();

    public abstract InMethod getMethod();

    public abstract void setStatus(int status);

    public boolean isDebug() {
        return BeanFactoryUtils.getEnvironment() != Environment.PRODUCT && paramDebug();
    }

    public abstract boolean paramDebug();

    public abstract String getParam(String name);

    public abstract String[] getParams(String name);

    public abstract Map<String, Object> getParamMap();

    public abstract InputStream getInputStream() throws IOException;

    public abstract String getInput();

    public abstract void setCharacterEncoding(String charset);

    public void setContentTypeCharset(String contentType, String charset) {
        setCharacterEncoding(charset);
        setContentTypeCharset(contentType + ";" + charset);
    }

    public abstract void setContentTypeCharset(String contentTypeCharset);

    public abstract OutputStream getOutputStream() throws IOException;

    public void write(String string) throws IOException {
        OutputStream outputStream = getOutputStream();
        if (outputStream == null) {
            write(string.getBytes(ContextUtils.getCharset()));

        } else {
            HelperIO.write(string, outputStream);
        }
    }

    public void write(byte b[]) throws IOException {
        write(b, 0, b.length);
    }

    public abstract void write(byte b[], int off, int len) throws IOException;

    public ReturnedResolver<?> getReturnedResolver(OnPut onPut) {
        return ReturnedResolverView.ME;
    }
}
