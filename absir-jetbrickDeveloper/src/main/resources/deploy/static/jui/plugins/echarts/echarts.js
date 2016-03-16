var define, require, esl;
!function (e) {
    function t(e, t) {
        function n(e) {
            0 === e.indexOf(".") && a.push(e)
        }

        var a = [];
        if ("string" == typeof e ? n(e) : T(e, function (e) {
                n(e)
            }), a.length > 0)throw new Error("[REQUIRE_FATAL]Relative ID is not allowed in global require: " + a.join(", "));
        var o = G.waitSeconds;
        return o && e instanceof Array && (E && clearTimeout(E), E = setTimeout(i, 1e3 * o)), P(e, t)
    }

    function i() {
        function e(r, s) {
            if (!o[r] && !d(r, O)) {
                o[r] = 1, d(r, F) || n[r] || (n[r] = 1, t.push(r));
                var l = A[r];
                l ? s && (n[r] || (n[r] = 1, t.push(r)), T(l.depMs, function (t) {
                    e(t.absId, t.hard)
                })) : a[r] || (a[r] = 1, i.push(r))
            }
        }

        var t = [], i = [], n = {}, a = {}, o = {};
        for (var r in z)e(r, 1);
        if (t.length || i.length)throw new Error("[MODULE_TIMEOUT]Hang( " + (t.join(", ") || "none") + " ) Miss( " + (i.join(", ") || "none") + " )")
    }

    function n(e, t, i) {
        if (null == i && (null == t ? (i = e, e = null) : (i = t, t = null, e instanceof Array && (t = e, e = null))), null != i) {
            var n = window.opera;
            if (!e && document.attachEvent && (!n || "[object Opera]" !== n.toString())) {
                var a = I();
                e = a && a.getAttribute("data-require-id")
            }
            e ? (o(e, t, i), D && clearTimeout(D)) : B[0] = {deps: t, factory: i}
        }
    }

    function a() {
        var e = G.config[this.id];
        return e && "object" == typeof e ? e : {}
    }

    function o(e, t, i) {
        A[e] || (A[e] = {
            id: e,
            depsDec: t,
            deps: t || ["require", "exports", "module"],
            factoryDeps: [],
            factory: i,
            exports: {},
            config: a,
            state: M,
            require: L(e),
            depMs: [],
            depMkv: {},
            depRs: [],
            depPMs: []
        })
    }

    function r(e) {
        var t = A[e];
        if (t && !d(e, J)) {
            var i = t.deps, n = t.factory, a = 0;
            "function" == typeof n && (a = Math.min(n.length, i.length), !t.depsDec && n.toString().replace(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, "").replace(/require\(\s*(['"'])([^'"]+)\1\s*\)/g, function (e, t, n) {
                i.push(n)
            }));
            var o = [];
            T(i, function (i, n) {
                var r, s, l = w(i), h = v(l.mod, e);
                h && !H[h] ? (l.res && (s = {
                    id: i,
                    mod: h,
                    res: l.res
                }, z[h] = 1, t.depPMs.push(h), t.depRs.push(s)), r = t.depMkv[h], r || (r = {
                    id: l.mod,
                    absId: h,
                    hard: a > n
                }, t.depMs.push(r), t.depMkv[h] = r, o.push(h))) : r = {absId: h}, a > n && t.factoryDeps.push(s || r)
            }), t.state = J, h(e), y(o)
        }
    }

    function s() {
        for (var e in z)l(e), m(e)
    }

    function l(e) {
        function t(e) {
            if (!d(e, J))return !1;
            if (d(e, F) || i[e])return !0;
            i[e] = 1;
            var n = A[e], a = !0;
            return T(n.depMs, function (e) {
                return a = t(e.absId)
            }), a && T(n.depRs, function (e) {
                return a = !(!e.absId || !d(e.absId, O))
            }), a && (n.state = F), a
        }

        var i = {};
        t(e)
    }

    function h(t) {
        function i() {
            if (!n && a.state === F) {
                n = 1;
                var i = 1, o = [];
                if (T(a.factoryDeps, function (e) {
                        var t = e.absId;
                        return H[t] || (m(t), d(t, O)) ? void o.push(t) : (i = 0, !1)
                    }), i) {
                    try {
                        var r = c(o, {
                            require: a.require,
                            exports: a.exports,
                            module: a
                        }), s = a.factory, l = "function" == typeof s ? s.apply(e, r) : s;
                        null != l && (a.exports = l), a.invokeFactory = null, delete z[t]
                    } catch (h) {
                        if (n = 0, /^\[MODULE_MISS\]"([^"]+)/.test(h.message)) {
                            var p = a.depMkv[RegExp.$1];
                            return void(p && (p.hard = 1))
                        }
                        throw h
                    }
                    u(t)
                }
            }
        }

        var n, a = A[t];
        a.invokeFactory = i, T(a.depPMs, function (e) {
            p(e, function () {
                T(a.depRs, function (i) {
                    i.absId || i.mod !== e || (i.absId = v(i.id, t), y([i.absId], s))
                })
            })
        })
    }

    function d(e, t) {
        return A[e] && A[e].state >= t
    }

    function m(e) {
        var t = A[e];
        t && t.invokeFactory && t.invokeFactory()
    }

    function c(e, t) {
        var i = [];
        return T(e, function (e, n) {
            i[n] = t[e] || V(e)
        }), i
    }

    function p(e, t) {
        if (d(e, O))return void t();
        var i = N[e];
        i || (i = N[e] = []), i.push(t)
    }

    function u(e) {
        var t = N[e] || [], i = A[e];
        i.state = O;
        for (var n = t.length; n--;)t[n]();
        t.length = 0, delete N[e]
    }

    function V(e) {
        return d(e, O) ? A[e].exports : null
    }

    function U(e) {
        T(B, function (t) {
            o(e, t.deps, t.factory)
        }), B.length = 0, r(e)
    }

    function y(t, i, n, a) {
        function o() {
            if (!l) {
                var n = 1;
                T(t, function (e) {
                    return H[e] ? void 0 : n = !!d(e, O)
                }), n && (l = 1, "function" == typeof i && i.apply(e, c(t, H)))
            }
        }

        if ("string" == typeof t) {
            if (m(t), !d(t, O))throw new Error('[MODULE_MISS]"' + t + '" is not exists!');
            return V(t)
        }
        a = a || {};
        var l = 0;
        t instanceof Array && (o(), l || (T(t, function (e) {
            H[e] || d(e, O) || (p(e, o), a[e] || (e.indexOf("!") > 0 ? f : g)(e, n), r(e))
        }), s()))
    }

    function g(e) {
        function t() {
            var t = i.readyState;
            if ("undefined" == typeof t || /^(loaded|complete)$/.test(t)) {
                i.onload = i.onreadystatechange = null, i = null, U(e);
                for (var n in z)r(n);
                s()
            }
        }

        if (!R[e] && !A[e]) {
            R[e] = 1;
            var i = document.createElement("script");
            i.setAttribute("data-require-id", e), i.src = k(e + ".js"), i.async = !0, i.readyState ? i.onreadystatechange = t : i.onload = t, K(i)
        }
    }

    function f(e, t) {
        function i(t) {
            r.exports = t || !0, u(e)
        }

        function n(n) {
            var r = t ? A[t].require : P;
            n.load(o.res, r, i, a.call({id: e}))
        }

        if (!A[e]) {
            var o = w(e), r = {id: e, state: J};
            A[e] = r, i.fromText = function (e, t) {
                z[e] = 1, new Function(t)(), U(e)
            }, n(V(o.mod))
        }
    }

    function b(e, t) {
        var i = X(e, 1, t);
        return i.sort(C), i
    }

    function _() {
        G.baseUrl = G.baseUrl.replace(/\/$/, "") + "/", Y = b(G.paths), q = b(G.map, 1), T(q, function (e) {
            e.v = b(e.v)
        }), Q = [], T(G.packages, function (e) {
            var t = e;
            "string" == typeof e && (t = {
                name: e.split("/")[0],
                location: e,
                main: "main"
            }), t.location = t.location || t.name, t.main = (t.main || "main").replace(/\.js$/i, ""), t.reg = S(t.name), Q.push(t)
        }), Q.sort(C), Z = b(G.urlArgs, 1), j = b(G.noRequests), T(j, function (e) {
            var t = e.v, i = {};
            e.v = i, t instanceof Array || (t = [t]), T(t, function (e) {
                i[e] = 1
            })
        })
    }

    function x(e, t, i) {
        T(t, function (t) {
            return t.reg.test(e) ? (i(t.v, t.k, t), !1) : void 0
        })
    }

    function k(e) {
        var t = /(\.[a-z0-9]+)$/i, i = /(\?[^#]*)$/, n = "", a = e, o = "";
        i.test(e) && (o = RegExp.$1, e = e.replace(i, "")), t.test(e) && (n = RegExp.$1, a = e.replace(t, ""));
        var r, s = a;
        return x(a, Y, function (e, t) {
            s = s.replace(t, e), r = 1
        }), r || x(a, Q, function (e, t, i) {
            s = s.replace(i.name, i.location)
        }), /^([a-z]{2,10}:\/)?\//i.test(s) || (s = G.baseUrl + s), s += n + o, x(a, Z, function (e) {
            s += (s.indexOf("?") > 0 ? "&" : "?") + e
        }), s
    }

    function L(e) {
        function t(t, n) {
            if ("string" == typeof t)return i[t] || (i[t] = y(v(t, e))), i[t];
            if (t instanceof Array) {
                var a = [], o = [], r = [];
                T(t, function (t, i) {
                    var n = w(t), s = v(n.mod, e);
                    o.push(s), z[s] = 1, n.res ? (a.push(s), r[i] = null) : r[i] = s
                });
                var s = {};
                T(o, function (e) {
                    var t;
                    x(e, j, function (e) {
                        t = e
                    }), t && (t["*"] ? s[e] = 1 : T(o, function (i) {
                        return t[i] ? (s[e] = 1, !1) : void 0
                    }))
                }), y(o, function () {
                    T(r, function (i, n) {
                        null == i && (r[n] = v(t[n], e))
                    }), y(r, n, e)
                }, e, s)
            }
        }

        var i = {};
        return t.toUrl = function (t) {
            return k(v(t, e))
        }, t
    }

    function v(e, t) {
        if (!e)return "";
        t = t || "";
        var i = w(e);
        if (!i)return e;
        var n = i.res, a = W(i.mod, t);
        if (T(Q, function (e) {
                var t = e.name;
                return t === a ? (a = t + "/" + e.main, !1) : void 0
            }), x(t, q, function (e) {
                x(a, e, function (e, t) {
                    a = a.replace(t, e)
                })
            }), n) {
            var o = V(a);
            n = o.normalize ? o.normalize(n, function (e) {
                return v(e, t)
            }) : v(n, t), a += "!" + n
        }
        return a
    }

    function W(e, t) {
        if (0 === e.indexOf(".")) {
            var i = t.split("/"), n = e.split("/"), a = i.length - 1, o = n.length, r = 0, s = 0;
            e:for (var l = 0; o > l; l++) {
                var h = n[l];
                switch (h) {
                    case"..":
                        if (!(a > r))break e;
                        r++, s++;
                        break;
                    case".":
                        s++;
                        break;
                    default:
                        break e
                }
            }
            return i.length = a - r, n = n.slice(s), i.concat(n).join("/")
        }
        return e
    }

    function w(e) {
        var t = e.split("!");
        return t[0] ? {mod: t[0], res: t[1]} : null
    }

    function X(e, t, i) {
        var n = [];
        for (var a in e)if (e.hasOwnProperty(a)) {
            var o = {k: a, v: e[a]};
            n.push(o), t && (o.reg = "*" === a && i ? /^/ : S(a))
        }
        return n
    }

    function I() {
        if ($)return $;
        if (et && "interactive" === et.readyState)return et;
        for (var e = document.getElementsByTagName("script"), t = e.length; t--;) {
            var i = e[t];
            if ("interactive" === i.readyState)return et = i, i
        }
    }

    function K(e) {
        $ = e, it ? tt.insertBefore(e, it) : tt.appendChild(e), $ = null
    }

    function S(e) {
        return new RegExp("^" + e + "(/|$)")
    }

    function T(e, t) {
        if (e instanceof Array)for (var i = 0, n = e.length; n > i && t(e[i], i) !== !1; i++);
    }

    function C(e, t) {
        var i = e.k || e.name, n = t.k || t.name;
        return "*" === n ? -1 : "*" === i ? 1 : n.length - i.length
    }

    var E, A = {}, z = {}, M = 1, J = 2, F = 3, O = 4, P = L();
    t.version = "1.8.6", t.loader = "esl", t.toUrl = P.toUrl;
    var D;
    n.amd = {};
    var N = {}, H = {require: t, exports: 1, module: 1}, B = [], R = {}, G = {
        baseUrl: "./",
        paths: {},
        config: {},
        map: {},
        packages: [],
        waitSeconds: 0,
        noRequests: {},
        urlArgs: {}
    };
    t.config = function (e) {
        function t(e) {
            a.push(e)
        }

        if (e) {
            for (var i in G) {
                var n = e[i], a = G[i];
                if (n)if ("urlArgs" === i && "string" == typeof n)G.urlArgs["*"] = n; else if (a instanceof Array)T(n, t); else if ("object" == typeof a)for (var i in n)a[i] = n[i]; else G[i] = n
            }
            _()
        }
    }, _();
    var Y, Q, q, Z, j, $, et, tt = document.getElementsByTagName("head")[0], it = document.getElementsByTagName("base")[0];
    it && (tt = it.parentNode), e.define || (e.define = n, e.require || (e.require = t), e.esl = t)
}(this), define("echarts", ["echarts/echarts"], function (e) {
    return e
}), define("echarts/echarts", ["require", "./config", "zrender/tool/util", "zrender/tool/event", "zrender/tool/env", "zrender", "zrender/config", "./chart/island", "./component/toolbox", "./component", "./component/title", "./component/tooltip", "./component/legend", "./util/ecData", "./chart", "zrender/tool/color", "./component/timeline", "zrender/shape/Image", "zrender/loadingEffect/Bar", "zrender/loadingEffect/Bubble", "zrender/loadingEffect/DynamicLine", "zrender/loadingEffect/Ring", "zrender/loadingEffect/Spin", "zrender/loadingEffect/Whirling", "./theme/default"], function (e) {
    function t() {
        r.Dispatcher.call(this)
    }

    function i(e) {
        this._themeConfig = o.clone(a), this.dom = e, this._connected = !1, this._status = {
            dragIn: !1,
            dragOut: !1,
            needRefresh: !1
        }, this._curEventType = !1, this._chartList = [], this._messageCenter = new t, this._messageCenterOutSide = new t, this.resize = this.resize(), this._init()
    }

    function n(e, t, i, n, a) {
        for (var o = e._chartList, r = o.length; r--;) {
            var s = o[r];
            "function" == typeof s[t] && s[t](i, n, a)
        }
    }

    var a = e("./config"), o = e("zrender/tool/util"), r = e("zrender/tool/event"), s = {}, l = e("zrender/tool/env").canvasSupported, h = new Date - 0, d = {}, m = "_echarts_instance_";
    s.version = "2.1.10", s.dependencies = {zrender: "2.0.6"}, s.init = function (t, n) {
        var a = e("zrender");
        (a.version || "1.0.3").replace(".", "") - 0 < s.dependencies.zrender.replace(".", "") - 0 && console.error("ZRender " + (a.version || "1.0.3-") + " is too old for ECharts " + s.version + ". Current version need ZRender " + s.dependencies.zrender + "+"), t = t instanceof Array ? t[0] : t;
        var o = t.getAttribute(m);
        return o || (o = h++, t.setAttribute(m, o)), d[o] && d[o].dispose(), d[o] = new i(t), d[o].id = o, d[o].canvasSupported = l, d[o].setTheme(n), d[o]
    }, s.getInstanceById = function (e) {
        return d[e]
    }, o.merge(t.prototype, r.Dispatcher.prototype, !0);
    var c = e("zrender/config").EVENT, p = ["CLICK", "DBLCLICK", "MOUSEOVER", "MOUSEOUT", "DRAGSTART", "DRAGEND", "DRAGENTER", "DRAGOVER", "DRAGLEAVE", "DROP"];
    return i.prototype = {
        _init: function () {
            var t = this, i = e("zrender").init(this.dom);
            this._zr = i, this._messageCenter.dispatch = function (e, i, n, a) {
                n = n || {}, n.type = e, n.event = i, t._messageCenter.dispatchWithContext(e, n, a), "HOVER" != e && "MOUSEOUT" != e ? setTimeout(function () {
                    t._messageCenterOutSide.dispatchWithContext(e, n, a)
                }, 50) : t._messageCenterOutSide.dispatchWithContext(e, n, a)
            }, this._onevent = function (e) {
                return t.__onevent(e)
            };
            for (var n in a.EVENT)"CLICK" != n && "DBLCLICK" != n && "HOVER" != n && "MOUSEOUT" != n && "MAP_ROAM" != n && this._messageCenter.bind(a.EVENT[n], this._onevent, this);
            var o = {};
            this._onzrevent = function (e) {
                return t[o[e.type]](e)
            };
            for (var r = 0, s = p.length; s > r; r++) {
                var l = p[r], h = c[l];
                o[h] = "_on" + l.toLowerCase(), i.on(h, this._onzrevent)
            }
            this.chart = {}, this.component = {};
            var d = e("./chart/island");
            this._island = new d(this._themeConfig, this._messageCenter, i, {}, this), this.chart.island = this._island;
            var m = e("./component/toolbox");
            this._toolbox = new m(this._themeConfig, this._messageCenter, i, {}, this), this.component.toolbox = this._toolbox;
            var u = e("./component");
            u.define("title", e("./component/title")), u.define("tooltip", e("./component/tooltip")), u.define("legend", e("./component/legend")), (0 === i.getWidth() || 0 === i.getHeight()) && console.error("Dom’s width & height should be ready before init.")
        }, __onevent: function (e) {
            e.__echartsId = e.__echartsId || this.id;
            var t = e.__echartsId === this.id;
            switch (this._curEventType || (this._curEventType = e.type), e.type) {
                case a.EVENT.LEGEND_SELECTED:
                    this._onlegendSelected(e);
                    break;
                case a.EVENT.DATA_ZOOM:
                    if (!t) {
                        var i = this.component.dataZoom;
                        i && (i.silence(!0), i.absoluteZoom(e.zoom), i.silence(!1))
                    }
                    this._ondataZoom(e);
                    break;
                case a.EVENT.DATA_RANGE:
                    t && this._ondataRange(e);
                    break;
                case a.EVENT.MAGIC_TYPE_CHANGED:
                    if (!t) {
                        var n = this.component.toolbox;
                        n && (n.silence(!0), n.setMagicType(e.magicType), n.silence(!1))
                    }
                    this._onmagicTypeChanged(e);
                    break;
                case a.EVENT.DATA_VIEW_CHANGED:
                    t && this._ondataViewChanged(e);
                    break;
                case a.EVENT.TOOLTIP_HOVER:
                    t && this._tooltipHover(e);
                    break;
                case a.EVENT.RESTORE:
                    this._onrestore();
                    break;
                case a.EVENT.REFRESH:
                    t && this._onrefresh(e);
                    break;
                case a.EVENT.TOOLTIP_IN_GRID:
                case a.EVENT.TOOLTIP_OUT_GRID:
                    if (t) {
                        if (this._connected) {
                            var o = this.component.grid;
                            o && (e.x = (e.event.zrenderX - o.getX()) / o.getWidth(), e.y = (e.event.zrenderY - o.getY()) / o.getHeight())
                        }
                    } else {
                        var o = this.component.grid;
                        o && this._zr.trigger("mousemove", {
                            connectTrigger: !0,
                            zrenderX: o.getX() + e.x * o.getWidth(),
                            zrenderY: o.getY() + e.y * o.getHeight()
                        })
                    }
            }
            if (this._connected && t && this._curEventType === e.type) {
                for (var r in this._connected)this._connected[r].connectedEventHandler(e);
                this._curEventType = null
            }
            (!t || !this._connected && t) && (this._curEventType = null)
        }, _onclick: function (e) {
            if (n(this, "onclick", e), e.target) {
                var t = this._eventPackage(e.target);
                t && null != t.seriesIndex && this._messageCenter.dispatch(a.EVENT.CLICK, e.event, t, this)
            }
        }, _ondblclick: function (e) {
            if (n(this, "ondblclick", e), e.target) {
                var t = this._eventPackage(e.target);
                t && null != t.seriesIndex && this._messageCenter.dispatch(a.EVENT.DBLCLICK, e.event, t, this)
            }
        }, _onmouseover: function (e) {
            if (e.target) {
                var t = this._eventPackage(e.target);
                t && null != t.seriesIndex && this._messageCenter.dispatch(a.EVENT.HOVER, e.event, t, this)
            }
        }, _onmouseout: function (e) {
            if (e.target) {
                var t = this._eventPackage(e.target);
                t && null != t.seriesIndex && this._messageCenter.dispatch(a.EVENT.MOUSEOUT, e.event, t, this)
            }
        }, _ondragstart: function (e) {
            this._status = {dragIn: !1, dragOut: !1, needRefresh: !1}, n(this, "ondragstart", e)
        }, _ondragenter: function (e) {
            n(this, "ondragenter", e)
        }, _ondragover: function (e) {
            n(this, "ondragover", e)
        }, _ondragleave: function (e) {
            n(this, "ondragleave", e)
        }, _ondrop: function (e) {
            n(this, "ondrop", e, this._status), this._island.ondrop(e, this._status)
        }, _ondragend: function (e) {
            if (n(this, "ondragend", e, this._status), this._timeline && this._timeline.ondragend(e, this._status), this._island.ondragend(e, this._status), this._status.needRefresh) {
                this._syncBackupData(this._option);
                var t = this._messageCenter;
                t.dispatch(a.EVENT.DATA_CHANGED, e.event, this._eventPackage(e.target), this), t.dispatch(a.EVENT.REFRESH, null, null, this)
            }
        }, _onlegendSelected: function (e) {
            this._status.needRefresh = !1, n(this, "onlegendSelected", e, this._status), this._status.needRefresh && this._messageCenter.dispatch(a.EVENT.REFRESH, null, null, this)
        }, _ondataZoom: function (e) {
            this._status.needRefresh = !1, n(this, "ondataZoom", e, this._status), this._status.needRefresh && this._messageCenter.dispatch(a.EVENT.REFRESH, null, null, this)
        }, _ondataRange: function (e) {
            this._clearEffect(), this._status.needRefresh = !1, n(this, "ondataRange", e, this._status), this._status.needRefresh && this._zr.refresh()
        }, _onmagicTypeChanged: function () {
            this._clearEffect(), this._render(this._toolbox.getMagicOption())
        }, _ondataViewChanged: function (e) {
            this._syncBackupData(e.option), this._messageCenter.dispatch(a.EVENT.DATA_CHANGED, null, e, this), this._messageCenter.dispatch(a.EVENT.REFRESH, null, null, this)
        }, _tooltipHover: function (e) {
            var t = [];
            n(this, "ontooltipHover", e, t)
        }, _onrestore: function () {
            this.restore()
        }, _onrefresh: function (e) {
            this._refreshInside = !0, this.refresh(e), this._refreshInside = !1
        }, _syncBackupData: function (e) {
            this.component.dataZoom && this.component.dataZoom.syncBackupData(e)
        }, _eventPackage: function (t) {
            if (t) {
                var i = e("./util/ecData"), n = i.get(t, "seriesIndex"), a = i.get(t, "dataIndex");
                return a = -1 != n && this.component.dataZoom ? this.component.dataZoom.getRealDataIndex(n, a) : a, {
                    seriesIndex: n,
                    seriesName: (i.get(t, "series") || {}).name,
                    dataIndex: a,
                    data: i.get(t, "data"),
                    name: i.get(t, "name"),
                    value: i.get(t, "value"),
                    special: i.get(t, "special")
                }
            }
        }, _render: function (t) {
            this._mergeGlobalConifg(t);
            var i = t.backgroundColor;
            if (i)if (l || -1 == i.indexOf("rgba"))this.dom.style.backgroundColor = i; else {
                var n = i.split(",");
                this.dom.style.filter = "alpha(opacity=" + 100 * n[3].substring(0, n[3].lastIndexOf(")")) + ")", n.length = 3, n[0] = n[0].replace("a", ""), this.dom.style.backgroundColor = n.join(",") + ")"
            }
            this._zr.clearAnimation(), this._chartList = [];
            var o = e("./chart"), r = e("./component");
            (t.xAxis || t.yAxis) && (t.grid = t.grid || {}, t.dataZoom = t.dataZoom || {});
            for (var s, h, d, m = ["title", "legend", "tooltip", "dataRange", "roamController", "grid", "dataZoom", "xAxis", "yAxis", "polar"], c = 0, p = m.length; p > c; c++)h = m[c], d = this.component[h], t[h] ? (d ? d.refresh && d.refresh(t) : (s = r.get(/^[xy]Axis$/.test(h) ? "axis" : h), d = new s(this._themeConfig, this._messageCenter, this._zr, t, this, h), this.component[h] = d), this._chartList.push(d)) : d && (d.dispose(), this.component[h] = null, delete this.component[h]);
            for (var u, V, U, y = {}, c = 0, p = t.series.length; p > c; c++)V = t.series[c].type, V ? y[V] || (y[V] = !0, u = o.get(V), u ? (this.chart[V] ? (U = this.chart[V], U.refresh(t)) : U = new u(this._themeConfig, this._messageCenter, this._zr, t, this), this._chartList.push(U), this.chart[V] = U) : console.error(V + " has not been required.")) : console.error("series[" + c + "] chart type has not been defined.");
            for (V in this.chart)V == a.CHART_TYPE_ISLAND || y[V] || (this.chart[V].dispose(), this.chart[V] = null, delete this.chart[V]);
            this.component.grid && this.component.grid.refixAxisShape(this.component), this._island.refresh(t), this._toolbox.refresh(t), t.animation && !t.renderAsImage ? this._zr.refresh() : this._zr.render();
            var g = "IMG" + this.id, f = document.getElementById(g);
            t.renderAsImage && l ? (f ? f.src = this.getDataURL(t.renderAsImage) : (f = this.getImage(t.renderAsImage), f.id = g, f.style.position = "absolute", f.style.left = 0, f.style.top = 0, this.dom.firstChild.appendChild(f)), this.un(), this._zr.un(), this._disposeChartList(), this._zr.clear()) : f && f.parentNode.removeChild(f), f = null, this._option = t
        }, restore: function () {
            this._clearEffect(), this._option = o.clone(this._optionRestore), this._disposeChartList(), this._island.clear(), this._toolbox.reset(this._option, !0), this._render(this._option)
        }, refresh: function (e) {
            this._clearEffect(), e = e || {};
            var t = e.option;
            !this._refreshInside && t && (t = this.getOption(), o.merge(t, e.option, !0), o.merge(this._optionRestore, e.option, !0), this._toolbox.reset(t)), this._island.refresh(t), this._toolbox.refresh(t), this._zr.clearAnimation();
            for (var i = 0, n = this._chartList.length; n > i; i++)this._chartList[i].refresh && this._chartList[i].refresh(t);
            this.component.grid && this.component.grid.refixAxisShape(this.component), this._zr.refresh()
        }, _disposeChartList: function () {
            this._clearEffect(), this._zr.clearAnimation();
            for (var e = this._chartList.length; e--;) {
                var t = this._chartList[e];
                if (t) {
                    var i = t.type;
                    this.chart[i] && delete this.chart[i], this.component[i] && delete this.component[i], t.dispose && t.dispose()
                }
            }
            this._chartList = []
        }, _mergeGlobalConifg: function (t) {
            for (var i = ["backgroundColor", "calculable", "calculableColor", "calculableHolderColor", "nameConnector", "valueConnector", "animation", "animationThreshold", "animationDuration", "animationEasing", "addDataAnimation", "symbolList", "DRAG_ENABLE_TIME"], n = i.length; n--;) {
                var a = i[n];
                null == t[a] && (t[a] = this._themeConfig[a])
            }
            var o = t.color;
            o && o.length || (o = this._themeConfig.color), l || (t.animation = !1, t.addDataAnimation = !1), this._zr.getColor = function (t) {
                var i = e("zrender/tool/color");
                return i.getColor(t, o)
            }
        }, setOption: function (e, t) {
            return e.timeline ? this._setTimelineOption(e) : this._setOption(e, t)
        }, _setOption: function (e, t) {
            return this._option = !t && this._option ? o.merge(this.getOption(), o.clone(e), !0) : o.clone(e), this._optionRestore = o.clone(this._option), this._option.series && 0 !== this._option.series.length ? (this.component.dataZoom && (this._option.dataZoom || this._option.toolbox && this._option.toolbox.feature && this._option.toolbox.feature.dataZoom && this._option.toolbox.feature.dataZoom.show) && this.component.dataZoom.syncOption(this._option), this._toolbox.reset(this._option), this._render(this._option), this) : void this._zr.clear()
        }, getOption: function () {
            function e(e) {
                var n = i._optionRestore[e];
                if (n)if (n instanceof Array)for (var a = n.length; a--;)t[e][a].data = o.clone(n[a].data); else t[e].data = o.clone(n.data)
            }

            var t = o.clone(this._option), i = this;
            return e("xAxis"), e("yAxis"), e("series"), t
        }, setSeries: function (e, t) {
            return t ? (this._option.series = e, this.setOption(this._option, t)) : this.setOption({series: e}), this
        }, getSeries: function () {
            return this.getOption().series
        }, _setTimelineOption: function (t) {
            this._timeline && this._timeline.dispose();
            var i = e("./component/timeline"), n = new i(this._themeConfig, this._messageCenter, this._zr, t, this);
            return this._timeline = n, this.component.timeline = this._timeline, this
        }, addData: function (e, t, i, n, r) {
            for (var s = e instanceof Array ? e : [[e, t, i, n, r]], l = this.getOption(), h = this._optionRestore, d = 0, m = s.length; m > d; d++) {
                e = s[d][0], t = s[d][1], i = s[d][2], n = s[d][3], r = s[d][4];
                var c = h.series[e], p = i ? "unshift" : "push", u = i ? "pop" : "shift";
                if (c) {
                    var V = c.data, U = l.series[e].data;
                    if (V[p](t), U[p](t), n || (V[u](), t = U[u]()), null != r) {
                        var y, g;
                        if (c.type === a.CHART_TYPE_PIE && (y = h.legend) && (g = y.data)) {
                            var f = l.legend.data;
                            if (g[p](r), f[p](r), !n) {
                                var b = o.indexOf(g, t.name);
                                -1 != b && g.splice(b, 1), b = o.indexOf(f, t.name), -1 != b && f.splice(b, 1)
                            }
                        } else if (null != h.xAxis && null != h.yAxis) {
                            var _, x, k = c.xAxisIndex || 0;
                            (null == h.xAxis[k].type || "category" === h.xAxis[k].type) && (_ = h.xAxis[k].data, x = l.xAxis[k].data, _[p](r), x[p](r), n || (_[u](), x[u]())), k = c.yAxisIndex || 0, "category" === h.yAxis[k].type && (_ = h.yAxis[k].data, x = l.yAxis[k].data, _[p](r), x[p](r), n || (_[u](), x[u]()))
                        }
                    }
                    this._option.series[e].data = l.series[e].data
                }
            }
            this._zr.clearAnimation();
            for (var L = this._chartList, d = 0, m = L.length; m > d; d++)l.addDataAnimation && L[d].addDataAnimation && L[d].addDataAnimation(s);
            this.component.dataZoom && this.component.dataZoom.syncOption(l), this._option = l;
            var v = this;
            return setTimeout(function () {
                if (v._zr) {
                    v._zr.clearAnimation();
                    for (var e = 0, t = L.length; t > e; e++)L[e].motionlessOnce = l.addDataAnimation && L[e].addDataAnimation;
                    v._messageCenter.dispatch(a.EVENT.REFRESH, null, {option: l}, v)
                }
            }, l.addDataAnimation ? 500 : 0), this
        }, addMarkPoint: function (e, t) {
            return this._addMark(e, t, "markPoint")
        }, addMarkLine: function (e, t) {
            return this._addMark(e, t, "markLine")
        }, _addMark: function (e, t, i) {
            var n, a = this._option.series;
            if (a && (n = a[e])) {
                var r = this._optionRestore.series, s = r[e], l = n[i], h = s[i];
                l = n[i] = l || {data: []}, h = s[i] = h || {data: []};
                for (var d in t)"data" === d ? (l.data = l.data.concat(t.data), h.data = h.data.concat(t.data)) : "object" != typeof t[d] || null == l[d] ? l[d] = h[d] = t[d] : (o.merge(l[d], t[d], !0), o.merge(h[d], t[d], !0));
                var m = this.chart[n.type];
                m && m.addMark(e, t, i)
            }
            return this
        }, delMarkPoint: function (e, t) {
            return this._delMark(e, t, "markPoint")
        }, delMarkLine: function (e, t) {
            return this._delMark(e, t, "markLine")
        }, _delMark: function (e, t, i) {
            var n, a, o, r = this._option.series;
            if (!(r && (n = r[e]) && (a = n[i]) && (o = a.data)))return this;
            t = t.split(" > ");
            for (var s = -1, l = 0, h = o.length; h > l; l++) {
                var d = o[l];
                if (d instanceof Array) {
                    if (d[0].name === t[0] && d[1].name === t[1]) {
                        s = l;
                        break
                    }
                } else if (d.name === t[0]) {
                    s = l;
                    break
                }
            }
            if (s > -1) {
                o.splice(s, 1), this._optionRestore.series[e][i].data.splice(s, 1);
                var m = this.chart[n.type];
                m && m.delMark(e, t.join(" > "), i)
            }
            return this
        }, getDom: function () {
            return this.dom
        }, getZrender: function () {
            return this._zr
        }, getDataURL: function (e) {
            if (!l)return "";
            if (0 === this._chartList.length) {
                var t = "IMG" + this.id, i = document.getElementById(t);
                if (i)return i.src
            }
            var n = this.component.tooltip;
            switch (n && n.hideTip(), e) {
                case"jpeg":
                    break;
                default:
                    e = "png"
            }
            var a = this._option.backgroundColor;
            return a && "rgba(0,0,0,0)" === a.replace(" ", "") && (a = "#fff"), this._zr.toDataURL("image/" + e, a)
        }, getImage: function (e) {
            var t = this._optionRestore.title, i = document.createElement("img");
            return i.src = this.getDataURL(e), i.title = t && t.text || "ECharts", i
        }, getConnectedDataURL: function (t) {
            if (!this.isConnected())return this.getDataURL(t);
            var i = this.dom, n = {
                self: {
                    img: this.getDataURL(t),
                    left: i.offsetLeft,
                    top: i.offsetTop,
                    right: i.offsetLeft + i.offsetWidth,
                    bottom: i.offsetTop + i.offsetHeight
                }
            }, a = n.self.left, o = n.self.top, r = n.self.right, s = n.self.bottom;
            for (var l in this._connected)i = this._connected[l].getDom(), n[l] = {
                img: this._connected[l].getDataURL(t),
                left: i.offsetLeft,
                top: i.offsetTop,
                right: i.offsetLeft + i.offsetWidth,
                bottom: i.offsetTop + i.offsetHeight
            }, a = Math.min(a, n[l].left), o = Math.min(o, n[l].top), r = Math.max(r, n[l].right), s = Math.max(s, n[l].bottom);
            var h = document.createElement("div");
            h.style.position = "absolute", h.style.left = "-4000px", h.style.width = r - a + "px", h.style.height = s - o + "px", document.body.appendChild(h);
            var d = e("zrender").init(h), m = e("zrender/shape/Image");
            for (var l in n)d.addShape(new m({style: {x: n[l].left - a, y: n[l].top - o, image: n[l].img}}));
            d.render();
            var c = this._option.backgroundColor;
            c && "rgba(0,0,0,0)" === c.replace(/ /g, "") && (c = "#fff");
            var p = d.toDataURL("image/png", c);
            return setTimeout(function () {
                d.dispose(), h.parentNode.removeChild(h), h = null
            }, 100), p
        }, getConnectedImage: function (e) {
            var t = this._optionRestore.title, i = document.createElement("img");
            return i.src = this.getConnectedDataURL(e), i.title = t && t.text || "ECharts", i
        }, on: function (e, t) {
            return this._messageCenterOutSide.bind(e, t, this), this
        }, un: function (e, t) {
            return this._messageCenterOutSide.unbind(e, t), this
        }, connect: function (e) {
            if (!e)return this;
            if (this._connected || (this._connected = {}), e instanceof Array)for (var t = 0, i = e.length; i > t; t++)this._connected[e[t].id] = e[t]; else this._connected[e.id] = e;
            return this
        }, disConnect: function (e) {
            if (!e || !this._connected)return this;
            if (e instanceof Array)for (var t = 0, i = e.length; i > t; t++)delete this._connected[e[t].id]; else delete this._connected[e.id];
            for (var n in this._connected)return this;
            return this._connected = !1, this
        }, connectedEventHandler: function (e) {
            e.__echartsId != this.id && this._onevent(e)
        }, isConnected: function () {
            return !!this._connected
        }, showLoading: function (t) {
            var i = {
                bar: e("zrender/loadingEffect/Bar"),
                bubble: e("zrender/loadingEffect/Bubble"),
                dynamicLine: e("zrender/loadingEffect/DynamicLine"),
                ring: e("zrender/loadingEffect/Ring"),
                spin: e("zrender/loadingEffect/Spin"),
                whirling: e("zrender/loadingEffect/Whirling")
            };
            this._toolbox.hideDataView(), t = t || {};
            var n = t.textStyle || {};
            t.textStyle = n;
            var a = o.merge(o.clone(n), this._themeConfig.textStyle);
            n.textFont = a.fontStyle + " " + a.fontWeight + " " + a.fontSize + "px " + a.fontFamily, n.text = t.text || this._themeConfig.loadingText, null != t.x && (n.x = t.x), null != t.y && (n.y = t.y), t.effectOption = t.effectOption || {}, t.effectOption.textStyle = n;
            var r = t.effect;
            return ("string" == typeof r || null == r) && (r = i[t.effect || "spin"]), this._zr.showLoading(new r(t.effectOption)), this
        }, hideLoading: function () {
            return this._zr.hideLoading(), this
        }, setTheme: function (t) {
            if (t) {
                if ("string" == typeof t)switch (t) {
                    default:
                        t = e("./theme/default")
                } else t = t || {};
                for (var i in this._themeConfig)delete this._themeConfig[i];
                for (var i in a)this._themeConfig[i] = o.clone(a[i]);
                t.color && (this._themeConfig.color = []), t.symbolList && (this._themeConfig.symbolList = []), o.merge(this._themeConfig, o.clone(t), !0)
            }
            l || (this._themeConfig.textStyle.fontFamily = this._themeConfig.textStyle.fontFamily2), this._timeline && this._timeline.setTheme(!0), this._optionRestore && this.restore()
        }, resize: function () {
            var e = this;
            return function () {
                if (e._clearEffect(), e._zr.resize(), e._option && e._option.renderAsImage && l)return e._render(e._option), e;
                e._zr.clearAnimation(), e._island.resize(), e._toolbox.resize(), e._timeline && e._timeline.resize();
                for (var t = 0, i = e._chartList.length; i > t; t++)e._chartList[t].resize && e._chartList[t].resize();
                return e.component.grid && e.component.grid.refixAxisShape(e.component), e._zr.refresh(), e._messageCenter.dispatch(a.EVENT.RESIZE, null, null, e), e
            }
        }, _clearEffect: function () {
            this._zr.modLayer(a.EFFECT_ZLEVEL, {motionBlur: !1}), this._zr.painter.clearLayer(a.EFFECT_ZLEVEL)
        }, clear: function () {
            return this._disposeChartList(), this._zr.clear(), this._option = {}, this._optionRestore = {}, this.dom.style.backgroundColor = null, this
        }, dispose: function () {
            var e = this.dom.getAttribute(m);
            e && delete d[e], this._island.dispose(), this._toolbox.dispose(), this._timeline && this._timeline.dispose(), this._messageCenter.unbind(), this.clear(), this._zr.dispose(), this._zr = null
        }
    }, s
}), define("echarts/config", [], function () {
    var e = {
        CHART_TYPE_LINE: "line",
        CHART_TYPE_BAR: "bar",
        CHART_TYPE_SCATTER: "scatter",
        CHART_TYPE_PIE: "pie",
        CHART_TYPE_RADAR: "radar",
        CHART_TYPE_MAP: "map",
        CHART_TYPE_K: "k",
        CHART_TYPE_ISLAND: "island",
        CHART_TYPE_FORCE: "force",
        CHART_TYPE_CHORD: "chord",
        CHART_TYPE_GAUGE: "gauge",
        CHART_TYPE_FUNNEL: "funnel",
        CHART_TYPE_EVENTRIVER: "eventRiver",
        COMPONENT_TYPE_TITLE: "title",
        COMPONENT_TYPE_LEGEND: "legend",
        COMPONENT_TYPE_DATARANGE: "dataRange",
        COMPONENT_TYPE_DATAVIEW: "dataView",
        COMPONENT_TYPE_DATAZOOM: "dataZoom",
        COMPONENT_TYPE_TOOLBOX: "toolbox",
        COMPONENT_TYPE_TOOLTIP: "tooltip",
        COMPONENT_TYPE_GRID: "grid",
        COMPONENT_TYPE_AXIS: "axis",
        COMPONENT_TYPE_POLAR: "polar",
        COMPONENT_TYPE_X_AXIS: "xAxis",
        COMPONENT_TYPE_Y_AXIS: "yAxis",
        COMPONENT_TYPE_AXIS_CATEGORY: "categoryAxis",
        COMPONENT_TYPE_AXIS_VALUE: "valueAxis",
        COMPONENT_TYPE_TIMELINE: "timeline",
        COMPONENT_TYPE_ROAMCONTROLLER: "roamController",
        backgroundColor: "rgba(0,0,0,0)",
        color: ["#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a", "#ffd700", "#6699FF", "#ff6666", "#3cb371", "#b8860b", "#30e0e0"],
        title: {
            text: "",
            subtext: "",
            x: "left",
            y: "top",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 5,
            textStyle: {fontSize: 18, fontWeight: "bolder", color: "#333"},
            subtextStyle: {color: "#aaa"}
        },
        legend: {
            show: !0,
            orient: "horizontal",
            x: "center",
            y: "top",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemWidth: 20,
            itemHeight: 14,
            textStyle: {color: "#333"},
            selectedMode: !0
        },
        dataRange: {
            show: !0,
            orient: "vertical",
            x: "left",
            y: "bottom",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemWidth: 20,
            itemHeight: 14,
            precision: 0,
            splitNumber: 5,
            calculable: !1,
            hoverLink: !0,
            realtime: !0,
            color: ["#006edd", "#e0ffff"],
            textStyle: {color: "#333"}
        },
        toolbox: {
            show: !1,
            orient: "horizontal",
            x: "right",
            y: "top",
            color: ["#1e90ff", "#22bb22", "#4b0082", "#d2691e"],
            disableColor: "#ddd",
            effectiveColor: "red",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemSize: 16,
            showTitle: !0,
            feature: {
                mark: {
                    show: !1,
                    title: {mark: "辅助线开关", markUndo: "删除辅助线", markClear: "清空辅助线"},
                    lineStyle: {width: 1, color: "#1e90ff", type: "dashed"}
                },
                dataZoom: {show: !1, title: {dataZoom: "区域缩放", dataZoomReset: "区域缩放后退"}},
                dataView: {show: !1, title: "数据视图", readOnly: !1, lang: ["数据视图", "关闭", "刷新"]},
                magicType: {
                    show: !1,
                    title: {
                        line: "折线图切换",
                        bar: "柱形图切换",
                        stack: "堆积",
                        tiled: "平铺",
                        force: "力导向布局图切换",
                        chord: "和弦图切换",
                        pie: "饼图切换",
                        funnel: "漏斗图切换"
                    },
                    type: []
                },
                restore: {show: !1, title: "还原"},
                saveAsImage: {show: !1, title: "保存为图片", type: "png", lang: ["点击保存"]}
            }
        },
        tooltip: {
            show: !0,
            showContent: !0,
            trigger: "item",
            islandFormatter: "{a} <br/>{b} : {c}",
            showDelay: 20,
            hideDelay: 100,
            transitionDuration: .4,
            enterable: !1,
            backgroundColor: "rgba(0,0,0,0.7)",
            borderColor: "#333",
            borderRadius: 4,
            borderWidth: 0,
            padding: 5,
            axisPointer: {
                type: "line",
                lineStyle: {color: "#48b", width: 2, type: "solid"},
                crossStyle: {color: "#1e90ff", width: 1, type: "dashed"},
                shadowStyle: {color: "rgba(150,150,150,0.3)", width: "auto", type: "default"}
            },
            textStyle: {color: "#fff"}
        },
        dataZoom: {
            show: !1,
            orient: "horizontal",
            backgroundColor: "rgba(0,0,0,0)",
            dataBackgroundColor: "#eee",
            fillerColor: "rgba(144,197,237,0.2)",
            handleColor: "rgba(70,130,180,0.8)",
            showDetail: !0,
            realtime: !0
        },
        grid: {x: 80, y: 60, x2: 80, y2: 60, backgroundColor: "rgba(0,0,0,0)", borderWidth: 1, borderColor: "#ccc"},
        categoryAxis: {
            show: !0,
            position: "bottom",
            name: "",
            nameLocation: "end",
            nameTextStyle: {},
            boundaryGap: !0,
            axisLine: {show: !0, onZero: !0, lineStyle: {color: "#48b", width: 2, type: "solid"}},
            axisTick: {show: !0, interval: "auto", inside: !1, length: 5, lineStyle: {color: "#333", width: 1}},
            axisLabel: {show: !0, interval: "auto", rotate: 0, margin: 8, textStyle: {color: "#333"}},
            splitLine: {show: !0, lineStyle: {color: ["#ccc"], width: 1, type: "solid"}},
            splitArea: {show: !1, areaStyle: {color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]}}
        },
        valueAxis: {
            show: !0,
            position: "left",
            name: "",
            nameLocation: "end",
            nameTextStyle: {},
            boundaryGap: [0, 0],
            axisLine: {show: !0, onZero: !0, lineStyle: {color: "#48b", width: 2, type: "solid"}},
            axisTick: {show: !1, inside: !1, length: 5, lineStyle: {color: "#333", width: 1}},
            axisLabel: {show: !0, rotate: 0, margin: 8, textStyle: {color: "#333"}},
            splitLine: {show: !0, lineStyle: {color: ["#ccc"], width: 1, type: "solid"}},
            splitArea: {show: !1, areaStyle: {color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]}}
        },
        polar: {
            center: ["50%", "50%"],
            radius: "75%",
            startAngle: 90,
            boundaryGap: [0, 0],
            splitNumber: 5,
            name: {show: !0, textStyle: {color: "#333"}},
            axisLine: {show: !0, lineStyle: {color: "#ccc", width: 1, type: "solid"}},
            axisLabel: {show: !1, textStyle: {color: "#333"}},
            splitArea: {show: !0, areaStyle: {color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]}},
            splitLine: {show: !0, lineStyle: {width: 1, color: "#ccc"}},
            type: "polygon"
        },
        timeline: {
            show: !0,
            type: "time",
            notMerge: !1,
            realtime: !0,
            x: 80,
            x2: 80,
            y2: 0,
            height: 50,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            controlPosition: "left",
            autoPlay: !1,
            loop: !0,
            playInterval: 2e3,
            lineStyle: {width: 1, color: "#666", type: "dashed"},
            label: {show: !0, interval: "auto", rotate: 0, textStyle: {color: "#333"}},
            checkpointStyle: {
                symbol: "auto",
                symbolSize: "auto",
                color: "auto",
                borderColor: "auto",
                borderWidth: "auto",
                label: {show: !1, textStyle: {color: "auto"}}
            },
            controlStyle: {normal: {color: "#333"}, emphasis: {color: "#1e90ff"}},
            symbol: "emptyDiamond",
            symbolSize: 4,
            currentIndex: 0
        },
        roamController: {
            show: !0,
            x: "left",
            y: "top",
            width: 80,
            height: 120,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            handleColor: "#6495ed",
            fillerColor: "#fff",
            step: 15,
            mapTypeControl: null
        },
        bar: {
            clickable: !0,
            legendHoverLink: !0,
            xAxisIndex: 0,
            yAxisIndex: 0,
            barMinHeight: 0,
            barGap: "30%",
            barCategoryGap: "20%",
            itemStyle: {
                normal: {barBorderColor: "#fff", barBorderRadius: 0, barBorderWidth: 0, label: {show: !1}},
                emphasis: {barBorderColor: "#fff", barBorderRadius: 0, barBorderWidth: 0, label: {show: !1}}
            }
        },
        line: {
            clickable: !0,
            legendHoverLink: !0,
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
                normal: {
                    label: {show: !1},
                    lineStyle: {
                        width: 2,
                        type: "solid",
                        shadowColor: "rgba(0,0,0,0)",
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0
                    }
                }, emphasis: {label: {show: !1}}
            },
            symbolSize: 2,
            showAllSymbol: !1
        },
        k: {
            clickable: !0,
            legendHoverLink: !1,
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
                normal: {
                    color: "#fff",
                    color0: "#00aa11",
                    lineStyle: {width: 1, color: "#ff3200", color0: "#00aa11"}
                }, emphasis: {}
            }
        },
        scatter: {
            clickable: !0,
            legendHoverLink: !0,
            xAxisIndex: 0,
            yAxisIndex: 0,
            symbolSize: 4,
            large: !1,
            largeThreshold: 2e3,
            itemStyle: {
                normal: {
                    label: {
                        show: !1, formatter: function (e, t, i) {
                            return "undefined" != typeof i[2] ? i[2] : i[0] + " , " + i[1]
                        }
                    }
                }, emphasis: {
                    label: {
                        show: !1, formatter: function (e, t, i) {
                            return "undefined" != typeof i[2] ? i[2] : i[0] + " , " + i[1]
                        }
                    }
                }
            }
        },
        radar: {
            clickable: !0,
            legendHoverLink: !0,
            polarIndex: 0,
            itemStyle: {
                normal: {label: {show: !1}, lineStyle: {width: 2, type: "solid"}},
                emphasis: {label: {show: !1}}
            },
            symbolSize: 2
        },
        pie: {
            clickable: !0,
            legendHoverLink: !0,
            center: ["50%", "50%"],
            radius: [0, "75%"],
            clockWise: !0,
            startAngle: 90,
            minAngle: 0,
            selectedOffset: 10,
            itemStyle: {
                normal: {
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    label: {show: !0, position: "outer"},
                    labelLine: {show: !0, length: 20, lineStyle: {width: 1, type: "solid"}}
                },
                emphasis: {
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    label: {show: !1},
                    labelLine: {show: !1, length: 20, lineStyle: {width: 1, type: "solid"}}
                }
            }
        },
        map: {
            mapType: "china",
            mapValuePrecision: 0,
            showLegendSymbol: !0,
            dataRangeHoverLink: !0,
            hoverable: !0,
            clickable: !0,
            itemStyle: {
                normal: {
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    areaStyle: {color: "#ccc"},
                    label: {show: !1, textStyle: {color: "rgb(139,69,19)"}}
                },
                emphasis: {
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    areaStyle: {color: "rgba(255,215,0,0.8)"},
                    label: {show: !1, textStyle: {color: "rgb(100,0,0)"}}
                }
            }
        },
        force: {
            center: ["50%", "50%"],
            size: "100%",
            preventOverlap: !1,
            coolDown: .99,
            minRadius: 10,
            maxRadius: 20,
            ratioScaling: !1,
            large: !1,
            useWorker: !1,
            steps: 1,
            scaling: 1,
            gravity: 1,
            symbol: "circle",
            symbolSize: 0,
            linkSymbol: null,
            linkSymbolSize: [10, 15],
            draggable: !0,
            clickable: !0,
            roam: !1,
            itemStyle: {
                normal: {
                    label: {show: !1, position: "inside"},
                    nodeStyle: {brushType: "both", borderColor: "#5182ab", borderWidth: 1},
                    linkStyle: {color: "#5182ab", width: 1, type: "line"}
                }, emphasis: {label: {show: !1}, nodeStyle: {}, linkStyle: {opacity: 0}}
            }
        },
        chord: {
            clickable: !0,
            radius: ["65%", "75%"],
            center: ["50%", "50%"],
            padding: 2,
            sort: "none",
            sortSub: "none",
            startAngle: 90,
            clockWise: !0,
            ribbonType: !0,
            minRadius: 10,
            maxRadius: 20,
            symbol: "circle",
            showScale: !1,
            showScaleText: !1,
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    borderColor: "#000",
                    label: {show: !0, rotate: !1, distance: 5},
                    chordStyle: {width: 1, color: "black", borderWidth: 1, borderColor: "#999", opacity: .5}
                },
                emphasis: {
                    borderWidth: 0,
                    borderColor: "#000",
                    chordStyle: {width: 1, color: "black", borderWidth: 1, borderColor: "#999"}
                }
            }
        },
        gauge: {
            center: ["50%", "50%"],
            legendHoverLink: !0,
            radius: "75%",
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: 100,
            precision: 0,
            splitNumber: 10,
            axisLine: {show: !0, lineStyle: {color: [[.2, "#228b22"], [.8, "#48b"], [1, "#ff4500"]], width: 30}},
            axisTick: {show: !0, splitNumber: 5, length: 8, lineStyle: {color: "#eee", width: 1, type: "solid"}},
            axisLabel: {show: !0, textStyle: {color: "auto"}},
            splitLine: {show: !0, length: 30, lineStyle: {color: "#eee", width: 2, type: "solid"}},
            pointer: {show: !0, length: "80%", width: 8, color: "auto"},
            title: {show: !0, offsetCenter: [0, "-40%"], textStyle: {color: "#333", fontSize: 15}},
            detail: {
                show: !0,
                backgroundColor: "rgba(0,0,0,0)",
                borderWidth: 0,
                borderColor: "#ccc",
                width: 100,
                height: 40,
                offsetCenter: [0, "40%"],
                textStyle: {color: "auto", fontSize: 30}
            }
        },
        funnel: {
            clickable: !0,
            legendHoverLink: !0,
            x: 80,
            y: 60,
            x2: 80,
            y2: 60,
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 0,
            funnelAlign: "center",
            itemStyle: {
                normal: {
                    borderColor: "#fff",
                    borderWidth: 1,
                    label: {show: !0, position: "outer"},
                    labelLine: {show: !0, length: 10, lineStyle: {width: 1, type: "solid"}}
                }, emphasis: {borderColor: "rgba(0,0,0,0)", borderWidth: 1, label: {show: !0}, labelLine: {show: !0}}
            }
        },
        eventRiver: {
            clickable: !0,
            legendHoverLink: !0,
            itemStyle: {
                normal: {
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    label: {show: !0, position: "inside", formatter: "{b}"}
                }, emphasis: {borderColor: "rgba(0,0,0,0)", borderWidth: 1, label: {show: !0}}
            }
        },
        island: {r: 15, calculateStep: .1},
        markPoint: {
            clickable: !0,
            symbol: "pin",
            symbolSize: 10,
            large: !1,
            effect: {show: !1, loop: !0, period: 15, scaleSize: 2},
            itemStyle: {normal: {borderWidth: 2, label: {show: !0, position: "inside"}}, emphasis: {label: {show: !0}}}
        },
        markLine: {
            clickable: !0,
            symbol: ["circle", "arrow"],
            symbolSize: [2, 4],
            large: !1,
            effect: {show: !1, loop: !0, period: 15, scaleSize: 2},
            itemStyle: {
                normal: {borderWidth: 1.5, label: {show: !0, position: "end"}, lineStyle: {type: "dashed"}},
                emphasis: {label: {show: !1}, lineStyle: {}}
            }
        },
        textStyle: {
            decoration: "none",
            fontFamily: "Arial, Verdana, sans-serif",
            fontFamily2: "微软雅黑",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "normal"
        },
        EVENT: {
            REFRESH: "refresh",
            RESTORE: "restore",
            RESIZE: "resize",
            CLICK: "click",
            DBLCLICK: "dblclick",
            HOVER: "hover",
            MOUSEOUT: "mouseout",
            DATA_CHANGED: "dataChanged",
            DATA_ZOOM: "dataZoom",
            DATA_RANGE: "dataRange",
            DATA_RANGE_HOVERLINK: "dataRangeHoverLink",
            LEGEND_SELECTED: "legendSelected",
            LEGEND_HOVERLINK: "legendHoverLink",
            MAP_SELECTED: "mapSelected",
            PIE_SELECTED: "pieSelected",
            MAGIC_TYPE_CHANGED: "magicTypeChanged",
            DATA_VIEW_CHANGED: "dataViewChanged",
            TIMELINE_CHANGED: "timelineChanged",
            MAP_ROAM: "mapRoam",
            FORCE_LAYOUT_END: "forceLayoutEnd",
            TOOLTIP_HOVER: "tooltipHover",
            TOOLTIP_IN_GRID: "tooltipInGrid",
            TOOLTIP_OUT_GRID: "tooltipOutGrid",
            ROAMCONTROLLER: "roamController"
        },
        DRAG_ENABLE_TIME: 120,
        EFFECT_ZLEVEL: 7,
        symbolList: ["circle", "rectangle", "triangle", "diamond", "emptyCircle", "emptyRectangle", "emptyTriangle", "emptyDiamond"],
        loadingText: "Loading...",
        calculable: !1,
        calculableColor: "rgba(255,165,0,0.6)",
        calculableHolderColor: "#ccc",
        nameConnector: " & ",
        valueConnector: ": ",
        animation: !0,
        addDataAnimation: !0,
        animationThreshold: 2e3,
        animationDuration: 2e3,
        animationEasing: "ExponentialOut"
    };
    return e
}), define("zrender/tool/util", ["require", "../dep/excanvas"], function (e) {
    function t(e) {
        if ("object" == typeof e && null !== e) {
            var i = e;
            if (e instanceof Array) {
                i = [];
                for (var n = 0, a = e.length; a > n; n++)i[n] = t(e[n])
            } else if (!V[Object.prototype.toString.call(e)]) {
                i = {};
                for (var o in e)e.hasOwnProperty(o) && (i[o] = t(e[o]))
            }
            return i
        }
        return e
    }

    function i(e, t, i, a) {
        t.hasOwnProperty(i) && ("object" != typeof e[i] || V[Object.prototype.toString.call(e[i])] ? !a && i in e || (e[i] = t[i]) : n(e[i], t[i], a))
    }

    function n(e, t, n) {
        for (var a in t)i(e, t, a, n);
        return e
    }

    function a() {
        if (!d)if (e("../dep/excanvas"), window.G_vmlCanvasManager) {
            var t = document.createElement("div");
            t.style.position = "absolute", t.style.top = "-1000px", document.body.appendChild(t), d = G_vmlCanvasManager.initElement(t).getContext("2d")
        } else d = document.createElement("canvas").getContext("2d");
        return d
    }

    function o() {
        return c || (m = document.createElement("canvas"), p = m.width, u = m.height, c = m.getContext("2d")), c
    }

    function r(e, t) {
        var i, n = 100;
        e + U > p && (p = e + U + n, m.width = p, i = !0), t + y > u && (u = t + y + n, m.height = u, i = !0), -U > e && (U = Math.ceil(-e / n) * n, p += U, m.width = p, i = !0), -y > t && (y = Math.ceil(-t / n) * n, u += y, m.height = u, i = !0), i && c.translate(U, y)
    }

    function s() {
        return {x: U, y: y}
    }

    function l(e, t) {
        if (e.indexOf)return e.indexOf(t);
        for (var i = 0, n = e.length; n > i; i++)if (e[i] === t)return i;
        return -1
    }

    function h(e, t) {
        function i() {
        }

        var n = e.prototype;
        i.prototype = t.prototype, e.prototype = new i;
        for (var a in n)e.prototype[a] = n[a];
        e.constructor = e
    }

    var d, m, c, p, u, V = {
        "[object Function]": 1,
        "[object RegExp]": 1,
        "[object Date]": 1,
        "[object Error]": 1,
        "[object CanvasGradient]": 1
    }, U = 0, y = 0;
    return {
        inherits: h,
        clone: t,
        merge: n,
        getContext: a,
        getPixelContext: o,
        getPixelOffset: s,
        adjustCanvasSize: r,
        indexOf: l
    }
}), define("zrender/tool/event", ["require", "../mixin/Eventful"], function (e) {
    "use strict";
    function t(e) {
        return "undefined" != typeof e.zrenderX && e.zrenderX || "undefined" != typeof e.offsetX && e.offsetX || "undefined" != typeof e.layerX && e.layerX || "undefined" != typeof e.clientX && e.clientX
    }

    function i(e) {
        return "undefined" != typeof e.zrenderY && e.zrenderY || "undefined" != typeof e.offsetY && e.offsetY || "undefined" != typeof e.layerY && e.layerY || "undefined" != typeof e.clientY && e.clientY
    }

    function n(e) {
        return "undefined" != typeof e.zrenderDelta && e.zrenderDelta || "undefined" != typeof e.wheelDelta && e.wheelDelta || "undefined" != typeof e.detail && -e.detail
    }

    var a = e("../mixin/Eventful"), o = "function" == typeof window.addEventListener ? function (e) {
        e.preventDefault(), e.stopPropagation(), e.cancelBubble = !0
    } : function (e) {
        e.returnValue = !1, e.cancelBubble = !0
    };
    return {getX: t, getY: i, getDelta: n, stop: o, Dispatcher: a}
}), define("zrender/tool/env", [], function () {
    function e(e) {
        var t = this.os = {}, i = this.browser = {}, n = e.match(/Web[kK]it[\/]{0,1}([\d.]+)/), a = e.match(/(Android);?[\s\/]+([\d.]+)?/), o = e.match(/(iPad).*OS\s([\d_]+)/), r = e.match(/(iPod)(.*OS\s([\d_]+))?/), s = !o && e.match(/(iPhone\sOS)\s([\d_]+)/), l = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), h = l && e.match(/TouchPad/), d = e.match(/Kindle\/([\d.]+)/), m = e.match(/Silk\/([\d._]+)/), c = e.match(/(BlackBerry).*Version\/([\d.]+)/), p = e.match(/(BB10).*Version\/([\d.]+)/), u = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/), V = e.match(/PlayBook/), U = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/), y = e.match(/Firefox\/([\d.]+)/), g = e.match(/MSIE ([\d.]+)/), f = n && e.match(/Mobile\//) && !U, b = e.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !U, g = e.match(/MSIE\s([\d.]+)/);
        return (i.webkit = !!n) && (i.version = n[1]), a && (t.android = !0, t.version = a[2]), s && !r && (t.ios = t.iphone = !0, t.version = s[2].replace(/_/g, ".")), o && (t.ios = t.ipad = !0, t.version = o[2].replace(/_/g, ".")), r && (t.ios = t.ipod = !0, t.version = r[3] ? r[3].replace(/_/g, ".") : null), l && (t.webos = !0, t.version = l[2]), h && (t.touchpad = !0), c && (t.blackberry = !0, t.version = c[2]), p && (t.bb10 = !0, t.version = p[2]), u && (t.rimtabletos = !0, t.version = u[2]), V && (i.playbook = !0), d && (t.kindle = !0, t.version = d[1]), m && (i.silk = !0, i.version = m[1]), !m && t.android && e.match(/Kindle Fire/) && (i.silk = !0), U && (i.chrome = !0, i.version = U[1]), y && (i.firefox = !0, i.version = y[1]), g && (i.ie = !0, i.version = g[1]), f && (e.match(/Safari/) || t.ios) && (i.safari = !0), b && (i.webview = !0), g && (i.ie = !0, i.version = g[1]), t.tablet = !!(o || V || a && !e.match(/Mobile/) || y && e.match(/Tablet/) || g && !e.match(/Phone/) && e.match(/Touch/)), t.phone = !(t.tablet || t.ipod || !(a || s || l || c || p || U && e.match(/Android/) || U && e.match(/CriOS\/([\d.]+)/) || y && e.match(/Mobile/) || g && e.match(/Touch/))), {
            browser: i,
            os: t,
            canvasSupported: document.createElement("canvas").getContext ? !0 : !1
        }
    }

    return e(navigator.userAgent)
}), define("zrender", ["zrender/zrender"], function (e) {
    return e
}), define("zrender/zrender", ["require", "./dep/excanvas", "./tool/util", "./tool/log", "./tool/guid", "./Handler", "./Painter", "./Storage", "./animation/Animation", "./tool/env"], function (e) {
    function t(e) {
        return function () {
            for (var t = e.animatingElements, i = 0, n = t.length; n > i; i++)e.storage.mod(t[i].id);
            (t.length || e._needsRefreshNextFrame) && e.refresh()
        }
    }

    e("./dep/excanvas");
    var i = e("./tool/util"), n = e("./tool/log"), a = e("./tool/guid"), o = e("./Handler"), r = e("./Painter"), s = e("./Storage"), l = e("./animation/Animation"), h = {}, d = {};
    d.version = "2.0.6", d.init = function (e) {
        var t = new m(a(), e);
        return h[t.id] = t, t
    }, d.dispose = function (e) {
        if (e)e.dispose(); else {
            for (var t in h)h[t].dispose();
            h = {}
        }
        return d
    }, d.getInstance = function (e) {
        return h[e]
    }, d.delInstance = function (e) {
        return delete h[e], d
    };
    var m = function (i, n) {
        this.id = i, this.env = e("./tool/env"), this.storage = new s, this.painter = new r(n, this.storage), this.handler = new o(n, this.storage, this.painter), this.animatingElements = [], this.animation = new l({stage: {update: t(this)}}), this.animation.start();
        var a = this;
        this.painter.refreshNextFrame = function () {
            a.refreshNextFrame()
        }, this._needsRefreshNextFrame = !1
    };
    return m.prototype.getId = function () {
        return this.id
    }, m.prototype.addShape = function (e) {
        return this.storage.addRoot(e), this
    }, m.prototype.addGroup = function (e) {
        return this.storage.addRoot(e), this
    }, m.prototype.delShape = function (e) {
        return this.storage.delRoot(e), this
    }, m.prototype.delGroup = function (e) {
        return this.storage.delRoot(e), this
    }, m.prototype.modShape = function (e, t) {
        return this.storage.mod(e, t), this
    }, m.prototype.modGroup = function (e, t) {
        return this.storage.mod(e, t), this
    }, m.prototype.modLayer = function (e, t) {
        return this.painter.modLayer(e, t), this
    }, m.prototype.addHoverShape = function (e) {
        return this.storage.addHover(e), this
    }, m.prototype.render = function (e) {
        return this.painter.render(e), this._needsRefreshNextFrame = !1, this
    }, m.prototype.refresh = function (e) {
        return this.painter.refresh(e), this._needsRefreshNextFrame = !1, this
    }, m.prototype.refreshNextFrame = function () {
        return this._needsRefreshNextFrame = !0, this
    }, m.prototype.refreshHover = function (e) {
        return this.painter.refreshHover(e), this
    }, m.prototype.refreshShapes = function (e, t) {
        return this.painter.refreshShapes(e, t), this
    }, m.prototype.resize = function () {
        return this.painter.resize(), this
    }, m.prototype.animate = function (e, t, a) {
        if ("string" == typeof e && (e = this.storage.get(e)), e) {
            var o;
            if (t) {
                for (var r = t.split("."), s = e, l = 0, h = r.length; h > l; l++)s && (s = s[r[l]]);
                s && (o = s)
            } else o = e;
            if (!o)return void n('Property "' + t + '" is not existed in element ' + e.id);
            var d = this.animatingElements;
            return "undefined" == typeof e.__aniCount && (e.__aniCount = 0), 0 === e.__aniCount && d.push(e), e.__aniCount++, this.animation.animate(o, {loop: a}).done(function () {
                if (e.__aniCount--, 0 === e.__aniCount) {
                    var t = i.indexOf(d, e);
                    d.splice(t, 1)
                }
            })
        }
        n("Element not existed")
    }, m.prototype.clearAnimation = function () {
        this.animation.clear()
    }, m.prototype.showLoading = function (e) {
        return this.painter.showLoading(e), this
    }, m.prototype.hideLoading = function () {
        return this.painter.hideLoading(), this
    }, m.prototype.getWidth = function () {
        return this.painter.getWidth()
    }, m.prototype.getHeight = function () {
        return this.painter.getHeight()
    }, m.prototype.toDataURL = function (e, t, i) {
        return this.painter.toDataURL(e, t, i)
    }, m.prototype.shapeToImage = function (e, t, i) {
        var n = a();
        return this.painter.shapeToImage(n, e, t, i)
    }, m.prototype.on = function (e, t) {
        return this.handler.on(e, t), this
    }, m.prototype.un = function (e, t) {
        return this.handler.un(e, t), this
    }, m.prototype.trigger = function (e, t) {
        return this.handler.trigger(e, t), this
    }, m.prototype.clear = function () {
        return this.storage.delRoot(), this.painter.clear(), this
    }, m.prototype.dispose = function () {
        this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.animatingElements = this.storage = this.painter = this.handler = null, d.delInstance(this.id)
    }, d
}), define("zrender/config", [], function () {
    var e = {
        EVENT: {
            RESIZE: "resize",
            CLICK: "click",
            DBLCLICK: "dblclick",
            MOUSEWHEEL: "mousewheel",
            MOUSEMOVE: "mousemove",
            MOUSEOVER: "mouseover",
            MOUSEOUT: "mouseout",
            MOUSEDOWN: "mousedown",
            MOUSEUP: "mouseup",
            GLOBALOUT: "globalout",
            DRAGSTART: "dragstart",
            DRAGEND: "dragend",
            DRAGENTER: "dragenter",
            DRAGOVER: "dragover",
            DRAGLEAVE: "dragleave",
            DROP: "drop",
            touchClickDelay: 300
        }, catchBrushException: !1, debugMode: 0
    };
    return e
}), define("echarts/chart/island", ["require", "../component/base", "./base", "zrender/shape/Circle", "../config", "../util/ecData", "zrender/tool/util", "zrender/tool/event", "zrender/tool/color", "../util/accMath", "../chart"], function (e) {
    function t(e, t, a, o, s) {
        i.call(this, e, t, a, {}, s), n.call(this), this._nameConnector, this._valueConnector, this._zrHeight = this.zr.getHeight(), this._zrWidth = this.zr.getWidth();
        var h = this;
        h.shapeHandler.onmousewheel = function (e) {
            var t = e.target, i = e.event, n = l.getDelta(i);
            n = n > 0 ? -1 : 1, t.style.r -= n, t.style.r = t.style.r < 5 ? 5 : t.style.r;
            var a = r.get(t, "value"), o = a * h.option.island.calculateStep;
            a = o > 1 ? Math.round(a - o * n) : (a - o * n).toFixed(2) - 0;
            var s = r.get(t, "name");
            t.style.text = s + ":" + a, r.set(t, "value", a), r.set(t, "name", s), h.zr.modShape(t.id), h.zr.refresh(), l.stop(i)
        }
    }

    var i = e("../component/base"), n = e("./base"), a = e("zrender/shape/Circle"), o = e("../config"), r = e("../util/ecData"), s = e("zrender/tool/util"), l = e("zrender/tool/event");
    return t.prototype = {
        type: o.CHART_TYPE_ISLAND, _combine: function (t, i) {
            var n = e("zrender/tool/color"), a = e("../util/accMath"), o = a.accAdd(r.get(t, "value"), r.get(i, "value")), s = r.get(t, "name") + this._nameConnector + r.get(i, "name");
            t.style.text = s + this._valueConnector + o, r.set(t, "value", o), r.set(t, "name", s), t.style.r = this.option.island.r, t.style.color = n.mix(t.style.color, i.style.color)
        }, refresh: function (e) {
            e && (e.island = this.reformOption(e.island), this.option = e, this._nameConnector = this.option.nameConnector, this._valueConnector = this.option.valueConnector)
        }, getOption: function () {
            return this.option
        }, resize: function () {
            var e = this.zr.getWidth(), t = this.zr.getHeight(), i = e / (this._zrWidth || e), n = t / (this._zrHeight || t);
            if (1 !== i || 1 !== n) {
                this._zrWidth = e, this._zrHeight = t;
                for (var a = 0, o = this.shapeList.length; o > a; a++)this.zr.modShape(this.shapeList[a].id, {
                    style: {
                        x: Math.round(this.shapeList[a].style.x * i),
                        y: Math.round(this.shapeList[a].style.y * n)
                    }
                })
            }
        }, add: function (e) {
            var t = r.get(e, "name"), i = r.get(e, "value"), n = null != r.get(e, "series") ? r.get(e, "series").name : "", o = this.getFont(this.option.island.textStyle), s = {
                zlevel: this._zlevelBase,
                style: {
                    x: e.style.x,
                    y: e.style.y,
                    r: this.option.island.r,
                    color: e.style.color || e.style.strokeColor,
                    text: t + this._valueConnector + i,
                    textFont: o
                },
                draggable: !0,
                hoverable: !0,
                onmousewheel: this.shapeHandler.onmousewheel,
                _type: "island"
            };
            "#fff" === s.style.color && (s.style.color = e.style.strokeColor), this.setCalculable(s), s.dragEnableTime = 0, r.pack(s, {name: n}, -1, i, -1, t), s = new a(s), this.shapeList.push(s), this.zr.addShape(s)
        }, del: function (e) {
            this.zr.delShape(e.id);
            for (var t = [], i = 0, n = this.shapeList.length; n > i; i++)this.shapeList[i].id != e.id && t.push(this.shapeList[i]);
            this.shapeList = t
        }, ondrop: function (e, t) {
            if (this.isDrop && e.target) {
                var i = e.target, n = e.dragged;
                this._combine(i, n), this.zr.modShape(i.id), t.dragIn = !0, this.isDrop = !1
            }
        }, ondragend: function (e, t) {
            var i = e.target;
            this.isDragend ? t.dragIn && (this.del(i), t.needRefresh = !0) : t.dragIn || (i.style.x = l.getX(e.event), i.style.y = l.getY(e.event), this.add(i), t.needRefresh = !0), this.isDragend = !1
        }
    }, s.inherits(t, n), s.inherits(t, i), e("../chart").define("island", t), t
}), define("echarts/component/toolbox", ["require", "./base", "zrender/shape/Line", "zrender/shape/Image", "zrender/shape/Rectangle", "../util/shape/Icon", "../config", "zrender/tool/util", "zrender/config", "zrender/tool/event", "./dataView", "../component"], function (e) {
    function t(e, t, n, a, o) {
        i.call(this, e, t, n, a, o), this.dom = o.dom, this._magicType = {}, this._magicMap = {}, this._isSilence = !1, this._iconList, this._iconShapeMap = {}, this._featureTitle = {}, this._featureIcon = {}, this._featureColor = {}, this._featureOption = {}, this._enableColor = "red", this._disableColor = "#ccc", this._markShapeList = [];
        var r = this;
        r._onMark = function (e) {
            r.__onMark(e)
        }, r._onMarkUndo = function (e) {
            r.__onMarkUndo(e)
        }, r._onMarkClear = function (e) {
            r.__onMarkClear(e)
        }, r._onDataZoom = function (e) {
            r.__onDataZoom(e)
        }, r._onDataZoomReset = function (e) {
            r.__onDataZoomReset(e)
        }, r._onDataView = function (e) {
            r.__onDataView(e)
        }, r._onRestore = function (e) {
            r.__onRestore(e)
        }, r._onSaveAsImage = function (e) {
            r.__onSaveAsImage(e)
        }, r._onMagicType = function (e) {
            r.__onMagicType(e)
        }, r._onCustomHandler = function (e) {
            r.__onCustomHandler(e)
        }, r._onmousemove = function (e) {
            return r.__onmousemove(e)
        }, r._onmousedown = function (e) {
            return r.__onmousedown(e)
        }, r._onmouseup = function (e) {
            return r.__onmouseup(e)
        }, r._onclick = function (e) {
            return r.__onclick(e)
        }
    }

    var i = e("./base"), n = e("zrender/shape/Line"), a = e("zrender/shape/Image"), o = e("zrender/shape/Rectangle"), r = e("../util/shape/Icon"), s = e("../config"), l = e("zrender/tool/util"), h = e("zrender/config"), d = e("zrender/tool/event"), m = "stack", c = "tiled";
    return t.prototype = {
        type: s.COMPONENT_TYPE_TOOLBOX, _buildShape: function () {
            this._iconList = [];
            var e = this.option.toolbox;
            this._enableColor = e.effectiveColor, this._disableColor = e.disableColor;
            var t = e.feature, i = [];
            for (var n in t)if (t[n].show)switch (n) {
                case"mark":
                    i.push({key: n, name: "mark"}), i.push({key: n, name: "markUndo"}), i.push({
                        key: n,
                        name: "markClear"
                    });
                    break;
                case"magicType":
                    for (var a = 0, o = t[n].type.length; o > a; a++)t[n].title[t[n].type[a] + "Chart"] = t[n].title[t[n].type[a]], t[n].option && (t[n].option[t[n].type[a] + "Chart"] = t[n].option[t[n].type[a]]), i.push({
                        key: n,
                        name: t[n].type[a] + "Chart"
                    });
                    break;
                case"dataZoom":
                    i.push({key: n, name: "dataZoom"}), i.push({key: n, name: "dataZoomReset"});
                    break;
                case"saveAsImage":
                    this.canvasSupported && i.push({key: n, name: "saveAsImage"});
                    break;
                default:
                    i.push({key: n, name: n})
            }
            if (i.length > 0) {
                for (var r, n, a = 0, o = i.length; o > a; a++)r = i[a].name, n = i[a].key, this._iconList.push(r), this._featureTitle[r] = t[n].title[r] || t[n].title, t[n].icon && (this._featureIcon[r] = t[n].icon[r] || t[n].icon), t[n].color && (this._featureColor[r] = t[n].color[r] || t[n].color), t[n].option && (this._featureOption[r] = t[n].option[r] || t[n].option);
                this._itemGroupLocation = this._getItemGroupLocation(), this._buildBackground(), this._buildItem();
                for (var a = 0, o = this.shapeList.length; o > a; a++)this.zr.addShape(this.shapeList[a]);
                this._iconShapeMap.mark && (this._iconDisable(this._iconShapeMap.markUndo), this._iconDisable(this._iconShapeMap.markClear)), this._iconShapeMap.dataZoomReset && 0 === this._zoomQueue.length && this._iconDisable(this._iconShapeMap.dataZoomReset)
            }
        }, _buildItem: function () {
            var t, i, n, o, s = this.option.toolbox, l = this._iconList.length, h = this._itemGroupLocation.x, d = this._itemGroupLocation.y, m = s.itemSize, c = s.itemGap, p = s.color instanceof Array ? s.color : [s.color], u = this.getFont(s.textStyle);
            "horizontal" === s.orient ? (i = this._itemGroupLocation.y / this.zr.getHeight() < .5 ? "bottom" : "top", n = this._itemGroupLocation.x / this.zr.getWidth() < .5 ? "left" : "right", o = this._itemGroupLocation.y / this.zr.getHeight() < .5 ? "top" : "bottom") : i = this._itemGroupLocation.x / this.zr.getWidth() < .5 ? "right" : "left", this._iconShapeMap = {};
            for (var V = this, U = 0; l > U; U++) {
                switch (t = {
                    type: "icon",
                    zlevel: this._zlevelBase,
                    style: {
                        x: h,
                        y: d,
                        width: m,
                        height: m,
                        iconType: this._iconList[U],
                        lineWidth: 1,
                        strokeColor: this._featureColor[this._iconList[U]] || p[U % p.length],
                        brushType: "stroke"
                    },
                    highlightStyle: {
                        lineWidth: 1,
                        text: s.showTitle ? this._featureTitle[this._iconList[U]] : void 0,
                        textFont: u,
                        textPosition: i,
                        strokeColor: this._featureColor[this._iconList[U]] || p[U % p.length]
                    },
                    hoverable: !0,
                    clickable: !0
                }, this._featureIcon[this._iconList[U]] && (t.style.image = this._featureIcon[this._iconList[U]].replace(new RegExp("^image:\\/\\/"), ""), t.style.opacity = .8, t.highlightStyle.opacity = 1, t.type = "image"), "horizontal" === s.orient && (0 === U && "left" === n && (t.highlightStyle.textPosition = "specific", t.highlightStyle.textAlign = n, t.highlightStyle.textBaseline = o, t.highlightStyle.textX = h, t.highlightStyle.textY = "top" === o ? d + m + 10 : d - 10), U === l - 1 && "right" === n && (t.highlightStyle.textPosition = "specific", t.highlightStyle.textAlign = n, t.highlightStyle.textBaseline = o, t.highlightStyle.textX = h + m, t.highlightStyle.textY = "top" === o ? d + m + 10 : d - 10)), this._iconList[U]) {
                    case"mark":
                        t.onclick = V._onMark;
                        break;
                    case"markUndo":
                        t.onclick = V._onMarkUndo;
                        break;
                    case"markClear":
                        t.onclick = V._onMarkClear;
                        break;
                    case"dataZoom":
                        t.onclick = V._onDataZoom;
                        break;
                    case"dataZoomReset":
                        t.onclick = V._onDataZoomReset;
                        break;
                    case"dataView":
                        if (!this._dataView) {
                            var y = e("./dataView");
                            this._dataView = new y(this.ecTheme, this.messageCenter, this.zr, this.option, this.myChart)
                        }
                        t.onclick = V._onDataView;
                        break;
                    case"restore":
                        t.onclick = V._onRestore;
                        break;
                    case"saveAsImage":
                        t.onclick = V._onSaveAsImage;
                        break;
                    default:
                        this._iconList[U].match("Chart") ? (t._name = this._iconList[U].replace("Chart", ""), t.onclick = V._onMagicType) : t.onclick = V._onCustomHandler
                }
                "icon" === t.type ? t = new r(t) : "image" === t.type && (t = new a(t)), this.shapeList.push(t), this._iconShapeMap[this._iconList[U]] = t, "horizontal" === s.orient ? h += m + c : d += m + c
            }
        }, _buildBackground: function () {
            var e = this.option.toolbox, t = this.reformCssArray(this.option.toolbox.padding);
            this.shapeList.push(new o({
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: this._itemGroupLocation.x - t[3],
                    y: this._itemGroupLocation.y - t[0],
                    width: this._itemGroupLocation.width + t[3] + t[1],
                    height: this._itemGroupLocation.height + t[0] + t[2],
                    brushType: 0 === e.borderWidth ? "fill" : "both",
                    color: e.backgroundColor,
                    strokeColor: e.borderColor,
                    lineWidth: e.borderWidth
                }
            }))
        }, _getItemGroupLocation: function () {
            var e = this.option.toolbox, t = this.reformCssArray(this.option.toolbox.padding), i = this._iconList.length, n = e.itemGap, a = e.itemSize, o = 0, r = 0;
            "horizontal" === e.orient ? (o = (a + n) * i - n, r = a) : (r = (a + n) * i - n, o = a);
            var s, l = this.zr.getWidth();
            switch (e.x) {
                case"center":
                    s = Math.floor((l - o) / 2);
                    break;
                case"left":
                    s = t[3] + e.borderWidth;
                    break;
                case"right":
                    s = l - o - t[1] - e.borderWidth;
                    break;
                default:
                    s = e.x - 0, s = isNaN(s) ? 0 : s
            }
            var h, d = this.zr.getHeight();
            switch (e.y) {
                case"top":
                    h = t[0] + e.borderWidth;
                    break;
                case"bottom":
                    h = d - r - t[2] - e.borderWidth;
                    break;
                case"center":
                    h = Math.floor((d - r) / 2);
                    break;
                default:
                    h = e.y - 0, h = isNaN(h) ? 0 : h
            }
            return {x: s, y: h, width: o, height: r}
        }, __onmousemove: function (e) {
            this._marking && (this._markShape.style.xEnd = d.getX(e.event), this._markShape.style.yEnd = d.getY(e.event), this.zr.addHoverShape(this._markShape)), this._zooming && (this._zoomShape.style.width = d.getX(e.event) - this._zoomShape.style.x, this._zoomShape.style.height = d.getY(e.event) - this._zoomShape.style.y, this.zr.addHoverShape(this._zoomShape), this.dom.style.cursor = "crosshair"), this._zoomStart && "pointer" != this.dom.style.cursor && "move" != this.dom.style.cursor && (this.dom.style.cursor = "crosshair")
        }, __onmousedown: function (e) {
            if (!e.target) {
                this._zooming = !0;
                var t = d.getX(e.event), i = d.getY(e.event), n = this.option.dataZoom || {};
                return this._zoomShape = new o({
                    zlevel: this._zlevelBase,
                    style: {x: t, y: i, width: 1, height: 1, brushType: "both"},
                    highlightStyle: {
                        lineWidth: 2,
                        color: n.fillerColor || s.dataZoom.fillerColor,
                        strokeColor: n.handleColor || s.dataZoom.handleColor,
                        brushType: "both"
                    }
                }), this.zr.addHoverShape(this._zoomShape), !0
            }
        }, __onmouseup: function () {
            if (!this._zoomShape || Math.abs(this._zoomShape.style.width) < 10 || Math.abs(this._zoomShape.style.height) < 10)return this._zooming = !1, !0;
            if (this._zooming && this.component.dataZoom) {
                this._zooming = !1;
                var e = this.component.dataZoom.rectZoom(this._zoomShape.style);
                e && (this._zoomQueue.push({
                    start: e.start,
                    end: e.end,
                    start2: e.start2,
                    end2: e.end2
                }), this._iconEnable(this._iconShapeMap.dataZoomReset), this.zr.refresh())
            }
            return !0
        }, __onclick: function (e) {
            if (!e.target)if (this._marking)this._marking = !1, this._markShapeList.push(this._markShape), this._iconEnable(this._iconShapeMap.markUndo), this._iconEnable(this._iconShapeMap.markClear), this.zr.addShape(this._markShape), this.zr.refresh(); else if (this._markStart) {
                this._marking = !0;
                var t = d.getX(e.event), i = d.getY(e.event);
                this._markShape = new n({
                    zlevel: this._zlevelBase,
                    style: {
                        xStart: t,
                        yStart: i,
                        xEnd: t,
                        yEnd: i,
                        lineWidth: this.query(this.option, "toolbox.feature.mark.lineStyle.width"),
                        strokeColor: this.query(this.option, "toolbox.feature.mark.lineStyle.color"),
                        lineType: this.query(this.option, "toolbox.feature.mark.lineStyle.type")
                    }
                }), this.zr.addHoverShape(this._markShape)
            }
        }, __onMark: function (e) {
            var t = e.target;
            if (this._marking || this._markStart)this._resetMark(), this.zr.refresh(); else {
                this._resetZoom(), this.zr.modShape(t.id, {style: {strokeColor: this._enableColor}}), this.zr.refresh(), this._markStart = !0;
                var i = this;
                setTimeout(function () {
                    i.zr && i.zr.on(h.EVENT.CLICK, i._onclick) && i.zr.on(h.EVENT.MOUSEMOVE, i._onmousemove)
                }, 10)
            }
            return !0
        }, __onMarkUndo: function () {
            if (this._marking)this._marking = !1; else {
                var e = this._markShapeList.length;
                if (e >= 1) {
                    var t = this._markShapeList[e - 1];
                    this.zr.delShape(t.id), this.zr.refresh(), this._markShapeList.pop(), 1 === e && (this._iconDisable(this._iconShapeMap.markUndo), this._iconDisable(this._iconShapeMap.markClear))
                }
            }
            return !0
        }, __onMarkClear: function () {
            this._marking && (this._marking = !1);
            var e = this._markShapeList.length;
            if (e > 0) {
                for (; e--;)this.zr.delShape(this._markShapeList.pop().id);
                this._iconDisable(this._iconShapeMap.markUndo), this._iconDisable(this._iconShapeMap.markClear), this.zr.refresh()
            }
            return !0
        }, __onDataZoom: function (e) {
            var t = e.target;
            if (this._zooming || this._zoomStart)this._resetZoom(), this.zr.refresh(), this.dom.style.cursor = "default"; else {
                this._resetMark(), this.zr.modShape(t.id, {style: {strokeColor: this._enableColor}}), this.zr.refresh(), this._zoomStart = !0;
                var i = this;
                setTimeout(function () {
                    i.zr && i.zr.on(h.EVENT.MOUSEDOWN, i._onmousedown) && i.zr.on(h.EVENT.MOUSEUP, i._onmouseup) && i.zr.on(h.EVENT.MOUSEMOVE, i._onmousemove)
                }, 10), this.dom.style.cursor = "crosshair"
            }
            return !0
        }, __onDataZoomReset: function () {
            return this._zooming && (this._zooming = !1), this._zoomQueue.pop(), this._zoomQueue.length > 0 ? this.component.dataZoom.absoluteZoom(this._zoomQueue[this._zoomQueue.length - 1]) : (this.component.dataZoom.rectZoom(), this._iconDisable(this._iconShapeMap.dataZoomReset), this.zr.refresh()), !0
        }, _resetMark: function () {
            this._marking = !1, this._markStart && (this._markStart = !1, this._iconShapeMap.mark && this.zr.modShape(this._iconShapeMap.mark.id, {style: {strokeColor: this._iconShapeMap.mark.highlightStyle.strokeColor}}), this.zr.un(h.EVENT.CLICK, this._onclick), this.zr.un(h.EVENT.MOUSEMOVE, this._onmousemove))
        }, _resetZoom: function () {
            this._zooming = !1, this._zoomStart && (this._zoomStart = !1, this._iconShapeMap.dataZoom && this.zr.modShape(this._iconShapeMap.dataZoom.id, {style: {strokeColor: this._iconShapeMap.dataZoom.highlightStyle.strokeColor}}), this.zr.un(h.EVENT.MOUSEDOWN, this._onmousedown), this.zr.un(h.EVENT.MOUSEUP, this._onmouseup), this.zr.un(h.EVENT.MOUSEMOVE, this._onmousemove))
        }, _iconDisable: function (e) {
            "image" != e.type ? this.zr.modShape(e.id, {
                hoverable: !1,
                clickable: !1,
                style: {strokeColor: this._disableColor}
            }) : this.zr.modShape(e.id, {hoverable: !1, clickable: !1, style: {opacity: .3}})
        }, _iconEnable: function (e) {
            "image" != e.type ? this.zr.modShape(e.id, {
                hoverable: !0,
                clickable: !0,
                style: {strokeColor: e.highlightStyle.strokeColor}
            }) : this.zr.modShape(e.id, {hoverable: !0, clickable: !0, style: {opacity: .8}})
        }, __onDataView: function () {
            return this._dataView.show(this.option), !0
        }, __onRestore: function () {
            return this._resetMark(), this._resetZoom(), this.messageCenter.dispatch(s.EVENT.RESTORE, null, null, this.myChart), !0
        }, __onSaveAsImage: function () {
            var e = this.option.toolbox.feature.saveAsImage, t = e.type || "png";
            "png" != t && "jpeg" != t && (t = "png");
            var i;
            i = this.myChart.isConnected() ? this.myChart.getConnectedDataURL(t) : this.zr.toDataURL("image/" + t, this.option.backgroundColor && "rgba(0,0,0,0)" === this.option.backgroundColor.replace(" ", "") ? "#fff" : this.option.backgroundColor);
            var n = document.createElement("div");
            n.id = "__echarts_download_wrap__", n.style.cssText = "position:fixed;z-index:99999;display:block;top:0;left:0;background-color:rgba(33,33,33,0.5);text-align:center;width:100%;height:100%;line-height:" + document.documentElement.clientHeight + "px;";
            var a = document.createElement("a");
            a.href = i, a.setAttribute("download", (e.name ? e.name : this.option.title && (this.option.title.text || this.option.title.subtext) ? this.option.title.text || this.option.title.subtext : "ECharts") + "." + t), a.innerHTML = '<img style="vertical-align:middle" src="' + i + '" title="' + (window.attachEvent && -1 === navigator.userAgent.indexOf("Opera") ? "右键->图片另存为" : e.lang ? e.lang[0] : "点击保存") + '"/>', n.appendChild(a), document.body.appendChild(n), a = null, n = null, setTimeout(function () {
                var e = document.getElementById("__echarts_download_wrap__");
                e && (e.onclick = function () {
                    var e = document.getElementById("__echarts_download_wrap__");
                    e.onclick = null, e.innerHTML = "", document.body.removeChild(e), e = null
                }, e = null)
            }, 500)
        }, __onMagicType: function (e) {
            this._resetMark();
            var t = e.target._name;
            return this._magicType[t] || (this._magicType[t] = !0, t === s.CHART_TYPE_LINE ? this._magicType[s.CHART_TYPE_BAR] = !1 : t === s.CHART_TYPE_BAR && (this._magicType[s.CHART_TYPE_LINE] = !1), t === s.CHART_TYPE_PIE ? this._magicType[s.CHART_TYPE_FUNNEL] = !1 : t === s.CHART_TYPE_FUNNEL && (this._magicType[s.CHART_TYPE_PIE] = !1), t === s.CHART_TYPE_FORCE ? this._magicType[s.CHART_TYPE_CHORD] = !1 : t === s.CHART_TYPE_CHORD && (this._magicType[s.CHART_TYPE_FORCE] = !1), t === m ? this._magicType[c] = !1 : t === c && (this._magicType[m] = !1), this.messageCenter.dispatch(s.EVENT.MAGIC_TYPE_CHANGED, e.event, {magicType: this._magicType}, this.myChart)), !0
        }, setMagicType: function (e) {
            this._resetMark(), this._magicType = e, !this._isSilence && this.messageCenter.dispatch(s.EVENT.MAGIC_TYPE_CHANGED, null, {magicType: this._magicType}, this.myChart)
        }, __onCustomHandler: function (e) {
            var t = e.target.style.iconType, i = this.option.toolbox.feature[t].onclick;
            "function" == typeof i && i.call(this, this.option)
        }, reset: function (e, t) {
            if (t && this.clear(), this.query(e, "toolbox.show") && this.query(e, "toolbox.feature.magicType.show")) {
                var i = e.toolbox.feature.magicType.type, n = i.length;
                for (this._magicMap = {}; n--;)this._magicMap[i[n]] = !0;
                n = e.series.length;
                for (var a, o; n--;)a = e.series[n].type, this._magicMap[a] && (o = e.xAxis instanceof Array ? e.xAxis[e.series[n].xAxisIndex || 0] : e.xAxis, o && "category" === (o.type || "category") && (o.__boundaryGap = null != o.boundaryGap ? o.boundaryGap : !0), o = e.yAxis instanceof Array ? e.yAxis[e.series[n].yAxisIndex || 0] : e.yAxis, o && "category" === o.type && (o.__boundaryGap = null != o.boundaryGap ? o.boundaryGap : !0), e.series[n].__type = a, e.series[n].__itemStyle = l.clone(e.series[n].itemStyle || {})), (this._magicMap[m] || this._magicMap[c]) && (e.series[n].__stack = e.series[n].stack)
            }
            this._magicType = t ? {} : this._magicType || {};
            for (var r in this._magicType)if (this._magicType[r]) {
                this.option = e, this.getMagicOption();
                break
            }
            var s = e.dataZoom;
            if (s && s.show) {
                var h = null != s.start && s.start >= 0 && s.start <= 100 ? s.start : 0, d = null != s.end && s.end >= 0 && s.end <= 100 ? s.end : 100;
                h > d && (h += d, d = h - d, h -= d), this._zoomQueue = [{start: h, end: d, start2: 0, end2: 100}]
            } else this._zoomQueue = []
        }, getMagicOption: function () {
            var e, t;
            if (this._magicType[s.CHART_TYPE_LINE] || this._magicType[s.CHART_TYPE_BAR]) {
                for (var i = this._magicType[s.CHART_TYPE_LINE] ? !1 : !0, n = 0, a = this.option.series.length; a > n; n++)t = this.option.series[n].type, (t == s.CHART_TYPE_LINE || t == s.CHART_TYPE_BAR) && (e = this.option.xAxis instanceof Array ? this.option.xAxis[this.option.series[n].xAxisIndex || 0] : this.option.xAxis, e && "category" === (e.type || "category") && (e.boundaryGap = i ? !0 : e.__boundaryGap), e = this.option.yAxis instanceof Array ? this.option.yAxis[this.option.series[n].yAxisIndex || 0] : this.option.yAxis, e && "category" === e.type && (e.boundaryGap = i ? !0 : e.__boundaryGap));
                this._defaultMagic(s.CHART_TYPE_LINE, s.CHART_TYPE_BAR)
            }
            if (this._defaultMagic(s.CHART_TYPE_CHORD, s.CHART_TYPE_FORCE), this._defaultMagic(s.CHART_TYPE_PIE, s.CHART_TYPE_FUNNEL), this._magicType[m] || this._magicType[c])for (var n = 0, a = this.option.series.length; a > n; n++)this._magicType[m] ? (this.option.series[n].stack = "_ECHARTS_STACK_KENER_2014_", t = m) : this._magicType[c] && (this.option.series[n].stack = null, t = c), this._featureOption[t + "Chart"] && l.merge(this.option.series[n], this._featureOption[t + "Chart"] || {}, !0);
            return this.option
        }, _defaultMagic: function (e, t) {
            if (this._magicType[e] || this._magicType[t])for (var i = 0, n = this.option.series.length; n > i; i++) {
                var a = this.option.series[i].type;
                (a == e || a == t) && (this.option.series[i].type = this._magicType[e] ? e : t, this.option.series[i].itemStyle = l.clone(this.option.series[i].__itemStyle), a = this.option.series[i].type, this._featureOption[a + "Chart"] && l.merge(this.option.series[i], this._featureOption[a + "Chart"] || {}, !0))
            }
        }, silence: function (e) {
            this._isSilence = e
        }, resize: function () {
            this._resetMark(), this.clear(), this.option && this.option.toolbox && this.option.toolbox.show && this._buildShape(), this._dataView && this._dataView.resize()
        }, hideDataView: function () {
            this._dataView && this._dataView.hide()
        }, clear: function (e) {
            this.zr && (this.zr.delShape(this.shapeList), this.shapeList = [], e || (this.zr.delShape(this._markShapeList), this._markShapeList = []))
        }, onbeforDispose: function () {
            this._dataView && (this._dataView.dispose(), this._dataView = null), this._markShapeList = null
        }, refresh: function (e) {
            e && (this._resetMark(), this._resetZoom(), e.toolbox = this.reformOption(e.toolbox), this.option = e, this.clear(!0), e.toolbox.show && this._buildShape(), this.hideDataView())
        }
    }, l.inherits(t, i), e("../component").define("toolbox", t), t
}), define("echarts/component", [], function () {
    var e = {}, t = {};
    return e.define = function (i, n) {
        return t[i] = n, e
    }, e.get = function (e) {
        return t[e]
    }, e
}), define("echarts/component/title", ["require", "./base", "zrender/shape/Text", "zrender/shape/Rectangle", "../config", "zrender/tool/util", "zrender/tool/area", "zrender/tool/color", "../component"], function (e) {
    function t(e, t, n, a, o) {
        i.call(this, e, t, n, a, o), this.refresh(a)
    }

    var i = e("./base"), n = e("zrender/shape/Text"), a = e("zrender/shape/Rectangle"), o = e("../config"), r = e("zrender/tool/util"), s = e("zrender/tool/area"), l = e("zrender/tool/color");
    return t.prototype = {
        type: o.COMPONENT_TYPE_TITLE, _buildShape: function () {
            this._itemGroupLocation = this._getItemGroupLocation(), this._buildBackground(), this._buildItem();
            for (var e = 0, t = this.shapeList.length; t > e; e++)this.zr.addShape(this.shapeList[e])
        }, _buildItem: function () {
            var e = this.titleOption.text, t = this.titleOption.link, i = this.titleOption.target, a = this.titleOption.subtext, o = this.titleOption.sublink, r = this.titleOption.subtarget, s = this.getFont(this.titleOption.textStyle), h = this.getFont(this.titleOption.subtextStyle), d = this._itemGroupLocation.x, m = this._itemGroupLocation.y, c = this._itemGroupLocation.width, p = this._itemGroupLocation.height, u = {
                zlevel: this._zlevelBase,
                style: {y: m, color: this.titleOption.textStyle.color, text: e, textFont: s, textBaseline: "top"},
                highlightStyle: {color: l.lift(this.titleOption.textStyle.color, 1), brushType: "fill"},
                hoverable: !1
            };
            t && (u.hoverable = !0, u.clickable = !0, u.onclick = function () {
                i && "self" == i ? window.location = t : window.open(t)
            });
            var V = {
                zlevel: this._zlevelBase,
                style: {
                    y: m + p,
                    color: this.titleOption.subtextStyle.color,
                    text: a,
                    textFont: h,
                    textBaseline: "bottom"
                },
                highlightStyle: {color: l.lift(this.titleOption.subtextStyle.color, 1), brushType: "fill"},
                hoverable: !1
            };
            switch (o && (V.hoverable = !0, V.clickable = !0, V.onclick = function () {
                r && "self" == r ? window.location = o : window.open(o)
            }), this.titleOption.x) {
                case"center":
                    u.style.x = V.style.x = d + c / 2, u.style.textAlign = V.style.textAlign = "center";
                    break;
                case"left":
                    u.style.x = V.style.x = d, u.style.textAlign = V.style.textAlign = "left";
                    break;
                case"right":
                    u.style.x = V.style.x = d + c, u.style.textAlign = V.style.textAlign = "right";
                    break;
                default:
                    d = this.titleOption.x - 0, d = isNaN(d) ? 0 : d, u.style.x = V.style.x = d
            }
            this.titleOption.textAlign && (u.style.textAlign = V.style.textAlign = this.titleOption.textAlign), this.shapeList.push(new n(u)), "" !== a && this.shapeList.push(new n(V))
        }, _buildBackground: function () {
            var e = this.reformCssArray(this.titleOption.padding);
            this.shapeList.push(new a({
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: this._itemGroupLocation.x - e[3],
                    y: this._itemGroupLocation.y - e[0],
                    width: this._itemGroupLocation.width + e[3] + e[1],
                    height: this._itemGroupLocation.height + e[0] + e[2],
                    brushType: 0 === this.titleOption.borderWidth ? "fill" : "both",
                    color: this.titleOption.backgroundColor,
                    strokeColor: this.titleOption.borderColor,
                    lineWidth: this.titleOption.borderWidth
                }
            }))
        }, _getItemGroupLocation: function () {
            var e, t = this.reformCssArray(this.titleOption.padding), i = this.titleOption.text, n = this.titleOption.subtext, a = this.getFont(this.titleOption.textStyle), o = this.getFont(this.titleOption.subtextStyle), r = Math.max(s.getTextWidth(i, a), s.getTextWidth(n, o)), l = s.getTextHeight(i, a) + ("" === n ? 0 : this.titleOption.itemGap + s.getTextHeight(n, o)), h = this.zr.getWidth();
            switch (this.titleOption.x) {
                case"center":
                    e = Math.floor((h - r) / 2);
                    break;
                case"left":
                    e = t[3] + this.titleOption.borderWidth;
                    break;
                case"right":
                    e = h - r - t[1] - this.titleOption.borderWidth;
                    break;
                default:
                    e = this.titleOption.x - 0, e = isNaN(e) ? 0 : e
            }
            var d, m = this.zr.getHeight();
            switch (this.titleOption.y) {
                case"top":
                    d = t[0] + this.titleOption.borderWidth;
                    break;
                case"bottom":
                    d = m - l - t[2] - this.titleOption.borderWidth;
                    break;
                case"center":
                    d = Math.floor((m - l) / 2);
                    break;
                default:
                    d = this.titleOption.y - 0, d = isNaN(d) ? 0 : d
            }
            return {x: e, y: d, width: r, height: l}
        }, refresh: function (e) {
            e && (this.option = e, this.option.title = this.reformOption(this.option.title), this.titleOption = this.option.title, this.titleOption.textStyle = r.merge(this.titleOption.textStyle, this.ecTheme.textStyle), this.titleOption.subtextStyle = r.merge(this.titleOption.subtextStyle, this.ecTheme.textStyle)), this.clear(), this._buildShape()
        }
    }, r.inherits(t, i), e("../component").define("title", t), t
}), define("echarts/component/tooltip", ["require", "./base", "../util/shape/Cross", "zrender/shape/Line", "zrender/shape/Rectangle", "../config", "../util/ecData", "zrender/config", "zrender/tool/event", "zrender/tool/area", "zrender/tool/color", "zrender/tool/util", "zrender/shape/Base", "../component"], function (e) {
    function t(e, t, o, r, s) {
        i.call(this, e, t, o, r, s), this.dom = s.dom;
        var l = this;
        l._onmousemove = function (e) {
            return l.__onmousemove(e)
        }, l._onglobalout = function (e) {
            return l.__onglobalout(e)
        }, this.zr.on(h.EVENT.MOUSEMOVE, l._onmousemove), this.zr.on(h.EVENT.GLOBALOUT, l._onglobalout), l._hide = function (e) {
            return l.__hide(e)
        }, l._tryShow = function (e) {
            return l.__tryShow(e)
        }, l._refixed = function (e) {
            return l.__refixed(e)
        }, l._setContent = function (e, t) {
            return l.__setContent(e, t)
        }, this._tDom = this._tDom || document.createElement("div"), this._tDom.onselectstart = function () {
            return !1
        }, this._tDom.onmouseover = function () {
            l._mousein = !0
        }, this._tDom.onmouseout = function () {
            l._mousein = !1
        }, this._tDom.style.position = "absolute", this.hasAppend = !1, this._axisLineShape && this.zr.delShape(this._axisLineShape.id), this._axisLineShape = new a({
            zlevel: this._zlevelBase,
            invisible: !0,
            hoverable: !1
        }), this.shapeList.push(this._axisLineShape), this.zr.addShape(this._axisLineShape), this._axisShadowShape && this.zr.delShape(this._axisShadowShape.id), this._axisShadowShape = new a({
            zlevel: 1,
            invisible: !0,
            hoverable: !1
        }), this.shapeList.push(this._axisShadowShape), this.zr.addShape(this._axisShadowShape), this._axisCrossShape && this.zr.delShape(this._axisCrossShape.id), this._axisCrossShape = new n({
            zlevel: this._zlevelBase,
            invisible: !0,
            hoverable: !1
        }), this.shapeList.push(this._axisCrossShape), this.zr.addShape(this._axisCrossShape), this.showing = !1, this.refresh(r)
    }

    var i = e("./base"), n = e("../util/shape/Cross"), a = e("zrender/shape/Line"), o = e("zrender/shape/Rectangle"), r = new o({}), s = e("../config"), l = e("../util/ecData"), h = e("zrender/config"), d = e("zrender/tool/event"), m = e("zrender/tool/area"), c = e("zrender/tool/color"), p = e("zrender/tool/util"), u = e("zrender/shape/Base");
    return t.prototype = {
        type: s.COMPONENT_TYPE_TOOLTIP,
        _gCssText: "position:absolute;display:block;border-style:solid;white-space:nowrap;",
        _style: function (e) {
            if (!e)return "";
            var t = [];
            if (e.transitionDuration) {
                var i = "left " + e.transitionDuration + "s,top " + e.transitionDuration + "s";
                t.push("transition:" + i), t.push("-moz-transition:" + i), t.push("-webkit-transition:" + i), t.push("-o-transition:" + i)
            }
            e.backgroundColor && (t.push("background-Color:" + c.toHex(e.backgroundColor)), t.push("filter:alpha(opacity=70)"), t.push("background-Color:" + e.backgroundColor)), null != e.borderWidth && t.push("border-width:" + e.borderWidth + "px"), null != e.borderColor && t.push("border-color:" + e.borderColor), null != e.borderRadius && (t.push("border-radius:" + e.borderRadius + "px"), t.push("-moz-border-radius:" + e.borderRadius + "px"), t.push("-webkit-border-radius:" + e.borderRadius + "px"), t.push("-o-border-radius:" + e.borderRadius + "px"));
            var n = e.textStyle;
            n && (n.color && t.push("color:" + n.color), n.decoration && t.push("text-decoration:" + n.decoration), n.align && t.push("text-align:" + n.align), n.fontFamily && t.push("font-family:" + n.fontFamily), n.fontSize && t.push("font-size:" + n.fontSize + "px"), n.fontSize && t.push("line-height:" + Math.round(3 * n.fontSize / 2) + "px"), n.fontStyle && t.push("font-style:" + n.fontStyle), n.fontWeight && t.push("font-weight:" + n.fontWeight));
            var a = e.padding;
            return null != a && (a = this.reformCssArray(a), t.push("padding:" + a[0] + "px " + a[1] + "px " + a[2] + "px " + a[3] + "px")), t = t.join(";") + ";"
        },
        __hide: function () {
            this._lastDataIndex = -1, this._lastSeriesIndex = -1, this._lastItemTriggerId = -1, this._tDom && (this._tDom.style.display = "none");
            var e = !1;
            this._axisLineShape.invisible || (this._axisLineShape.invisible = !0, this.zr.modShape(this._axisLineShape.id), e = !0), this._axisShadowShape.invisible || (this._axisShadowShape.invisible = !0, this.zr.modShape(this._axisShadowShape.id), e = !0), this._axisCrossShape.invisible || (this._axisCrossShape.invisible = !0, this.zr.modShape(this._axisCrossShape.id), e = !0), this._lastTipShape && this._lastTipShape.tipShape.length > 0 && (this.zr.delShape(this._lastTipShape.tipShape), this._lastTipShape = !1, this.shapeList.length = 2), e && this.zr.refresh(), this.showing = !1
        },
        _show: function (e, t, i, n) {
            var a = this._tDom.offsetHeight, o = this._tDom.offsetWidth;
            e && ("function" == typeof e && (e = e([t, i])), e instanceof Array && (t = e[0], i = e[1])), t + o > this._zrWidth && (t -= o + 40), i + a > this._zrHeight && (i -= a - 20), 20 > i && (i = 0), this._tDom.style.cssText = this._gCssText + this._defaultCssText + (n ? n : "") + "left:" + t + "px;top:" + i + "px;", (10 > a || 10 > o) && setTimeout(this._refixed, 20), this.showing = !0
        },
        __refixed: function () {
            if (this._tDom) {
                var e = "", t = this._tDom.offsetHeight, i = this._tDom.offsetWidth;
                this._tDom.offsetLeft + i > this._zrWidth && (e += "left:" + (this._zrWidth - i - 20) + "px;"), this._tDom.offsetTop + t > this._zrHeight && (e += "top:" + (this._zrHeight - t - 10) + "px;"), "" !== e && (this._tDom.style.cssText += e)
            }
        },
        __tryShow: function () {
            var e, t;
            if (this._curTarget) {
                if ("island" === this._curTarget._type && this.option.tooltip.show)return void this._showItemTrigger();
                var i = l.get(this._curTarget, "series"), n = l.get(this._curTarget, "data");
                e = this.deepQuery([n, i, this.option], "tooltip.show"), null != i && null != n && e ? (t = this.deepQuery([n, i, this.option], "tooltip.trigger"), "axis" === t ? this._showAxisTrigger(i.xAxisIndex, i.yAxisIndex, l.get(this._curTarget, "dataIndex")) : this._showItemTrigger()) : (clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), this._hidingTicket = setTimeout(this._hide, this._hideDelay))
            } else this._findPolarTrigger() || this._findAxisTrigger()
        },
        _findAxisTrigger: function () {
            if (!this.component.xAxis || !this.component.yAxis)return void(this._hidingTicket = setTimeout(this._hide, this._hideDelay));
            for (var e, t, i = this.option.series, n = 0, a = i.length; a > n; n++)if ("axis" === this.deepQuery([i[n], this.option], "tooltip.trigger"))return e = i[n].xAxisIndex || 0, t = i[n].yAxisIndex || 0, this.component.xAxis.getAxis(e) && this.component.xAxis.getAxis(e).type === s.COMPONENT_TYPE_AXIS_CATEGORY ? void this._showAxisTrigger(e, t, this._getNearestDataIndex("x", this.component.xAxis.getAxis(e))) : this.component.yAxis.getAxis(t) && this.component.yAxis.getAxis(t).type === s.COMPONENT_TYPE_AXIS_CATEGORY ? void this._showAxisTrigger(e, t, this._getNearestDataIndex("y", this.component.yAxis.getAxis(t))) : void this._showAxisTrigger(e, t, -1);
            "cross" === this.option.tooltip.axisPointer.type && this._showAxisTrigger(-1, -1, -1)
        },
        _findPolarTrigger: function () {
            if (!this.component.polar)return !1;
            var e, t = d.getX(this._event), i = d.getY(this._event), n = this.component.polar.getNearestIndex([t, i]);
            return n ? (e = n.valueIndex, n = n.polarIndex) : n = -1, -1 != n ? this._showPolarTrigger(n, e) : !1
        },
        _getNearestDataIndex: function (e, t) {
            var i = -1, n = d.getX(this._event), a = d.getY(this._event);
            if ("x" === e) {
                for (var o, r, s = this.component.grid.getXend(), l = t.getCoordByIndex(i); s > l && (r = l, n >= l);)o = l, l = t.getCoordByIndex(++i);
                return 0 >= i ? i = 0 : r - n >= n - o ? i -= 1 : null == t.getNameByIndex(i) && (i -= 1), i
            }
            for (var h, m, c = this.component.grid.getY(), l = t.getCoordByIndex(i); l > c && (h = l, l >= a);)m = l, l = t.getCoordByIndex(++i);
            return 0 >= i ? i = 0 : a - h >= m - a ? i -= 1 : null == t.getNameByIndex(i) && (i -= 1), i
        },
        _showAxisTrigger: function (e, t, i) {
            if (!this._event.connectTrigger && this.messageCenter.dispatch(s.EVENT.TOOLTIP_IN_GRID, this._event, null, this.myChart), null == this.component.xAxis || null == this.component.yAxis || null == e || null == t)return clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), void(this._hidingTicket = setTimeout(this._hide, this._hideDelay));
            var n, a, o, r, l = this.option.series, h = [], m = [], c = "";
            if ("axis" === this.option.tooltip.trigger) {
                if (!this.option.tooltip.show)return;
                a = this.option.tooltip.formatter, o = this.option.tooltip.position
            }
            var p, u, V = -1 != e && this.component.xAxis.getAxis(e).type === s.COMPONENT_TYPE_AXIS_CATEGORY ? "xAxis" : -1 != t && this.component.yAxis.getAxis(t).type === s.COMPONENT_TYPE_AXIS_CATEGORY ? "yAxis" : !1;
            if (V) {
                var U = "xAxis" == V ? e : t;
                n = this.component[V].getAxis(U);
                for (var y = 0, g = l.length; g > y; y++)this._isSelected(l[y].name) && l[y][V + "Index"] === U && "axis" === this.deepQuery([l[y], this.option], "tooltip.trigger") && (r = this.query(l[y], "tooltip.showContent") || r, a = this.query(l[y], "tooltip.formatter") || a, o = this.query(l[y], "tooltip.position") || o, c += this._style(this.query(l[y], "tooltip")), null != l[y].stack && "xAxis" == V ? (h.unshift(l[y]), m.unshift(y)) : (h.push(l[y]), m.push(y)));
                this.messageCenter.dispatch(s.EVENT.TOOLTIP_HOVER, this._event, {
                    seriesIndex: m,
                    dataIndex: i
                }, this.myChart);
                var f;
                "xAxis" == V ? (p = this.subPixelOptimize(n.getCoordByIndex(i), this._axisLineWidth), u = d.getY(this._event), f = [p, this.component.grid.getY(), p, this.component.grid.getYend()]) : (p = d.getX(this._event), u = this.subPixelOptimize(n.getCoordByIndex(i), this._axisLineWidth), f = [this.component.grid.getX(), u, this.component.grid.getXend(), u]), this._styleAxisPointer(h, f[0], f[1], f[2], f[3], n.getGap(), p, u)
            } else p = d.getX(this._event), u = d.getY(this._event), this._styleAxisPointer(l, this.component.grid.getX(), u, this.component.grid.getXend(), u, 0, p, u), i >= 0 ? this._showItemTrigger(!0) : (clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), this._tDom.style.display = "none");
            if (h.length > 0) {
                if (this._lastDataIndex != i || this._lastSeriesIndex != m[0]) {
                    this._lastDataIndex = i, this._lastSeriesIndex = m[0];
                    var b, _;
                    if ("function" == typeof a) {
                        for (var x = [], y = 0, g = h.length; g > y; y++)b = h[y].data[i], _ = null != b ? null != b.value ? b.value : b : "-", x.push({
                            seriesIndex: m[y],
                            seriesName: h[y].name || "",
                            series: h[y],
                            dataIndex: i,
                            data: b,
                            name: n.getNameByIndex(i),
                            value: _,
                            0: h[y].name || "",
                            1: n.getNameByIndex(i),
                            2: _,
                            3: b
                        });
                        this._curTicket = "axis:" + i, this._tDom.innerHTML = a.call(this.myChart, x, this._curTicket, this._setContent)
                    } else if ("string" == typeof a) {
                        this._curTicket = 0 / 0, a = a.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}");
                        for (var y = 0, g = h.length; g > y; y++)a = a.replace("{a" + y + "}", this._encodeHTML(h[y].name || "")), a = a.replace("{b" + y + "}", this._encodeHTML(n.getNameByIndex(i))), b = h[y].data[i], b = null != b ? null != b.value ? b.value : b : "-", a = a.replace("{c" + y + "}", b instanceof Array ? b : this.numAddCommas(b));
                        this._tDom.innerHTML = a
                    } else {
                        this._curTicket = 0 / 0, a = this._encodeHTML(n.getNameByIndex(i));
                        for (var y = 0, g = h.length; g > y; y++)a += "<br/>" + this._encodeHTML(h[y].name || "") + " : ", b = h[y].data[i], b = null != b ? null != b.value ? b.value : b : "-", a += b instanceof Array ? b : this.numAddCommas(b);
                        this._tDom.innerHTML = a
                    }
                }
                if (r === !1 || !this.option.tooltip.showContent)return;
                this.hasAppend || (this._tDom.style.left = this._zrWidth / 2 + "px", this._tDom.style.top = this._zrHeight / 2 + "px", this.dom.firstChild.appendChild(this._tDom), this.hasAppend = !0), this._show(o, p + 10, u + 10, c)
            }
        },
        _showPolarTrigger: function (e, t) {
            if (null == this.component.polar || null == e || null == t || 0 > t)return !1;
            var i, n, a, o = this.option.series, r = [], s = [], l = "";
            if ("axis" === this.option.tooltip.trigger) {
                if (!this.option.tooltip.show)return !1;
                i = this.option.tooltip.formatter, n = this.option.tooltip.position
            }
            for (var h = this.option.polar[e].indicator[t].text, m = 0, c = o.length; c > m; m++)this._isSelected(o[m].name) && o[m].polarIndex === e && "axis" === this.deepQuery([o[m], this.option], "tooltip.trigger") && (a = this.query(o[m], "tooltip.showContent") || a, i = this.query(o[m], "tooltip.formatter") || i, n = this.query(o[m], "tooltip.position") || n, l += this._style(this.query(o[m], "tooltip")), r.push(o[m]), s.push(m));
            if (r.length > 0) {
                for (var p, u, V, U = [], m = 0, c = r.length; c > m; m++) {
                    p = r[m].data;
                    for (var y = 0, g = p.length; g > y; y++)u = p[y], this._isSelected(u.name) && (u = null != u ? u : {
                        name: "",
                        value: {dataIndex: "-"}
                    }, V = null != u.value[t].value ? u.value[t].value : u.value[t], U.push({
                        seriesIndex: s[m],
                        seriesName: r[m].name || "",
                        series: r[m],
                        dataIndex: t,
                        data: u,
                        name: u.name,
                        indicator: h,
                        value: V,
                        0: r[m].name || "",
                        1: u.name,
                        2: V,
                        3: h
                    }))
                }
                if (U.length <= 0)return;
                if (this._lastDataIndex != t || this._lastSeriesIndex != s[0])if (this._lastDataIndex = t, this._lastSeriesIndex = s[0], "function" == typeof i)this._curTicket = "axis:" + t, this._tDom.innerHTML = i.call(this.myChart, U, this._curTicket, this._setContent); else if ("string" == typeof i) {
                    i = i.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}").replace("{d}", "{d0}");
                    for (var m = 0, c = U.length; c > m; m++)i = i.replace("{a" + m + "}", this._encodeHTML(U[m].seriesName)), i = i.replace("{b" + m + "}", this._encodeHTML(U[m].name)), i = i.replace("{c" + m + "}", this.numAddCommas(U[m].value)), i = i.replace("{d" + m + "}", this._encodeHTML(U[m].indicator));
                    this._tDom.innerHTML = i
                } else {
                    i = this._encodeHTML(U[0].name) + "<br/>" + this._encodeHTML(U[0].indicator) + " : " + this.numAddCommas(U[0].value);
                    for (var m = 1, c = U.length; c > m; m++)i += "<br/>" + this._encodeHTML(U[m].name) + "<br/>", i += this._encodeHTML(U[m].indicator) + " : " + this.numAddCommas(U[m].value);
                    this._tDom.innerHTML = i
                }
                if (a === !1 || !this.option.tooltip.showContent)return;
                return this.hasAppend || (this._tDom.style.left = this._zrWidth / 2 + "px", this._tDom.style.top = this._zrHeight / 2 + "px", this.dom.firstChild.appendChild(this._tDom), this.hasAppend = !0), this._show(n, d.getX(this._event), d.getY(this._event), l), !0
            }
        },
        _showItemTrigger: function (e) {
            if (this._curTarget) {
                var t, i, n, a = l.get(this._curTarget, "series"), o = l.get(this._curTarget, "seriesIndex"), r = l.get(this._curTarget, "data"), h = l.get(this._curTarget, "dataIndex"), m = l.get(this._curTarget, "name"), c = l.get(this._curTarget, "value"), p = l.get(this._curTarget, "special"), u = l.get(this._curTarget, "special2"), V = "";
                if ("island" != this._curTarget._type) {
                    var U = e ? "axis" : "item";
                    this.option.tooltip.trigger === U && (t = this.option.tooltip.formatter, i = this.option.tooltip.position), this.query(a, "tooltip.trigger") === U && (n = this.query(a, "tooltip.showContent") || n, t = this.query(a, "tooltip.formatter") || t, i = this.query(a, "tooltip.position") || i, V += this._style(this.query(a, "tooltip"))), n = this.query(r, "tooltip.showContent") || n, t = this.query(r, "tooltip.formatter") || t, i = this.query(r, "tooltip.position") || i, V += this._style(this.query(r, "tooltip"))
                } else this._lastItemTriggerId = 0 / 0, n = this.deepQuery([r, a, this.option], "tooltip.showContent"), t = this.deepQuery([r, a, this.option], "tooltip.islandFormatter"), i = this.deepQuery([r, a, this.option], "tooltip.islandPosition");
                this._lastItemTriggerId !== this._curTarget.id && (this._lastItemTriggerId = this._curTarget.id, "function" == typeof t ? (this._curTicket = (a.name || "") + ":" + h, this._tDom.innerHTML = t.call(this.myChart, {
                    seriesIndex: o,
                    seriesName: a.name || "",
                    series: a,
                    dataIndex: h,
                    data: r,
                    name: m,
                    value: c,
                    percent: p,
                    indicator: p,
                    value2: u,
                    indicator2: u,
                    0: a.name || "",
                    1: m,
                    2: c,
                    3: p,
                    4: u,
                    5: r,
                    6: o,
                    7: h
                }, this._curTicket, this._setContent)) : "string" == typeof t ? (this._curTicket = 0 / 0, t = t.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}"), t = t.replace("{a0}", this._encodeHTML(a.name || "")).replace("{b0}", this._encodeHTML(m)).replace("{c0}", c instanceof Array ? c : this.numAddCommas(c)), t = t.replace("{d}", "{d0}").replace("{d0}", p || ""), t = t.replace("{e}", "{e0}").replace("{e0}", l.get(this._curTarget, "special2") || ""), this._tDom.innerHTML = t) : (this._curTicket = 0 / 0, this._tDom.innerHTML = a.type === s.CHART_TYPE_RADAR && p ? this._itemFormatter.radar.call(this, a, m, c, p) : a.type === s.CHART_TYPE_EVENTRIVER ? this._itemFormatter.eventRiver.call(this, a, m, c, r) : "" + (null != a.name ? this._encodeHTML(a.name) + "<br/>" : "") + ("" === m ? "" : this._encodeHTML(m) + " : ") + (c instanceof Array ? c : this.numAddCommas(c)))), this._axisLineShape.invisible && this._axisShadowShape.invisible || (this._axisLineShape.invisible = !0, this.zr.modShape(this._axisLineShape.id), this._axisShadowShape.invisible = !0, this.zr.modShape(this._axisShadowShape.id), this.zr.refresh()), n !== !1 && this.option.tooltip.showContent && (this.hasAppend || (this._tDom.style.left = this._zrWidth / 2 + "px", this._tDom.style.top = this._zrHeight / 2 + "px", this.dom.firstChild.appendChild(this._tDom), this.hasAppend = !0), this._show(i, d.getX(this._event) + 20, d.getY(this._event) - 20, V))
            }
        },
        _itemFormatter: {
            radar: function (e, t, i, n) {
                var a = "";
                a += this._encodeHTML("" === t ? e.name || "" : t), a += "" === a ? "" : "<br />";
                for (var o = 0; o < n.length; o++)a += this._encodeHTML(n[o].text) + " : " + this.numAddCommas(i[o]) + "<br />";
                return a
            }, chord: function (e, t, i, n, a) {
                if (null == a)return this._encodeHTML(t) + " (" + this.numAddCommas(i) + ")";
                var o = this._encodeHTML(t), r = this._encodeHTML(n);
                return "" + (null != e.name ? this._encodeHTML(e.name) + "<br/>" : "") + o + " -> " + r + " (" + this.numAddCommas(i) + ")<br />" + r + " -> " + o + " (" + this.numAddCommas(a) + ")"
            }, eventRiver: function (e, t, i, n) {
                var a = "";
                a += this._encodeHTML("" === e.name ? "" : e.name + " : "), a += this._encodeHTML(t), a += "" === a ? "" : "<br />", n = n.evolution;
                for (var o = 0, r = n.length; r > o; o++)a += '<div style="padding-top:5px;">', n[o].detail && (n[o].detail.img && (a += '<img src="' + n[o].detail.img + '" style="float:left;width:40px;height:40px;">'), a += '<div style="margin-left:45px;">' + n[o].time + "<br/>", a += '<a href="' + n[o].detail.link + '" target="_blank">', a += n[o].detail.text + "</a></div>", a += "</div>");
                return a
            }
        },
        _styleAxisPointer: function (e, t, i, n, a, o, r, s) {
            if (e.length > 0) {
                var l, h, d = this.option.tooltip.axisPointer, m = d.type, c = {line: {}, cross: {}, shadow: {}};
                for (var p in c)c[p].color = d[p + "Style"].color, c[p].width = d[p + "Style"].width, c[p].type = d[p + "Style"].type;
                for (var u = 0, V = e.length; V > u; u++)"axis" === this.deepQuery([e[u], this.option], "tooltip.trigger") && (l = e[u], h = this.query(l, "tooltip.axisPointer.type"), m = h || m, h && (c[h].color = this.query(l, "tooltip.axisPointer." + h + "Style.color") || c[h].color, c[h].width = this.query(l, "tooltip.axisPointer." + h + "Style.width") || c[h].width, c[h].type = this.query(l, "tooltip.axisPointer." + h + "Style.type") || c[h].type));
                "line" === m ? (this._axisLineShape.style = {
                    xStart: t,
                    yStart: i,
                    xEnd: n,
                    yEnd: a,
                    strokeColor: c.line.color,
                    lineWidth: c.line.width,
                    lineType: c.line.type
                }, this._axisLineShape.invisible = !1, this.zr.modShape(this._axisLineShape.id)) : "cross" === m ? (this._axisCrossShape.style = {
                    brushType: "stroke",
                    rect: this.component.grid.getArea(),
                    x: r,
                    y: s,
                    text: ("( " + this.component.xAxis.getAxis(0).getValueFromCoord(r) + " , " + this.component.yAxis.getAxis(0).getValueFromCoord(s) + " )").replace("  , ", " ").replace(" ,  ", " "),
                    textPosition: "specific",
                    strokeColor: c.cross.color,
                    lineWidth: c.cross.width,
                    lineType: c.cross.type
                }, this.component.grid.getXend() - r > 100 ? (this._axisCrossShape.style.textAlign = "left", this._axisCrossShape.style.textX = r + 10) : (this._axisCrossShape.style.textAlign = "right", this._axisCrossShape.style.textX = r - 10), s - this.component.grid.getY() > 50 ? (this._axisCrossShape.style.textBaseline = "bottom", this._axisCrossShape.style.textY = s - 10) : (this._axisCrossShape.style.textBaseline = "top", this._axisCrossShape.style.textY = s + 10), this._axisCrossShape.invisible = !1, this.zr.modShape(this._axisCrossShape.id)) : "shadow" === m && ((null == c.shadow.width || "auto" === c.shadow.width || isNaN(c.shadow.width)) && (c.shadow.width = o), t === n ? Math.abs(this.component.grid.getX() - t) < 2 ? (c.shadow.width /= 2, t = n += c.shadow.width / 2) : Math.abs(this.component.grid.getXend() - t) < 2 && (c.shadow.width /= 2, t = n -= c.shadow.width / 2) : i === a && (Math.abs(this.component.grid.getY() - i) < 2 ? (c.shadow.width /= 2, i = a += c.shadow.width / 2) : Math.abs(this.component.grid.getYend() - i) < 2 && (c.shadow.width /= 2, i = a -= c.shadow.width / 2)), this._axisShadowShape.style = {
                    xStart: t,
                    yStart: i,
                    xEnd: n,
                    yEnd: a,
                    strokeColor: c.shadow.color,
                    lineWidth: c.shadow.width
                }, this._axisShadowShape.invisible = !1, this.zr.modShape(this._axisShadowShape.id)), this.zr.refresh()
            }
        },
        __onmousemove: function (e) {
            if (clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), !this._mousein || !this._enterable) {
                var t = e.target, i = d.getX(e.event), n = d.getY(e.event);
                if (t) {
                    this._curTarget = t, this._event = e.event, this._event.zrenderX = i, this._event.zrenderY = n;
                    var a;
                    if (this._needAxisTrigger && this.component.polar && -1 != (a = this.component.polar.isInside([i, n])))for (var o = this.option.series, l = 0, h = o.length; h > l; l++)if (o[l].polarIndex === a && "axis" === this.deepQuery([o[l], this.option], "tooltip.trigger")) {
                        this._curTarget = null;
                        break
                    }
                    this._showingTicket = setTimeout(this._tryShow, this._showDelay)
                } else this._curTarget = !1, this._event = e.event, this._event.zrenderX = i, this._event.zrenderY = n, this._needAxisTrigger && this.component.grid && m.isInside(r, this.component.grid.getArea(), i, n) ? this._showingTicket = setTimeout(this._tryShow, this._showDelay) : this._needAxisTrigger && this.component.polar && -1 != this.component.polar.isInside([i, n]) ? this._showingTicket = setTimeout(this._tryShow, this._showDelay) : (!this._event.connectTrigger && this.messageCenter.dispatch(s.EVENT.TOOLTIP_OUT_GRID, this._event, null, this.myChart), this._hidingTicket = setTimeout(this._hide, this._hideDelay))
            }
        },
        __onglobalout: function () {
            clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), this._hidingTicket = setTimeout(this._hide, this._hideDelay)
        },
        __setContent: function (e, t) {
            this._tDom && (e === this._curTicket && (this._tDom.innerHTML = t), setTimeout(this._refixed, 20))
        },
        ontooltipHover: function (e, t) {
            if (!this._lastTipShape || this._lastTipShape && this._lastTipShape.dataIndex != e.dataIndex) {
                this._lastTipShape && this._lastTipShape.tipShape.length > 0 && (this.zr.delShape(this._lastTipShape.tipShape), this.shapeList.length = 2);
                for (var i = 0, n = t.length; n > i; i++)t[i].zlevel = this._zlevelBase, t[i].style = u.prototype.getHighlightStyle(t[i].style, t[i].highlightStyle), t[i].draggable = !1, t[i].hoverable = !1, t[i].clickable = !1, t[i].ondragend = null, t[i].ondragover = null, t[i].ondrop = null, this.shapeList.push(t[i]), this.zr.addShape(t[i]);
                this._lastTipShape = {dataIndex: e.dataIndex, tipShape: t}
            }
        },
        ondragend: function () {
            this._hide()
        },
        onlegendSelected: function (e) {
            this._selectedMap = e.selected
        },
        _setSelectedMap: function () {
            this._selectedMap = this.component.legend ? p.clone(this.component.legend.getSelectedMap()) : {}
        },
        _isSelected: function (e) {
            return null != this._selectedMap[e] ? this._selectedMap[e] : !0
        },
        showTip: function (e) {
            if (e) {
                var t, i = this.option.series;
                if (null != e.seriesIndex)t = e.seriesIndex; else for (var n = e.seriesName, a = 0, o = i.length; o > a; a++)if (i[a].name === n) {
                    t = a;
                    break
                }
                var r = i[t];
                if (null != r) {
                    var d = this.myChart.chart[r.type], m = "axis" === this.deepQuery([r, this.option], "tooltip.trigger");
                    if (d)if (m) {
                        var c = e.dataIndex;
                        switch (d.type) {
                            case s.CHART_TYPE_LINE:
                            case s.CHART_TYPE_BAR:
                            case s.CHART_TYPE_K:
                                if (null == this.component.xAxis || null == this.component.yAxis || r.data.length <= c)return;
                                var p = r.xAxisIndex || 0, u = r.yAxisIndex || 0;
                                this._event = this.component.xAxis.getAxis(p).type === s.COMPONENT_TYPE_AXIS_CATEGORY ? {
                                    zrenderX: this.component.xAxis.getAxis(p).getCoordByIndex(c),
                                    zrenderY: this.component.grid.getY() + (this.component.grid.getYend() - this.component.grid.getY()) / 4
                                } : {
                                    zrenderX: this.component.grid.getX() + (this.component.grid.getXend() - this.component.grid.getX()) / 4,
                                    zrenderY: this.component.yAxis.getAxis(u).getCoordByIndex(c)
                                }, this._showAxisTrigger(p, u, c);
                                break;
                            case s.CHART_TYPE_RADAR:
                                if (null == this.component.polar || r.data[0].value.length <= c)return;
                                var V = r.polarIndex || 0, U = this.component.polar.getVector(V, c, "max");
                                this._event = {zrenderX: U[0], zrenderY: U[1]}, this._showPolarTrigger(V, c)
                        }
                    } else {
                        var y, g, f = d.shapeList;
                        switch (d.type) {
                            case s.CHART_TYPE_LINE:
                            case s.CHART_TYPE_BAR:
                            case s.CHART_TYPE_K:
                            case s.CHART_TYPE_SCATTER:
                                for (var c = e.dataIndex, a = 0, o = f.length; o > a; a++)if (l.get(f[a], "seriesIndex") == t && l.get(f[a], "dataIndex") == c) {
                                    this._curTarget = f[a], y = f[a].style.x, g = d.type != s.CHART_TYPE_K ? f[a].style.y : f[a].style.y[0];
                                    break
                                }
                                break;
                            case s.CHART_TYPE_RADAR:
                                for (var c = e.dataIndex, a = 0, o = f.length; o > a; a++)if ("polygon" === f[a].type && l.get(f[a], "seriesIndex") == t && l.get(f[a], "dataIndex") == c) {
                                    this._curTarget = f[a];
                                    var U = this.component.polar.getCenter(r.polarIndex || 0);
                                    y = U[0], g = U[1];
                                    break
                                }
                                break;
                            case s.CHART_TYPE_PIE:
                                for (var b = e.name, a = 0, o = f.length; o > a; a++)if ("sector" === f[a].type && l.get(f[a], "seriesIndex") == t && l.get(f[a], "name") == b) {
                                    this._curTarget = f[a];
                                    var _ = this._curTarget.style, x = (_.startAngle + _.endAngle) / 2 * Math.PI / 180;
                                    y = this._curTarget.style.x + Math.cos(x) * _.r / 1.5, g = this._curTarget.style.y - Math.sin(x) * _.r / 1.5;
                                    break
                                }
                                break;
                            case s.CHART_TYPE_MAP:
                                for (var b = e.name, k = r.mapType, a = 0, o = f.length; o > a; a++)if ("text" === f[a].type && f[a]._mapType === k && f[a].style._name === b) {
                                    this._curTarget = f[a], y = this._curTarget.style.x + this._curTarget.position[0], g = this._curTarget.style.y + this._curTarget.position[1];
                                    break
                                }
                                break;
                            case s.CHART_TYPE_CHORD:
                                for (var b = e.name, a = 0, o = f.length; o > a; a++)if ("sector" === f[a].type && l.get(f[a], "name") == b) {
                                    this._curTarget = f[a];
                                    var _ = this._curTarget.style, x = (_.startAngle + _.endAngle) / 2 * Math.PI / 180;
                                    return y = this._curTarget.style.x + Math.cos(x) * (_.r - 2), g = this._curTarget.style.y - Math.sin(x) * (_.r - 2), void this.zr.trigger(h.EVENT.MOUSEMOVE, {
                                        zrenderX: y,
                                        zrenderY: g
                                    })
                                }
                                break;
                            case s.CHART_TYPE_FORCE:
                                for (var b = e.name, a = 0, o = f.length; o > a; a++)if ("circle" === f[a].type && l.get(f[a], "name") == b) {
                                    this._curTarget = f[a], y = this._curTarget.position[0], g = this._curTarget.position[1];
                                    break
                                }
                        }
                        null != y && null != g && (this._event = {
                            zrenderX: y,
                            zrenderY: g
                        }, this.zr.addHoverShape(this._curTarget), this.zr.refreshHover(), this._showItemTrigger())
                    }
                }
            }
        },
        hideTip: function () {
            this._hide()
        },
        refresh: function (e) {
            if (this._zrHeight = this.zr.getHeight(), this._zrWidth = this.zr.getWidth(), this._lastTipShape && this._lastTipShape.tipShape.length > 0 && this.zr.delShape(this._lastTipShape.tipShape), this._lastTipShape = !1, this.shapeList.length = 2, this._lastDataIndex = -1, this._lastSeriesIndex = -1, this._lastItemTriggerId = -1, e) {
                this.option = e, this.option.tooltip = this.reformOption(this.option.tooltip), this.option.tooltip.textStyle = p.merge(this.option.tooltip.textStyle, this.ecTheme.textStyle), this._needAxisTrigger = !1, "axis" === this.option.tooltip.trigger && (this._needAxisTrigger = !0);
                for (var t = this.option.series, i = 0, n = t.length; n > i; i++)if ("axis" === this.query(t[i], "tooltip.trigger")) {
                    this._needAxisTrigger = !0;
                    break
                }
                this._showDelay = this.option.tooltip.showDelay, this._hideDelay = this.option.tooltip.hideDelay, this._defaultCssText = this._style(this.option.tooltip), this._setSelectedMap(), this._axisLineWidth = this.option.tooltip.axisPointer.lineStyle.width, this._enterable = this.option.tooltip.enterable
            }
            if (this.showing) {
                var a = this;
                setTimeout(function () {
                    a.zr.trigger(h.EVENT.MOUSEMOVE, a.zr.handler._event)
                }, 50)
            }
        },
        onbeforDispose: function () {
            this._lastTipShape && this._lastTipShape.tipShape.length > 0 && this.zr.delShape(this._lastTipShape.tipShape), clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), this.zr.un(h.EVENT.MOUSEMOVE, this._onmousemove), this.zr.un(h.EVENT.GLOBALOUT, this._onglobalout), this.hasAppend && this.dom.firstChild.removeChild(this._tDom), this._tDom = null
        },
        _encodeHTML: function (e) {
            return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        }
    }, p.inherits(t, i), e("../component").define("tooltip", t), t
}), define("echarts/component/legend", ["require", "./base", "zrender/shape/Text", "zrender/shape/Rectangle", "zrender/shape/Sector", "../util/shape/Icon", "../util/shape/Candle", "../config", "zrender/tool/util", "zrender/tool/area", "../component"], function (e) {
    function t(e, t, n, a, o) {
        if (!this.query(a, "legend.data"))return void console.error("option.legend.data has not been defined.");
        i.call(this, e, t, n, a, o);
        var r = this;
        r._legendSelected = function (e) {
            r.__legendSelected(e)
        }, r._dispatchHoverLink = function (e) {
            return r.__dispatchHoverLink(e)
        }, this._colorIndex = 0, this._colorMap = {}, this._selectedMap = {}, this._hasDataMap = {}, this.refresh(a)
    }

    var i = e("./base"), n = e("zrender/shape/Text"), a = e("zrender/shape/Rectangle"), o = e("zrender/shape/Sector"), r = e("../util/shape/Icon"), s = e("../util/shape/Candle"), l = e("../config"), h = e("zrender/tool/util"), d = e("zrender/tool/area");
    t.prototype = {
        type: l.COMPONENT_TYPE_LEGEND, _buildShape: function () {
            if (this.legendOption.show) {
                this._itemGroupLocation = this._getItemGroupLocation(), this._buildBackground(), this._buildItem();
                for (var e = 0, t = this.shapeList.length; t > e; e++)this.zr.addShape(this.shapeList[e])
            }
        }, _buildItem: function () {
            var e, t, i, a, o, s, l, m, c = this.legendOption.data, p = c.length, u = this.legendOption.textStyle, V = this.zr.getWidth(), U = this.zr.getHeight(), y = this._itemGroupLocation.x, g = this._itemGroupLocation.y, f = this.legendOption.itemWidth, b = this.legendOption.itemHeight, _ = this.legendOption.itemGap;
            "vertical" === this.legendOption.orient && "right" === this.legendOption.x && (y = this._itemGroupLocation.x + this._itemGroupLocation.width - f);
            for (var x = 0; p > x; x++)o = h.merge(c[x].textStyle || {}, u), s = this.getFont(o), e = this._getName(c[x]), l = this._getFormatterName(e), "" !== e ? (t = c[x].icon || this._getSomethingByName(e).type, m = this.getColor(e), "horizontal" === this.legendOption.orient ? 200 > V - y && f + 5 + d.getTextWidth(l, s) + (x === p - 1 || "" === c[x + 1] ? 0 : _) >= V - y && (y = this._itemGroupLocation.x, g += b + _) : 200 > U - g && b + (x === p - 1 || "" === c[x + 1] ? 0 : _) >= U - g && ("right" === this.legendOption.x ? y -= this._itemGroupLocation.maxWidth + _ : y += this._itemGroupLocation.maxWidth + _, g = this._itemGroupLocation.y), i = this._getItemShapeByType(y, g, f, b, this._selectedMap[e] && this._hasDataMap[e] ? m : "#ccc", t, m), i._name = e, i = new r(i), a = {
                zlevel: this._zlevelBase,
                style: {
                    x: y + f + 5,
                    y: g + b / 2,
                    color: this._selectedMap[e] ? "auto" === o.color ? m : o.color : "#ccc",
                    text: l,
                    textFont: s,
                    textBaseline: "middle"
                },
                highlightStyle: {color: m, brushType: "fill"},
                hoverable: !!this.legendOption.selectedMode,
                clickable: !!this.legendOption.selectedMode
            }, "vertical" === this.legendOption.orient && "right" === this.legendOption.x && (a.style.x -= f + 10, a.style.textAlign = "right"), a._name = e, a = new n(a), this.legendOption.selectedMode && (i.onclick = a.onclick = this._legendSelected, i.onmouseover = a.onmouseover = this._dispatchHoverLink, i.hoverConnect = a.id, a.hoverConnect = i.id), this.shapeList.push(i), this.shapeList.push(a), "horizontal" === this.legendOption.orient ? y += f + 5 + d.getTextWidth(l, s) + _ : g += b + _) : "horizontal" === this.legendOption.orient ? (y = this._itemGroupLocation.x, g += b + _) : ("right" === this.legendOption.x ? y -= this._itemGroupLocation.maxWidth + _ : y += this._itemGroupLocation.maxWidth + _, g = this._itemGroupLocation.y);
            "horizontal" === this.legendOption.orient && "center" === this.legendOption.x && g != this._itemGroupLocation.y && this._mLineOptimize()
        }, _getName: function (e) {
            return "undefined" != typeof e.name ? e.name : e
        }, _getFormatterName: function (e) {
            var t, i = this.legendOption.formatter;
            return t = "function" == typeof i ? i.call(this.myChart, e) : "string" == typeof i ? i.replace("{name}", e) : e
        }, _getFormatterNameFromData: function (e) {
            var t = this._getName(e);
            return this._getFormatterName(t)
        }, _mLineOptimize: function () {
            for (var e = [], t = this._itemGroupLocation.x, i = 2, n = this.shapeList.length; n > i; i++)this.shapeList[i].style.x === t ? e.push((this._itemGroupLocation.width - (this.shapeList[i - 1].style.x + d.getTextWidth(this.shapeList[i - 1].style.text, this.shapeList[i - 1].style.textFont) - t)) / 2) : i === n - 1 && e.push((this._itemGroupLocation.width - (this.shapeList[i].style.x + d.getTextWidth(this.shapeList[i].style.text, this.shapeList[i].style.textFont) - t)) / 2);
            for (var a = -1, i = 1, n = this.shapeList.length; n > i; i++)this.shapeList[i].style.x === t && a++, 0 !== e[a] && (this.shapeList[i].style.x += e[a])
        }, _buildBackground: function () {
            var e = this.reformCssArray(this.legendOption.padding);
            this.shapeList.push(new a({
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: this._itemGroupLocation.x - e[3],
                    y: this._itemGroupLocation.y - e[0],
                    width: this._itemGroupLocation.width + e[3] + e[1],
                    height: this._itemGroupLocation.height + e[0] + e[2],
                    brushType: 0 === this.legendOption.borderWidth ? "fill" : "both",
                    color: this.legendOption.backgroundColor,
                    strokeColor: this.legendOption.borderColor,
                    lineWidth: this.legendOption.borderWidth
                }
            }))
        }, _getItemGroupLocation: function () {
            var e = this.legendOption.data, t = e.length, i = this.legendOption.itemGap, n = this.legendOption.itemWidth + 5, a = this.legendOption.itemHeight, o = this.legendOption.textStyle, r = this.getFont(o), s = 0, l = 0, m = this.reformCssArray(this.legendOption.padding), c = this.zr.getWidth() - m[1] - m[3], p = this.zr.getHeight() - m[0] - m[2], u = 0, V = 0;
            if ("horizontal" === this.legendOption.orient) {
                l = a;
                for (var U = 0; t > U; U++)"" !== this._getName(e[U]) ? u += n + d.getTextWidth(this._getFormatterNameFromData(e[U]), e[U].textStyle ? this.getFont(h.merge(e[U].textStyle || {}, o)) : r) + i : (u -= i, u > c ? (s = c, l += a + i) : s = Math.max(s, u), l += a + i, u = 0);
                l = Math.max(l, a), u -= i, u > c ? (s = c, l += a + i) : s = Math.max(s, u)
            } else {
                for (var U = 0; t > U; U++)V = Math.max(V, d.getTextWidth(this._getFormatterNameFromData(e[U]), e[U].textStyle ? this.getFont(h.merge(e[U].textStyle || {}, o)) : r));
                V += n, s = V;
                for (var U = 0; t > U; U++)"" !== this._getName(e[U]) ? u += a + i : (u -= i, u > p ? (l = p, s += V + i) : l = Math.max(l, u), s += V + i, u = 0);
                s = Math.max(s, V), u -= i, u > p ? (l = p, s += V + i) : l = Math.max(l, u)
            }
            c = this.zr.getWidth(), p = this.zr.getHeight();
            var y;
            switch (this.legendOption.x) {
                case"center":
                    y = Math.floor((c - s) / 2);
                    break;
                case"left":
                    y = m[3] + this.legendOption.borderWidth;
                    break;
                case"right":
                    y = c - s - m[1] - m[3] - 2 * this.legendOption.borderWidth;
                    break;
                default:
                    y = this.parsePercent(this.legendOption.x, c)
            }
            var g;
            switch (this.legendOption.y) {
                case"top":
                    g = m[0] + this.legendOption.borderWidth;
                    break;
                case"bottom":
                    g = p - l - m[0] - m[2] - 2 * this.legendOption.borderWidth;
                    break;
                case"center":
                    g = Math.floor((p - l) / 2);
                    break;
                default:
                    g = this.parsePercent(this.legendOption.y, p)
            }
            return {x: y, y: g, width: s, height: l, maxWidth: V}
        }, _getSomethingByName: function (e) {
            for (var t, i = this.option.series, n = 0, a = i.length; a > n; n++) {
                if (i[n].name === e)return {type: i[n].type, series: i[n], seriesIndex: n, data: null, dataIndex: -1};
                if (i[n].type === l.CHART_TYPE_PIE || i[n].type === l.CHART_TYPE_RADAR || i[n].type === l.CHART_TYPE_CHORD || i[n].type === l.CHART_TYPE_FORCE || i[n].type === l.CHART_TYPE_FUNNEL) {
                    t = i[n].categories || i[n].data || i[n].nodes;
                    for (var o = 0, r = t.length; r > o; o++)if (t[o].name === e)return {
                        type: i[n].type,
                        series: i[n],
                        seriesIndex: n,
                        data: t[o],
                        dataIndex: o
                    }
                }
            }
            return {type: "bar", series: null, seriesIndex: -1, data: null, dataIndex: -1}
        }, _getItemShapeByType: function (e, t, i, n, a, o, r) {
            var s, l = "#ccc" === a ? r : a, h = {
                zlevel: this._zlevelBase,
                style: {
                    iconType: "legendicon" + o,
                    x: e,
                    y: t,
                    width: i,
                    height: n,
                    color: a,
                    strokeColor: a,
                    lineWidth: 2
                },
                highlightStyle: {color: l, strokeColor: l, lineWidth: 1},
                hoverable: this.legendOption.selectedMode,
                clickable: this.legendOption.selectedMode
            };
            if (o.match("image")) {
                var s = o.replace(new RegExp("^image:\\/\\/"), "");
                o = "image"
            }
            switch (o) {
                case"line":
                    h.style.brushType = "stroke", h.highlightStyle.lineWidth = 3;
                    break;
                case"radar":
                case"scatter":
                    h.highlightStyle.lineWidth = 3;
                    break;
                case"k":
                    h.style.brushType = "both", h.highlightStyle.lineWidth = 3, h.highlightStyle.color = h.style.color = this.query(this.ecTheme, "k.itemStyle.normal.color") || "#fff", h.style.strokeColor = "#ccc" != a ? this.query(this.ecTheme, "k.itemStyle.normal.lineStyle.color") || "#ff3200" : a;
                    break;
                case"image":
                    h.style.iconType = "image", h.style.image = s, "#ccc" === a && (h.style.opacity = .5)
            }
            return h
        }, __legendSelected: function (e) {
            var t = e.target._name;
            if ("single" === this.legendOption.selectedMode)for (var i in this._selectedMap)this._selectedMap[i] = !1;
            this._selectedMap[t] = !this._selectedMap[t], this.messageCenter.dispatch(l.EVENT.LEGEND_SELECTED, e.event, {
                selected: this._selectedMap,
                target: t
            }, this.myChart)
        }, __dispatchHoverLink: function (e) {
            this.messageCenter.dispatch(l.EVENT.LEGEND_HOVERLINK, e.event, {target: e.target._name}, this.myChart)
        }, refresh: function (e) {
            if (e) {
                this.option = e || this.option, this.option.legend = this.reformOption(this.option.legend), this.legendOption = this.option.legend;
                var t, i, n, a, o = this.legendOption.data || [];
                if (this.legendOption.selected)for (var r in this.legendOption.selected)this._selectedMap[r] = "undefined" != typeof this._selectedMap[r] ? this._selectedMap[r] : this.legendOption.selected[r];
                for (var s = 0, h = o.length; h > s; s++)t = this._getName(o[s]), "" !== t && (i = this._getSomethingByName(t), i.series ? (this._hasDataMap[t] = !0, a = !i.data || i.type !== l.CHART_TYPE_PIE && i.type !== l.CHART_TYPE_FORCE && i.type !== l.CHART_TYPE_FUNNEL ? [i.series] : [i.data, i.series], n = this.getItemStyleColor(this.deepQuery(a, "itemStyle.normal.color"), i.seriesIndex, i.dataIndex, i.data), n && i.type != l.CHART_TYPE_K && this.setColor(t, n), this._selectedMap[t] = null != this._selectedMap[t] ? this._selectedMap[t] : !0) : this._hasDataMap[t] = !1)
            }
            this.clear(), this._buildShape()
        }, getRelatedAmount: function (e) {
            for (var t, i = 0, n = this.option.series, a = 0, o = n.length; o > a; a++)if (n[a].name === e && i++, n[a].type === l.CHART_TYPE_PIE || n[a].type === l.CHART_TYPE_RADAR || n[a].type === l.CHART_TYPE_CHORD || n[a].type === l.CHART_TYPE_FORCE || n[a].type === l.CHART_TYPE_FUNNEL) {
                t = n[a].type != l.CHART_TYPE_FORCE ? n[a].data : n[a].categories;
                for (var r = 0, s = t.length; s > r; r++)t[r].name === e && "-" != t[r].value && i++
            }
            return i
        }, setColor: function (e, t) {
            this._colorMap[e] = t
        }, getColor: function (e) {
            return this._colorMap[e] || (this._colorMap[e] = this.zr.getColor(this._colorIndex++)), this._colorMap[e]
        }, hasColor: function (e) {
            return this._colorMap[e] ? this._colorMap[e] : !1
        }, add: function (e, t) {
            for (var i = this.legendOption.data, n = 0, a = i.length; a > n; n++)if (this._getName(i[n]) === e)return;
            this.legendOption.data.push(e), this.setColor(e, t), this._selectedMap[e] = !0, this._hasDataMap[e] = !0
        }, del: function (e) {
            for (var t = this.legendOption.data, i = 0, n = t.length; n > i; i++)if (this._getName(t[i]) === e)return this.legendOption.data.splice(i, 1)
        }, getItemShape: function (e) {
            if (null != e)for (var t, i = 0, n = this.shapeList.length; n > i; i++)if (t = this.shapeList[i], t._name === e && "text" != t.type)return t
        }, setItemShape: function (e, t) {
            for (var i, n = 0, a = this.shapeList.length; a > n; n++)i = this.shapeList[n], i._name === e && "text" != i.type && (this._selectedMap[e] || (t.style.color = "#ccc", t.style.strokeColor = "#ccc"), this.zr.modShape(i.id, t))
        }, isSelected: function (e) {
            return "undefined" != typeof this._selectedMap[e] ? this._selectedMap[e] : !0
        }, getSelectedMap: function () {
            return this._selectedMap
        }, setSelected: function (e, t) {
            if ("single" === this.legendOption.selectedMode)for (var i in this._selectedMap)this._selectedMap[i] = !1;
            this._selectedMap[e] = t, this.messageCenter.dispatch(l.EVENT.LEGEND_SELECTED, null, {
                selected: this._selectedMap,
                target: e
            }, this.myChart)
        }, onlegendSelected: function (e, t) {
            var i = e.selected;
            for (var n in i)this._selectedMap[n] != i[n] && (t.needRefresh = !0), this._selectedMap[n] = i[n]
        }
    };
    var m = {
        line: function (e, t) {
            var i = t.height / 2;
            e.moveTo(t.x, t.y + i), e.lineTo(t.x + t.width, t.y + i)
        }, pie: function (e, t) {
            var i = t.x, n = t.y, a = t.width, r = t.height;
            o.prototype.buildPath(e, {x: i + a / 2, y: n + r + 2, r: r + 2, r0: 6, startAngle: 45, endAngle: 135})
        }, eventRiver: function (e, t) {
            var i = t.x, n = t.y, a = t.width, o = t.height;
            e.moveTo(i, n + o), e.bezierCurveTo(i + a, n + o, i, n + 4, i + a, n + 4), e.lineTo(i + a, n), e.bezierCurveTo(i, n, i + a, n + o - 4, i, n + o - 4), e.lineTo(i, n + o)
        }, k: function (e, t) {
            var i = t.x, n = t.y, a = t.width, o = t.height;
            s.prototype.buildPath(e, {x: i + a / 2, y: [n + 1, n + 1, n + o - 6, n + o], width: a - 6})
        }, bar: function (e, t) {
            var i = t.x, n = t.y + 1, a = t.width, o = t.height - 2, r = 3;
            e.moveTo(i + r, n), e.lineTo(i + a - r, n), e.quadraticCurveTo(i + a, n, i + a, n + r), e.lineTo(i + a, n + o - r), e.quadraticCurveTo(i + a, n + o, i + a - r, n + o), e.lineTo(i + r, n + o), e.quadraticCurveTo(i, n + o, i, n + o - r), e.lineTo(i, n + r), e.quadraticCurveTo(i, n, i + r, n)
        }, force: function (e, t) {
            r.prototype.iconLibrary.circle(e, t)
        }, radar: function (e, t) {
            var i = 6, n = t.x + t.width / 2, a = t.y + t.height / 2, o = t.height / 2, r = 2 * Math.PI / i, s = -Math.PI / 2, l = n + o * Math.cos(s), h = a + o * Math.sin(s);
            e.moveTo(l, h), s += r;
            for (var d = 0, m = i - 1; m > d; d++)e.lineTo(n + o * Math.cos(s), a + o * Math.sin(s)), s += r;
            e.lineTo(l, h)
        }
    };
    m.chord = m.pie, m.map = m.bar;
    for (var c in m)r.prototype.iconLibrary["legendicon" + c] = m[c];
    return h.inherits(t, i), e("../component").define("legend", t), t
}), define("echarts/util/ecData", [], function () {
    function e(e, t, i, n, a, o, r, s) {
        var l;
        return "undefined" != typeof n && (l = null == n.value ? n : n.value), e._echartsData = {
            _series: t,
            _seriesIndex: i,
            _data: n,
            _dataIndex: a,
            _name: o,
            _value: l,
            _special: r,
            _special2: s
        }, e._echartsData
    }

    function t(e, t) {
        var i = e._echartsData;
        if (!t)return i;
        switch (t) {
            case"series":
            case"seriesIndex":
            case"data":
            case"dataIndex":
            case"name":
            case"value":
            case"special":
            case"special2":
                return i && i["_" + t]
        }
        return null
    }

    function i(e, t, i) {
        switch (e._echartsData = e._echartsData || {}, t) {
            case"series":
            case"seriesIndex":
            case"data":
            case"dataIndex":
            case"name":
            case"value":
            case"special":
            case"special2":
                e._echartsData["_" + t] = i
        }
    }

    function n(e, t) {
        t._echartsData = {
            _series: e._echartsData._series,
            _seriesIndex: e._echartsData._seriesIndex,
            _data: e._echartsData._data,
            _dataIndex: e._echartsData._dataIndex,
            _name: e._echartsData._name,
            _value: e._echartsData._value,
            _special: e._echartsData._special,
            _special2: e._echartsData._special2
        }
    }

    return {pack: e, set: i, get: t, clone: n}
}), define("echarts/chart", [], function () {
    var e = {}, t = {};
    return e.define = function (i, n) {
        return t[i] = n, e
    }, e.get = function (e) {
        return t[e]
    }, e
}), define("zrender/tool/color", ["require", "../tool/util"], function (e) {
    function t(e) {
        D = e
    }

    function i() {
        D = N
    }

    function n(e, t) {
        return e = 0 | e, t = t || D, t[e % t.length]
    }

    function a(e) {
        H = e
    }

    function o() {
        B = H
    }

    function r() {
        return H
    }

    function s(e, t, i, n, a, o, r) {
        O || (O = P.getContext());
        for (var s = O.createRadialGradient(e, t, i, n, a, o), l = 0, h = r.length; h > l; l++)s.addColorStop(r[l][0], r[l][1]);
        return s.__nonRecursion = !0, s
    }

    function l(e, t, i, n, a) {
        O || (O = P.getContext());
        for (var o = O.createLinearGradient(e, t, i, n), r = 0, s = a.length; s > r; r++)o.addColorStop(a[r][0], a[r][1]);
        return o.__nonRecursion = !0, o
    }

    function h(e, t, i) {
        e = u(e), t = u(t), e = K(e), t = K(t);
        for (var n = [], a = (t[0] - e[0]) / i, o = (t[1] - e[1]) / i, r = (t[2] - e[2]) / i, s = (t[3] - e[3]) / i, l = 0, h = e[0], d = e[1], c = e[2], p = e[3]; i > l; l++)n[l] = m([C(Math.floor(h), [0, 255]), C(Math.floor(d), [0, 255]), C(Math.floor(c), [0, 255]), p.toFixed(4) - 0], "rgba"), h += a, d += o, c += r, p += s;
        return h = t[0], d = t[1], c = t[2], p = t[3], n[l] = m([h, d, c, p], "rgba"), n
    }

    function d(e, t) {
        var i = [], n = e.length;
        if (void 0 === t && (t = 20), 1 === n)i = h(e[0], e[0], t); else if (n > 1)for (var a = 0, o = n - 1; o > a; a++) {
            var r = h(e[a], e[a + 1], t);
            o - 1 > a && r.pop(), i = i.concat(r)
        }
        return i
    }

    function m(e, t) {
        if (t = t || "rgb", e && (3 === e.length || 4 === e.length)) {
            if (e = T(e, function (e) {
                    return e > 1 ? Math.ceil(e) : e
                }), t.indexOf("hex") > -1)return "#" + ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1);
            if (t.indexOf("hs") > -1) {
                var i = T(e.slice(1, 3), function (e) {
                    return e + "%"
                });
                e[1] = i[0], e[2] = i[1]
            }
            return t.indexOf("a") > -1 ? (3 === e.length && e.push(1), e[3] = C(e[3], [0, 1]), t + "(" + e.slice(0, 4).join(",") + ")") : t + "(" + e.slice(0, 3).join(",") + ")"
        }
    }

    function c(e) {
        e = L(e), e.indexOf("rgba") < 0 && (e = u(e));
        var t = [], i = 0;
        return e.replace(/[\d.]+/g, function (e) {
            e = 3 > i ? 0 | e : +e, t[i++] = e
        }), t
    }

    function p(e, t) {
        if (!E(e))return e;
        var i = K(e), n = i[3];
        return "undefined" == typeof n && (n = 1), e.indexOf("hsb") > -1 ? i = A(i) : e.indexOf("hsl") > -1 && (i = z(i)), t.indexOf("hsb") > -1 || t.indexOf("hsv") > -1 ? i = J(i) : t.indexOf("hsl") > -1 && (i = F(i)), i[3] = n, m(i, t)
    }

    function u(e) {
        return p(e, "rgba")
    }

    function V(e) {
        return p(e, "rgb")
    }

    function U(e) {
        return p(e, "hex")
    }

    function y(e) {
        return p(e, "hsva")
    }

    function g(e) {
        return p(e, "hsv")
    }

    function f(e) {
        return p(e, "hsba")
    }

    function b(e) {
        return p(e, "hsb")
    }

    function _(e) {
        return p(e, "hsla")
    }

    function x(e) {
        return p(e, "hsl")
    }

    function k(e) {
        for (var t in G)if (U(G[t]) === U(e))return t;
        return null
    }

    function L(e) {
        return String(e).replace(/\s+/g, "")
    }

    function v(e) {
        if (G[e] && (e = G[e]), e = L(e), e = e.replace(/hsv/i, "hsb"), /^#[\da-f]{3}$/i.test(e)) {
            e = parseInt(e.slice(1), 16);
            var t = (3840 & e) << 8, i = (240 & e) << 4, n = 15 & e;
            e = "#" + ((1 << 24) + (t << 4) + t + (i << 4) + i + (n << 4) + n).toString(16).slice(1)
        }
        return e
    }

    function W(e, t) {
        if (!E(e))return e;
        var i = t > 0 ? 1 : -1;
        "undefined" == typeof t && (t = 0), t = Math.abs(t) > 1 ? 1 : Math.abs(t), e = V(e);
        for (var n = K(e), a = 0; 3 > a; a++)n[a] = 1 === i ? n[a] * (1 - t) | 0 : (255 - n[a]) * t + n[a] | 0;
        return "rgb(" + n.join(",") + ")"
    }

    function w(e) {
        if (!E(e))return e;
        var t = K(u(e));
        return t = T(t, function (e) {
            return 255 - e
        }), m(t, "rgb")
    }

    function X(e, t, i) {
        if (!E(e) || !E(t))return e;
        "undefined" == typeof i && (i = .5), i = 1 - C(i, [0, 1]);
        for (var n = 2 * i - 1, a = K(u(e)), o = K(u(t)), r = a[3] - o[3], s = ((n * r === -1 ? n : (n + r) / (1 + n * r)) + 1) / 2, l = 1 - s, h = [], d = 0; 3 > d; d++)h[d] = a[d] * s + o[d] * l;
        var c = a[3] * i + o[3] * (1 - i);
        return c = Math.max(0, Math.min(1, c)), 1 === a[3] && 1 === o[3] ? m(h, "rgb") : (h[3] = c, m(h, "rgba"))
    }

    function I() {
        return "#" + (Math.random().toString(16) + "0000").slice(2, 8)
    }

    function K(e) {
        e = v(e);
        var t = e.match(R);
        if (null === t)throw new Error("The color format error");
        var i, n, a, o = [];
        if (t[2])i = t[2].replace("#", "").split(""), a = [i[0] + i[1], i[2] + i[3], i[4] + i[5]], o = T(a, function (e) {
            return C(parseInt(e, 16), [0, 255])
        }); else if (t[4]) {
            var r = t[4].split(",");
            n = r[3], a = r.slice(0, 3), o = T(a, function (e) {
                return e = Math.floor(e.indexOf("%") > 0 ? 2.55 * parseInt(e, 0) : e), C(e, [0, 255])
            }), "undefined" != typeof n && o.push(C(parseFloat(n), [0, 1]))
        } else if (t[5] || t[6]) {
            var s = (t[5] || t[6]).split(","), l = parseInt(s[0], 0) / 360, h = s[1], d = s[2];
            n = s[3], o = T([h, d], function (e) {
                return C(parseFloat(e) / 100, [0, 1])
            }), o.unshift(l), "undefined" != typeof n && o.push(C(parseFloat(n), [0, 1]))
        }
        return o
    }

    function S(e, t) {
        if (!E(e))return e;
        null === t && (t = 1);
        var i = K(u(e));
        return i[3] = C(Number(t).toFixed(4), [0, 1]), m(i, "rgba")
    }

    function T(e, t) {
        if ("function" != typeof t)throw new TypeError;
        for (var i = e ? e.length : 0, n = 0; i > n; n++)e[n] = t(e[n]);
        return e
    }

    function C(e, t) {
        return e <= t[0] ? e = t[0] : e >= t[1] && (e = t[1]), e
    }

    function E(e) {
        return e instanceof Array || "string" == typeof e
    }

    function A(e) {
        var t, i, n, a = e[0], o = e[1], r = e[2];
        if (0 === o)t = 255 * r, i = 255 * r, n = 255 * r; else {
            var s = 6 * a;
            6 === s && (s = 0);
            var l = 0 | s, h = r * (1 - o), d = r * (1 - o * (s - l)), m = r * (1 - o * (1 - (s - l))), c = 0, p = 0, u = 0;
            0 === l ? (c = r, p = m, u = h) : 1 === l ? (c = d, p = r, u = h) : 2 === l ? (c = h, p = r, u = m) : 3 === l ? (c = h, p = d, u = r) : 4 === l ? (c = m, p = h, u = r) : (c = r, p = h, u = d), t = 255 * c, i = 255 * p, n = 255 * u
        }
        return [t, i, n]
    }

    function z(e) {
        var t, i, n, a = e[0], o = e[1], r = e[2];
        if (0 === o)t = 255 * r, i = 255 * r, n = 255 * r; else {
            var s;
            s = .5 > r ? r * (1 + o) : r + o - o * r;
            var l = 2 * r - s;
            t = 255 * M(l, s, a + 1 / 3), i = 255 * M(l, s, a), n = 255 * M(l, s, a - 1 / 3)
        }
        return [t, i, n]
    }

    function M(e, t, i) {
        return 0 > i && (i += 1), i > 1 && (i -= 1), 1 > 6 * i ? e + 6 * (t - e) * i : 1 > 2 * i ? t : 2 > 3 * i ? e + (t - e) * (2 / 3 - i) * 6 : e
    }

    function J(e) {
        var t, i, n = e[0] / 255, a = e[1] / 255, o = e[2] / 255, r = Math.min(n, a, o), s = Math.max(n, a, o), l = s - r, h = s;
        if (0 === l)t = 0, i = 0; else {
            i = l / s;
            var d = ((s - n) / 6 + l / 2) / l, m = ((s - a) / 6 + l / 2) / l, c = ((s - o) / 6 + l / 2) / l;
            n === s ? t = c - m : a === s ? t = 1 / 3 + d - c : o === s && (t = 2 / 3 + m - d), 0 > t && (t += 1), t > 1 && (t -= 1)
        }
        return t = 360 * t, i = 100 * i, h = 100 * h, [t, i, h]
    }

    function F(e) {
        var t, i, n = e[0] / 255, a = e[1] / 255, o = e[2] / 255, r = Math.min(n, a, o), s = Math.max(n, a, o), l = s - r, h = (s + r) / 2;
        if (0 === l)t = 0, i = 0; else {
            i = .5 > h ? l / (s + r) : l / (2 - s - r);
            var d = ((s - n) / 6 + l / 2) / l, m = ((s - a) / 6 + l / 2) / l, c = ((s - o) / 6 + l / 2) / l;
            n === s ? t = c - m : a === s ? t = 1 / 3 + d - c : o === s && (t = 2 / 3 + m - d), 0 > t && (t += 1), t > 1 && (t -= 1)
        }
        return t = 360 * t, i = 100 * i, h = 100 * h, [t, i, h]
    }

    var O, P = e("../tool/util"), D = ["#ff9277", " #dddd00", " #ffc877", " #bbe3ff", " #d5ffbb", "#bbbbff", " #ddb000", " #b0dd00", " #e2bbff", " #ffbbe3", "#ff7777", " #ff9900", " #83dd00", " #77e3ff", " #778fff", "#c877ff", " #ff77ab", " #ff6600", " #aa8800", " #77c7ff", "#ad77ff", " #ff77ff", " #dd0083", " #777700", " #00aa00", "#0088aa", " #8400dd", " #aa0088", " #dd0000", " #772e00"], N = D, H = "rgba(255,255,0,0.5)", B = H, R = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i, G = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#0ff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000",
        blanchedalmond: "#ffebcd",
        blue: "#00f",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#0ff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgrey: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#f0f",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        grey: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgrey: "#d3d3d3",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#789",
        lightslategrey: "#789",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#0f0",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#f0f",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370d8",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#d87093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#f00",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#fff",
        whitesmoke: "#f5f5f5",
        yellow: "#ff0",
        yellowgreen: "#9acd32"
    };
    return {
        customPalette: t,
        resetPalette: i,
        getColor: n,
        getHighlightColor: r,
        customHighlight: a,
        resetHighlight: o,
        getRadialGradient: s,
        getLinearGradient: l,
        getGradientColors: d,
        getStepColors: h,
        reverse: w,
        mix: X,
        lift: W,
        trim: L,
        random: I,
        toRGB: V,
        toRGBA: u,
        toHex: U,
        toHSL: x,
        toHSLA: _,
        toHSB: b,
        toHSBA: f,
        toHSV: g,
        toHSVA: y,
        toName: k,
        toColor: m,
        toArray: c,
        alpha: S,
        getData: K
    }
}), define("echarts/component/timeline", ["require", "./base", "zrender/shape/Rectangle", "../util/shape/Icon", "../util/shape/Chain", "../config", "zrender/tool/util", "zrender/tool/area", "zrender/tool/event", "../component"], function (e) {
    function t(e, t, i, a, o) {
        n.call(this, e, t, i, a, o);
        var r = this;
        if (r._onclick = function (e) {
                return r.__onclick(e)
            }, r._ondrift = function (e, t) {
                return r.__ondrift(this, e, t)
            }, r._ondragend = function () {
                return r.__ondragend()
            }, r._setCurrentOption = function () {
                var e = r.timelineOption;
                r.currentIndex %= e.data.length;
                var t = r.options[r.currentIndex] || {};
                r.myChart.setOption(t, e.notMerge), r.messageCenter.dispatch(s.EVENT.TIMELINE_CHANGED, null, {
                    currentIndex: r.currentIndex,
                    data: null != e.data[r.currentIndex].name ? e.data[r.currentIndex].name : e.data[r.currentIndex]
                }, r.myChart)
            }, r._onFrame = function () {
                r._setCurrentOption(), r._syncHandleShape(), r.timelineOption.autoPlay && (r.playTicket = setTimeout(function () {
                    return r.currentIndex += 1, !r.timelineOption.loop && r.currentIndex >= r.timelineOption.data.length ? (r.currentIndex = r.timelineOption.data.length - 1, void r.stop()) : void r._onFrame()
                }, r.timelineOption.playInterval))
            }, this.setTheme(!1), this.options = this.option.options, this.currentIndex = this.timelineOption.currentIndex % this.timelineOption.data.length, this.timelineOption.notMerge || 0 === this.currentIndex || (this.options[this.currentIndex] = l.merge(this.options[this.currentIndex], this.options[0])), this.timelineOption.show && (this._buildShape(), this._syncHandleShape()), this._setCurrentOption(), this.timelineOption.autoPlay) {
            var r = this;
            this.playTicket = setTimeout(function () {
                r.play()
            }, this.ecTheme.animationDuration)
        }
    }

    function i(e, t) {
        var i = 2, n = t.x + i, a = t.y + i + 2, r = t.width - i, s = t.height - i, l = t.symbol;
        if ("last" === l)e.moveTo(n + r - 2, a + s / 3), e.lineTo(n + r - 2, a), e.lineTo(n + 2, a + s / 2), e.lineTo(n + r - 2, a + s), e.lineTo(n + r - 2, a + s / 3 * 2), e.moveTo(n, a), e.lineTo(n, a); else if ("next" === l)e.moveTo(n + 2, a + s / 3), e.lineTo(n + 2, a), e.lineTo(n + r - 2, a + s / 2), e.lineTo(n + 2, a + s), e.lineTo(n + 2, a + s / 3 * 2), e.moveTo(n, a), e.lineTo(n, a); else if ("play" === l)if ("stop" === t.status)e.moveTo(n + 2, a), e.lineTo(n + r - 2, a + s / 2), e.lineTo(n + 2, a + s), e.lineTo(n + 2, a); else {
            var h = "both" === t.brushType ? 2 : 3;
            e.rect(n + 2, a, h, s), e.rect(n + r - h - 2, a, h, s)
        } else if (l.match("image")) {
            var d = "";
            d = l.replace(new RegExp("^image:\\/\\/"), ""), l = o.prototype.iconLibrary.image, l(e, {
                x: n,
                y: a,
                width: r,
                height: s,
                image: d
            })
        }
    }

    var n = e("./base"), a = e("zrender/shape/Rectangle"), o = e("../util/shape/Icon"), r = e("../util/shape/Chain"), s = e("../config"), l = e("zrender/tool/util"), h = e("zrender/tool/area"), d = e("zrender/tool/event");
    return t.prototype = {
        type: s.COMPONENT_TYPE_TIMELINE, _buildShape: function () {
            if (this._location = this._getLocation(), this._buildBackground(), this._buildControl(), this._chainPoint = this._getChainPoint(), this.timelineOption.label.show)for (var e = this._getInterval(), t = 0, i = this._chainPoint.length; i > t; t += e)this._chainPoint[t].showLabel = !0;
            this._buildChain(), this._buildHandle();
            for (var t = 0, n = this.shapeList.length; n > t; t++)this.zr.addShape(this.shapeList[t])
        }, _getLocation: function () {
            var e, t = this.timelineOption, i = this.reformCssArray(this.timelineOption.padding), n = this.zr.getWidth(), a = this.parsePercent(t.x, n), o = this.parsePercent(t.x2, n);
            null == t.width ? (e = n - a - o, o = n - o) : (e = this.parsePercent(t.width, n), o = a + e);
            var r, s, l = this.zr.getHeight(), h = this.parsePercent(t.height, l);
            return null != t.y ? (r = this.parsePercent(t.y, l), s = r + h) : (s = l - this.parsePercent(t.y2, l), r = s - h), {
                x: a + i[3],
                y: r + i[0],
                x2: o - i[1],
                y2: s - i[2],
                width: e - i[1] - i[3],
                height: h - i[0] - i[2]
            }
        }, _getReformedLabel: function (e) {
            var t = this.timelineOption, i = null != t.data[e].name ? t.data[e].name : t.data[e], n = t.data[e].formatter || t.label.formatter;
            return n && ("function" == typeof n ? i = n.call(this.myChart, i) : "string" == typeof n && (i = n.replace("{value}", i))), i
        }, _getInterval: function () {
            var e = this._chainPoint, t = this.timelineOption, i = t.label.interval;
            if ("auto" === i) {
                var n = t.label.textStyle.fontSize, a = t.data, o = t.data.length;
                if (o > 3) {
                    var r, s, l = !1;
                    for (i = 0; !l && o > i;) {
                        i++, l = !0;
                        for (var d = i; o > d; d += i) {
                            if (r = e[d].x - e[d - i].x, 0 !== t.label.rotate)s = n; else if (a[d].textStyle)s = h.getTextWidth(e[d].name, e[d].textFont); else {
                                var m = e[d].name + "", c = (m.match(/\w/g) || "").length, p = m.length - c;
                                s = c * n * 2 / 3 + p * n
                            }
                            if (s > r) {
                                l = !1;
                                break
                            }
                        }
                    }
                } else i = 1
            } else i = i - 0 + 1;
            return i
        }, _getChainPoint: function () {
            function e(e) {
                return null != h[e].name ? h[e].name : h[e] + ""
            }

            var t, i = this.timelineOption, n = i.symbol.toLowerCase(), a = i.symbolSize, o = i.label.rotate, r = i.label.textStyle, s = this.getFont(r), h = i.data, d = this._location.x, m = this._location.y + this._location.height / 4 * 3, c = this._location.x2 - this._location.x, p = h.length, u = [];
            if (p > 1) {
                var V = c / p;
                if (V = V > 50 ? 50 : 20 > V ? 5 : V, c -= 2 * V, "number" === i.type)for (var U = 0; p > U; U++)u.push(d + V + c / (p - 1) * U); else {
                    u[0] = new Date(e(0).replace(/-/g, "/")), u[p - 1] = new Date(e(p - 1).replace(/-/g, "/")) - u[0];
                    for (var U = 1; p > U; U++)u[U] = d + V + c * (new Date(e(U).replace(/-/g, "/")) - u[0]) / u[p - 1];
                    u[0] = d + V
                }
            } else u.push(d + c / 2);
            for (var y, g, f, b, _, x = [], U = 0; p > U; U++)d = u[U], y = h[U].symbol && h[U].symbol.toLowerCase() || n, y.match("empty") ? (y = y.replace("empty", ""), f = !0) : f = !1, y.match("star") && (g = y.replace("star", "") - 0 || 5, y = "star"), t = h[U].textStyle ? l.merge(h[U].textStyle || {}, r) : r, b = t.align || "center", o ? (b = o > 0 ? "right" : "left", _ = [o * Math.PI / 180, d, m - 5]) : _ = !1, x.push({
                x: d,
                n: g,
                isEmpty: f,
                symbol: y,
                symbolSize: h[U].symbolSize || a,
                color: h[U].color,
                borderColor: h[U].borderColor,
                borderWidth: h[U].borderWidth,
                name: this._getReformedLabel(U),
                textColor: t.color,
                textAlign: b,
                textBaseline: t.baseline || "middle",
                textX: d,
                textY: m - (o ? 5 : 0),
                textFont: h[U].textStyle ? this.getFont(t) : s,
                rotation: _,
                showLabel: !1
            });
            return x
        }, _buildBackground: function () {
            var e = this.timelineOption, t = this.reformCssArray(this.timelineOption.padding), i = this._location.width, n = this._location.height;
            (0 !== e.borderWidth || "rgba(0,0,0,0)" != e.backgroundColor.replace(/\s/g, "")) && this.shapeList.push(new a({
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: this._location.x - t[3],
                    y: this._location.y - t[0],
                    width: i + t[1] + t[3],
                    height: n + t[0] + t[2],
                    brushType: 0 === e.borderWidth ? "fill" : "both",
                    color: e.backgroundColor,
                    strokeColor: e.borderColor,
                    lineWidth: e.borderWidth
                }
            }))
        }, _buildControl: function () {
            var e = this, t = this.timelineOption, i = t.lineStyle, n = t.controlStyle;
            if ("none" !== t.controlPosition) {
                var a, r = 15, s = 5;
                "left" === t.controlPosition ? (a = this._location.x, this._location.x += 3 * (r + s)) : (a = this._location.x2 - (3 * (r + s) - s), this._location.x2 -= 3 * (r + s));
                var h = this._location.y, d = {
                    zlevel: this._zlevelBase + 1,
                    style: {
                        iconType: "timelineControl",
                        symbol: "last",
                        x: a,
                        y: h,
                        width: r,
                        height: r,
                        brushType: "stroke",
                        color: n.normal.color,
                        strokeColor: n.normal.color,
                        lineWidth: i.width
                    },
                    highlightStyle: {color: n.emphasis.color, strokeColor: n.emphasis.color, lineWidth: i.width + 1},
                    clickable: !0
                };
                this._ctrLastShape = new o(d), this._ctrLastShape.onclick = function () {
                    e.last()
                }, this.shapeList.push(this._ctrLastShape), a += r + s, this._ctrPlayShape = new o(l.clone(d)), this._ctrPlayShape.style.brushType = "fill", this._ctrPlayShape.style.symbol = "play", this._ctrPlayShape.style.status = this.timelineOption.autoPlay ? "playing" : "stop", this._ctrPlayShape.style.x = a, this._ctrPlayShape.onclick = function () {
                    "stop" === e._ctrPlayShape.style.status ? e.play() : e.stop()
                }, this.shapeList.push(this._ctrPlayShape), a += r + s, this._ctrNextShape = new o(l.clone(d)), this._ctrNextShape.style.symbol = "next", this._ctrNextShape.style.x = a, this._ctrNextShape.onclick = function () {
                    e.next()
                }, this.shapeList.push(this._ctrNextShape)
            }
        }, _buildChain: function () {
            var e = this.timelineOption, t = e.lineStyle;
            this._timelineShae = {
                zlevel: this._zlevelBase,
                style: {
                    x: this._location.x,
                    y: this.subPixelOptimize(this._location.y, t.width),
                    width: this._location.x2 - this._location.x,
                    height: this._location.height,
                    chainPoint: this._chainPoint,
                    brushType: "both",
                    strokeColor: t.color,
                    lineWidth: t.width,
                    lineType: t.type
                },
                hoverable: !1,
                clickable: !0,
                onclick: this._onclick
            }, this._timelineShae = new r(this._timelineShae), this.shapeList.push(this._timelineShae)
        }, _buildHandle: function () {
            var e = this._chainPoint[this.currentIndex], t = e.symbolSize + 1;
            t = 5 > t ? 5 : t, this._handleShape = {
                zlevel: this._zlevelBase + 1,
                hoverable: !1,
                draggable: !0,
                style: {
                    iconType: "diamond",
                    n: e.n,
                    x: e.x - t,
                    y: this._location.y + this._location.height / 4 - t,
                    width: 2 * t,
                    height: 2 * t,
                    brushType: "both",
                    textPosition: "specific",
                    textX: e.x,
                    textY: this._location.y - this._location.height / 4,
                    textAlign: "center",
                    textBaseline: "middle"
                },
                highlightStyle: {},
                ondrift: this._ondrift,
                ondragend: this._ondragend
            }, this._handleShape = new o(this._handleShape), this.shapeList.push(this._handleShape)
        }, _syncHandleShape: function () {
            if (this.timelineOption.show) {
                var e = this.timelineOption, t = e.checkpointStyle, i = this._chainPoint[this.currentIndex];
                this._handleShape.style.text = t.label.show ? i.name : "", this._handleShape.style.textFont = i.textFont, this._handleShape.style.n = i.n, "auto" === t.symbol ? this._handleShape.style.iconType = "none" != i.symbol ? i.symbol : "diamond" : (this._handleShape.style.iconType = t.symbol, t.symbol.match("star") && (this._handleShape.style.n = t.symbol.replace("star", "") - 0 || 5, this._handleShape.style.iconType = "star"));
                var n;
                "auto" === t.symbolSize ? (n = i.symbolSize + 2, n = 5 > n ? 5 : n) : n = t.symbolSize - 0, this._handleShape.style.color = "auto" === t.color ? i.color ? i.color : e.controlStyle.emphasis.color : t.color, this._handleShape.style.textColor = "auto" === t.label.textStyle.color ? this._handleShape.style.color : t.label.textStyle.color, this._handleShape.highlightStyle.strokeColor = this._handleShape.style.strokeColor = "auto" === t.borderColor ? i.borderColor ? i.borderColor : "#fff" : t.borderColor, this._handleShape.style.lineWidth = "auto" === t.borderWidth ? i.borderWidth ? i.borderWidth : 0 : t.borderWidth - 0, this._handleShape.highlightStyle.lineWidth = this._handleShape.style.lineWidth + 1, this.zr.animate(this._handleShape.id, "style").when(500, {
                    x: i.x - n,
                    textX: i.x,
                    y: this._location.y + this._location.height / 4 - n,
                    width: 2 * n,
                    height: 2 * n
                }).start("ExponentialOut")
            }
        }, _findChainIndex: function (e) {
            var t = this._chainPoint, i = t.length;
            if (e <= t[0].x)return 0;
            if (e >= t[i - 1].x)return i - 1;
            for (var n = 0; i - 1 > n; n++)if (e >= t[n].x && e <= t[n + 1].x)return Math.abs(e - t[n].x) < Math.abs(e - t[n + 1].x) ? n : n + 1
        }, __onclick: function (e) {
            var t = d.getX(e.event), i = this._findChainIndex(t);
            return i === this.currentIndex ? !0 : (this.currentIndex = i, this.timelineOption.autoPlay && this.stop(), clearTimeout(this.playTicket), void this._onFrame())
        }, __ondrift: function (e, t) {
            this.timelineOption.autoPlay && this.stop();
            var i, n = this._chainPoint, a = n.length;
            e.style.x + t <= n[0].x - n[0].symbolSize ? (e.style.x = n[0].x - n[0].symbolSize, i = 0) : e.style.x + t >= n[a - 1].x - n[a - 1].symbolSize ? (e.style.x = n[a - 1].x - n[a - 1].symbolSize, i = a - 1) : (e.style.x += t, i = this._findChainIndex(e.style.x));
            var o = n[i], r = o.symbolSize + 2;
            if (e.style.iconType = o.symbol, e.style.n = o.n, e.style.textX = e.style.x + r / 2, e.style.y = this._location.y + this._location.height / 4 - r, e.style.width = 2 * r, e.style.height = 2 * r, e.style.text = o.name, i === this.currentIndex)return !0;
            if (this.currentIndex = i, this.timelineOption.realtime) {
                clearTimeout(this.playTicket);
                var s = this;
                this.playTicket = setTimeout(function () {
                    s._setCurrentOption()
                }, 200)
            }
            return !0
        }, __ondragend: function () {
            this.isDragend = !0
        }, ondragend: function (e, t) {
            this.isDragend && e.target && (!this.timelineOption.realtime && this._setCurrentOption(), t.dragOut = !0, t.dragIn = !0, t.needRefresh = !1, this.isDragend = !1, this._syncHandleShape())
        }, last: function () {
            return this.timelineOption.autoPlay && this.stop(), this.currentIndex -= 1, this.currentIndex < 0 && (this.currentIndex = this.timelineOption.data.length - 1), this._onFrame(), this.currentIndex
        }, next: function () {
            return this.timelineOption.autoPlay && this.stop(), this.currentIndex += 1, this.currentIndex >= this.timelineOption.data.length && (this.currentIndex = 0), this._onFrame(), this.currentIndex
        }, play: function (e, t) {
            return this._ctrPlayShape && "playing" != this._ctrPlayShape.style.status && (this._ctrPlayShape.style.status = "playing", this.zr.modShape(this._ctrPlayShape.id), this.zr.refresh()), this.timelineOption.autoPlay = null != t ? t : !0, this.timelineOption.autoPlay || clearTimeout(this.playTicket), this.currentIndex = null != e ? e : this.currentIndex + 1, this.currentIndex >= this.timelineOption.data.length && (this.currentIndex = 0), this._onFrame(), this.currentIndex
        }, stop: function () {
            return this._ctrPlayShape && "stop" != this._ctrPlayShape.style.status && (this._ctrPlayShape.style.status = "stop", this.zr.modShape(this._ctrPlayShape.id), this.zr.refresh()), this.timelineOption.autoPlay = !1, clearTimeout(this.playTicket), this.currentIndex
        }, resize: function () {
            this.timelineOption.show && (this.clear(), this._buildShape(), this._syncHandleShape())
        }, setTheme: function (e) {
            this.timelineOption = this.reformOption(l.clone(this.option.timeline)), this.timelineOption.label.textStyle = l.merge(this.timelineOption.label.textStyle || {}, this.ecTheme.textStyle), this.timelineOption.checkpointStyle.label.textStyle = l.merge(this.timelineOption.checkpointStyle.label.textStyle || {}, this.ecTheme.textStyle), this.myChart.canvasSupported || (this.timelineOption.realtime = !1), this.timelineOption.show && e && (this.clear(), this._buildShape(), this._syncHandleShape())
        }, onbeforDispose: function () {
            clearTimeout(this.playTicket)
        }
    }, o.prototype.iconLibrary.timelineControl = i, l.inherits(t, n), e("../component").define("timeline", t), t
}), define("zrender/shape/Image", ["require", "./Base", "../tool/util"], function (e) {
    var t = e("./Base"), i = function (e) {
        t.call(this, e)
    };
    return i.prototype = {
        type: "image", brush: function (e, t, i) {
            var n = this.style || {};
            t && (n = this.getHighlightStyle(n, this.highlightStyle || {}));
            var a = n.image, o = this;
            if (this._imageCache || (this._imageCache = {}), "string" == typeof a) {
                var r = a;
                this._imageCache[r] ? a = this._imageCache[r] : (a = new Image, a.onload = function () {
                    a.onload = null, o.modSelf(), i()
                }, a.src = r, this._imageCache[r] = a)
            }
            if (a) {
                if ("IMG" == a.nodeName.toUpperCase())if (window.ActiveXObject) {
                    if ("complete" != a.readyState)return
                } else if (!a.complete)return;
                var s = n.width || a.width, l = n.height || a.height, h = n.x, d = n.y;
                if (!a.width || !a.height)return;
                if (e.save(), this.doClip(e), this.setContext(e, n), this.setTransform(e), n.sWidth && n.sHeight) {
                    var m = n.sx || 0, c = n.sy || 0;
                    e.drawImage(a, m, c, n.sWidth, n.sHeight, h, d, s, l)
                } else if (n.sx && n.sy) {
                    var m = n.sx, c = n.sy, p = s - m, u = l - c;
                    e.drawImage(a, m, c, p, u, h, d, s, l)
                } else e.drawImage(a, h, d, s, l);
                n.width || (n.width = s), n.height || (n.height = l), this.style.width || (this.style.width = s), this.style.height || (this.style.height = l), this.drawText(e, n, this.style), e.restore()
            }
        }, getRect: function (e) {
            return {x: e.x, y: e.y, width: e.width, height: e.height}
        }, clearCache: function () {
            this._imageCache = {}
        }
    }, e("../tool/util").inherits(i, t), i
}), define("zrender/loadingEffect/Bar", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Rectangle"], function (e) {
    function t(e) {
        i.call(this, e)
    }

    var i = e("./Base"), n = e("../tool/util"), a = e("../tool/color"), o = e("../shape/Rectangle");
    return n.inherits(t, i), t.prototype._start = function (e, t) {
        var i = n.merge(this.options, {
            textStyle: {color: "#888"},
            backgroundColor: "rgba(250, 250, 250, 0.8)",
            effectOption: {
                x: 0,
                y: this.canvasHeight / 2 - 30,
                width: this.canvasWidth,
                height: 5,
                brushType: "fill",
                timeInterval: 100
            }
        }), r = this.createTextShape(i.textStyle), s = this.createBackgroundShape(i.backgroundColor), l = i.effectOption, h = new o({highlightStyle: n.clone(l)});
        return h.highlightStyle.color = l.color || a.getLinearGradient(l.x, l.y, l.x + l.width, l.y + l.height, [[0, "#ff6400"], [.5, "#ffe100"], [1, "#b1ff00"]]), null != i.progress ? (e(s), h.highlightStyle.width = this.adjust(i.progress, [0, 1]) * i.effectOption.width, e(h), e(r), void t()) : (h.highlightStyle.width = 0, setInterval(function () {
            e(s), h.highlightStyle.width < l.width ? h.highlightStyle.width += 8 : h.highlightStyle.width = 0, e(h), e(r), t()
        }, l.timeInterval))
    }, t
}), define("zrender/loadingEffect/Bubble", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Circle"], function (e) {
    function t(e) {
        i.call(this, e)
    }

    var i = e("./Base"), n = e("../tool/util"), a = e("../tool/color"), o = e("../shape/Circle");
    return n.inherits(t, i), t.prototype._start = function (e, t) {
        for (var i = n.merge(this.options, {
            textStyle: {color: "#888"},
            backgroundColor: "rgba(250, 250, 250, 0.8)",
            effect: {n: 50, lineWidth: 2, brushType: "stroke", color: "random", timeInterval: 100}
        }), r = this.createTextShape(i.textStyle), s = this.createBackgroundShape(i.backgroundColor), l = i.effect, h = l.n, d = l.brushType, m = l.lineWidth, c = [], p = this.canvasWidth, u = this.canvasHeight, V = 0; h > V; V++) {
            var U = "random" == l.color ? a.alpha(a.random(), .3) : l.color;
            c[V] = new o({
                highlightStyle: {
                    x: Math.ceil(Math.random() * p),
                    y: Math.ceil(Math.random() * u),
                    r: Math.ceil(40 * Math.random()),
                    brushType: d,
                    color: U,
                    strokeColor: U,
                    lineWidth: m
                }, animationY: Math.ceil(20 * Math.random())
            })
        }
        return setInterval(function () {
            e(s);
            for (var i = 0; h > i; i++) {
                var n = c[i].highlightStyle;
                n.y - c[i].animationY + n.r <= 0 && (c[i].highlightStyle.y = u + n.r, c[i].highlightStyle.x = Math.ceil(Math.random() * p)), c[i].highlightStyle.y -= c[i].animationY, e(c[i])
            }
            e(r), t()
        }, l.timeInterval)
    }, t
}), define("zrender/loadingEffect/DynamicLine", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Line"], function (e) {
    function t(e) {
        i.call(this, e)
    }

    var i = e("./Base"), n = e("../tool/util"), a = e("../tool/color"), o = e("../shape/Line");
    return n.inherits(t, i), t.prototype._start = function (e, t) {
        for (var i = n.merge(this.options, {
            textStyle: {color: "#fff"},
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            effectOption: {n: 30, lineWidth: 1, color: "random", timeInterval: 100}
        }), r = this.createTextShape(i.textStyle), s = this.createBackgroundShape(i.backgroundColor), l = i.effectOption, h = l.n, d = l.lineWidth, m = [], c = this.canvasWidth, p = this.canvasHeight, u = 0; h > u; u++) {
            var V = -Math.ceil(1e3 * Math.random()), U = Math.ceil(400 * Math.random()), y = Math.ceil(Math.random() * p), g = "random" == l.color ? a.random() : l.color;
            m[u] = new o({
                highlightStyle: {xStart: V, yStart: y, xEnd: V + U, yEnd: y, strokeColor: g, lineWidth: d},
                animationX: Math.ceil(100 * Math.random()),
                len: U
            })
        }
        return setInterval(function () {
            e(s);
            for (var i = 0; h > i; i++) {
                var n = m[i].highlightStyle;
                n.xStart >= c && (m[i].len = Math.ceil(400 * Math.random()), n.xStart = -400, n.xEnd = -400 + m[i].len, n.yStart = Math.ceil(Math.random() * p), n.yEnd = n.yStart), n.xStart += m[i].animationX, n.xEnd += m[i].animationX, e(m[i])
            }
            e(r), t()
        }, l.timeInterval)
    }, t
}), define("zrender/loadingEffect/Ring", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Ring", "../shape/Sector"], function (e) {
    function t(e) {
        i.call(this, e)
    }

    var i = e("./Base"), n = e("../tool/util"), a = e("../tool/color"), o = e("../shape/Ring"), r = e("../shape/Sector");
    return n.inherits(t, i), t.prototype._start = function (e, t) {
        var i = n.merge(this.options, {
            textStyle: {color: "#07a"},
            backgroundColor: "rgba(250, 250, 250, 0.8)",
            effect: {
                x: this.canvasWidth / 2,
                y: this.canvasHeight / 2,
                r0: 60,
                r: 100,
                color: "#bbdcff",
                brushType: "fill",
                textPosition: "inside",
                textFont: "normal 30px verdana",
                textColor: "rgba(30, 144, 255, 0.6)",
                timeInterval: 100
            }
        }), s = i.effect, l = i.textStyle;
        null == l.x && (l.x = s.x), null == l.y && (l.y = s.y + (s.r0 + s.r) / 2 - 5);
        for (var h = this.createTextShape(i.textStyle), d = this.createBackgroundShape(i.backgroundColor), m = s.x, c = s.y, p = s.r0 + 6, u = s.r - 6, V = s.color, U = a.lift(V, .1), y = new o({highlightStyle: n.clone(s)}), g = [], f = a.getGradientColors(["#ff6400", "#ffe100", "#97ff00"], 25), b = 15, _ = 240, x = 0; 16 > x; x++)g.push(new r({
            highlightStyle: {
                x: m,
                y: c,
                r0: p,
                r: u,
                startAngle: _ - b,
                endAngle: _,
                brushType: "fill",
                color: U
            },
            _color: a.getLinearGradient(m + p * Math.cos(_, !0), c - p * Math.sin(_, !0), m + p * Math.cos(_ - b, !0), c - p * Math.sin(_ - b, !0), [[0, f[2 * x]], [1, f[2 * x + 1]]])
        })), _ -= b;
        _ = 360;
        for (var x = 0; 4 > x; x++)g.push(new r({
            highlightStyle: {
                x: m,
                y: c,
                r0: p,
                r: u,
                startAngle: _ - b,
                endAngle: _,
                brushType: "fill",
                color: U
            },
            _color: a.getLinearGradient(m + p * Math.cos(_, !0), c - p * Math.sin(_, !0), m + p * Math.cos(_ - b, !0), c - p * Math.sin(_ - b, !0), [[0, f[2 * x + 32]], [1, f[2 * x + 33]]])
        })), _ -= b;
        var k = 0;
        if (null != i.progress) {
            e(d), k = 100 * this.adjust(i.progress, [0, 1]).toFixed(2) / 5, y.highlightStyle.text = 5 * k + "%", e(y);
            for (var x = 0; 20 > x; x++)g[x].highlightStyle.color = k > x ? g[x]._color : U, e(g[x]);
            return e(h), void t()
        }
        return setInterval(function () {
            e(d), k += k >= 20 ? -20 : 1, e(y);
            for (var i = 0; 20 > i; i++)g[i].highlightStyle.color = k > i ? g[i]._color : U, e(g[i]);
            e(h), t()
        }, s.timeInterval)
    }, t
}), define("zrender/loadingEffect/Spin", ["require", "./Base", "../tool/util", "../tool/color", "../tool/area", "../shape/Sector"], function (e) {
    function t(e) {
        i.call(this, e)
    }

    var i = e("./Base"), n = e("../tool/util"), a = e("../tool/color"), o = e("../tool/area"), r = e("../shape/Sector");
    return n.inherits(t, i), t.prototype._start = function (e, t) {
        var i = n.merge(this.options, {
            textStyle: {color: "#fff", textAlign: "start"},
            backgroundColor: "rgba(0, 0, 0, 0.8)"
        }), s = this.createTextShape(i.textStyle), l = 10, h = o.getTextWidth(s.highlightStyle.text, s.highlightStyle.textFont), d = o.getTextHeight(s.highlightStyle.text, s.highlightStyle.textFont), m = n.merge(this.options.effect || {}, {
            r0: 9,
            r: 15,
            n: 18,
            color: "#fff",
            timeInterval: 100
        }), c = this.getLocation(this.options.textStyle, h + l + 2 * m.r, Math.max(2 * m.r, d));
        m.x = c.x + m.r, m.y = s.highlightStyle.y = c.y + c.height / 2, s.highlightStyle.x = m.x + m.r + l;
        for (var p = this.createBackgroundShape(i.backgroundColor), u = m.n, V = m.x, U = m.y, y = m.r0, g = m.r, f = m.color, b = [], _ = Math.round(180 / u), x = 0; u > x; x++)b[x] = new r({
            highlightStyle: {
                x: V,
                y: U,
                r0: y,
                r: g,
                startAngle: _ * x * 2,
                endAngle: _ * x * 2 + _,
                color: a.alpha(f, (x + 1) / u),
                brushType: "fill"
            }
        });
        var k = [0, V, U];
        return setInterval(function () {
            e(p), k[0] -= .3;
            for (var i = 0; u > i; i++)b[i].rotation = k, e(b[i]);
            e(s), t()
        }, m.timeInterval)
    }, t
}), define("zrender/loadingEffect/Whirling", ["require", "./Base", "../tool/util", "../tool/area", "../shape/Ring", "../shape/Droplet", "../shape/Circle"], function (e) {
    function t(e) {
        i.call(this, e)
    }

    var i = e("./Base"), n = e("../tool/util"), a = e("../tool/area"), o = e("../shape/Ring"), r = e("../shape/Droplet"), s = e("../shape/Circle");
    return n.inherits(t, i), t.prototype._start = function (e, t) {
        var i = n.merge(this.options, {
            textStyle: {color: "#888", textAlign: "start"},
            backgroundColor: "rgba(250, 250, 250, 0.8)"
        }), l = this.createTextShape(i.textStyle), h = 10, d = a.getTextWidth(l.highlightStyle.text, l.highlightStyle.textFont), m = a.getTextHeight(l.highlightStyle.text, l.highlightStyle.textFont), c = n.merge(this.options.effect || {}, {
            r: 18,
            colorIn: "#fff",
            colorOut: "#555",
            colorWhirl: "#6cf",
            timeInterval: 50
        }), p = this.getLocation(this.options.textStyle, d + h + 2 * c.r, Math.max(2 * c.r, m));
        c.x = p.x + c.r, c.y = l.highlightStyle.y = p.y + p.height / 2, l.highlightStyle.x = c.x + c.r + h;
        var u = this.createBackgroundShape(i.backgroundColor), V = new r({
            highlightStyle: {
                a: Math.round(c.r / 2),
                b: Math.round(c.r - c.r / 6),
                brushType: "fill",
                color: c.colorWhirl
            }
        }), U = new s({
            highlightStyle: {
                r: Math.round(c.r / 6),
                brushType: "fill",
                color: c.colorIn
            }
        }), y = new o({
            highlightStyle: {
                r0: Math.round(c.r - c.r / 3),
                r: c.r,
                brushType: "fill",
                color: c.colorOut
            }
        }), g = [0, c.x, c.y];
        return V.highlightStyle.x = U.highlightStyle.x = y.highlightStyle.x = g[1], V.highlightStyle.y = U.highlightStyle.y = y.highlightStyle.y = g[2], setInterval(function () {
            e(u), e(y), g[0] -= .3, V.rotation = g, e(V), e(U), e(l), t()
        }, c.timeInterval)
    }, t
}), define("echarts/theme/default", [], function () {
    var e = {};
    return e
}), define("zrender/dep/excanvas", ["require"], function () {
    return document.createElement("canvas").getContext ? G_vmlCanvasManager = !1 : !function () {
        function e() {
            return this.context_ || (this.context_ = new b(this))
        }

        function t(e, t) {
            var i = O.call(arguments, 2);
            return function () {
                return e.apply(t, i.concat(O.call(arguments)))
            }
        }

        function i(e) {
            return String(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
        }

        function n(e, t, i) {
            e.namespaces[t] || e.namespaces.add(t, i, "#default#VML")
        }

        function a(e) {
            if (n(e, "g_vml_", "urn:schemas-microsoft-com:vml"), n(e, "g_o_", "urn:schemas-microsoft-com:office:office"), !e.styleSheets.ex_canvas_) {
                var t = e.createStyleSheet();
                t.owningElement.id = "ex_canvas_", t.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"
            }
        }

        function o(e) {
            var t = e.srcElement;
            switch (e.propertyName) {
                case"width":
                    t.getContext().clearRect(), t.style.width = t.attributes.width.nodeValue + "px", t.firstChild.style.width = t.clientWidth + "px";
                    break;
                case"height":
                    t.getContext().clearRect(), t.style.height = t.attributes.height.nodeValue + "px", t.firstChild.style.height = t.clientHeight + "px"
            }
        }

        function r(e) {
            var t = e.srcElement;
            t.firstChild && (t.firstChild.style.width = t.clientWidth + "px", t.firstChild.style.height = t.clientHeight + "px")
        }

        function s() {
            return [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
        }

        function l(e, t) {
            for (var i = s(), n = 0; 3 > n; n++)for (var a = 0; 3 > a; a++) {
                for (var o = 0, r = 0; 3 > r; r++)o += e[n][r] * t[r][a];
                i[n][a] = o
            }
            return i
        }

        function h(e, t) {
            t.fillStyle = e.fillStyle, t.lineCap = e.lineCap, t.lineJoin = e.lineJoin, t.lineWidth = e.lineWidth, t.miterLimit = e.miterLimit, t.shadowBlur = e.shadowBlur, t.shadowColor = e.shadowColor, t.shadowOffsetX = e.shadowOffsetX, t.shadowOffsetY = e.shadowOffsetY, t.strokeStyle = e.strokeStyle, t.globalAlpha = e.globalAlpha, t.font = e.font, t.textAlign = e.textAlign, t.textBaseline = e.textBaseline, t.scaleX_ = e.scaleX_, t.scaleY_ = e.scaleY_, t.lineScale_ = e.lineScale_
        }

        function d(e) {
            var t = e.indexOf("(", 3), i = e.indexOf(")", t + 1), n = e.substring(t + 1, i).split(",");
            return (4 != n.length || "a" != e.charAt(3)) && (n[3] = 1), n
        }

        function m(e) {
            return parseFloat(e) / 100
        }

        function c(e, t, i) {
            return Math.min(i, Math.max(t, e))
        }

        function p(e) {
            var t, i, n, a, o, r;
            if (a = parseFloat(e[0]) / 360 % 360, 0 > a && a++, o = c(m(e[1]), 0, 1), r = c(m(e[2]), 0, 1), 0 == o)t = i = n = r; else {
                var s = .5 > r ? r * (1 + o) : r + o - r * o, l = 2 * r - s;
                t = u(l, s, a + 1 / 3), i = u(l, s, a), n = u(l, s, a - 1 / 3)
            }
            return "#" + D[Math.floor(255 * t)] + D[Math.floor(255 * i)] + D[Math.floor(255 * n)]
        }

        function u(e, t, i) {
            return 0 > i && i++, i > 1 && i--, 1 > 6 * i ? e + 6 * (t - e) * i : 1 > 2 * i ? t : 2 > 3 * i ? e + (t - e) * (2 / 3 - i) * 6 : e
        }

        function V(e) {
            if (e in R)return R[e];
            var t, i = 1;
            if (e = String(e), "#" == e.charAt(0))t = e; else if (/^rgb/.test(e)) {
                for (var n, a = d(e), t = "#", o = 0; 3 > o; o++)n = -1 != a[o].indexOf("%") ? Math.floor(255 * m(a[o])) : +a[o], t += D[c(n, 0, 255)];
                i = +a[3]
            } else if (/^hsl/.test(e)) {
                var a = d(e);
                t = p(a), i = a[3]
            } else t = B[e] || e;
            return R[e] = {color: t, alpha: i}
        }

        function U(e) {
            if (Y[e])return Y[e];
            var t, i = document.createElement("div"), n = i.style;
            try {
                n.font = e, t = n.fontFamily.split(",")[0]
            } catch (a) {
            }
            return Y[e] = {
                style: n.fontStyle || G.style,
                variant: n.fontVariant || G.variant,
                weight: n.fontWeight || G.weight,
                size: n.fontSize || G.size,
                family: t || G.family
            }
        }

        function y(e, t) {
            var i = {};
            for (var n in e)i[n] = e[n];
            var a = parseFloat(t.currentStyle.fontSize), o = parseFloat(e.size);
            return i.size = "number" == typeof e.size ? e.size : -1 != e.size.indexOf("px") ? o : -1 != e.size.indexOf("em") ? a * o : -1 != e.size.indexOf("%") ? a / 100 * o : -1 != e.size.indexOf("pt") ? o / .75 : a, i
        }

        function g(e) {
            return e.style + " " + e.variant + " " + e.weight + " " + e.size + "px '" + e.family + "'"
        }

        function f(e) {
            return Q[e] || "square"
        }

        function b(e) {
            this.m_ = s(), this.mStack_ = [], this.aStack_ = [], this.currentPath_ = [], this.strokeStyle = "#000", this.fillStyle = "#000", this.lineWidth = 1, this.lineJoin = "miter", this.lineCap = "butt", this.miterLimit = 1 * J, this.globalAlpha = 1, this.font = "12px 微软雅黑", this.textAlign = "left", this.textBaseline = "alphabetic", this.canvas = e;
            var t = "width:" + e.clientWidth + "px;height:" + e.clientHeight + "px;overflow:hidden;position:absolute", i = e.ownerDocument.createElement("div");
            i.style.cssText = t, e.appendChild(i);
            var n = i.cloneNode(!1);
            n.style.backgroundColor = "#fff", n.style.filter = "alpha(opacity=0)", e.appendChild(n), this.element_ = i, this.scaleX_ = 1, this.scaleY_ = 1, this.lineScale_ = 1
        }

        function _(e, t, i, n) {
            e.currentPath_.push({
                type: "bezierCurveTo",
                cp1x: t.x,
                cp1y: t.y,
                cp2x: i.x,
                cp2y: i.y,
                x: n.x,
                y: n.y
            }), e.currentX_ = n.x, e.currentY_ = n.y
        }

        function x(e, t) {
            var i = V(e.strokeStyle), n = i.color, a = i.alpha * e.globalAlpha, o = e.lineScale_ * e.lineWidth;
            1 > o && (a *= o), t.push("<g_vml_:stroke", ' opacity="', a, '"', ' joinstyle="', e.lineJoin, '"', ' miterlimit="', e.miterLimit, '"', ' endcap="', f(e.lineCap), '"', ' weight="', o, 'px"', ' color="', n, '" />')
        }

        function k(e, t, i, n) {
            var a = e.fillStyle, o = e.scaleX_, r = e.scaleY_, s = n.x - i.x, l = n.y - i.y;
            if (a instanceof w) {
                var h = 0, d = {x: 0, y: 0}, m = 0, c = 1;
                if ("gradient" == a.type_) {
                    var p = a.x0_ / o, u = a.y0_ / r, U = a.x1_ / o, y = a.y1_ / r, g = L(e, p, u), f = L(e, U, y), b = f.x - g.x, _ = f.y - g.y;
                    h = 180 * Math.atan2(b, _) / Math.PI, 0 > h && (h += 360), 1e-6 > h && (h = 0)
                } else {
                    var g = L(e, a.x0_, a.y0_);
                    d = {x: (g.x - i.x) / s, y: (g.y - i.y) / l}, s /= o * J, l /= r * J;
                    var x = T.max(s, l);
                    m = 2 * a.r0_ / x, c = 2 * a.r1_ / x - m
                }
                var k = a.colors_;
                k.sort(function (e, t) {
                    return e.offset - t.offset
                });
                for (var v = k.length, W = k[0].color, I = k[v - 1].color, K = k[0].alpha * e.globalAlpha, S = k[v - 1].alpha * e.globalAlpha, C = [], E = 0; v > E; E++) {
                    var A = k[E];
                    C.push(A.offset * c + m + " " + A.color)
                }
                t.push('<g_vml_:fill type="', a.type_, '"', ' method="none" focus="100%"', ' color="', W, '"', ' color2="', I, '"', ' colors="', C.join(","), '"', ' opacity="', S, '"', ' g_o_:opacity2="', K, '"', ' angle="', h, '"', ' focusposition="', d.x, ",", d.y, '" />')
            } else if (a instanceof X) {
                if (s && l) {
                    var z = -i.x, M = -i.y;
                    t.push("<g_vml_:fill", ' position="', z / s * o * o, ",", M / l * r * r, '"', ' type="tile"', ' src="', a.src_, '" />')
                }
            } else {
                var F = V(e.fillStyle), O = F.color, P = F.alpha * e.globalAlpha;
                t.push('<g_vml_:fill color="', O, '" opacity="', P, '" />')
            }
        }

        function L(e, t, i) {
            var n = e.m_;
            return {x: J * (t * n[0][0] + i * n[1][0] + n[2][0]) - F, y: J * (t * n[0][1] + i * n[1][1] + n[2][1]) - F}
        }

        function v(e) {
            return isFinite(e[0][0]) && isFinite(e[0][1]) && isFinite(e[1][0]) && isFinite(e[1][1]) && isFinite(e[2][0]) && isFinite(e[2][1])
        }

        function W(e, t, i) {
            if (v(t) && (e.m_ = t, e.scaleX_ = Math.sqrt(t[0][0] * t[0][0] + t[0][1] * t[0][1]), e.scaleY_ = Math.sqrt(t[1][0] * t[1][0] + t[1][1] * t[1][1]), i)) {
                var n = t[0][0] * t[1][1] - t[0][1] * t[1][0];
                e.lineScale_ = M(z(n))
            }
        }

        function w(e) {
            this.type_ = e, this.x0_ = 0, this.y0_ = 0, this.r0_ = 0, this.x1_ = 0, this.y1_ = 0, this.r1_ = 0, this.colors_ = []
        }

        function X(e, t) {
            switch (K(e), t) {
                case"repeat":
                case null:
                case"":
                    this.repetition_ = "repeat";
                    break;
                case"repeat-x":
                case"repeat-y":
                case"no-repeat":
                    this.repetition_ = t;
                    break;
                default:
                    I("SYNTAX_ERR")
            }
            this.src_ = e.src, this.width_ = e.width, this.height_ = e.height
        }

        function I(e) {
            throw new S(e)
        }

        function K(e) {
            e && 1 == e.nodeType && "IMG" == e.tagName || I("TYPE_MISMATCH_ERR"), "complete" != e.readyState && I("INVALID_STATE_ERR")
        }

        function S(e) {
            this.code = this[e], this.message = e + ": DOM Exception " + this.code
        }

        var T = Math, C = T.round, E = T.sin, A = T.cos, z = T.abs, M = T.sqrt, J = 10, F = J / 2, O = (+navigator.userAgent.match(/MSIE ([\d.]+)?/)[1], Array.prototype.slice);
        a(document);
        var P = {
            init: function (e) {
                var i = e || document;
                i.createElement("canvas"), i.attachEvent("onreadystatechange", t(this.init_, this, i))
            }, init_: function (e) {
                for (var t = e.getElementsByTagName("canvas"), i = 0; i < t.length; i++)this.initElement(t[i])
            }, initElement: function (t) {
                if (!t.getContext) {
                    t.getContext = e, a(t.ownerDocument), t.innerHTML = "", t.attachEvent("onpropertychange", o), t.attachEvent("onresize", r);
                    var i = t.attributes;
                    i.width && i.width.specified ? t.style.width = i.width.nodeValue + "px" : t.width = t.clientWidth, i.height && i.height.specified ? t.style.height = i.height.nodeValue + "px" : t.height = t.clientHeight
                }
                return t
            }
        };
        P.init();
        for (var D = [], N = 0; 16 > N; N++)for (var H = 0; 16 > H; H++)D[16 * N + H] = N.toString(16) + H.toString(16);
        var B = {
            aliceblue: "#F0F8FF",
            antiquewhite: "#FAEBD7",
            aquamarine: "#7FFFD4",
            azure: "#F0FFFF",
            beige: "#F5F5DC",
            bisque: "#FFE4C4",
            black: "#000000",
            blanchedalmond: "#FFEBCD",
            blueviolet: "#8A2BE2",
            brown: "#A52A2A",
            burlywood: "#DEB887",
            cadetblue: "#5F9EA0",
            chartreuse: "#7FFF00",
            chocolate: "#D2691E",
            coral: "#FF7F50",
            cornflowerblue: "#6495ED",
            cornsilk: "#FFF8DC",
            crimson: "#DC143C",
            cyan: "#00FFFF",
            darkblue: "#00008B",
            darkcyan: "#008B8B",
            darkgoldenrod: "#B8860B",
            darkgray: "#A9A9A9",
            darkgreen: "#006400",
            darkgrey: "#A9A9A9",
            darkkhaki: "#BDB76B",
            darkmagenta: "#8B008B",
            darkolivegreen: "#556B2F",
            darkorange: "#FF8C00",
            darkorchid: "#9932CC",
            darkred: "#8B0000",
            darksalmon: "#E9967A",
            darkseagreen: "#8FBC8F",
            darkslateblue: "#483D8B",
            darkslategray: "#2F4F4F",
            darkslategrey: "#2F4F4F",
            darkturquoise: "#00CED1",
            darkviolet: "#9400D3",
            deeppink: "#FF1493",
            deepskyblue: "#00BFFF",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1E90FF",
            firebrick: "#B22222",
            floralwhite: "#FFFAF0",
            forestgreen: "#228B22",
            gainsboro: "#DCDCDC",
            ghostwhite: "#F8F8FF",
            gold: "#FFD700",
            goldenrod: "#DAA520",
            grey: "#808080",
            greenyellow: "#ADFF2F",
            honeydew: "#F0FFF0",
            hotpink: "#FF69B4",
            indianred: "#CD5C5C",
            indigo: "#4B0082",
            ivory: "#FFFFF0",
            khaki: "#F0E68C",
            lavender: "#E6E6FA",
            lavenderblush: "#FFF0F5",
            lawngreen: "#7CFC00",
            lemonchiffon: "#FFFACD",
            lightblue: "#ADD8E6",
            lightcoral: "#F08080",
            lightcyan: "#E0FFFF",
            lightgoldenrodyellow: "#FAFAD2",
            lightgreen: "#90EE90",
            lightgrey: "#D3D3D3",
            lightpink: "#FFB6C1",
            lightsalmon: "#FFA07A",
            lightseagreen: "#20B2AA",
            lightskyblue: "#87CEFA",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            lightsteelblue: "#B0C4DE",
            lightyellow: "#FFFFE0",
            limegreen: "#32CD32",
            linen: "#FAF0E6",
            magenta: "#FF00FF",
            mediumaquamarine: "#66CDAA",
            mediumblue: "#0000CD",
            mediumorchid: "#BA55D3",
            mediumpurple: "#9370DB",
            mediumseagreen: "#3CB371",
            mediumslateblue: "#7B68EE",
            mediumspringgreen: "#00FA9A",
            mediumturquoise: "#48D1CC",
            mediumvioletred: "#C71585",
            midnightblue: "#191970",
            mintcream: "#F5FFFA",
            mistyrose: "#FFE4E1",
            moccasin: "#FFE4B5",
            navajowhite: "#FFDEAD",
            oldlace: "#FDF5E6",
            olivedrab: "#6B8E23",
            orange: "#FFA500",
            orangered: "#FF4500",
            orchid: "#DA70D6",
            palegoldenrod: "#EEE8AA",
            palegreen: "#98FB98",
            paleturquoise: "#AFEEEE",
            palevioletred: "#DB7093",
            papayawhip: "#FFEFD5",
            peachpuff: "#FFDAB9",
            peru: "#CD853F",
            pink: "#FFC0CB",
            plum: "#DDA0DD",
            powderblue: "#B0E0E6",
            rosybrown: "#BC8F8F",
            royalblue: "#4169E1",
            saddlebrown: "#8B4513",
            salmon: "#FA8072",
            sandybrown: "#F4A460",
            seagreen: "#2E8B57",
            seashell: "#FFF5EE",
            sienna: "#A0522D",
            skyblue: "#87CEEB",
            slateblue: "#6A5ACD",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#FFFAFA",
            springgreen: "#00FF7F",
            steelblue: "#4682B4",
            tan: "#D2B48C",
            thistle: "#D8BFD8",
            tomato: "#FF6347",
            turquoise: "#40E0D0",
            violet: "#EE82EE",
            wheat: "#F5DEB3",
            whitesmoke: "#F5F5F5",
            yellowgreen: "#9ACD32"
        }, R = {}, G = {
            style: "normal",
            variant: "normal",
            weight: "normal",
            size: 12,
            family: "微软雅黑"
        }, Y = {}, Q = {butt: "flat", round: "round"}, q = b.prototype;
        q.clearRect = function () {
            this.textMeasureEl_ && (this.textMeasureEl_.removeNode(!0), this.textMeasureEl_ = null), this.element_.innerHTML = ""
        }, q.beginPath = function () {
            this.currentPath_ = []
        }, q.moveTo = function (e, t) {
            var i = L(this, e, t);
            this.currentPath_.push({type: "moveTo", x: i.x, y: i.y}), this.currentX_ = i.x, this.currentY_ = i.y
        }, q.lineTo = function (e, t) {
            var i = L(this, e, t);
            this.currentPath_.push({type: "lineTo", x: i.x, y: i.y}), this.currentX_ = i.x, this.currentY_ = i.y
        }, q.bezierCurveTo = function (e, t, i, n, a, o) {
            var r = L(this, a, o), s = L(this, e, t), l = L(this, i, n);
            _(this, s, l, r)
        }, q.quadraticCurveTo = function (e, t, i, n) {
            var a = L(this, e, t), o = L(this, i, n), r = {
                x: this.currentX_ + 2 / 3 * (a.x - this.currentX_),
                y: this.currentY_ + 2 / 3 * (a.y - this.currentY_)
            }, s = {x: r.x + (o.x - this.currentX_) / 3, y: r.y + (o.y - this.currentY_) / 3};
            _(this, r, s, o)
        }, q.arc = function (e, t, i, n, a, o) {
            i *= J;
            var r = o ? "at" : "wa", s = e + A(n) * i - F, l = t + E(n) * i - F, h = e + A(a) * i - F, d = t + E(a) * i - F;
            s != h || o || (s += .125);
            var m = L(this, e, t), c = L(this, s, l), p = L(this, h, d);
            this.currentPath_.push({type: r, x: m.x, y: m.y, radius: i, xStart: c.x, yStart: c.y, xEnd: p.x, yEnd: p.y})
        }, q.rect = function (e, t, i, n) {
            this.moveTo(e, t), this.lineTo(e + i, t), this.lineTo(e + i, t + n), this.lineTo(e, t + n), this.closePath()
        }, q.strokeRect = function (e, t, i, n) {
            var a = this.currentPath_;
            this.beginPath(), this.moveTo(e, t), this.lineTo(e + i, t), this.lineTo(e + i, t + n), this.lineTo(e, t + n), this.closePath(), this.stroke(), this.currentPath_ = a
        }, q.fillRect = function (e, t, i, n) {
            var a = this.currentPath_;
            this.beginPath(), this.moveTo(e, t), this.lineTo(e + i, t), this.lineTo(e + i, t + n), this.lineTo(e, t + n), this.closePath(), this.fill(), this.currentPath_ = a
        }, q.createLinearGradient = function (e, t, i, n) {
            var a = new w("gradient");
            return a.x0_ = e, a.y0_ = t, a.x1_ = i, a.y1_ = n, a
        }, q.createRadialGradient = function (e, t, i, n, a, o) {
            var r = new w("gradientradial");
            return r.x0_ = e, r.y0_ = t, r.r0_ = i, r.x1_ = n, r.y1_ = a, r.r1_ = o, r
        }, q.drawImage = function (e) {
            var t, i, n, a, o, r, s, l, h = e.runtimeStyle.width, d = e.runtimeStyle.height;
            e.runtimeStyle.width = "auto", e.runtimeStyle.height = "auto";
            var m = e.width, c = e.height;
            if (e.runtimeStyle.width = h, e.runtimeStyle.height = d, 3 == arguments.length)t = arguments[1], i = arguments[2], o = r = 0, s = n = m, l = a = c; else if (5 == arguments.length)t = arguments[1], i = arguments[2], n = arguments[3], a = arguments[4], o = r = 0, s = m, l = c; else {
                if (9 != arguments.length)throw Error("Invalid number of arguments");
                o = arguments[1], r = arguments[2], s = arguments[3], l = arguments[4], t = arguments[5], i = arguments[6], n = arguments[7], a = arguments[8]
            }
            var p = L(this, t, i), u = [], V = 10, U = 10, y = f = 1;
            if (u.push(" <g_vml_:group", ' coordsize="', J * V, ",", J * U, '"', ' coordorigin="0,0"', ' style="width:', V, "px;height:", U, "px;position:absolute;"), 1 != this.m_[0][0] || this.m_[0][1] || 1 != this.m_[1][1] || this.m_[1][0]) {
                var g = [], y = this.scaleX_, f = this.scaleY_;
                g.push("M11=", this.m_[0][0] / y, ",", "M12=", this.m_[1][0] / f, ",", "M21=", this.m_[0][1] / y, ",", "M22=", this.m_[1][1] / f, ",", "Dx=", C(p.x / J), ",", "Dy=", C(p.y / J), "");
                var b = p, _ = L(this, t + n, i), x = L(this, t, i + a), k = L(this, t + n, i + a);
                b.x = T.max(b.x, _.x, x.x, k.x), b.y = T.max(b.y, _.y, x.y, k.y), u.push("padding:0 ", C(b.x / J), "px ", C(b.y / J), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", g.join(""), ", SizingMethod='clip');")
            } else u.push("top:", C(p.y / J), "px;left:", C(p.x / J), "px;");
            u.push(' ">'), (o || r) && u.push('<div style="overflow: hidden; width:', Math.ceil((n + o * n / s) * y), "px;", " height:", Math.ceil((a + r * a / l) * f), "px;", " filter:progid:DxImageTransform.Microsoft.Matrix(Dx=", -o * n / s * y, ",Dy=", -r * a / l * f, ');">'), u.push('<div style="width:', Math.round(y * m * n / s), "px;", " height:", Math.round(f * c * a / l), "px;", " filter:"), this.globalAlpha < 1 && u.push(" progid:DXImageTransform.Microsoft.Alpha(opacity=" + 100 * this.globalAlpha + ")"), u.push(" progid:DXImageTransform.Microsoft.AlphaImageLoader(src=", e.src, ',sizingMethod=scale)">'), (o || r) && u.push("</div>"), u.push("</div></div>"), this.element_.insertAdjacentHTML("BeforeEnd", u.join(""))
        }, q.stroke = function (e) {
            var t = [], i = 10, n = 10;
            t.push("<g_vml_:shape", ' filled="', !!e, '"', ' style="position:absolute;width:', i, "px;height:", n, 'px;"', ' coordorigin="0,0"', ' coordsize="', J * i, ",", J * n, '"', ' stroked="', !e, '"', ' path="');
            for (var a = {x: null, y: null}, o = {x: null, y: null}, r = 0; r < this.currentPath_.length; r++) {
                var s, l = this.currentPath_[r];
                switch (l.type) {
                    case"moveTo":
                        s = l, t.push(" m ", C(l.x), ",", C(l.y));
                        break;
                    case"lineTo":
                        t.push(" l ", C(l.x), ",", C(l.y));
                        break;
                    case"close":
                        t.push(" x "), l = null;
                        break;
                    case"bezierCurveTo":
                        t.push(" c ", C(l.cp1x), ",", C(l.cp1y), ",", C(l.cp2x), ",", C(l.cp2y), ",", C(l.x), ",", C(l.y));
                        break;
                    case"at":
                    case"wa":
                        t.push(" ", l.type, " ", C(l.x - this.scaleX_ * l.radius), ",", C(l.y - this.scaleY_ * l.radius), " ", C(l.x + this.scaleX_ * l.radius), ",", C(l.y + this.scaleY_ * l.radius), " ", C(l.xStart), ",", C(l.yStart), " ", C(l.xEnd), ",", C(l.yEnd))
                }
                l && ((null == a.x || l.x < a.x) && (a.x = l.x), (null == o.x || l.x > o.x) && (o.x = l.x), (null == a.y || l.y < a.y) && (a.y = l.y), (null == o.y || l.y > o.y) && (o.y = l.y))
            }
            t.push(' ">'), e ? k(this, t, a, o) : x(this, t), t.push("</g_vml_:shape>"), this.element_.insertAdjacentHTML("beforeEnd", t.join(""))
        }, q.fill = function () {
            this.stroke(!0)
        }, q.closePath = function () {
            this.currentPath_.push({type: "close"})
        }, q.save = function () {
            var e = {};
            h(this, e), this.aStack_.push(e), this.mStack_.push(this.m_), this.m_ = l(s(), this.m_)
        }, q.restore = function () {
            this.aStack_.length && (h(this.aStack_.pop(), this), this.m_ = this.mStack_.pop())
        }, q.translate = function (e, t) {
            var i = [[1, 0, 0], [0, 1, 0], [e, t, 1]];
            W(this, l(i, this.m_), !1)
        }, q.rotate = function (e) {
            var t = A(e), i = E(e), n = [[t, i, 0], [-i, t, 0], [0, 0, 1]];
            W(this, l(n, this.m_), !1)
        }, q.scale = function (e, t) {
            var i = [[e, 0, 0], [0, t, 0], [0, 0, 1]];
            W(this, l(i, this.m_), !0)
        }, q.transform = function (e, t, i, n, a, o) {
            var r = [[e, t, 0], [i, n, 0], [a, o, 1]];
            W(this, l(r, this.m_), !0)
        }, q.setTransform = function (e, t, i, n, a, o) {
            var r = [[e, t, 0], [i, n, 0], [a, o, 1]];
            W(this, r, !0)
        }, q.drawText_ = function (e, t, n, a, o) {
            var r = this.m_, s = 1e3, l = 0, h = s, d = {
                x: 0,
                y: 0
            }, m = [], c = y(U(this.font), this.element_), p = g(c), u = this.element_.currentStyle, V = this.textAlign.toLowerCase();
            switch (V) {
                case"left":
                case"center":
                case"right":
                    break;
                case"end":
                    V = "ltr" == u.direction ? "right" : "left";
                    break;
                case"start":
                    V = "rtl" == u.direction ? "right" : "left";
                    break;
                default:
                    V = "left"
            }
            switch (this.textBaseline) {
                case"hanging":
                case"top":
                    d.y = c.size / 1.75;
                    break;
                case"middle":
                    break;
                default:
                case null:
                case"alphabetic":
                case"ideographic":
                case"bottom":
                    d.y = -c.size / 2.25
            }
            switch (V) {
                case"right":
                    l = s, h = .05;
                    break;
                case"center":
                    l = h = s / 2
            }
            var f = L(this, t + d.x, n + d.y);
            m.push('<g_vml_:line from="', -l, ' 0" to="', h, ' 0.05" ', ' coordsize="100 100" coordorigin="0 0"', ' filled="', !o, '" stroked="', !!o, '" style="position:absolute;width:1px;height:1px;">'), o ? x(this, m) : k(this, m, {
                x: -l,
                y: 0
            }, {x: h, y: c.size});
            var b = r[0][0].toFixed(3) + "," + r[1][0].toFixed(3) + "," + r[0][1].toFixed(3) + "," + r[1][1].toFixed(3) + ",0,0", _ = C(f.x / J) + "," + C(f.y / J);
            m.push('<g_vml_:skew on="t" matrix="', b, '" ', ' offset="', _, '" origin="', l, ' 0" />', '<g_vml_:path textpathok="true" />', '<g_vml_:textpath on="true" string="', i(e), '" style="v-text-align:', V, ";font:", i(p), '" /></g_vml_:line>'), this.element_.insertAdjacentHTML("beforeEnd", m.join(""))
        }, q.fillText = function (e, t, i, n) {
            this.drawText_(e, t, i, n, !1)
        }, q.strokeText = function (e, t, i, n) {
            this.drawText_(e, t, i, n, !0)
        }, q.measureText = function (e) {
            if (!this.textMeasureEl_) {
                var t = '<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>';
                this.element_.insertAdjacentHTML("beforeEnd", t), this.textMeasureEl_ = this.element_.lastChild
            }
            var i = this.element_.ownerDocument;
            this.textMeasureEl_.innerHTML = "";
            try {
                this.textMeasureEl_.style.font = this.font
            } catch (n) {
            }
            return this.textMeasureEl_.appendChild(i.createTextNode(e)), {width: this.textMeasureEl_.offsetWidth}
        }, q.clip = function () {
        }, q.arcTo = function () {
        }, q.createPattern = function (e, t) {
            return new X(e, t)
        }, w.prototype.addColorStop = function (e, t) {
            t = V(t), this.colors_.push({offset: e, color: t.color, alpha: t.alpha})
        };
        var Z = S.prototype = new Error;
        Z.INDEX_SIZE_ERR = 1, Z.DOMSTRING_SIZE_ERR = 2, Z.HIERARCHY_REQUEST_ERR = 3, Z.WRONG_DOCUMENT_ERR = 4, Z.INVALID_CHARACTER_ERR = 5, Z.NO_DATA_ALLOWED_ERR = 6, Z.NO_MODIFICATION_ALLOWED_ERR = 7, Z.NOT_FOUND_ERR = 8, Z.NOT_SUPPORTED_ERR = 9, Z.INUSE_ATTRIBUTE_ERR = 10, Z.INVALID_STATE_ERR = 11, Z.SYNTAX_ERR = 12, Z.INVALID_MODIFICATION_ERR = 13, Z.NAMESPACE_ERR = 14, Z.INVALID_ACCESS_ERR = 15, Z.VALIDATION_ERR = 16, Z.TYPE_MISMATCH_ERR = 17, G_vmlCanvasManager = P, CanvasRenderingContext2D = b, CanvasGradient = w, CanvasPattern = X, DOMException = S
    }(), G_vmlCanvasManager
}), define("zrender/mixin/Eventful", ["require"], function () {
    var e = function () {
        this._handlers = {}
    };
    return e.prototype.one = function (e, t, i) {
        var n = this._handlers;
        return t && e ? (n[e] || (n[e] = []), n[e].push({h: t, one: !0, ctx: i || this}), this) : this
    }, e.prototype.bind = function (e, t, i) {
        var n = this._handlers;
        return t && e ? (n[e] || (n[e] = []), n[e].push({h: t, one: !1, ctx: i || this}), this) : this
    }, e.prototype.unbind = function (e, t) {
        var i = this._handlers;
        if (!e)return this._handlers = {}, this;
        if (t) {
            if (i[e]) {
                for (var n = [], a = 0, o = i[e].length; o > a; a++)i[e][a].h != t && n.push(i[e][a]);
                i[e] = n
            }
            i[e] && 0 === i[e].length && delete i[e]
        } else delete i[e];
        return this
    }, e.prototype.dispatch = function (e) {
        if (this._handlers[e]) {
            var t = arguments, i = t.length;
            i > 3 && (t = Array.prototype.slice.call(t, 1));
            for (var n = this._handlers[e], a = n.length, o = 0; a > o;) {
                switch (i) {
                    case 1:
                        n[o].h.call(n[o].ctx);
                        break;
                    case 2:
                        n[o].h.call(n[o].ctx, t[1]);
                        break;
                    case 3:
                        n[o].h.call(n[o].ctx, t[1], t[2]);
                        break;
                    default:
                        n[o].h.apply(n[o].ctx, t)
                }
                n[o].one ? (n.splice(o, 1), a--) : o++
            }
        }
        return this
    }, e.prototype.dispatchWithContext = function (e) {
        if (this._handlers[e]) {
            var t = arguments, i = t.length;
            i > 4 && (t = Array.prototype.slice.call(t, 1, t.length - 1));
            for (var n = t[t.length - 1], a = this._handlers[e], o = a.length, r = 0; o > r;) {
                switch (i) {
                    case 1:
                        a[r].h.call(n);
                        break;
                    case 2:
                        a[r].h.call(n, t[1]);
                        break;
                    case 3:
                        a[r].h.call(n, t[1], t[2]);
                        break;
                    default:
                        a[r].h.apply(n, t)
                }
                a[r].one ? (a.splice(r, 1), o--) : r++
            }
        }
        return this
    }, e
}), define("zrender/tool/log", ["require", "../config"], function (e) {
    var t = e("../config");
    return function () {
        if (0 !== t.debugMode)if (1 == t.debugMode)for (var e in arguments)throw new Error(arguments[e]); else if (t.debugMode > 1)for (var e in arguments)console.log(arguments[e])
    }
}), define("zrender/tool/guid", [], function () {
    var e = 2311;
    return function () {
        return "zrender__" + e++
    }
}), define("zrender/Handler", ["require", "./config", "./tool/env", "./tool/event", "./tool/util", "./tool/vector", "./tool/matrix", "./mixin/Eventful"], function (e) {
    "use strict";
    function t(e, t) {
        return function (i) {
            return e.call(t, i)
        }
    }

    function i(e, t) {
        return function (i, n, a) {
            return e.call(t, i, n, a)
        }
    }

    function n(e) {
        for (var i = p.length; i--;) {
            var n = p[i];
            e["_" + n + "Handler"] = t(u[n], e)
        }
    }

    function a(e, t, i) {
        if (this._draggingTarget && this._draggingTarget.id == e.id || e.isSilent())return !1;
        var n = this._event;
        if (e.isCover(t, i)) {
            e.hoverable && this.storage.addHover(e);
            for (var a = e.parent; a;) {
                if (a.clipShape && !a.clipShape.isCover(this._mouseX, this._mouseY))return !1;
                a = a.parent
            }
            return this._lastHover != e && (this._processOutShape(n), this._processDragLeave(n), this._lastHover = e, this._processDragEnter(n)), this._processOverShape(n), this._processDragOver(n), this._hasfound = 1, !0
        }
        return !1
    }

    var o = e("./config"), r = e("./tool/env"), s = e("./tool/event"), l = e("./tool/util"), h = e("./tool/vector"), d = e("./tool/matrix"), m = o.EVENT, c = e("./mixin/Eventful"), p = ["resize", "click", "dblclick", "mousewheel", "mousemove", "mouseout", "mouseup", "mousedown", "touchstart", "touchend", "touchmove"], u = {
        resize: function (e) {
            e = e || window.event, this._lastHover = null, this._isMouseDown = 0, this.dispatch(m.RESIZE, e)
        }, click: function (e) {
            e = this._zrenderEventFixed(e);
            var t = this._lastHover;
            (t && t.clickable || !t) && this._clickThreshold < 5 && this._dispatchAgency(t, m.CLICK, e), this._mousemoveHandler(e)
        }, dblclick: function (e) {
            e = e || window.event, e = this._zrenderEventFixed(e);
            var t = this._lastHover;
            (t && t.clickable || !t) && this._clickThreshold < 5 && this._dispatchAgency(t, m.DBLCLICK, e), this._mousemoveHandler(e)
        }, mousewheel: function (e) {
            e = this._zrenderEventFixed(e);
            var t = e.wheelDelta || -e.detail, i = t > 0 ? 1.1 : 1 / 1.1, n = this.painter.getLayers(), a = !1;
            for (var o in n)if ("hover" !== o) {
                var r = n[o], l = r.position;
                if (r.zoomable) {
                    r.__zoom = r.__zoom || 1;
                    var h = r.__zoom;
                    h *= i, h = Math.max(Math.min(r.maxZoom, h), r.minZoom), i = h / r.__zoom, r.__zoom = h, l[0] -= (this._mouseX - l[0]) * (i - 1), l[1] -= (this._mouseY - l[1]) * (i - 1), r.scale[0] *= i, r.scale[1] *= i, r.dirty = !0, a = !0, s.stop(e)
                }
            }
            a && this.painter.refresh(), this._dispatchAgency(this._lastHover, m.MOUSEWHEEL, e), this._mousemoveHandler(e)
        }, mousemove: function (e) {
            if (!this.painter.isLoading()) {
                this._clickThreshold++, e = this._zrenderEventFixed(e), this._lastX = this._mouseX, this._lastY = this._mouseY, this._mouseX = s.getX(e), this._mouseY = s.getY(e);
                var t = this._mouseX - this._lastX, i = this._mouseY - this._lastY;
                this._processDragStart(e), this._hasfound = 0, this._event = e, this._iterateAndFindHover(), this._hasfound || ((!this._draggingTarget || this._lastHover && this._lastHover != this._draggingTarget) && (this._processOutShape(e), this._processDragLeave(e)), this._lastHover = null, this.storage.delHover(), this.painter.clearHover());
                var n = "default";
                if (this._draggingTarget)this.storage.drift(this._draggingTarget.id, t, i), this._draggingTarget.modSelf(), this.storage.addHover(this._draggingTarget); else if (this._isMouseDown) {
                    var a = this.painter.getLayers(), o = !1;
                    for (var r in a)if ("hover" !== r) {
                        var l = a[r];
                        l.panable && (n = "move", l.position[0] += t, l.position[1] += i, o = !0, l.dirty = !0)
                    }
                    o && this.painter.refresh()
                }
                this._draggingTarget || this._hasfound && this._lastHover.draggable ? n = "move" : this._hasfound && this._lastHover.clickable && (n = "pointer"), this.root.style.cursor = n, this._dispatchAgency(this._lastHover, m.MOUSEMOVE, e), (this._draggingTarget || this._hasfound || this.storage.hasHoverShape()) && this.painter.refreshHover()
            }
        }, mouseout: function (e) {
            e = this._zrenderEventFixed(e);
            var t = e.toElement || e.relatedTarget;
            if (t != this.root)for (; t && 9 != t.nodeType;) {
                if (t == this.root)return void this._mousemoveHandler(e);
                t = t.parentNode
            }
            e.zrenderX = this._lastX, e.zrenderY = this._lastY, this.root.style.cursor = "default", this._isMouseDown = 0, this._processOutShape(e), this._processDrop(e), this._processDragEnd(e), this.painter.isLoading() || this.painter.refreshHover(), this.dispatch(m.GLOBALOUT, e)
        }, mousedown: function (e) {
            return this._clickThreshold = 0, 2 == this._lastDownButton ? (this._lastDownButton = e.button, void(this._mouseDownTarget = null)) : (this._lastMouseDownMoment = new Date, e = this._zrenderEventFixed(e), this._isMouseDown = 1, this._mouseDownTarget = this._lastHover, this._dispatchAgency(this._lastHover, m.MOUSEDOWN, e), void(this._lastDownButton = e.button))
        }, mouseup: function (e) {
            e = this._zrenderEventFixed(e), this.root.style.cursor = "default", this._isMouseDown = 0, this._clickThreshold = 0, this._mouseDownTarget = null, this._dispatchAgency(this._lastHover, m.MOUSEUP, e), this._processDrop(e), this._processDragEnd(e)
        }, touchstart: function (e) {
            e = this._zrenderEventFixed(e, !0), this._lastTouchMoment = new Date, this._mobildFindFixed(e), this._mousedownHandler(e)
        }, touchmove: function (e) {
            e = this._zrenderEventFixed(e, !0), this._mousemoveHandler(e), this._isDragging && s.stop(e)
        }, touchend: function (e) {
            e = this._zrenderEventFixed(e, !0), this._mouseupHandler(e);
            var t = new Date;
            t - this._lastTouchMoment < m.touchClickDelay && (this._mobildFindFixed(e), this._clickHandler(e), t - this._lastClickMoment < m.touchClickDelay / 2 && (this._dblclickHandler(e), this._lastHover && this._lastHover.clickable && s.stop(e)), this._lastClickMoment = t), this.painter.clearHover()
        }
    }, V = function (e, t, o) {
        c.call(this), this.root = e, this.storage = t, this.painter = o, this._lastX = this._lastY = this._mouseX = this._mouseY = 0, this._findHover = i(a, this), this._domHover = o.getDomHover(), n(this), window.addEventListener ? (window.addEventListener("resize", this._resizeHandler), r.os.tablet || r.os.phone ? (e.addEventListener("touchstart", this._touchstartHandler), e.addEventListener("touchmove", this._touchmoveHandler), e.addEventListener("touchend", this._touchendHandler)) : (e.addEventListener("click", this._clickHandler), e.addEventListener("dblclick", this._dblclickHandler), e.addEventListener("mousewheel", this._mousewheelHandler), e.addEventListener("mousemove", this._mousemoveHandler), e.addEventListener("mousedown", this._mousedownHandler), e.addEventListener("mouseup", this._mouseupHandler)), e.addEventListener("DOMMouseScroll", this._mousewheelHandler), e.addEventListener("mouseout", this._mouseoutHandler)) : (window.attachEvent("onresize", this._resizeHandler), e.attachEvent("onclick", this._clickHandler), e.ondblclick = this._dblclickHandler, e.attachEvent("onmousewheel", this._mousewheelHandler), e.attachEvent("onmousemove", this._mousemoveHandler), e.attachEvent("onmouseout", this._mouseoutHandler), e.attachEvent("onmousedown", this._mousedownHandler), e.attachEvent("onmouseup", this._mouseupHandler))
    };
    V.prototype.on = function (e, t) {
        return this.bind(e, t), this
    }, V.prototype.un = function (e, t) {
        return this.unbind(e, t), this
    }, V.prototype.trigger = function (e, t) {
        switch (e) {
            case m.RESIZE:
            case m.CLICK:
            case m.DBLCLICK:
            case m.MOUSEWHEEL:
            case m.MOUSEMOVE:
            case m.MOUSEDOWN:
            case m.MOUSEUP:
            case m.MOUSEOUT:
                this["_" + e + "Handler"](t)
        }
    }, V.prototype.dispose = function () {
        var e = this.root;
        window.removeEventListener ? (window.removeEventListener("resize", this._resizeHandler), r.os.tablet || r.os.phone ? (e.removeEventListener("touchstart", this._touchstartHandler), e.removeEventListener("touchmove", this._touchmoveHandler), e.removeEventListener("touchend", this._touchendHandler)) : (e.removeEventListener("click", this._clickHandler), e.removeEventListener("dblclick", this._dblclickHandler), e.removeEventListener("mousewheel", this._mousewheelHandler), e.removeEventListener("mousemove", this._mousemoveHandler), e.removeEventListener("mousedown", this._mousedownHandler), e.removeEventListener("mouseup", this._mouseupHandler)), e.removeEventListener("DOMMouseScroll", this._mousewheelHandler), e.removeEventListener("mouseout", this._mouseoutHandler)) : (window.detachEvent("onresize", this._resizeHandler), e.detachEvent("onclick", this._clickHandler), e.detachEvent("dblclick", this._dblclickHandler), e.detachEvent("onmousewheel", this._mousewheelHandler), e.detachEvent("onmousemove", this._mousemoveHandler), e.detachEvent("onmouseout", this._mouseoutHandler), e.detachEvent("onmousedown", this._mousedownHandler), e.detachEvent("onmouseup", this._mouseupHandler)), this.root = this._domHover = this.storage = this.painter = null, this.un()
    }, V.prototype._processDragStart = function (e) {
        var t = this._lastHover;
        if (this._isMouseDown && t && t.draggable && !this._draggingTarget && this._mouseDownTarget == t) {
            if (t.dragEnableTime && new Date - this._lastMouseDownMoment < t.dragEnableTime)return;
            var i = t;
            this._draggingTarget = i, this._isDragging = 1, i.invisible = !0, this.storage.mod(i.id), this._dispatchAgency(i, m.DRAGSTART, e), this.painter.refresh()
        }
    }, V.prototype._processDragEnter = function (e) {
        this._draggingTarget && this._dispatchAgency(this._lastHover, m.DRAGENTER, e, this._draggingTarget)
    }, V.prototype._processDragOver = function (e) {
        this._draggingTarget && this._dispatchAgency(this._lastHover, m.DRAGOVER, e, this._draggingTarget)
    }, V.prototype._processDragLeave = function (e) {
        this._draggingTarget && this._dispatchAgency(this._lastHover, m.DRAGLEAVE, e, this._draggingTarget)
    }, V.prototype._processDrop = function (e) {
        this._draggingTarget && (this._draggingTarget.invisible = !1, this.storage.mod(this._draggingTarget.id), this.painter.refresh(), this._dispatchAgency(this._lastHover, m.DROP, e, this._draggingTarget))
    }, V.prototype._processDragEnd = function (e) {
        this._draggingTarget && (this._dispatchAgency(this._draggingTarget, m.DRAGEND, e), this._lastHover = null), this._isDragging = 0, this._draggingTarget = null
    }, V.prototype._processOverShape = function (e) {
        this._dispatchAgency(this._lastHover, m.MOUSEOVER, e)
    }, V.prototype._processOutShape = function (e) {
        this._dispatchAgency(this._lastHover, m.MOUSEOUT, e)
    }, V.prototype._dispatchAgency = function (e, t, i, n) {
        var a = "on" + t, o = {type: t, event: i, target: e, cancelBubble: !1}, r = e;
        for (n && (o.dragged = n); r && (r[a] && (o.cancelBubble = r[a](o)), r.dispatch(t, o), r = r.parent, !o.cancelBubble););
        e ? o.cancelBubble || this.dispatch(t, o) : n || this.dispatch(t, {type: t, event: i})
    }, V.prototype._iterateAndFindHover = function () {
        var e = d.create();
        return function () {
            for (var t, i, n = this.storage.getShapeList(), a = [0, 0], o = n.length - 1; o >= 0; o--) {
                var r = n[o];
                if (t !== r.zlevel && (i = this.painter.getLayer(r.zlevel, i), a[0] = this._mouseX, a[1] = this._mouseY, i.needTransform && (d.invert(e, i.transform), h.applyTransform(a, a, e))), this._findHover(r, a[0], a[1]))break
            }
        }
    }();
    var U = [{x: 10}, {x: -20}, {x: 10, y: 10}, {y: -20}];
    return V.prototype._mobildFindFixed = function (e) {
        this._lastHover = null, this._mouseX = e.zrenderX, this._mouseY = e.zrenderY, this._event = e, this._iterateAndFindHover();
        for (var t = 0; !this._lastHover && t < U.length; t++) {
            var i = U[t];
            i.x && (this._mouseX += i.x), i.y && (this._mouseX += i.y), this._iterateAndFindHover()
        }
        this._lastHover && (e.zrenderX = this._mouseX, e.zrenderY = this._mouseY)
    }, V.prototype._zrenderEventFixed = function (e, t) {
        if (e.zrenderFixed)return e;
        if (t) {
            var i = "touchend" != e.type ? e.targetTouches[0] : e.changedTouches[0];
            if (i) {
                var n = this.root.getBoundingClientRect();
                e.zrenderX = i.clientX - n.left, e.zrenderY = i.clientY - n.top
            }
        } else {
            e = e || window.event;
            var a = e.toElement || e.relatedTarget || e.srcElement || e.target;
            a && a != this._domHover && (e.zrenderX = ("undefined" != typeof e.offsetX ? e.offsetX : e.layerX) + a.offsetLeft, e.zrenderY = ("undefined" != typeof e.offsetY ? e.offsetY : e.layerY) + a.offsetTop)
        }
        return e.zrenderFixed = 1, e
    }, l.merge(V.prototype, c.prototype, !0), V
}), define("zrender/Painter", ["require", "./config", "./tool/util", "./tool/log", "./tool/matrix", "./loadingEffect/Base", "./mixin/Transformable", "./shape/Image"], function (e) {
    "use strict";
    function t() {
        return !1
    }

    function i() {
    }

    function n(e, t, i) {
        var n = document.createElement(t), a = i._width, o = i._height;
        return n.style.position = "absolute", n.style.left = 0, n.style.top = 0, n.style.width = a + "px", n.style.height = o + "px", n.setAttribute("width", a * d), n.setAttribute("height", o * d), n.setAttribute("data-zr-dom-id", e), n
    }

    var a = e("./config"), o = e("./tool/util"), r = e("./tool/log"), s = e("./tool/matrix"), l = e("./loadingEffect/Base"), h = e("./mixin/Transformable"), d = window.devicePixelRatio || 1;
    d = Math.max(d, 1);
    var m = window.G_vmlCanvasManager, c = function (e, i) {
        this.root = e, this.storage = i, e.innerHTML = "", this._width = this._getWidth(), this._height = this._getHeight();
        var a = document.createElement("div");
        this._domRoot = a, a.style.position = "relative", a.style.overflow = "hidden", a.style.width = this._width + "px", a.style.height = this._height + "px", e.appendChild(a), this._layers = {}, this._zlevelList = [], this._layerConfig = {}, this._loadingEffect = new l({}), this.shapeToImage = this._createShapeToImageProcessor(), this._bgDom = n("bg", "div", this), a.appendChild(this._bgDom), this._bgDom.onselectstart = t, this._bgDom.style["-webkit-user-select"] = "none", this._bgDom.style["user-select"] = "none", this._bgDom.style["-webkit-touch-callout"] = "none";
        var o = new p("_zrender_hover_", this);
        this._layers.hover = o, a.appendChild(o.dom), o.initContext(), o.dom.onselectstart = t, o.dom.style["-webkit-user-select"] = "none", o.dom.style["user-select"] = "none", o.dom.style["-webkit-touch-callout"] = "none", this.refreshNextFrame = null
    };
    c.prototype.render = function (e) {
        return this.isLoading() && this.hideLoading(), this.refresh(e, !0), this
    }, c.prototype.refresh = function (e, t) {
        var i = this.storage.getShapeList(!0);
        return this._paintList(i, t), "function" == typeof e && e(), this
    }, c.prototype._paintList = function (e, t) {
        "undefined" == typeof t && (t = !1), this._updateLayerStatus(e);
        var i, n, o;
        for (var l in this._layers)"hover" !== l && (this._layers[l].unusedCount++, this._layers[l].updateTransform());
        for (var h = [], d = 0, c = e.length; c > d; d++) {
            var p = e[d];
            if (n !== p.zlevel && (i && (i.needTransform && o.restore(), o.flush && o.flush()), i = this.getLayer(p.zlevel), o = i.ctx, n = p.zlevel, i.unusedCount = 0, (i.dirty || t) && i.clear(), i.needTransform && (o.save(), i.setTransform(o))), p.__startClip && !m) {
                var u = p.__startClip;
                if (o.save(), u.needTransform) {
                    var V = u.transform;
                    s.invert(h, V), o.transform(V[0], V[1], V[2], V[3], V[4], V[5])
                }
                if (o.beginPath(), u.buildPath(o, u.style), o.clip(), u.needTransform) {
                    var V = h;
                    o.transform(V[0], V[1], V[2], V[3], V[4], V[5])
                }
            }
            if ((i.dirty || t) && !p.invisible && (!p.onbrush || p.onbrush && !p.onbrush(o, !1)))if (a.catchBrushException)try {
                p.brush(o, !1, this.refreshNextFrame)
            } catch (U) {
                r(U, "brush error of " + p.type, p)
            } else p.brush(o, !1, this.refreshNextFrame);
            p.__stopClip && !m && o.restore(), p.__dirty = !1
        }
        i && (i.needTransform && o.restore(), o.flush && o.flush());
        for (var l in this._layers)if ("hover" !== l) {
            var y = this._layers[l];
            y.dirty = !1, 1 == y.unusedCount && y.clear()
        }
    }, c.prototype.getLayer = function (e) {
        var t = this._layers[e];
        if (!t) {
            var i = this._zlevelList.length, n = null, a = -1;
            if (i > 0 && e > this._zlevelList[0]) {
                for (a = 0; i - 1 > a && !(this._zlevelList[a] < e && this._zlevelList[a + 1] > e); a++);
                n = this._layers[this._zlevelList[a]]
            }
            this._zlevelList.splice(a + 1, 0, e), t = new p(e, this);
            var r = n ? n.dom : this._bgDom;
            r.nextSibling ? r.parentNode.insertBefore(t.dom, r.nextSibling) : r.parentNode.appendChild(t.dom), t.initContext(), this._layers[e] = t, this._layerConfig[e] && o.merge(t, this._layerConfig[e], !0), t.updateTransform()
        }
        return t
    }, c.prototype.getLayers = function () {
        return this._layers
    }, c.prototype._updateLayerStatus = function (e) {
        var t = this._layers, i = {};
        for (var n in t)"hover" !== n && (i[n] = t[n].elCount, t[n].elCount = 0);
        for (var a = 0, o = e.length; o > a; a++) {
            var r = e[a], s = r.zlevel, l = t[s];
            if (l) {
                if (l.elCount++, l.dirty)continue;
                l.dirty = r.__dirty
            }
        }
        for (var n in t)"hover" !== n && i[n] !== t[n].elCount && (t[n].dirty = !0)
    }, c.prototype.refreshShapes = function (e, t) {
        for (var i = 0, n = e.length; n > i; i++) {
            var a = e[i];
            a.modSelf()
        }
        return this.refresh(t), this
    }, c.prototype.setLoadingEffect = function (e) {
        return this._loadingEffect = e, this
    }, c.prototype.clear = function () {
        for (var e in this._layers)"hover" != e && this._layers[e].clear();
        return this
    }, c.prototype.modLayer = function (e, t) {
        if (t) {
            this._layerConfig[e] ? o.merge(this._layerConfig[e], t, !0) : this._layerConfig[e] = t;
            var i = this._layers[e];
            i && o.merge(i, this._layerConfig[e], !0)
        }
    }, c.prototype.delLayer = function (e) {
        var t = this._layers[e];
        t && (this.modLayer(e, {
            position: t.position,
            rotation: t.rotation,
            scale: t.scale
        }), t.dom.parentNode.removeChild(t.dom), delete this._layers[e], this._zlevelList.splice(o.indexOf(this._zlevelList, e), 1))
    }, c.prototype.refreshHover = function () {
        this.clearHover();
        for (var e = this.storage.getHoverShapes(!0), t = 0, i = e.length; i > t; t++)this._brushHover(e[t]);
        var n = this._layers.hover.ctx;
        return n.flush && n.flush(), this.storage.delHover(), this
    }, c.prototype.clearHover = function () {
        var e = this._layers.hover;
        return e && e.clear(), this
    }, c.prototype.showLoading = function (e) {
        return this._loadingEffect && this._loadingEffect.stop(), e && this.setLoadingEffect(e), this._loadingEffect.start(this), this.loading = !0, this
    }, c.prototype.hideLoading = function () {
        return this._loadingEffect.stop(), this.clearHover(), this.loading = !1, this
    }, c.prototype.isLoading = function () {
        return this.loading
    }, c.prototype.resize = function () {
        var e = this._domRoot;
        e.style.display = "none";
        var t = this._getWidth(), i = this._getHeight();
        if (e.style.display = "", this._width != t || i != this._height) {
            this._width = t, this._height = i, e.style.width = t + "px", e.style.height = i + "px";
            for (var n in this._layers)this._layers[n].resize(t, i);
            this.refresh(null, !0)
        }
        return this
    }, c.prototype.clearLayer = function (e) {
        var t = this._layers[e];
        t && t.clear()
    }, c.prototype.dispose = function () {
        this.isLoading() && this.hideLoading(), this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null
    }, c.prototype.getDomHover = function () {
        return this._layers.hover.dom
    }, c.prototype.toDataURL = function (e, t, i) {
        if (m)return null;
        var o = n("image", "canvas", this);
        this._bgDom.appendChild(o);
        var s = o.getContext("2d");
        1 != d && s.scale(d, d), s.fillStyle = t || "#fff", s.rect(0, 0, this._width * d, this._height * d), s.fill();
        var l = this;
        this.storage.iterShape(function (e) {
            if (!e.invisible && (!e.onbrush || e.onbrush && !e.onbrush(s, !1)))if (a.catchBrushException)try {
                e.brush(s, !1, l.refreshNextFrame)
            } catch (t) {
                r(t, "brush error of " + e.type, e)
            } else e.brush(s, !1, l.refreshNextFrame)
        }, {normal: "up", update: !0});
        var h = o.toDataURL(e, i);
        return s = null, this._bgDom.removeChild(o), h
    }, c.prototype.getWidth = function () {
        return this._width
    }, c.prototype.getHeight = function () {
        return this._height
    }, c.prototype._getWidth = function () {
        var e = this.root, t = e.currentStyle || document.defaultView.getComputedStyle(e);
        return ((e.clientWidth || parseInt(t.width, 10)) - parseInt(t.paddingLeft, 10) - parseInt(t.paddingRight, 10)).toFixed(0) - 0
    }, c.prototype._getHeight = function () {
        var e = this.root, t = e.currentStyle || document.defaultView.getComputedStyle(e);
        return ((e.clientHeight || parseInt(t.height, 10)) - parseInt(t.paddingTop, 10) - parseInt(t.paddingBottom, 10)).toFixed(0) - 0
    }, c.prototype._brushHover = function (e) {
        var t = this._layers.hover.ctx;
        if (!e.onbrush || e.onbrush && !e.onbrush(t, !0)) {
            var i = this.getLayer(e.zlevel);
            if (i.needTransform && (t.save(), i.setTransform(t)), a.catchBrushException)try {
                e.brush(t, !0, this.refreshNextFrame)
            } catch (n) {
                r(n, "hoverBrush error of " + e.type, e)
            } else e.brush(t, !0, this.refreshNextFrame);
            i.needTransform && t.restore()
        }
    }, c.prototype._shapeToImage = function (t, i, n, a, o) {
        var r = document.createElement("canvas"), s = r.getContext("2d"), o = window.devicePixelRatio || 1;
        r.style.width = n + "px", r.style.height = a + "px", r.setAttribute("width", n * o), r.setAttribute("height", a * o), s.clearRect(0, 0, n * o, a * o);
        var l = {position: i.position, rotation: i.rotation, scale: i.scale};
        i.position = [0, 0, 0], i.rotation = 0, i.scale = [1, 1], i && i.brush(s, !1);
        var h = e("./shape/Image"), d = new h({id: t, style: {x: 0, y: 0, image: r}});
        return null != l.position && (d.position = i.position = l.position), null != l.rotation && (d.rotation = i.rotation = l.rotation), null != l.scale && (d.scale = i.scale = l.scale), d
    }, c.prototype._createShapeToImageProcessor = function () {
        if (m)return i;
        var e = this;
        return function (t, i, n, a) {
            return e._shapeToImage(t, i, n, a, d)
        }
    };
    var p = function (e, i) {
        this.dom = n(e, "canvas", i), this.dom.onselectstart = t, this.dom.style["-webkit-user-select"] = "none", this.dom.style["user-select"] = "none", this.dom.style["-webkit-touch-callout"] = "none", m && m.initElement(this.dom), this.domBack = null, this.ctxBack = null, this.painter = i, this.unusedCount = 0, this.config = null, this.dirty = !0, this.elCount = 0, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.zoomable = !1, this.panable = !1, this.maxZoom = 1 / 0, this.minZoom = 0, h.call(this)
    };
    return p.prototype.initContext = function () {
        this.ctx = this.dom.getContext("2d"), 1 != d && this.ctx.scale(d, d)
    }, p.prototype.createBackBuffer = function () {
        m || (this.domBack = n("back-" + this.id, "canvas", this.painter), this.ctxBack = this.domBack.getContext("2d"), 1 != d && this.ctxBack.scale(d, d))
    }, p.prototype.resize = function (e, t) {
        this.dom.style.width = e + "px", this.dom.style.height = t + "px", this.dom.setAttribute("width", e * d), this.dom.setAttribute("height", t * d), 1 != d && this.ctx.scale(d, d), this.domBack && (this.domBack.setAttribute("width", e * d), this.domBack.setAttribute("height", t * d), 1 != d && this.ctxBack.scale(d, d))
    }, p.prototype.clear = function () {
        var e = this.dom, t = this.ctx, i = e.width, n = e.height, a = this.clearColor && !m, o = this.motionBlur && !m, r = this.lastFrameAlpha;
        if (o && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(e, 0, 0, i / d, n / d)), a ? (t.save(), t.fillStyle = this.config.clearColor, t.fillRect(0, 0, i / d, n / d), t.restore()) : t.clearRect(0, 0, i / d, n / d), o) {
            var s = this.domBack;
            t.save(), t.globalAlpha = r, t.drawImage(s, 0, 0, i / d, n / d), t.restore()
        }
    }, o.merge(p.prototype, h.prototype), c
}), define("zrender/Storage", ["require", "./tool/util", "./Group"], function (e) {
    "use strict";
    function t(e, t) {
        return e.zlevel == t.zlevel ? e.z == t.z ? e.__renderidx - t.__renderidx : e.z - t.z : e.zlevel - t.zlevel
    }

    var i = e("./tool/util"), n = e("./Group"), a = {hover: !1, normal: "down", update: !1}, o = function () {
        this._elements = {}, this._hoverElements = [], this._roots = [], this._shapeList = [], this._shapeListOffset = 0
    };
    return o.prototype.iterShape = function (e, t) {
        if (t || (t = a), t.hover)for (var i = 0, n = this._hoverElements.length; n > i; i++) {
            var o = this._hoverElements[i];
            if (o.updateTransform(), e(o))return this
        }
        switch (t.update && this.updateShapeList(), t.normal) {
            case"down":
                for (var n = this._shapeList.length; n--;)if (e(this._shapeList[n]))return this;
                break;
            default:
                for (var i = 0, n = this._shapeList.length; n > i; i++)if (e(this._shapeList[i]))return this
        }
        return this
    }, o.prototype.getHoverShapes = function (e) {
        for (var i = [], n = 0, a = this._hoverElements.length; a > n; n++) {
            i.push(this._hoverElements[n]);
            var o = this._hoverElements[n].hoverConnect;
            if (o) {
                var r;
                o = o instanceof Array ? o : [o];
                for (var s = 0, l = o.length; l > s; s++)r = o[s].id ? o[s] : this.get(o[s]), r && i.push(r)
            }
        }
        if (i.sort(t), e)for (var n = 0, a = i.length; a > n; n++)i[n].updateTransform();
        return i
    }, o.prototype.getShapeList = function (e) {
        return e && this.updateShapeList(), this._shapeList
    }, o.prototype.updateShapeList = function () {
        this._shapeListOffset = 0;
        for (var e = 0, i = this._roots.length; i > e; e++) {
            var n = this._roots[e];
            this._updateAndAddShape(n)
        }
        this._shapeList.length = this._shapeListOffset;
        for (var e = 0, i = this._shapeList.length; i > e; e++)this._shapeList[e].__renderidx = e;
        this._shapeList.sort(t)
    }, o.prototype._updateAndAddShape = function (e, t) {
        if (!e.ignore)if (e.updateTransform(), "group" == e.type) {
            e.clipShape && (e.clipShape.parent = e, e.clipShape.updateTransform(), t ? (t = t.slice(), t.push(e.clipShape)) : t = [e.clipShape]);
            for (var i = 0; i < e._children.length; i++) {
                var n = e._children[i];
                n.__dirty = e.__dirty || n.__dirty, this._updateAndAddShape(n, t)
            }
            e.__dirty = !1
        } else e.__clipShapes = t, this._shapeList[this._shapeListOffset++] = e
    }, o.prototype.mod = function (e, t) {
        var n = this._elements[e];
        if (n && (n.modSelf(), t))if (t.parent || t._storage || t.__startClip) {
            var a = {};
            for (var o in t)"parent" != o && "_storage" != o && "__startClip" != o && t.hasOwnProperty(o) && (a[o] = t[o]);
            i.merge(n, a, !0)
        } else i.merge(n, t, !0);
        return this
    }, o.prototype.drift = function (e, t, i) {
        var n = this._elements[e];
        return n && (n.needTransform = !0, "horizontal" === n.draggable ? i = 0 : "vertical" === n.draggable && (t = 0), (!n.ondrift || n.ondrift && !n.ondrift(t, i)) && n.drift(t, i)), this
    }, o.prototype.addHover = function (e) {
        return e.updateNeedTransform(), this._hoverElements.push(e), this
    }, o.prototype.delHover = function () {
        return this._hoverElements = [], this
    }, o.prototype.hasHoverShape = function () {
        return this._hoverElements.length > 0
    }, o.prototype.addRoot = function (e) {
        e instanceof n && e.addChildrenToStorage(this), this.addToMap(e), this._roots.push(e)
    }, o.prototype.delRoot = function (e) {
        if ("undefined" == typeof e) {
            for (var t = 0; t < this._roots.length; t++) {
                var a = this._roots[t];
                a instanceof n && a.delChildrenFromStorage(this)
            }
            return this._elements = {}, this._hoverElements = [], this._roots = [], this._shapeList = [], void(this._shapeListOffset = 0)
        }
        if (e instanceof Array)for (var t = 0, o = e.length; o > t; t++)this.delRoot(e[t]); else {
            var r;
            r = "string" == typeof e ? this._elements[e] : e;
            var s = i.indexOf(this._roots, r);
            s >= 0 && (this.delFromMap(r.id), this._roots.splice(s, 1), r instanceof n && r.delChildrenFromStorage(this))
        }
    }, o.prototype.addToMap = function (e) {
        return e instanceof n && (e._storage = this), e.modSelf(), this._elements[e.id] = e, this
    }, o.prototype.get = function (e) {
        return this._elements[e]
    }, o.prototype.delFromMap = function (e) {
        var t = this._elements[e];
        return t && (delete this._elements[e], t instanceof n && (t._storage = null)), this
    }, o.prototype.dispose = function () {
        this._elements = this._renderList = this._roots = this._hoverElements = null
    }, o
}), define("zrender/animation/Animation", ["require", "./Clip", "../tool/color", "../tool/util", "../tool/event"], function (e) {
    "use strict";
    function t(e, t) {
        return e[t]
    }

    function i(e, t, i) {
        e[t] = i
    }

    function n(e, t, i) {
        return (t - e) * i + e
    }

    function a(e, t, i, a, o) {
        var r = e.length;
        if (1 == o)for (var s = 0; r > s; s++)a[s] = n(e[s], t[s], i); else for (var l = e[0].length, s = 0; r > s; s++)for (var h = 0; l > h; h++)a[s][h] = n(e[s][h], t[s][h], i)
    }

    function o(e) {
        switch (typeof e) {
            case"undefined":
            case"string":
                return !1
        }
        return "undefined" != typeof e.length
    }

    function r(e, t, i, n, a, o, r, l, h) {
        var d = e.length;
        if (1 == h)for (var m = 0; d > m; m++)l[m] = s(e[m], t[m], i[m], n[m], a, o, r); else for (var c = e[0].length, m = 0; d > m; m++)for (var p = 0; c > p; p++)l[m][p] = s(e[m][p], t[m][p], i[m][p], n[m][p], a, o, r)
    }

    function s(e, t, i, n, a, o, r) {
        var s = .5 * (i - e), l = .5 * (n - t);
        return (2 * (t - i) + s + l) * r + (-3 * (t - i) - 2 * s - l) * o + s * a + t
    }

    function l(e) {
        if (o(e)) {
            var t = e.length;
            if (o(e[0])) {
                for (var i = [], n = 0; t > n; n++)i.push(V.call(e[n]));
                return i
            }
            return V.call(e)
        }
        return e
    }

    function h(e) {
        return e[0] = Math.floor(e[0]), e[1] = Math.floor(e[1]), e[2] = Math.floor(e[2]), "rgba(" + e.join(",") + ")"
    }

    var d = e("./Clip"), m = e("../tool/color"), c = e("../tool/util"), p = e("../tool/event").Dispatcher, u = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (e) {
            setTimeout(e, 16)
        }, V = Array.prototype.slice, U = function (e) {
        e = e || {}, this.stage = e.stage || {}, this.onframe = e.onframe || function () {
            }, this._clips = [], this._running = !1, this._time = 0, p.call(this)
    };
    U.prototype = {
        add: function (e) {
            this._clips.push(e)
        }, remove: function (e) {
            var t = c.indexOf(this._clips, e);
            t >= 0 && this._clips.splice(t, 1)
        }, _update: function () {
            for (var e = (new Date).getTime(), t = e - this._time, i = this._clips, n = i.length, a = [], o = [], r = 0; n > r; r++) {
                var s = i[r], l = s.step(e);
                l && (a.push(l), o.push(s))
            }
            this.stage.update && this.stage.update();
            for (var r = 0; n > r;)i[r]._needsRemove ? (i[r] = i[n - 1], i.pop(), n--) : r++;
            n = a.length;
            for (var r = 0; n > r; r++)o[r].fire(a[r]);
            this._time = e, this.onframe(t), this.dispatch("frame", t)
        }, start: function () {
            function e() {
                t._running && (t._update(), u(e))
            }

            var t = this;
            this._running = !0, this._time = (new Date).getTime(), u(e)
        }, stop: function () {
            this._running = !1
        }, clear: function () {
            this._clips = []
        }, animate: function (e, t) {
            t = t || {};
            var i = new y(e, t.loop, t.getter, t.setter);
            return i.animation = this, i
        }, constructor: U
    }, c.merge(U.prototype, p.prototype, !0);
    var y = function (e, n, a, o) {
        this._tracks = {}, this._target = e, this._loop = n || !1, this._getter = a || t, this._setter = o || i, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = []
    };
    return y.prototype = {
        when: function (e, t) {
            for (var i in t)this._tracks[i] || (this._tracks[i] = [], 0 !== e && this._tracks[i].push({
                time: 0,
                value: l(this._getter(this._target, i))
            })), this._tracks[i].push({time: parseInt(e, 10), value: t[i]});
            return this
        }, during: function (e) {
            return this._onframeList.push(e), this
        }, start: function (e) {
            var t = this, i = this._setter, l = this._getter, c = "spline" === e, p = function () {
                if (t._clipCount--, 0 === t._clipCount) {
                    t._tracks = {};
                    for (var e = t._doneList.length, i = 0; e > i; i++)t._doneList[i].call(t)
                }
            }, u = function (u, V) {
                var U = u.length;
                if (U) {
                    var y = u[0].value, g = o(y), f = !1, b = g && o(y[0]) ? 2 : 1;
                    u.sort(function (e, t) {
                        return e.time - t.time
                    });
                    var _;
                    if (U) {
                        _ = u[U - 1].time;
                        for (var x = [], k = [], L = 0; U > L; L++) {
                            x.push(u[L].time / _);
                            var v = u[L].value;
                            "string" == typeof v && (v = m.toArray(v), 0 === v.length && (v[0] = v[1] = v[2] = 0, v[3] = 1), f = !0), k.push(v)
                        }
                        var W, L, w, X, I, K, S, T = 0, C = 0;
                        if (f)var E = [0, 0, 0, 0];
                        var A = function (e, o) {
                            if (C > o) {
                                for (W = Math.min(T + 1, U - 1), L = W; L >= 0 && !(x[L] <= o); L--);
                                L = Math.min(L, U - 2)
                            } else {
                                for (L = T; U > L && !(x[L] > o); L++);
                                L = Math.min(L - 1, U - 2)
                            }
                            T = L, C = o;
                            var d = x[L + 1] - x[L];
                            if (0 !== d) {
                                if (w = (o - x[L]) / d, c)if (I = k[L], X = k[0 === L ? L : L - 1], K = k[L > U - 2 ? U - 1 : L + 1], S = k[L > U - 3 ? U - 1 : L + 2], g)r(X, I, K, S, w, w * w, w * w * w, l(e, V), b); else {
                                    var m;
                                    f ? (m = r(X, I, K, S, w, w * w, w * w * w, E, 1), m = h(E)) : m = s(X, I, K, S, w, w * w, w * w * w), i(e, V, m)
                                } else if (g)a(k[L], k[L + 1], w, l(e, V), b); else {
                                    var m;
                                    f ? (a(k[L], k[L + 1], w, E, 1), m = h(E)) : m = n(k[L], k[L + 1], w), i(e, V, m)
                                }
                                for (L = 0; L < t._onframeList.length; L++)t._onframeList[L](e, o)
                            }
                        }, z = new d({
                            target: t._target,
                            life: _,
                            loop: t._loop,
                            delay: t._delay,
                            onframe: A,
                            ondestroy: p
                        });
                        e && "spline" !== e && (z.easing = e), t._clipList.push(z), t._clipCount++, t.animation.add(z)
                    }
                }
            };
            for (var V in this._tracks)u(this._tracks[V], V);
            return this
        }, stop: function () {
            for (var e = 0; e < this._clipList.length; e++) {
                var t = this._clipList[e];
                this.animation.remove(t)
            }
            this._clipList = []
        }, delay: function (e) {
            return this._delay = e, this
        }, done: function (e) {
            return e && this._doneList.push(e), this
        }
    }, U
}), define("zrender/tool/vector", [], function () {
    var e = "undefined" == typeof Float32Array ? Array : Float32Array, t = {
        create: function (t, i) {
            var n = new e(2);
            return n[0] = t || 0, n[1] = i || 0, n
        }, copy: function (e, t) {
            return e[0] = t[0], e[1] = t[1], e
        }, set: function (e, t, i) {
            return e[0] = t, e[1] = i, e
        }, add: function (e, t, i) {
            return e[0] = t[0] + i[0], e[1] = t[1] + i[1], e
        }, scaleAndAdd: function (e, t, i, n) {
            return e[0] = t[0] + i[0] * n, e[1] = t[1] + i[1] * n, e
        }, sub: function (e, t, i) {
            return e[0] = t[0] - i[0], e[1] = t[1] - i[1], e
        }, len: function (e) {
            return Math.sqrt(this.lenSquare(e))
        }, lenSquare: function (e) {
            return e[0] * e[0] + e[1] * e[1]
        }, mul: function (e, t, i) {
            return e[0] = t[0] * i[0], e[1] = t[1] * i[1], e
        }, div: function (e, t, i) {
            return e[0] = t[0] / i[0], e[1] = t[1] / i[1], e
        }, dot: function (e, t) {
            return e[0] * t[0] + e[1] * t[1]
        }, scale: function (e, t, i) {
            return e[0] = t[0] * i, e[1] = t[1] * i, e
        }, normalize: function (e, i) {
            var n = t.len(i);
            return 0 === n ? (e[0] = 0, e[1] = 0) : (e[0] = i[0] / n, e[1] = i[1] / n), e
        }, distance: function (e, t) {
            return Math.sqrt((e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]))
        }, distanceSquare: function (e, t) {
            return (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1])
        }, negate: function (e, t) {
            return e[0] = -t[0], e[1] = -t[1], e
        }, lerp: function (e, t, i, n) {
            return e[0] = t[0] + n * (i[0] - t[0]), e[1] = t[1] + n * (i[1] - t[1]), e
        }, applyTransform: function (e, t, i) {
            var n = t[0], a = t[1];
            return e[0] = i[0] * n + i[2] * a + i[4], e[1] = i[1] * n + i[3] * a + i[5], e
        }, min: function (e, t, i) {
            return e[0] = Math.min(t[0], i[0]), e[1] = Math.min(t[1], i[1]), e
        }, max: function (e, t, i) {
            return e[0] = Math.max(t[0], i[0]), e[1] = Math.max(t[1], i[1]), e
        }
    };
    return t.length = t.len, t.lengthSquare = t.lenSquare, t.dist = t.distance, t.distSquare = t.distanceSquare, t
}), define("zrender/tool/matrix", [], function () {
    var e = "undefined" == typeof Float32Array ? Array : Float32Array, t = {
        create: function () {
            var i = new e(6);
            return t.identity(i), i
        }, identity: function (e) {
            return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e
        }, copy: function (e, t) {
            return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e
        }, mul: function (e, t, i) {
            return e[0] = t[0] * i[0] + t[2] * i[1], e[1] = t[1] * i[0] + t[3] * i[1], e[2] = t[0] * i[2] + t[2] * i[3], e[3] = t[1] * i[2] + t[3] * i[3], e[4] = t[0] * i[4] + t[2] * i[5] + t[4], e[5] = t[1] * i[4] + t[3] * i[5] + t[5], e
        }, translate: function (e, t, i) {
            return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4] + i[0], e[5] = t[5] + i[1], e
        }, rotate: function (e, t, i) {
            var n = t[0], a = t[2], o = t[4], r = t[1], s = t[3], l = t[5], h = Math.sin(i), d = Math.cos(i);
            return e[0] = n * d + r * h, e[1] = -n * h + r * d, e[2] = a * d + s * h, e[3] = -a * h + d * s, e[4] = d * o + h * l, e[5] = d * l - h * o, e
        }, scale: function (e, t, i) {
            var n = i[0], a = i[1];
            return e[0] = t[0] * n, e[1] = t[1] * a, e[2] = t[2] * n, e[3] = t[3] * a, e[4] = t[4] * n, e[5] = t[5] * a, e
        }, invert: function (e, t) {
            var i = t[0], n = t[2], a = t[4], o = t[1], r = t[3], s = t[5], l = i * r - o * n;
            return l ? (l = 1 / l, e[0] = r * l, e[1] = -o * l, e[2] = -n * l, e[3] = i * l, e[4] = (n * s - r * a) * l, e[5] = (o * a - i * s) * l, e) : null
        }, mulVector: function (e, t, i) {
            var n = t[0], a = t[2], o = t[4], r = t[1], s = t[3], l = t[5];
            return e[0] = i[0] * n + i[1] * a + o, e[1] = i[0] * r + i[1] * s + l, e
        }
    };
    return t
}), define("zrender/loadingEffect/Base", ["require", "../tool/util", "../shape/Text", "../shape/Rectangle"], function (e) {
    function t(e) {
        this.setOptions(e)
    }

    var i = e("../tool/util"), n = e("../shape/Text"), a = e("../shape/Rectangle"), o = "Loading...", r = "normal 16px Arial";
    return t.prototype.createTextShape = function (e) {
        return new n({
            highlightStyle: i.merge({
                x: this.canvasWidth / 2,
                y: this.canvasHeight / 2,
                text: o,
                textAlign: "center",
                textBaseline: "middle",
                textFont: r,
                color: "#333",
                brushType: "fill"
            }, e, !0)
        })
    }, t.prototype.createBackgroundShape = function (e) {
        return new a({
            highlightStyle: {
                x: 0,
                y: 0,
                width: this.canvasWidth,
                height: this.canvasHeight,
                brushType: "fill",
                color: e
            }
        })
    }, t.prototype.start = function (e) {
        function t(t) {
            e.storage.addHover(t)
        }

        function i() {
            e.refreshHover()
        }

        this.canvasWidth = e._width, this.canvasHeight = e._height, this.loadingTimer = this._start(t, i)
    }, t.prototype._start = function () {
        return setInterval(function () {
        }, 1e4)
    }, t.prototype.stop = function () {
        clearInterval(this.loadingTimer)
    }, t.prototype.setOptions = function (e) {
        this.options = e || {}
    }, t.prototype.adjust = function (e, t) {
        return e <= t[0] ? e = t[0] : e >= t[1] && (e = t[1]), e
    }, t.prototype.getLocation = function (e, t, i) {
        var n = null != e.x ? e.x : "center";
        switch (n) {
            case"center":
                n = Math.floor((this.canvasWidth - t) / 2);
                break;
            case"left":
                n = 0;
                break;
            case"right":
                n = this.canvasWidth - t
        }
        var a = null != e.y ? e.y : "center";
        switch (a) {
            case"center":
                a = Math.floor((this.canvasHeight - i) / 2);
                break;
            case"top":
                a = 0;
                break;
            case"bottom":
                a = this.canvasHeight - i
        }
        return {x: n, y: a, width: t, height: i}
    }, t
}), define("zrender/mixin/Transformable", ["require", "../tool/matrix", "../tool/vector"], function (e) {
    "use strict";
    function t(e) {
        return e > -r && r > e
    }

    function i(e) {
        return e > r || -r > e
    }

    var n = e("../tool/matrix"), a = e("../tool/vector"), o = [0, 0], r = 5e-5, s = function () {
        this.position || (this.position = [0, 0]), "undefined" == typeof this.rotation && (this.rotation = [0, 0, 0]), this.scale || (this.scale = [1, 1, 0, 0]), this.needLocalTransform = !1, this.needTransform = !1
    };
    return s.prototype = {
        constructor: s, updateNeedTransform: function () {
            this.needLocalTransform = i(this.rotation[0]) || i(this.position[0]) || i(this.position[1]) || i(this.scale[0] - 1) || i(this.scale[1] - 1)
        }, updateTransform: function () {
            if (this.updateNeedTransform(), this.needTransform = this.parent ? this.needLocalTransform || this.parent.needTransform : this.needLocalTransform, this.needTransform) {
                var e = this.transform || n.create();
                if (n.identity(e), this.needLocalTransform) {
                    if (i(this.scale[0]) || i(this.scale[1])) {
                        o[0] = -this.scale[2] || 0, o[1] = -this.scale[3] || 0;
                        var t = i(o[0]) || i(o[1]);
                        t && n.translate(e, e, o), n.scale(e, e, this.scale), t && (o[0] = -o[0], o[1] = -o[1], n.translate(e, e, o))
                    }
                    if (this.rotation instanceof Array) {
                        if (0 !== this.rotation[0]) {
                            o[0] = -this.rotation[1] || 0, o[1] = -this.rotation[2] || 0;
                            var t = i(o[0]) || i(o[1]);
                            t && n.translate(e, e, o), n.rotate(e, e, this.rotation[0]), t && (o[0] = -o[0], o[1] = -o[1], n.translate(e, e, o))
                        }
                    } else 0 !== this.rotation && n.rotate(e, e, this.rotation);
                    (i(this.position[0]) || i(this.position[1])) && n.translate(e, e, this.position)
                }
                this.transform = e, this.parent && this.parent.needTransform && (this.needLocalTransform ? n.mul(this.transform, this.parent.transform, this.transform) : n.copy(this.transform, this.parent.transform))
            }
        }, setTransform: function (e) {
            if (this.needTransform) {
                var t = this.transform;
                e.transform(t[0], t[1], t[2], t[3], t[4], t[5])
            }
        }, lookAt: function () {
            var e = a.create();
            return function (i) {
                this.transform || (this.transform = n.create());
                var o = this.transform;
                a.sub(e, i, this.position), t(e[0]) && t(e[1]) || (a.normalize(e, e), o[2] = e[0] * this.scale[1], o[3] = e[1] * this.scale[1], o[0] = e[1] * this.scale[0], o[1] = -e[0] * this.scale[0], o[4] = this.position[0], o[5] = this.position[1], this.decomposeTransform())
            }
        }(), decomposeTransform: function () {
            if (this.transform) {
                var e = this.transform, t = e[0] * e[0] + e[1] * e[1], n = this.position, a = this.scale, o = this.rotation;
                i(t - 1) && (t = Math.sqrt(t));
                var r = e[2] * e[2] + e[3] * e[3];
                i(r - 1) && (r = Math.sqrt(r)), n[0] = e[4], n[1] = e[5], a[0] = t, a[1] = r, a[2] = a[3] = 0, o[0] = Math.atan2(-e[1] / r, e[0] / t), o[1] = o[2] = 0
            }
        }
    }, s
}), define("zrender/shape/Text", ["require", "../tool/area", "./Base", "../tool/util"], function (e) {
    var t = e("../tool/area"), i = e("./Base"), n = function (e) {
        i.call(this, e)
    };
    return n.prototype = {
        type: "text", brush: function (e, i) {
            var n = this.style;
            if (i && (n = this.getHighlightStyle(n, this.highlightStyle || {})), "undefined" != typeof n.text && n.text !== !1) {
                e.save(), this.doClip(e), this.setContext(e, n), this.setTransform(e), n.textFont && (e.font = n.textFont), e.textAlign = n.textAlign || "start", e.textBaseline = n.textBaseline || "middle";
                var a, o = (n.text + "").split("\n"), r = t.getTextHeight("国", n.textFont), s = this.getRect(n), l = n.x;
                a = "top" == n.textBaseline ? s.y : "bottom" == n.textBaseline ? s.y + r : s.y + r / 2;
                for (var h = 0, d = o.length; d > h; h++) {
                    if (n.maxWidth)switch (n.brushType) {
                        case"fill":
                            e.fillText(o[h], l, a, n.maxWidth);
                            break;
                        case"stroke":
                            e.strokeText(o[h], l, a, n.maxWidth);
                            break;
                        case"both":
                            e.fillText(o[h], l, a, n.maxWidth), e.strokeText(o[h], l, a, n.maxWidth);
                            break;
                        default:
                            e.fillText(o[h], l, a, n.maxWidth)
                    } else switch (n.brushType) {
                        case"fill":
                            e.fillText(o[h], l, a);
                            break;
                        case"stroke":
                            e.strokeText(o[h], l, a);
                            break;
                        case"both":
                            e.fillText(o[h], l, a), e.strokeText(o[h], l, a);
                            break;
                        default:
                            e.fillText(o[h], l, a)
                    }
                    a += r
                }
                e.restore()
            }
        }, getRect: function (e) {
            if (e.__rect)return e.__rect;
            var i = t.getTextWidth(e.text, e.textFont), n = t.getTextHeight(e.text, e.textFont), a = e.x;
            "end" == e.textAlign || "right" == e.textAlign ? a -= i : "center" == e.textAlign && (a -= i / 2);
            var o;
            return o = "top" == e.textBaseline ? e.y : "bottom" == e.textBaseline ? e.y - n : e.y - n / 2, e.__rect = {
                x: a,
                y: o,
                width: i,
                height: n
            }, e.__rect
        }
    }, e("../tool/util").inherits(n, i), n
}), define("zrender/shape/Rectangle", ["require", "./Base", "../tool/util"], function (e) {
    var t = e("./Base"), i = function (e) {
        t.call(this, e)
    };
    return i.prototype = {
        type: "rectangle", _buildRadiusPath: function (e, t) {
            var i, n, a, o, r = t.x, s = t.y, l = t.width, h = t.height, d = t.radius;
            "number" == typeof d ? i = n = a = o = d : d instanceof Array ? 1 === d.length ? i = n = a = o = d[0] : 2 === d.length ? (i = a = d[0], n = o = d[1]) : 3 === d.length ? (i = d[0], n = o = d[1], a = d[2]) : (i = d[0], n = d[1], a = d[2], o = d[3]) : i = n = a = o = 0;
            var m;
            i + n > l && (m = i + n, i *= l / m, n *= l / m), a + o > l && (m = a + o, a *= l / m, o *= l / m), n + a > h && (m = n + a, n *= h / m, a *= h / m), i + o > h && (m = i + o, i *= h / m, o *= h / m), e.moveTo(r + i, s), e.lineTo(r + l - n, s), 0 !== n && e.quadraticCurveTo(r + l, s, r + l, s + n), e.lineTo(r + l, s + h - a), 0 !== a && e.quadraticCurveTo(r + l, s + h, r + l - a, s + h), e.lineTo(r + o, s + h), 0 !== o && e.quadraticCurveTo(r, s + h, r, s + h - o), e.lineTo(r, s + i), 0 !== i && e.quadraticCurveTo(r, s, r + i, s)
        }, buildPath: function (e, t) {
            t.radius ? this._buildRadiusPath(e, t) : (e.moveTo(t.x, t.y), e.lineTo(t.x + t.width, t.y), e.lineTo(t.x + t.width, t.y + t.height), e.lineTo(t.x, t.y + t.height), e.lineTo(t.x, t.y)), e.closePath()
        }, getRect: function (e) {
            if (e.__rect)return e.__rect;
            var t;
            return t = "stroke" == e.brushType || "fill" == e.brushType ? e.lineWidth || 1 : 0, e.__rect = {
                x: Math.round(e.x - t / 2),
                y: Math.round(e.y - t / 2),
                width: e.width + t,
                height: e.height + t
            }, e.__rect
        }
    }, e("../tool/util").inherits(i, t), i
}), define("zrender/tool/area", ["require", "./util", "./curve"], function (e) {
    "use strict";
    function t(e) {
        return e %= T, 0 > e && (e += T), e
    }

    function i(e, t, i, o) {
        if (!t || !e)return !1;
        var r = e.type;
        L = L || v.getContext();
        var s = n(e, t, i, o);
        if ("undefined" != typeof s)return s;
        if (e.buildPath && L.isPointInPath)return a(e, L, t, i, o);
        switch (r) {
            case"ellipse":
                return !0;
            case"trochoid":
                var l = "out" == t.location ? t.r1 + t.r2 + t.d : t.r1 - t.r2 + t.d;
                return p(t, i, o, l);
            case"rose":
                return p(t, i, o, t.maxr);
            default:
                return !1
        }
    }

    function n(e, t, i, n) {
        var a = e.type;
        switch (a) {
            case"bezier-curve":
                return "undefined" == typeof t.cpX2 ? l(t.xStart, t.yStart, t.cpX1, t.cpY1, t.xEnd, t.yEnd, t.lineWidth, i, n) : s(t.xStart, t.yStart, t.cpX1, t.cpY1, t.cpX2, t.cpY2, t.xEnd, t.yEnd, t.lineWidth, i, n);
            case"line":
                return r(t.xStart, t.yStart, t.xEnd, t.yEnd, t.lineWidth, i, n);
            case"broken-line":
                return d(t.pointList, t.lineWidth, i, n);
            case"ring":
                return m(t.x, t.y, t.r0, t.r, i, n);
            case"circle":
                return p(t.x, t.y, t.r, i, n);
            case"sector":
                var o = t.startAngle * Math.PI / 180, h = t.endAngle * Math.PI / 180;
                return t.clockWise || (o = -o, h = -h), u(t.x, t.y, t.r0, t.r, o, h, !t.clockWise, i, n);
            case"path":
                return _(t.pathArray, Math.max(t.lineWidth, 5), t.brushType, i, n);
            case"polygon":
            case"star":
            case"isogon":
                return V(t.pointList, i, n);
            case"text":
                var U = t.__rect || e.getRect(t);
                return c(U.x, U.y, U.width, U.height, i, n);
            case"rectangle":
            case"image":
                return c(t.x, t.y, t.width, t.height, i, n)
        }
    }

    function a(e, t, i, n, a) {
        return t.beginPath(), e.buildPath(t, i), t.closePath(), t.isPointInPath(n, a)
    }

    function o(e, t, n, a) {
        return !i(e, t, n, a)
    }

    function r(e, t, i, n, a, o, r) {
        if (0 === a)return !1;
        var s = Math.max(a, 5), l = 0, h = e;
        if (r > t + s && r > n + s || t - s > r && n - s > r || o > e + s && o > i + s || e - s > o && i - s > o)return !1;
        if (e === i)return Math.abs(o - e) <= s / 2;
        l = (t - n) / (e - i), h = (e * n - i * t) / (e - i);
        var d = l * o - r + h, m = d * d / (l * l + 1);
        return s / 2 * s / 2 >= m
    }

    function s(e, t, i, n, a, o, r, s, l, h, d) {
        if (0 === l)return !1;
        var m = Math.max(l, 5);
        if (d > t + m && d > n + m && d > o + m && d > s + m || t - m > d && n - m > d && o - m > d && s - m > d || h > e + m && h > i + m && h > a + m && h > r + m || e - m > h && i - m > h && a - m > h && r - m > h)return !1;
        var c = W.cubicProjectPoint(e, t, i, n, a, o, r, s, h, d, null);
        return m / 2 >= c
    }

    function l(e, t, i, n, a, o, r, s, l) {
        if (0 === r)return !1;
        var h = Math.max(r, 5);
        if (l > t + h && l > n + h && l > o + h || t - h > l && n - h > l && o - h > l || s > e + h && s > i + h && s > a + h || e - h > s && i - h > s && a - h > s)return !1;
        var d = W.quadraticProjectPoint(e, t, i, n, a, o, s, l, null);
        return h / 2 >= d
    }

    function h(e, i, n, a, o, r, s, l, h) {
        if (0 === s)return !1;
        var d = Math.max(s, 5);
        l -= e, h -= i;
        var m = Math.sqrt(l * l + h * h);
        if (m - d > n || n > m + d)return !1;
        if (Math.abs(a - o) >= T)return !0;
        if (r) {
            var c = a;
            a = t(o), o = t(c)
        } else a = t(a), o = t(o);
        a > o && (o += T);
        var p = Math.atan2(h, l);
        return 0 > p && (p += T), p >= a && o >= p || p + T >= a && o >= p + T
    }

    function d(e, t, i, n) {
        for (var t = Math.max(t, 10), a = 0, o = e.length - 1; o > a; a++) {
            var s = e[a][0], l = e[a][1], h = e[a + 1][0], d = e[a + 1][1];
            if (r(s, l, h, d, t, i, n))return !0
        }
        return !1
    }

    function m(e, t, i, n, a, o) {
        var r = (a - e) * (a - e) + (o - t) * (o - t);
        return n * n > r && r > i * i
    }

    function c(e, t, i, n, a, o) {
        return a >= e && e + i >= a && o >= t && t + n >= o
    }

    function p(e, t, i, n, a) {
        return i * i > (n - e) * (n - e) + (a - t) * (a - t)
    }

    function u(e, t, i, n, a, o, r, s, l) {
        return h(e, t, (i + n) / 2, a, o, r, n - i, s, l)
    }

    function V(e, t, i) {
        for (var n = e.length, a = 0, o = 0, r = n - 1; n > o; o++) {
            var s = e[r][0], l = e[r][1], h = e[o][0], d = e[o][1];
            a += U(s, l, h, d, t, i), r = o
        }
        return 0 !== a
    }

    function U(e, t, i, n, a, o) {
        if (o > t && o > n || t > o && n > o)return 0;
        if (n == t)return 0;
        var r = t > n ? 1 : -1, s = (o - t) / (n - t), l = s * (i - e) + e;
        return l > a ? r : 0
    }

    function y() {
        var e = E[0];
        E[0] = E[1], E[1] = e
    }

    function g(e, t, i, n, a, o, r, s, l, h) {
        if (h > t && h > n && h > o && h > s || t > h && n > h && o > h && s > h)return 0;
        var d = W.cubicRootAt(t, n, o, s, h, C);
        if (0 === d)return 0;
        for (var m, c, p = 0, u = -1, V = 0; d > V; V++) {
            var U = C[V], g = W.cubicAt(e, i, a, r, U);
            l > g || (0 > u && (u = W.cubicExtrema(t, n, o, s, E), E[1] < E[0] && u > 1 && y(), m = W.cubicAt(t, n, o, s, E[0]), u > 1 && (c = W.cubicAt(t, n, o, s, E[1]))), p += 2 == u ? U < E[0] ? t > m ? 1 : -1 : U < E[1] ? m > c ? 1 : -1 : c > s ? 1 : -1 : U < E[0] ? t > m ? 1 : -1 : m > s ? 1 : -1)
        }
        return p
    }

    function f(e, t, i, n, a, o, r, s) {
        if (s > t && s > n && s > o || t > s && n > s && o > s)return 0;
        var l = W.quadraticRootAt(t, n, o, s, C);
        if (0 === l)return 0;
        var h = W.quadraticExtremum(t, n, o);
        if (h >= 0 && 1 >= h) {
            for (var d = 0, m = W.quadraticAt(t, n, o, h), c = 0; l > c; c++) {
                var p = W.quadraticAt(e, i, a, C[c]);
                p > r || (d += C[c] < h ? t > m ? 1 : -1 : m > o ? 1 : -1)
            }
            return d
        }
        var p = W.quadraticAt(e, i, a, C[0]);
        return p > r ? 0 : t > o ? 1 : -1
    }

    function b(e, i, n, a, o, r, s, l) {
        if (l -= i, l > n || -n > l)return 0;
        var h = Math.sqrt(n * n - l * l);
        if (C[0] = -h, C[1] = h, Math.abs(a - o) >= T) {
            a = 0, o = T;
            var d = r ? 1 : -1;
            return s >= C[0] + e && s <= C[1] + e ? d : 0
        }
        if (r) {
            var h = a;
            a = t(o), o = t(h)
        } else a = t(a), o = t(o);
        a > o && (o += T);
        for (var m = 0, c = 0; 2 > c; c++) {
            var p = C[c];
            if (p + e > s) {
                var u = Math.atan2(l, p), d = r ? 1 : -1;
                0 > u && (u = T + u), (u >= a && o >= u || u + T >= a && o >= u + T) && (u > Math.PI / 2 && u < 1.5 * Math.PI && (d = -d), m += d)
            }
        }
        return m
    }

    function _(e, t, i, n, a) {
        var o = 0, d = 0, m = 0, c = 0, p = 0, u = !0, V = !0;
        i = i || "fill";
        for (var y = "stroke" === i || "both" === i, _ = "fill" === i || "both" === i, x = 0; x < e.length; x++) {
            var k = e[x], L = k.points;
            if (u || "M" === k.command) {
                if (x > 0 && (_ && (o += U(d, m, c, p, n, a)), 0 !== o))return !0;
                c = L[L.length - 2], p = L[L.length - 1], u = !1, V && "A" !== k.command && (V = !1, d = c, m = p)
            }
            switch (k.command) {
                case"M":
                    d = L[0], m = L[1];
                    break;
                case"L":
                    if (y && r(d, m, L[0], L[1], t, n, a))return !0;
                    _ && (o += U(d, m, L[0], L[1], n, a)), d = L[0], m = L[1];
                    break;
                case"C":
                    if (y && s(d, m, L[0], L[1], L[2], L[3], L[4], L[5], t, n, a))return !0;
                    _ && (o += g(d, m, L[0], L[1], L[2], L[3], L[4], L[5], n, a)), d = L[4], m = L[5];
                    break;
                case"Q":
                    if (y && l(d, m, L[0], L[1], L[2], L[3], t, n, a))return !0;
                    _ && (o += f(d, m, L[0], L[1], L[2], L[3], n, a)), d = L[2], m = L[3];
                    break;
                case"A":
                    var v = L[0], W = L[1], w = L[2], X = L[3], I = L[4], K = L[5], S = Math.cos(I) * w + v, T = Math.sin(I) * X + W;
                    V ? (V = !1, c = S, p = T) : o += U(d, m, S, T);
                    var C = (n - v) * X / w + v;
                    if (y && h(v, W, X, I, I + K, 1 - L[7], t, C, a))return !0;
                    _ && (o += b(v, W, X, I, I + K, 1 - L[7], C, a)), d = Math.cos(I + K) * w + v, m = Math.sin(I + K) * X + W;
                    break;
                case"z":
                    if (y && r(d, m, c, p, t, n, a))return !0;
                    u = !0
            }
        }
        return _ && (o += U(d, m, c, p, n, a)), 0 !== o
    }

    function x(e, t) {
        var i = e + ":" + t;
        if (w[i])return w[i];
        L = L || v.getContext(), L.save(), t && (L.font = t), e = (e + "").split("\n");
        for (var n = 0, a = 0, o = e.length; o > a; a++)n = Math.max(L.measureText(e[a]).width, n);
        return L.restore(), w[i] = n, ++I > S && (I = 0, w = {}), n
    }

    function k(e, t) {
        var i = e + ":" + t;
        if (X[i])return X[i];
        L = L || v.getContext(), L.save(), t && (L.font = t), e = (e + "").split("\n");
        var n = (L.measureText("国").width + 2) * e.length;
        return L.restore(), X[i] = n, ++K > S && (K = 0, X = {}), n
    }

    var L, v = e("./util"), W = e("./curve"), w = {}, X = {}, I = 0, K = 0, S = 5e3, T = 2 * Math.PI, C = [-1, -1, -1], E = [-1, -1];
    return {
        isInside: i,
        isOutside: o,
        getTextWidth: x,
        getTextHeight: k,
        isInsidePath: _,
        isInsidePolygon: V,
        isInsideSector: u,
        isInsideCircle: p,
        isInsideLine: r,
        isInsideRect: c,
        isInsideBrokenLine: d,
        isInsideCubicStroke: s,
        isInsideQuadraticStroke: l
    }
}), define("zrender/shape/Base", ["require", "../tool/matrix", "../tool/guid", "../tool/util", "../tool/log", "../mixin/Transformable", "../mixin/Eventful", "../tool/area", "../tool/color"], function (e) {
    function t(t, n, a, o, r, s, l) {
        r && (t.font = r), t.textAlign = s, t.textBaseline = l;
        var h = i(n, a, o, r, s, l);
        n = (n + "").split("\n");
        var d = e("../tool/area").getTextHeight("国", r);
        switch (l) {
            case"top":
                o = h.y;
                break;
            case"bottom":
                o = h.y + d;
                break;
            default:
                o = h.y + d / 2
        }
        for (var m = 0, c = n.length; c > m; m++)t.fillText(n[m], a, o), o += d
    }

    function i(t, i, n, a, o, r) {
        var s = e("../tool/area"), l = s.getTextWidth(t, a), h = s.getTextHeight("国", a);
        switch (t = (t + "").split("\n"), o) {
            case"end":
            case"right":
                i -= l;
                break;
            case"center":
                i -= l / 2
        }
        switch (r) {
            case"top":
                break;
            case"bottom":
                n -= h * t.length;
                break;
            default:
                n -= h * t.length / 2
        }
        return {x: i, y: n, width: l, height: h * t.length}
    }

    var n = window.G_vmlCanvasManager, a = e("../tool/matrix"), o = e("../tool/guid"), r = e("../tool/util"), s = e("../tool/log"), l = e("../mixin/Transformable"), h = e("../mixin/Eventful"), d = function (e) {
        e = e || {}, this.id = e.id || o();
        for (var t in e)this[t] = e[t];
        this.style = this.style || {}, this.highlightStyle = this.highlightStyle || null, this.parent = null, this.__dirty = !0, this.__clipShapes = [], l.call(this), h.call(this)
    };
    d.prototype.invisible = !1, d.prototype.ignore = !1, d.prototype.zlevel = 0, d.prototype.draggable = !1, d.prototype.clickable = !1, d.prototype.hoverable = !0, d.prototype.z = 0, d.prototype.brush = function (e, t) {
        var i = this.beforeBrush(e, t);
        switch (e.beginPath(), this.buildPath(e, i), i.brushType) {
            case"both":
                e.fill();
            case"stroke":
                i.lineWidth > 0 && e.stroke();
                break;
            default:
                e.fill()
        }
        this.drawText(e, i, this.style), this.afterBrush(e)
    }, d.prototype.beforeBrush = function (e, t) {
        var i = this.style;
        return this.brushTypeOnly && (i.brushType = this.brushTypeOnly), t && (i = this.getHighlightStyle(i, this.highlightStyle || {}, this.brushTypeOnly)), "stroke" == this.brushTypeOnly && (i.strokeColor = i.strokeColor || i.color), e.save(), this.doClip(e), this.setContext(e, i), this.setTransform(e), i
    }, d.prototype.afterBrush = function (e) {
        e.restore()
    };
    var m = [["color", "fillStyle"], ["strokeColor", "strokeStyle"], ["opacity", "globalAlpha"], ["lineCap", "lineCap"], ["lineJoin", "lineJoin"], ["miterLimit", "miterLimit"], ["lineWidth", "lineWidth"], ["shadowBlur", "shadowBlur"], ["shadowColor", "shadowColor"], ["shadowOffsetX", "shadowOffsetX"], ["shadowOffsetY", "shadowOffsetY"]];
    d.prototype.setContext = function (e, t) {
        for (var i = 0, n = m.length; n > i; i++) {
            var a = m[i][0], o = t[a], r = m[i][1];
            "undefined" != typeof o && (e[r] = o)
        }
    };
    var c = a.create();
    return d.prototype.doClip = function (e) {
        if (this.__clipShapes && !n)for (var t = 0; t < this.__clipShapes.length; t++) {
            var i = this.__clipShapes[t];
            if (i.needTransform) {
                var o = i.transform;
                a.invert(c, o), e.transform(o[0], o[1], o[2], o[3], o[4], o[5])
            }
            if (e.beginPath(), i.buildPath(e, i.style), e.clip(), i.needTransform) {
                var o = c;
                e.transform(o[0], o[1], o[2], o[3], o[4], o[5])
            }
        }
    }, d.prototype.getHighlightStyle = function (t, i, n) {
        var a = {};
        for (var o in t)a[o] = t[o];
        var r = e("../tool/color"), s = r.getHighlightColor();
        "stroke" != t.brushType ? (a.strokeColor = s, a.lineWidth = (t.lineWidth || 1) + this.getHighlightZoom(), a.brushType = "both") : "stroke" != n ? (a.strokeColor = s, a.lineWidth = (t.lineWidth || 1) + this.getHighlightZoom()) : a.strokeColor = i.strokeColor || r.mix(t.strokeColor, r.toRGB(s));
        for (var o in i)"undefined" != typeof i[o] && (a[o] = i[o]);
        return a
    }, d.prototype.getHighlightZoom = function () {
        return "text" != this.type ? 6 : 2
    }, d.prototype.drift = function (e, t) {
        this.position[0] += e, this.position[1] += t
    }, d.prototype.getTansform = function () {
        var e = [];
        return function (t, i) {
            var n = [t, i];
            return this.needTransform && this.transform && (a.invert(e, this.transform), a.mulVector(n, e, [t, i, 1]), t == n[0] && i == n[1] && this.updateNeedTransform()), n
        }
    }(), d.prototype.buildPath = function () {
        s("buildPath not implemented in " + this.type)
    }, d.prototype.getRect = function () {
        s("getRect not implemented in " + this.type)
    }, d.prototype.isCover = function (t, i) {
        var n = this.getTansform(t, i);
        t = n[0], i = n[1];
        var a = this.style.__rect;
        return a || (a = this.style.__rect = this.getRect(this.style)), t >= a.x && t <= a.x + a.width && i >= a.y && i <= a.y + a.height ? e("../tool/area").isInside(this, this.style, t, i) : !1
    }, d.prototype.drawText = function (e, i, n) {
        if ("undefined" != typeof i.text && i.text !== !1) {
            var a = i.textColor || i.color || i.strokeColor;
            e.fillStyle = a;
            var o, r, s, l, h = 10, d = i.textPosition || this.textPosition || "top";
            switch (d) {
                case"inside":
                case"top":
                case"bottom":
                case"left":
                case"right":
                    if (this.getRect) {
                        var m = (n || i).__rect || this.getRect(n || i);
                        switch (d) {
                            case"inside":
                                s = m.x + m.width / 2, l = m.y + m.height / 2, o = "center", r = "middle", "stroke" != i.brushType && a == i.color && (e.fillStyle = "#fff");
                                break;
                            case"left":
                                s = m.x - h, l = m.y + m.height / 2, o = "end", r = "middle";
                                break;
                            case"right":
                                s = m.x + m.width + h, l = m.y + m.height / 2, o = "start", r = "middle";
                                break;
                            case"top":
                                s = m.x + m.width / 2, l = m.y - h, o = "center", r = "bottom";
                                break;
                            case"bottom":
                                s = m.x + m.width / 2, l = m.y + m.height + h, o = "center", r = "top"
                        }
                    }
                    break;
                case"start":
                case"end":
                    var c, p, u, V;
                    if ("undefined" != typeof i.pointList) {
                        var U = i.pointList;
                        if (U.length < 2)return;
                        var y = U.length;
                        switch (d) {
                            case"start":
                                c = U[0][0], p = U[1][0], u = U[0][1], V = U[1][1];
                                break;
                            case"end":
                                c = U[y - 2][0], p = U[y - 1][0], u = U[y - 2][1], V = U[y - 1][1]
                        }
                    } else c = i.xStart || 0, p = i.xEnd || 0, u = i.yStart || 0, V = i.yEnd || 0;
                    switch (d) {
                        case"start":
                            o = p > c ? "end" : "start", r = V > u ? "bottom" : "top", s = c, l = u;
                            break;
                        case"end":
                            o = p > c ? "start" : "end", r = V > u ? "top" : "bottom", s = p, l = V
                    }
                    h -= 4, c != p ? s -= "end" == o ? h : -h : o = "center", u != V ? l -= "bottom" == r ? h : -h : r = "middle";
                    break;
                case"specific":
                    s = i.textX || 0, l = i.textY || 0, o = "start", r = "middle"
            }
            null != s && null != l && t(e, i.text, s, l, i.textFont, i.textAlign || o, i.textBaseline || r)
        }
    }, d.prototype.modSelf = function () {
        this.__dirty = !0, this.style && (this.style.__rect = null), this.highlightStyle && (this.highlightStyle.__rect = null)
    }, d.prototype.isSilent = function () {
        return !(this.hoverable || this.draggable || this.clickable || this.onmousemove || this.onmouseover || this.onmouseout || this.onmousedown || this.onmouseup || this.onclick || this.ondragenter || this.ondragover || this.ondragleave || this.ondrop)
    }, r.merge(d.prototype, l.prototype, !0), r.merge(d.prototype, h.prototype, !0), d
}), define("zrender/tool/curve", ["require", "./vector"], function (e) {
    function t(e) {
        return e > -V && V > e
    }

    function i(e) {
        return e > V || -V > e
    }

    function n(e, t, i, n, a) {
        var o = 1 - a;
        return o * o * (o * e + 3 * a * t) + a * a * (a * n + 3 * o * i)
    }

    function a(e, t, i, n, a) {
        var o = 1 - a;
        return 3 * (((t - e) * o + 2 * (i - t) * a) * o + (n - i) * a * a)
    }

    function o(e, i, n, a, o, r) {
        var s = a + 3 * (i - n) - e, l = 3 * (n - 2 * i + e), h = 3 * (i - e), d = e - o, m = l * l - 3 * s * h, c = l * h - 9 * s * d, p = h * h - 3 * l * d, u = 0;
        if (t(m) && t(c))if (t(l))r[0] = 0; else {
            var V = -h / l;
            V >= 0 && 1 >= V && (r[u++] = V)
        } else {
            var g = c * c - 4 * m * p;
            if (t(g)) {
                var f = c / m, V = -l / s + f, b = -f / 2;
                V >= 0 && 1 >= V && (r[u++] = V), b >= 0 && 1 >= b && (r[u++] = b)
            } else if (g > 0) {
                var _ = Math.sqrt(g), x = m * l + 1.5 * s * (-c + _), k = m * l + 1.5 * s * (-c - _);
                x = 0 > x ? -Math.pow(-x, y) : Math.pow(x, y), k = 0 > k ? -Math.pow(-k, y) : Math.pow(k, y);
                var V = (-l - (x + k)) / (3 * s);
                V >= 0 && 1 >= V && (r[u++] = V)
            } else {
                var L = (2 * m * l - 3 * s * c) / (2 * Math.sqrt(m * m * m)), v = Math.acos(L) / 3, W = Math.sqrt(m), w = Math.cos(v), V = (-l - 2 * W * w) / (3 * s), b = (-l + W * (w + U * Math.sin(v))) / (3 * s), X = (-l + W * (w - U * Math.sin(v))) / (3 * s);
                V >= 0 && 1 >= V && (r[u++] = V), b >= 0 && 1 >= b && (r[u++] = b), X >= 0 && 1 >= X && (r[u++] = X)
            }
        }
        return u
    }

    function r(e, n, a, o, r) {
        var s = 6 * a - 12 * n + 6 * e, l = 9 * n + 3 * o - 3 * e - 9 * a, h = 3 * n - 3 * e, d = 0;
        if (t(l)) {
            if (i(s)) {
                var m = -h / s;
                m >= 0 && 1 >= m && (r[d++] = m)
            }
        } else {
            var c = s * s - 4 * l * h;
            if (t(c))r[0] = -s / (2 * l); else if (c > 0) {
                var p = Math.sqrt(c), m = (-s + p) / (2 * l), u = (-s - p) / (2 * l);
                m >= 0 && 1 >= m && (r[d++] = m), u >= 0 && 1 >= u && (r[d++] = u)
            }
        }
        return d
    }

    function s(e, t, i, n, a, o) {
        var r = (t - e) * a + e, s = (i - t) * a + t, l = (n - i) * a + i, h = (s - r) * a + r, d = (l - s) * a + s, m = (d - h) * a + h;
        o[0] = e, o[1] = r, o[2] = h, o[3] = m, o[4] = m, o[5] = d, o[6] = l, o[7] = n
    }

    function l(e, t, i, a, o, r, s, l, h, d, m) {
        var c, p = .005, U = 1 / 0;
        g[0] = h, g[1] = d;
        for (var y = 0; 1 > y; y += .05) {
            f[0] = n(e, i, o, s, y), f[1] = n(t, a, r, l, y);
            var _ = u.distSquare(g, f);
            U > _ && (c = y, U = _)
        }
        U = 1 / 0;
        for (var x = 0; 32 > x && !(V > p); x++) {
            var k = c - p, L = c + p;
            f[0] = n(e, i, o, s, k), f[1] = n(t, a, r, l, k);
            var _ = u.distSquare(f, g);
            if (k >= 0 && U > _)c = k, U = _; else {
                b[0] = n(e, i, o, s, L), b[1] = n(t, a, r, l, L);
                var v = u.distSquare(b, g);
                1 >= L && U > v ? (c = L, U = v) : p *= .5
            }
        }
        return m && (m[0] = n(e, i, o, s, c), m[1] = n(t, a, r, l, c)), Math.sqrt(U)
    }

    function h(e, t, i, n) {
        var a = 1 - n;
        return a * (a * e + 2 * n * t) + n * n * i
    }

    function d(e, t, i, n) {
        return 2 * ((1 - n) * (t - e) + n * (i - t))
    }

    function m(e, n, a, o, r) {
        var s = e - 2 * n + a, l = 2 * (n - e), h = e - o, d = 0;
        if (t(s)) {
            if (i(l)) {
                var m = -h / l;
                m >= 0 && 1 >= m && (r[d++] = m)
            }
        } else {
            var c = l * l - 4 * s * h;
            if (t(c)) {
                var m = -l / (2 * s);
                m >= 0 && 1 >= m && (r[d++] = m)
            } else if (c > 0) {
                var p = Math.sqrt(c), m = (-l + p) / (2 * s), u = (-l - p) / (2 * s);
                m >= 0 && 1 >= m && (r[d++] = m), u >= 0 && 1 >= u && (r[d++] = u)
            }
        }
        return d
    }

    function c(e, t, i) {
        var n = e + i - 2 * t;
        return 0 === n ? .5 : (e - t) / n
    }

    function p(e, t, i, n, a, o, r, s, l) {
        var d, m = .005, c = 1 / 0;
        g[0] = r, g[1] = s;
        for (var p = 0; 1 > p; p += .05) {
            f[0] = h(e, i, a, p), f[1] = h(t, n, o, p);
            var U = u.distSquare(g, f);
            c > U && (d = p, c = U)
        }
        c = 1 / 0;
        for (var y = 0; 32 > y && !(V > m); y++) {
            var _ = d - m, x = d + m;
            f[0] = h(e, i, a, _), f[1] = h(t, n, o, _);
            var U = u.distSquare(f, g);
            if (_ >= 0 && c > U)d = _, c = U; else {
                b[0] = h(e, i, a, x), b[1] = h(t, n, o, x);
                var k = u.distSquare(b, g);
                1 >= x && c > k ? (d = x, c = k) : m *= .5
            }
        }
        return l && (l[0] = h(e, i, a, d), l[1] = h(t, n, o, d)), Math.sqrt(c)
    }

    var u = e("./vector"), V = 1e-4, U = Math.sqrt(3), y = 1 / 3, g = u.create(), f = u.create(), b = u.create();
    return {
        cubicAt: n,
        cubicDerivativeAt: a,
        cubicRootAt: o,
        cubicExtrema: r,
        cubicSubdivide: s,
        cubicProjectPoint: l,
        quadraticAt: h,
        quadraticDerivativeAt: d,
        quadraticRootAt: m,
        quadraticExtremum: c,
        quadraticProjectPoint: p
    }
}), define("zrender/Group", ["require", "./tool/guid", "./tool/util", "./mixin/Transformable", "./mixin/Eventful"], function (e) {
    var t = e("./tool/guid"), i = e("./tool/util"), n = e("./mixin/Transformable"), a = e("./mixin/Eventful"), o = function (e) {
        e = e || {}, this.id = e.id || t();
        for (var i in e)this[i] = e[i];
        this.type = "group", this.clipShape = null, this._children = [], this._storage = null, this.__dirty = !0, n.call(this), a.call(this)
    };
    return o.prototype.ignore = !1, o.prototype.children = function () {
        return this._children.slice()
    }, o.prototype.childAt = function (e) {
        return this._children[e]
    }, o.prototype.addChild = function (e) {
        e != this && e.parent != this && (e.parent && e.parent.removeChild(e), this._children.push(e), e.parent = this, this._storage && this._storage !== e._storage && (this._storage.addToMap(e), e instanceof o && e.addChildrenToStorage(this._storage)))
    }, o.prototype.removeChild = function (e) {
        var t = i.indexOf(this._children, e);
        this._children.splice(t, 1), e.parent = null, this._storage && (this._storage.delFromMap(e.id), e instanceof o && e.delChildrenFromStorage(this._storage))
    }, o.prototype.eachChild = function (e, t) {
        for (var i = !!t, n = 0; n < this._children.length; n++) {
            var a = this._children[n];
            i ? e.call(t, a) : e(a)
        }
    }, o.prototype.traverse = function (e, t) {
        for (var i = !!t, n = 0; n < this._children.length; n++) {
            var a = this._children[n];
            i ? e.call(t, a) : e(a), "group" === a.type && a.traverse(e, t)
        }
    }, o.prototype.addChildrenToStorage = function (e) {
        for (var t = 0; t < this._children.length; t++) {
            var i = this._children[t];
            e.addToMap(i), "group" === i.type && i.addChildrenToStorage(e)
        }
    }, o.prototype.delChildrenFromStorage = function (e) {
        for (var t = 0; t < this._children.length; t++) {
            var i = this._children[t];
            e.delFromMap(i.id), "group" === i.type && i.delChildrenFromStorage(e)
        }
    }, o.prototype.modSelf = function () {
        this.__dirty = !0
    }, i.merge(o.prototype, n.prototype, !0), i.merge(o.prototype, a.prototype, !0), o
}), define("zrender/animation/Clip", ["require", "./easing"], function (e) {
    function t(e) {
        this._targetPool = e.target || {}, this._targetPool instanceof Array || (this._targetPool = [this._targetPool]), this._life = e.life || 1e3, this._delay = e.delay || 0, this._startTime = (new Date).getTime() + this._delay, this._endTime = this._startTime + 1e3 * this._life, this.loop = "undefined" == typeof e.loop ? !1 : e.loop, this.gap = e.gap || 0, this.easing = e.easing || "Linear", this.onframe = e.onframe, this.ondestroy = e.ondestroy, this.onrestart = e.onrestart
    }

    var i = e("./easing");
    return t.prototype = {
        step: function (e) {
            var t = (e - this._startTime) / this._life;
            if (!(0 > t)) {
                t = Math.min(t, 1);
                var n = "string" == typeof this.easing ? i[this.easing] : this.easing, a = "function" == typeof n ? n(t) : t;
                return this.fire("frame", a), 1 == t ? this.loop ? (this.restart(), "restart") : (this._needsRemove = !0, "destroy") : null
            }
        }, restart: function () {
            var e = (new Date).getTime(), t = (e - this._startTime) % this._life;
            this._startTime = (new Date).getTime() - t + this.gap, this._needsRemove = !1
        }, fire: function (e, t) {
            for (var i = 0, n = this._targetPool.length; n > i; i++)this["on" + e] && this["on" + e](this._targetPool[i], t)
        }, constructor: t
    }, t
}), define("zrender/animation/easing", [], function () {
    var e = {
        Linear: function (e) {
            return e
        }, QuadraticIn: function (e) {
            return e * e
        }, QuadraticOut: function (e) {
            return e * (2 - e)
        }, QuadraticInOut: function (e) {
            return (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
        }, CubicIn: function (e) {
            return e * e * e
        }, CubicOut: function (e) {
            return --e * e * e + 1
        }, CubicInOut: function (e) {
            return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
        }, QuarticIn: function (e) {
            return e * e * e * e
        }, QuarticOut: function (e) {
            return 1 - --e * e * e * e
        }, QuarticInOut: function (e) {
            return (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
        }, QuinticIn: function (e) {
            return e * e * e * e * e
        }, QuinticOut: function (e) {
            return --e * e * e * e * e + 1
        }, QuinticInOut: function (e) {
            return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
        }, SinusoidalIn: function (e) {
            return 1 - Math.cos(e * Math.PI / 2)
        }, SinusoidalOut: function (e) {
            return Math.sin(e * Math.PI / 2)
        }, SinusoidalInOut: function (e) {
            return .5 * (1 - Math.cos(Math.PI * e))
        }, ExponentialIn: function (e) {
            return 0 === e ? 0 : Math.pow(1024, e - 1)
        }, ExponentialOut: function (e) {
            return 1 === e ? 1 : 1 - Math.pow(2, -10 * e)
        }, ExponentialInOut: function (e) {
            return 0 === e ? 0 : 1 === e ? 1 : (e *= 2) < 1 ? .5 * Math.pow(1024, e - 1) : .5 * (-Math.pow(2, -10 * (e - 1)) + 2)
        }, CircularIn: function (e) {
            return 1 - Math.sqrt(1 - e * e)
        }, CircularOut: function (e) {
            return Math.sqrt(1 - --e * e)
        }, CircularInOut: function (e) {
            return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        }, ElasticIn: function (e) {
            var t, i = .1, n = .4;
            return 0 === e ? 0 : 1 === e ? 1 : (!i || 1 > i ? (i = 1, t = n / 4) : t = n * Math.asin(1 / i) / (2 * Math.PI), -(i * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / n)))
        }, ElasticOut: function (e) {
            var t, i = .1, n = .4;
            return 0 === e ? 0 : 1 === e ? 1 : (!i || 1 > i ? (i = 1, t = n / 4) : t = n * Math.asin(1 / i) / (2 * Math.PI), i * Math.pow(2, -10 * e) * Math.sin(2 * (e - t) * Math.PI / n) + 1)
        }, ElasticInOut: function (e) {
            var t, i = .1, n = .4;
            return 0 === e ? 0 : 1 === e ? 1 : (!i || 1 > i ? (i = 1, t = n / 4) : t = n * Math.asin(1 / i) / (2 * Math.PI), (e *= 2) < 1 ? -.5 * i * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / n) : i * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / n) * .5 + 1)
        }, BackIn: function (e) {
            var t = 1.70158;
            return e * e * ((t + 1) * e - t)
        }, BackOut: function (e) {
            var t = 1.70158;
            return --e * e * ((t + 1) * e + t) + 1
        }, BackInOut: function (e) {
            var t = 2.5949095;
            return (e *= 2) < 1 ? .5 * e * e * ((t + 1) * e - t) : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2)
        }, BounceIn: function (t) {
            return 1 - e.BounceOut(1 - t)
        }, BounceOut: function (e) {
            return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }, BounceInOut: function (t) {
            return .5 > t ? .5 * e.BounceIn(2 * t) : .5 * e.BounceOut(2 * t - 1) + .5
        }
    };
    return e
}), define("echarts/component/base", ["require", "../config", "../util/ecData", "../util/ecQuery", "../util/number", "zrender/tool/util", "zrender/tool/env"], function (e) {
    function t(e, t, a, o, r) {
        this.ecTheme = e, this.messageCenter = t, this.zr = a, this.option = o, this.series = o.series, this.myChart = r, this.component = r.component, this._zlevelBase = this.getZlevelBase(), this.shapeList = [], this.effectList = [];
        var s = this;
        s._onlegendhoverlink = function (e) {
            if (s.legendHoverLink)for (var t, a = e.target, o = s.shapeList.length - 1; o >= 0; o--)t = s.type == i.CHART_TYPE_PIE || s.type == i.CHART_TYPE_FUNNEL ? n.get(s.shapeList[o], "name") : (n.get(s.shapeList[o], "series") || {}).name, t != a || s.shapeList[o].invisible || s.zr.addHoverShape(s.shapeList[o])
        }, t && t.bind(i.EVENT.LEGEND_HOVERLINK, this._onlegendhoverlink)
    }

    var i = e("../config"), n = e("../util/ecData"), a = e("../util/ecQuery"), o = e("../util/number"), r = e("zrender/tool/util");
    return t.prototype = {
        canvasSupported: e("zrender/tool/env").canvasSupported,
        getZlevelBase: function (e) {
            switch (e = e || this.type + "") {
                case i.COMPONENT_TYPE_GRID:
                case i.COMPONENT_TYPE_AXIS_CATEGORY:
                case i.COMPONENT_TYPE_AXIS_VALUE:
                case i.COMPONENT_TYPE_POLAR:
                    return 0;
                case i.CHART_TYPE_LINE:
                case i.CHART_TYPE_BAR:
                case i.CHART_TYPE_SCATTER:
                case i.CHART_TYPE_PIE:
                case i.CHART_TYPE_RADAR:
                case i.CHART_TYPE_MAP:
                case i.CHART_TYPE_K:
                case i.CHART_TYPE_CHORD:
                case i.CHART_TYPE_GUAGE:
                case i.CHART_TYPE_FUNNEL:
                case i.CHART_TYPE_EVENTRIVER:
                    return 2;
                case i.COMPONENT_TYPE_LEGEND:
                case i.COMPONENT_TYPE_DATARANGE:
                case i.COMPONENT_TYPE_DATAZOOM:
                case i.COMPONENT_TYPE_TIMELINE:
                case i.COMPONENT_TYPE_ROAMCONTROLLER:
                    return 4;
                case i.CHART_TYPE_ISLAND:
                    return 5;
                case i.COMPONENT_TYPE_TOOLBOX:
                case i.COMPONENT_TYPE_TITLE:
                    return 6;
                case i.COMPONENT_TYPE_TOOLTIP:
                    return 8;
                default:
                    return 0
            }
        },
        reformOption: function (e) {
            return r.merge(e || {}, r.clone(this.ecTheme[this.type] || {}))
        },
        reformCssArray: function (e) {
            if (!(e instanceof Array))return [e, e, e, e];
            switch (e.length + "") {
                case"4":
                    return e;
                case"3":
                    return [e[0], e[1], e[2], e[1]];
                case"2":
                    return [e[0], e[1], e[0], e[1]];
                case"1":
                    return [e[0], e[0], e[0], e[0]];
                case"0":
                    return [0, 0, 0, 0]
            }
        },
        getShapeById: function (e) {
            for (var t = 0, i = this.shapeList.length; i > t; t++)if (this.shapeList[t].id === e)return this.shapeList[t];
            return null
        },
        getFont: function (e) {
            var t = r.merge(r.clone(e) || {}, this.ecTheme.textStyle);
            return t.fontStyle + " " + t.fontWeight + " " + t.fontSize + "px " + t.fontFamily
        },
        getItemStyleColor: function (e, t, i, n) {
            return "function" == typeof e ? e.call(this.myChart, {
                seriesIndex: t,
                series: this.series[t],
                dataIndex: i,
                data: n
            }) : e
        },
        subPixelOptimize: function (e, t) {
            return e = t % 2 === 1 ? Math.floor(e) + .5 : Math.round(e)
        },
        resize: function () {
            this.refresh && this.refresh(), this.clearEffectShape && this.clearEffectShape(!0);
            var e = this;
            setTimeout(function () {
                e.animationEffect && e.animationEffect()
            }, 200)
        },
        clear: function () {
            this.clearEffectShape && this.clearEffectShape(), this.zr && this.zr.delShape(this.shapeList), this.shapeList = []
        },
        dispose: function () {
            this.onbeforDispose && this.onbeforDispose(), this.clear(), this.shapeList = null, this.effectList = null, this.messageCenter && this.messageCenter.unbind(i.EVENT.LEGEND_HOVERLINK, this._onlegendhoverlink), this.onafterDispose && this.onafterDispose()
        },
        query: a.query,
        deepQuery: a.deepQuery,
        deepMerge: a.deepMerge,
        parsePercent: o.parsePercent,
        parseCenter: o.parseCenter,
        parseRadius: o.parseRadius,
        numAddCommas: o.addCommas
    }, t
}), define("echarts/chart/base", ["require", "zrender/shape/Image", "../util/shape/Icon", "../util/shape/MarkLine", "../util/shape/Symbol", "../config", "../util/ecData", "../util/ecAnimation", "../util/ecEffect", "../util/accMath", "zrender/tool/util", "zrender/tool/area"], function (e) {
    function t() {
        var e = this;
        this.selectedMap = {}, this.lastShapeList = [], this.shapeHandler = {
            onclick: function () {
                e.isClick = !0
            }, ondragover: function (t) {
                var i = t.target;
                i.highlightStyle = i.highlightStyle || {};
                var n = i.highlightStyle, a = n.brushTyep, o = n.strokeColor, r = n.lineWidth;
                n.brushType = "stroke", n.strokeColor = e.ecTheme.calculableColor, n.lineWidth = "icon" === i.type ? 30 : 10, e.zr.addHoverShape(i), setTimeout(function () {
                    i.highlightStyle && (i.highlightStyle.brushType = a, i.highlightStyle.strokeColor = o, i.highlightStyle.lineWidth = r)
                }, 20)
            }, ondrop: function (t) {
                null != s.get(t.dragged, "data") && (e.isDrop = !0)
            }, ondragend: function () {
                e.isDragend = !0
            }
        }
    }

    var i = e("zrender/shape/Image"), n = e("../util/shape/Icon"), a = e("../util/shape/MarkLine"), o = e("../util/shape/Symbol"), r = e("../config"), s = e("../util/ecData"), l = e("../util/ecAnimation"), h = e("../util/ecEffect"), d = e("../util/accMath"), m = e("zrender/tool/util"), c = e("zrender/tool/area");
    return t.prototype = {
        setCalculable: function (e) {
            return e.dragEnableTime = this.ecTheme.DRAG_ENABLE_TIME, e.ondragover = this.shapeHandler.ondragover, e.ondragend = this.shapeHandler.ondragend, e.ondrop = this.shapeHandler.ondrop, e
        }, ondrop: function (e, t) {
            if (this.isDrop && e.target && !t.dragIn) {
                var i, n = e.target, a = e.dragged, o = s.get(n, "seriesIndex"), l = s.get(n, "dataIndex"), h = this.series, m = this.component.legend;
                if (-1 === l) {
                    if (s.get(a, "seriesIndex") == o)return t.dragOut = t.dragIn = t.needRefresh = !0, void(this.isDrop = !1);
                    i = {
                        value: s.get(a, "value"),
                        name: s.get(a, "name")
                    }, this.type === r.CHART_TYPE_PIE && i.value < 0 && (i.value = 0);
                    for (var c = !1, p = h[o].data, u = 0, V = p.length; V > u; u++)p[u].name === i.name && "-" === p[u].value && (h[o].data[u].value = i.value, c = !0);
                    !c && h[o].data.push(i), m && m.add(i.name, a.style.color || a.style.strokeColor)
                } else i = this.option.series[o].data[l] || "-", null != i.value ? (this.option.series[o].data[l].value = "-" != i.value ? d.accAdd(this.option.series[o].data[l].value, s.get(a, "value")) : s.get(a, "value"), (this.type === r.CHART_TYPE_FUNNEL || this.type === r.CHART_TYPE_PIE) && (m && 1 === m.getRelatedAmount(i.name) && this.component.legend.del(i.name), i.name += this.option.nameConnector + s.get(a, "name"), m && m.add(i.name, a.style.color || a.style.strokeColor))) : this.option.series[o].data[l] = "-" != i ? d.accAdd(this.option.series[o].data[l], s.get(a, "value")) : s.get(a, "value");
                t.dragIn = t.dragIn || !0, this.isDrop = !1;
                var U = this;
                setTimeout(function () {
                    U.zr.trigger("mousemove", e.event)
                }, 300)
            }
        }, ondragend: function (e, t) {
            if (this.isDragend && e.target && !t.dragOut) {
                var i = e.target, n = s.get(i, "seriesIndex"), a = s.get(i, "dataIndex"), o = this.series;
                if (null != o[n].data[a].value) {
                    o[n].data[a].value = "-";
                    var r = o[n].data[a].name;
                    this.component.legend && 0 === this.component.legend.getRelatedAmount(r) && this.component.legend.del(r)
                } else o[n].data[a] = "-";
                t.dragOut = !0, t.needRefresh = !0, this.isDragend = !1
            }
        }, onlegendSelected: function (e, t) {
            var i = e.selected;
            for (var n in this.selectedMap)this.selectedMap[n] != i[n] && (t.needRefresh = !0), this.selectedMap[n] = i[n]
        }, _bulidPosition: function () {
            this._symbol = this.option.symbolList, this._sIndex2ShapeMap = {}, this._sIndex2ColorMap = {}, this.selectedMap = {}, this.xMarkMap = {};
            for (var e, t, i, n, a = this.series, o = {
                top: [],
                bottom: [],
                left: [],
                right: [],
                other: []
            }, s = 0, l = a.length; l > s; s++)a[s].type === this.type && (a[s] = this.reformOption(a[s]), this.legendHoverLink = a[s].legendHoverLink || this.legendHoverLink, e = a[s].xAxisIndex, t = a[s].yAxisIndex, i = this.component.xAxis.getAxis(e), n = this.component.yAxis.getAxis(t), i.type === r.COMPONENT_TYPE_AXIS_CATEGORY ? o[i.getPosition()].push(s) : n.type === r.COMPONENT_TYPE_AXIS_CATEGORY ? o[n.getPosition()].push(s) : o.other.push(s));
            for (var h in o)o[h].length > 0 && this._buildSinglePosition(h, o[h]);
            this.addShapeList()
        }, _buildSinglePosition: function (e, t) {
            var i = this._mapData(t), n = i.locationMap, a = i.maxDataLength;
            if (0 !== a && 0 !== n.length) {
                switch (e) {
                    case"bottom":
                    case"top":
                        this._buildHorizontal(t, a, n, this.xMarkMap);
                        break;
                    case"left":
                    case"right":
                        this._buildVertical(t, a, n, this.xMarkMap);
                        break;
                    case"other":
                        this._buildOther(t, a, n, this.xMarkMap)
                }
                for (var o = 0, r = t.length; r > o; o++)this.buildMark(t[o])
            }
        }, _mapData: function (e) {
            for (var t, i, n, a, o = this.series, s = 0, l = {}, h = "__kener__stack__", d = this.component.legend, m = [], c = 0, p = 0, u = e.length; u > p; p++)t = o[e[p]], n = t.name, this._sIndex2ShapeMap[e[p]] = this._sIndex2ShapeMap[e[p]] || this.query(t, "symbol") || this._symbol[p % this._symbol.length], d ? (this.selectedMap[n] = d.isSelected(n), this._sIndex2ColorMap[e[p]] = d.getColor(n), a = d.getItemShape(n), a && (this.type == r.CHART_TYPE_LINE ? (a.style.iconType = "legendLineIcon", a.style.symbol = this._sIndex2ShapeMap[e[p]]) : t.itemStyle.normal.barBorderWidth > 0 && (a.style.x += 1, a.style.y += 1, a.style.width -= 2, a.style.height -= 2, a.style.strokeColor = a.highlightStyle.strokeColor = t.itemStyle.normal.barBorderColor, a.highlightStyle.lineWidth = 3, a.style.brushType = "both"), d.setItemShape(n, a))) : (this.selectedMap[n] = !0, this._sIndex2ColorMap[e[p]] = this.zr.getColor(e[p])), this.selectedMap[n] && (i = t.stack || h + e[p], null == l[i] ? (l[i] = s, m[s] = [e[p]], s++) : m[l[i]].push(e[p])), c = Math.max(c, t.data.length);
            return {locationMap: m, maxDataLength: c}
        }, _calculMarkMapXY: function (e, t, i) {
            for (var n = this.series, a = 0, o = t.length; o > a; a++)for (var r = 0, s = t[a].length; s > r; r++) {
                var l = t[a][r], h = "xy" == i ? 0 : "";
                if ("-1" != i.indexOf("x")) {
                    e[l]["counter" + h] > 0 && (e[l]["average" + h] = (e[l]["sum" + h] / e[l]["counter" + h]).toFixed(2) - 0);
                    var d = this.component.xAxis.getAxis(n[l].xAxisIndex || 0).getCoord(e[l]["average" + h]);
                    e[l]["averageLine" + h] = [[d, this.component.grid.getYend()], [d, this.component.grid.getY()]], e[l]["minLine" + h] = [[e[l]["minX" + h], this.component.grid.getYend()], [e[l]["minX" + h], this.component.grid.getY()]], e[l]["maxLine" + h] = [[e[l]["maxX" + h], this.component.grid.getYend()], [e[l]["maxX" + h], this.component.grid.getY()]], e[l].isHorizontal = !1
                }
                if (h = "xy" == i ? 1 : "", "-1" != i.indexOf("y")) {
                    e[l]["counter" + h] > 0 && (e[l]["average" + h] = (e[l]["sum" + h] / e[l]["counter" + h]).toFixed(2) - 0);
                    var m = this.component.yAxis.getAxis(n[l].yAxisIndex || 0).getCoord(e[l]["average" + h]);
                    e[l]["averageLine" + h] = [[this.component.grid.getX(), m], [this.component.grid.getXend(), m]], e[l]["minLine" + h] = [[this.component.grid.getX(), e[l]["minY" + h]], [this.component.grid.getXend(), e[l]["minY" + h]]], e[l]["maxLine" + h] = [[this.component.grid.getX(), e[l]["maxY" + h]], [this.component.grid.getXend(), e[l]["maxY" + h]]], e[l].isHorizontal = !0
                }
            }
        }, addLabel: function (e, t, i, n, a) {
            var o = [i, t], r = this.deepMerge(o, "itemStyle.normal.label"), s = this.deepMerge(o, "itemStyle.emphasis.label"), l = r.textStyle || {}, h = s.textStyle || {};
            return r.show && (e.style.text = this._getLabelText(t, i, n, "normal"), e.style.textPosition = null == r.position ? "horizontal" === a ? "right" : "top" : r.position, e.style.textColor = l.color, e.style.textFont = this.getFont(l)), s.show && (e.highlightStyle.text = this._getLabelText(t, i, n, "emphasis"), e.highlightStyle.textPosition = r.show ? e.style.textPosition : null == s.position ? "horizontal" === a ? "right" : "top" : s.position, e.highlightStyle.textColor = h.color, e.highlightStyle.textFont = this.getFont(h)), e
        }, _getLabelText: function (e, t, i, n) {
            var a = this.deepQuery([t, e], "itemStyle." + n + ".label.formatter");
            a || "emphasis" !== n || (a = this.deepQuery([t, e], "itemStyle.normal.label.formatter"));
            var o = null != t ? null != t.value ? t.value : t : "-";
            return a ? "function" == typeof a ? a.call(this.myChart, e.name, i, o) : "string" == typeof a ? (a = a.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}"), a = a.replace("{a0}", e.name).replace("{b0}", i).replace("{c0}", this.numAddCommas(o))) : void 0 : this.numAddCommas(o)
        }, buildMark: function (e) {
            var t = this.series[e];
            this.selectedMap[t.name] && (t.markPoint && this._buildMarkPoint(e), t.markLine && this._buildMarkLine(e))
        }, _buildMarkPoint: function (e) {
            for (var t, i, n = (this.markAttachStyle || {})[e], a = this.series[e], o = this.getZlevelBase(), s = m.clone(a.markPoint), l = 0, h = s.data.length; h > l; l++)t = s.data[l], i = this.getMarkCoord(e, t), s.data[l].x = null != t.x ? t.x : i[0], s.data[l].y = null != t.y ? t.y : i[1], !t.type || "max" !== t.type && "min" !== t.type || (s.data[l].value = i[3], s.data[l].name = t.name || t.type, s.data[l].symbolSize = s.data[l].symbolSize || c.getTextWidth(i[3], this.getFont()) / 2 + 5);
            for (var d = this._markPoint(e, s), l = 0, h = d.length; h > l; l++) {
                d[l].zlevel = o + 1;
                for (var p in n)d[l][p] = m.clone(n[p]);
                this.shapeList.push(d[l])
            }
            if (this.type === r.CHART_TYPE_FORCE || this.type === r.CHART_TYPE_CHORD)for (var l = 0, h = d.length; h > l; l++)this.zr.addShape(d[l])
        }, _buildMarkLine: function (e) {
            for (var t, i, n = (this.markAttachStyle || {})[e], a = this.series[e], o = this.getZlevelBase(), s = m.clone(a.markLine), l = 0, h = s.data.length; h > l; l++)t = s.data[l], !t.type || "max" !== t.type && "min" !== t.type && "average" !== t.type ? i = [this.getMarkCoord(e, t[0]), this.getMarkCoord(e, t[1])] : (i = this.getMarkCoord(e, t), s.data[l] = [m.clone(t), {}], s.data[l][0].name = t.name || t.type, s.data[l][0].value = i[3], i = i[2], t = [{}, {}]), null != i && null != i[0] && null != i[1] && (s.data[l][0].x = null != t[0].x ? t[0].x : i[0][0], s.data[l][0].y = null != t[0].y ? t[0].y : i[0][1], s.data[l][1].x = null != t[1].x ? t[1].x : i[1][0], s.data[l][1].y = null != t[1].y ? t[1].y : i[1][1]);
            for (var d = this._markLine(e, s), l = 0, h = d.length; h > l; l++) {
                d[l].zlevel = o + 1;
                for (var c in n)d[l][c] = m.clone(n[c]);
                this.shapeList.push(d[l])
            }
            if (this.type === r.CHART_TYPE_FORCE || this.type === r.CHART_TYPE_CHORD)for (var l = 0, h = d.length; h > l; l++)this.zr.addShape(d[l])
        }, _markPoint: function (e, t) {
            var i = this.series[e], n = this.component;
            m.merge(t, this.ecTheme.markPoint), t.name = i.name;
            var a, o, l, h, d, c, p, u = [], V = t.data, U = n.dataRange, y = n.legend, g = this.zr.getWidth(), f = this.zr.getHeight();
            if (t.large)a = this.getLargeMarkPoingShape(e, t), a._mark = "largePoint", a && u.push(a); else for (var b = 0, _ = V.length; _ > b; b++)null != V[b].x && null != V[b].y && (l = null != V[b] && null != V[b].value ? V[b].value : "", y && (o = y.getColor(i.name)), U && (o = isNaN(l) ? o : U.getColor(l), h = [V[b], t], d = this.deepQuery(h, "itemStyle.normal.color") || o, c = this.deepQuery(h, "itemStyle.emphasis.color") || d, null == d && null == c) || (o = null == o ? this.zr.getColor(e) : o, V[b].tooltip = V[b].tooltip || t.tooltip || {trigger: "item"}, V[b].name = null != V[b].name ? V[b].name : "", V[b].value = l, a = this.getSymbolShape(t, e, V[b], b, V[b].name, this.parsePercent(V[b].x, g), this.parsePercent(V[b].y, f), "pin", o, "rgba(0,0,0,0)", "horizontal"), a._mark = "point", p = this.deepMerge([V[b], t], "effect"), p.show && (a.effect = p), i.type === r.CHART_TYPE_MAP && (a._geo = this.getMarkGeo(V[b])), s.pack(a, i, e, V[b], b, V[b].name, l), u.push(a)));
            return u
        }, _markLine: function (e, t) {
            var i = this.series[e], n = this.component;
            m.merge(t, this.ecTheme.markLine), t.symbol = t.symbol instanceof Array ? t.symbol.length > 1 ? t.symbol : [t.symbol[0], t.symbol[0]] : [t.symbol, t.symbol], t.symbolSize = t.symbolSize instanceof Array ? t.symbolSize.length > 1 ? t.symbolSize : [t.symbolSize[0], t.symbolSize[0]] : [t.symbolSize, t.symbolSize], t.symbolRotate = t.symbolRotate instanceof Array ? t.symbolRotate.length > 1 ? t.symbolRotate : [t.symbolRotate[0], t.symbolRotate[0]] : [t.symbolRotate, t.symbolRotate], t.name = i.name;
            for (var a, o, l, h, d, c, p, u, V = [], U = t.data, y = n.dataRange, g = n.legend, f = this.zr.getWidth(), b = this.zr.getHeight(), _ = 0, x = U.length; x > _; _++)null != U[_][0].x && null != U[_][0].y && null != U[_][1].x && null != U[_][1].y && (o = g ? g.getColor(i.name) : this.zr.getColor(e), u = this.deepMerge(U[_]), l = null != u && null != u.value ? u.value : "", y && (o = isNaN(l) ? o : y.getColor(l), h = [u, t], d = this.deepQuery(h, "itemStyle.normal.color") || o, c = this.deepQuery(h, "itemStyle.emphasis.color") || d, null == d && null == c) || (U[_][0].tooltip = u.tooltip || {trigger: "item"}, U[_][0].name = null != U[_][0].name ? U[_][0].name : "", U[_][1].name = null != U[_][1].name ? U[_][1].name : "", U[_][0].value = null != U[_][0].value ? U[_][0].value : "", a = this.getLineMarkShape(t, e, U[_], _, this.parsePercent(U[_][0].x, f), this.parsePercent(U[_][0].y, b), this.parsePercent(U[_][1].x, f), this.parsePercent(U[_][1].y, b), o), a._mark = "line", p = this.deepMerge([u, t], "effect"), p.show && (a.effect = p), i.type === r.CHART_TYPE_MAP && (a._geo = [this.getMarkGeo(U[_][0]), this.getMarkGeo(U[_][1])]), s.pack(a, i, e, U[_][0], _, U[_][0].name + ("" !== U[_][1].name ? " > " + U[_][1].name : ""), l), V.push(a)));
            return V
        }, getMarkCoord: function () {
            return [0, 0]
        }, getSymbolShape: function (e, t, a, o, r, l, h, d, m, c, p) {
            var u = [a, e], V = null != a ? null != a.value ? a.value : a : "-";
            d = this.deepQuery(u, "symbol") || d;
            var U = this.deepQuery(u, "symbolSize");
            U = "function" == typeof U ? U(V) : U;
            var y = this.deepQuery(u, "symbolRotate"), g = this.deepMerge(u, "itemStyle.normal"), f = this.deepMerge(u, "itemStyle.emphasis"), b = null != g.borderWidth ? g.borderWidth : g.lineStyle && g.lineStyle.width;
            null == b && (b = d.match("empty") ? 2 : 0);
            var _ = null != f.borderWidth ? f.borderWidth : f.lineStyle && f.lineStyle.width;
            null == _ && (_ = b + 2);
            var x = new n({
                style: {
                    iconType: d.replace("empty", "").toLowerCase(),
                    x: l - U,
                    y: h - U,
                    width: 2 * U,
                    height: 2 * U,
                    brushType: "both",
                    color: d.match("empty") ? c : this.getItemStyleColor(g.color, t, o, a) || m,
                    strokeColor: g.borderColor || this.getItemStyleColor(g.color, t, o, a) || m,
                    lineWidth: b
                },
                highlightStyle: {
                    color: d.match("empty") ? c : this.getItemStyleColor(f.color, t, o, a),
                    strokeColor: f.borderColor || g.borderColor || this.getItemStyleColor(g.color, t, o, a) || m,
                    lineWidth: _
                },
                clickable: this.deepQuery(u, "clickable")
            });
            return d.match("image") && (x.style.image = d.replace(new RegExp("^image:\\/\\/"), ""), x = new i({
                style: x.style,
                highlightStyle: x.highlightStyle,
                clickable: this.deepQuery(u, "clickable")
            })), null != y && (x.rotation = [y * Math.PI / 180, l, h]), d.match("star") && (x.style.iconType = "star", x.style.n = d.replace("empty", "").replace("star", "") - 0 || 5), "none" === d && (x.invisible = !0, x.hoverable = !1), x = this.addLabel(x, e, a, r, p), d.match("empty") && (null == x.style.textColor && (x.style.textColor = x.style.strokeColor), null == x.highlightStyle.textColor && (x.highlightStyle.textColor = x.highlightStyle.strokeColor)), s.pack(x, e, t, a, o, r), x._x = l, x._y = h, x._dataIndex = o, x._seriesIndex = t, x
        }, getLineMarkShape: function (e, t, i, n, o, r, s, l, h) {
            var d = null != i[0] ? null != i[0].value ? i[0].value : i[0] : "-", m = null != i[1] ? null != i[1].value ? i[1].value : i[1] : "-", c = [this.query(i[0], "symbol") || e.symbol[0], this.query(i[1], "symbol") || e.symbol[1]], p = [this.query(i[0], "symbolSize") || e.symbolSize[0], this.query(i[1], "symbolSize") || e.symbolSize[1]];
            p[0] = "function" == typeof p[0] ? p[0](d) : p[0], p[1] = "function" == typeof p[1] ? p[1](m) : p[1];
            var u = [this.query(i[0], "symbolRotate") || e.symbolRotate[0], this.query(i[1], "symbolRotate") || e.symbolRotate[1]], V = [i[0], e], U = this.deepMerge(V, "itemStyle.normal");
            U.color = this.getItemStyleColor(U.color, t, n, i);
            var y = this.deepMerge(V, "itemStyle.emphasis");
            y.color = this.getItemStyleColor(y.color, t, n, i);
            var g = U.lineStyle, f = y.lineStyle, b = g.width;
            null == b && (b = U.borderWidth);
            var _ = f.width;
            null == _ && (_ = null != y.borderWidth ? y.borderWidth : b + 2);
            var x = new a({
                style: {
                    smooth: e.smooth ? "spline" : !1,
                    symbol: c,
                    symbolSize: p,
                    symbolRotate: u,
                    xStart: o,
                    yStart: r,
                    xEnd: s,
                    yEnd: l,
                    brushType: "both",
                    lineType: g.type,
                    shadowColor: g.shadowColor || g.color || U.borderColor || U.color || h,
                    shadowBlur: g.shadowBlur,
                    shadowOffsetX: g.shadowOffsetX,
                    shadowOffsetY: g.shadowOffsetY,
                    color: U.color || h,
                    strokeColor: g.color || U.borderColor || U.color || h,
                    lineWidth: b,
                    symbolBorderColor: U.borderColor || U.color || h,
                    symbolBorder: U.borderWidth
                },
                highlightStyle: {
                    shadowColor: f.shadowColor,
                    shadowBlur: f.shadowBlur,
                    shadowOffsetX: f.shadowOffsetX,
                    shadowOffsetY: f.shadowOffsetY,
                    color: y.color || U.color || h,
                    strokeColor: f.color || g.color || y.borderColor || U.borderColor || y.color || U.color || h,
                    lineWidth: _,
                    symbolBorderColor: y.borderColor || U.borderColor || y.color || U.color || h,
                    symbolBorder: null == y.borderWidth ? U.borderWidth + 2 : y.borderWidth
                },
                clickable: this.deepQuery(V, "clickable")
            });
            return x = this.addLabel(x, e, i[0], i[0].name + " : " + i[1].name), x._x = s, x._y = l, x
        }, getLargeMarkPoingShape: function (e, t) {
            var i, n, a, r, s, l, h = this.series[e], d = this.component, m = t.data, c = d.dataRange, p = d.legend, u = [m[0], t];
            if (p && (n = p.getColor(h.name)), !c || (a = null != m[0] ? null != m[0].value ? m[0].value : m[0] : "-", n = isNaN(a) ? n : c.getColor(a), r = this.deepQuery(u, "itemStyle.normal.color") || n, s = this.deepQuery(u, "itemStyle.emphasis.color") || r, null != r || null != s)) {
                n = this.deepMerge(u, "itemStyle.normal").color || n;
                var V = this.deepQuery(u, "symbol") || "circle";
                V = V.replace("empty", "").replace(/\d/g, ""), l = this.deepMerge([m[0], t], "effect");
                var U = window.devicePixelRatio || 1;
                return i = new o({
                    style: {
                        pointList: m,
                        color: n,
                        strokeColor: n,
                        shadowColor: l.shadowColor || n,
                        shadowBlur: (null != l.shadowBlur ? l.shadowBlur : 8) * U,
                        size: this.deepQuery(u, "symbolSize"),
                        iconType: V,
                        brushType: "fill",
                        lineWidth: 1
                    }, draggable: !1, hoverable: !1
                }), l.show && (i.effect = l), i
            }
        }, backupShapeList: function () {
            this.shapeList && this.shapeList.length > 0 ? (this.lastShapeList = this.shapeList, this.shapeList = []) : this.lastShapeList = []
        }, addShapeList: function () {
            var e, t, i = this.option.animationThreshold / (this.canvasSupported ? 2 : 4), n = this.lastShapeList, a = this.shapeList, o = n.length > 0 ? 500 : this.query(this.option, "animationDuration"), s = this.query(this.option, "animationEasing"), l = {}, h = {};
            if (this.option.animation && !this.option.renderAsImage && a.length < i && !this.motionlessOnce) {
                for (var d = 0, m = n.length; m > d; d++)t = this._getAnimationKey(n[d]), t.match("undefined") ? this.zr.delShape(n[d].id) : (t += n[d].type, l[t] = n[d]);
                for (var d = 0, m = a.length; m > d; d++)t = this._getAnimationKey(a[d]), t.match("undefined") ? this.zr.addShape(a[d]) : (t += a[d].type, h[t] = a[d]);
                for (t in l)h[t] || this.zr.delShape(l[t].id);
                for (t in h)l[t] ? (this.zr.delShape(l[t].id), this._animateMod(l[t], h[t], o, s)) : (e = this.type != r.CHART_TYPE_LINE && this.type != r.CHART_TYPE_RADAR || 0 === t.indexOf("icon") ? 0 : o / 2, this._animateMod(!1, h[t], o, s, e));
                this.zr.refresh(), this.animationEffect()
            } else {
                this.motionlessOnce = !1, this.zr.delShape(n);
                for (var d = 0, m = a.length; m > d; d++)this.zr.addShape(a[d])
            }
        }, _getAnimationKey: function (e) {
            return this.type != r.CHART_TYPE_MAP ? s.get(e, "seriesIndex") + "_" + s.get(e, "dataIndex") + (e._mark ? e._mark : "") + (this.type === r.CHART_TYPE_RADAR ? s.get(e, "special") : "") : s.get(e, "seriesIndex") + "_" + s.get(e, "dataIndex") + (e._mark ? e._mark : "undefined")
        }, _animateMod: function (e, t, i, n, a) {
            switch (t.type) {
                case"broken-line":
                case"half-smooth-polygon":
                    l.pointList(this.zr, e, t, i, n);
                    break;
                case"rectangle":
                    l.rectangle(this.zr, e, t, i, n);
                    break;
                case"icon":
                    l.icon(this.zr, e, t, i, n, a);
                    break;
                case"candle":
                    i > 500 ? l.candle(this.zr, e, t, i, n) : this.zr.addShape(t);
                    break;
                case"ring":
                case"sector":
                case"circle":
                    i > 500 ? l.ring(this.zr, e, t, i + (s.get(t, "dataIndex") || 0) % 20 * 100, n) : "sector" === t.type ? l.sector(this.zr, e, t, i, n) : this.zr.addShape(t);
                    break;
                case"text":
                    l.text(this.zr, e, t, i, n);
                    break;
                case"polygon":
                    i > 500 ? l.polygon(this.zr, e, t, i, n) : l.pointList(this.zr, e, t, i, n);
                    break;
                case"ribbon":
                    l.ribbon(this.zr, e, t, i, n);
                    break;
                case"gauge-pointer":
                    l.gaugePointer(this.zr, e, t, i, n);
                    break;
                case"mark-line":
                    l.markline(this.zr, e, t, i, n);
                    break;
                case"bezier-curve":
                case"line":
                    l.line(this.zr, e, t, i, n);
                    break;
                default:
                    this.zr.addShape(t)
            }
        }, animationMark: function (e, t, i) {
            for (var n = i || this.shapeList, a = 0, o = n.length; o > a; a++)n[a]._mark && this._animateMod(!1, n[a], e, t);
            this.animationEffect(i)
        }, animationEffect: function (e) {
            !e && this.clearEffectShape();
            var t = e || this.shapeList;
            if (null != t) {
                var i = r.EFFECT_ZLEVEL;
                this.canvasSupported && this.zr.modLayer(i, {motionBlur: !0, lastFrameAlpha: .95});
                for (var n, a = 0, o = t.length; o > a; a++)n = t[a], n._mark && n.effect && n.effect.show && h[n._mark] && (h[n._mark](this.zr, this.effectList, n, i), this.effectList[this.effectList.length - 1]._mark = n._mark)
            }
        }, clearEffectShape: function (e) {
            this.zr && this.effectList && this.effectList.length > 0 && (e && this.zr.modLayer(r.EFFECT_ZLEVEL, {motionBlur: !1}), this.zr.delShape(this.effectList)), this.effectList = []
        }, addMark: function (e, t, i) {
            var n = this.series[e];
            if (this.selectedMap[n.name]) {
                var a = 500, o = this.query(this.option, "animationEasing"), r = n[i].data, s = this.shapeList.length;
                if (n[i].data = t.data, this["_build" + i.replace("m", "M")](e), this.option.animation && !this.option.renderAsImage)this.animationMark(a, o, this.shapeList.slice(s)); else {
                    for (var l = s, h = this.shapeList.length; h > l; l++)this.zr.addShape(this.shapeList[l]);
                    this.zr.refresh()
                }
                n[i].data = r
            }
        }, delMark: function (e, t, i) {
            i = i.replace("mark", "").replace("large", "").toLowerCase();
            var n = this.series[e];
            if (this.selectedMap[n.name]) {
                for (var a = !1, o = [this.shapeList, this.effectList], r = 2; r--;)for (var l = 0, h = o[r].length; h > l; l++)if (o[r][l]._mark == i && s.get(o[r][l], "seriesIndex") == e && s.get(o[r][l], "name") == t) {
                    this.zr.delShape(o[r][l].id), o[r].splice(l, 1), a = !0;
                    break
                }
                a && this.zr.refresh()
            }
        }
    }, t
}), define("zrender/shape/Circle", ["require", "./Base", "../tool/util"], function (e) {
    "use strict";
    var t = e("./Base"), i = function (e) {
        t.call(this, e)
    };
    return i.prototype = {
        type: "circle", buildPath: function (e, t) {
            e.arc(t.x, t.y, t.r, 0, 2 * Math.PI, !0)
        }, getRect: function (e) {
            if (e.__rect)return e.__rect;
            var t;
            return t = "stroke" == e.brushType || "fill" == e.brushType ? e.lineWidth || 1 : 0, e.__rect = {
                x: Math.round(e.x - e.r - t / 2),
                y: Math.round(e.y - e.r - t / 2),
                width: 2 * e.r + t,
                height: 2 * e.r + t
            }, e.__rect
        }
    }, e("../tool/util").inherits(i, t), i
}), define("echarts/util/accMath", [], function () {
    function e(e, t) {
        var i = e.toString(), n = t.toString(), a = 0;
        try {
            a = n.split(".")[1].length
        } catch (o) {
        }
        try {
            a -= i.split(".")[1].length
        } catch (o) {
        }
        return (i.replace(".", "") - 0) / (n.replace(".", "") - 0) * Math.pow(10, a)
    }

    function t(e, t) {
        var i = e.toString(), n = t.toString(), a = 0;
        try {
            a += i.split(".")[1].length
        } catch (o) {
        }
        try {
            a += n.split(".")[1].length
        } catch (o) {
        }
        return (i.replace(".", "") - 0) * (n.replace(".", "") - 0) / Math.pow(10, a)
    }

    function i(e, t) {
        var i = 0, n = 0;
        try {
            i = e.toString().split(".")[1].length
        } catch (a) {
        }
        try {
            n = t.toString().split(".")[1].length
        } catch (a) {
        }
        var o = Math.pow(10, Math.max(i, n));
        return (Math.round(e * o) + Math.round(t * o)) / o
    }

    function n(e, t) {
        return i(e, -t)
    }

    return {accDiv: e, accMul: t, accAdd: i, accSub: n}
}), define("echarts/util/ecQuery", ["require", "zrender/tool/util"], function (e) {
    function t(e, t) {
        if ("undefined" != typeof e) {
            if (!t)return e;
            t = t.split(".");
            for (var i = t.length, n = 0; i > n;) {
                if (e = e[t[n]], "undefined" == typeof e)return;
                n++
            }
            return e
        }
    }

    function i(e, i) {
        for (var n, a = 0, o = e.length; o > a; a++)if (n = t(e[a], i), "undefined" != typeof n)return n
    }

    function n(e, i) {
        for (var n, o = e.length; o--;) {
            var r = t(e[o], i);
            "undefined" != typeof r && ("undefined" == typeof n ? n = a.clone(r) : a.merge(n, r, !0))
        }
        return n
    }

    var a = e("zrender/tool/util");
    return {query: t, deepQuery: i, deepMerge: n}
}), define("echarts/util/number", [], function () {
    function e(e) {
        return e.replace(/^\s+/, "").replace(/\s+$/, "")
    }

    function t(t, i) {
        return "string" == typeof t ? e(t).match(/%$/) ? parseFloat(t) / 100 * i : parseFloat(t) : t
    }

    function i(e, i) {
        return [t(i[0], e.getWidth()), t(i[1], e.getHeight())]
    }

    function n(e, i) {
        i instanceof Array || (i = [0, i]);
        var n = Math.min(e.getWidth(), e.getHeight()) / 2;
        return [t(i[0], n), t(i[1], n)]
    }

    function a(e) {
        return isNaN(e) ? "-" : (e = (e + "").split("."), e[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (e.length > 1 ? "." + e[1] : ""))
    }

    return {parsePercent: t, parseCenter: i, parseRadius: n, addCommas: a}
}), define("echarts/util/shape/Icon", ["require", "zrender/tool/util", "zrender/shape/Star", "zrender/shape/Heart", "zrender/shape/Droplet", "zrender/shape/Image", "zrender/shape/Base"], function (e) {
    function t(e, t) {
        var i = t.x, n = t.y, a = t.width / 16, o = t.height / 16;
        e.moveTo(i, n + t.height), e.lineTo(i + 5 * a, n + 14 * o), e.lineTo(i + t.width, n + 3 * o), e.lineTo(i + 13 * a, n), e.lineTo(i + 2 * a, n + 11 * o), e.lineTo(i, n + t.height), e.moveTo(i + 6 * a, n + 10 * o), e.lineTo(i + 14 * a, n + 2 * o), e.moveTo(i + 10 * a, n + 13 * o), e.lineTo(i + t.width, n + 13 * o), e.moveTo(i + 13 * a, n + 10 * o), e.lineTo(i + 13 * a, n + t.height)
    }

    function i(e, t) {
        var i = t.x, n = t.y, a = t.width / 16, o = t.height / 16;
        e.moveTo(i, n + t.height), e.lineTo(i + 5 * a, n + 14 * o), e.lineTo(i + t.width, n + 3 * o), e.lineTo(i + 13 * a, n), e.lineTo(i + 2 * a, n + 11 * o), e.lineTo(i, n + t.height), e.moveTo(i + 6 * a, n + 10 * o), e.lineTo(i + 14 * a, n + 2 * o), e.moveTo(i + 10 * a, n + 13 * o), e.lineTo(i + t.width, n + 13 * o)
    }

    function n(e, t) {
        var i = t.x, n = t.y, a = t.width / 16, o = t.height / 16;
        e.moveTo(i + 4 * a, n + 15 * o), e.lineTo(i + 9 * a, n + 13 * o), e.lineTo(i + 14 * a, n + 8 * o), e.lineTo(i + 11 * a, n + 5 * o), e.lineTo(i + 6 * a, n + 10 * o), e.lineTo(i + 4 * a, n + 15 * o), e.moveTo(i + 5 * a, n), e.lineTo(i + 11 * a, n), e.moveTo(i + 5 * a, n + o), e.lineTo(i + 11 * a, n + o), e.moveTo(i, n + 2 * o), e.lineTo(i + t.width, n + 2 * o), e.moveTo(i, n + 5 * o), e.lineTo(i + 3 * a, n + t.height), e.lineTo(i + 13 * a, n + t.height), e.lineTo(i + t.width, n + 5 * o)
    }

    function a(e, t) {
        var i = t.x, n = t.y, a = t.width / 16, o = t.height / 16;
        e.moveTo(i, n + 3 * o), e.lineTo(i + 6 * a, n + 3 * o), e.moveTo(i + 3 * a, n), e.lineTo(i + 3 * a, n + 6 * o), e.moveTo(i + 3 * a, n + 8 * o), e.lineTo(i + 3 * a, n + t.height), e.lineTo(i + t.width, n + t.height), e.lineTo(i + t.width, n + 3 * o), e.lineTo(i + 8 * a, n + 3 * o)
    }

    function o(e, t) {
        var i = t.x, n = t.y, a = t.width / 16, o = t.height / 16;
        e.moveTo(i + 6 * a, n), e.lineTo(i + 2 * a, n + 3 * o), e.lineTo(i + 6 * a, n + 6 * o), e.moveTo(i + 2 * a, n + 3 * o), e.lineTo(i + 14 * a, n + 3 * o), e.lineTo(i + 14 * a, n + 11 * o), e.moveTo(i + 2 * a, n + 5 * o), e.lineTo(i + 2 * a, n + 13 * o), e.lineTo(i + 14 * a, n + 13 * o), e.moveTo(i + 10 * a, n + 10 * o), e.lineTo(i + 14 * a, n + 13 * o), e.lineTo(i + 10 * a, n + t.height)
    }

    function r(e, t) {
        var i = t.x, n = t.y, a = t.width / 16, o = t.height / 16, r = t.width / 2;
        e.lineWidth = 1.5, e.arc(i + r, n + r, r - a, 0, 2 * Math.PI / 3), e.moveTo(i + 3 * a, n + t.height), e.lineTo(i + 0 * a, n + 12 * o), e.lineTo(i + 5 * a, n + 11 * o), e.moveTo(i, n + 8 * o), e.arc(i + r, n + r, r - a, Math.PI, 5 * Math.PI / 3), e.moveTo(i + 13 * a, n), e.lineTo(i + t.width, n + 4 * o), e.lineTo(i + 11 * a, n + 5 * o)
    }

    function s(e, t) {
        var i = t.x, n = t.y, a = t.width / 16, o = t.height / 16;
        e.moveTo(i, n), e.lineTo(i, n + t.height), e.lineTo(i + t.width, n + t.height), e.moveTo(i + 2 * a, n + 14 * o), e.lineTo(i + 7 * a, n + 6 * o), e.lineTo(i + 11 * a, n + 11 * o), e.lineTo(i + 15 * a, n + 2 * o)
    }

    function l(e, t) {
        var i = t.x, n = t.y, a = t.width / 16, o = t.height / 16;
        e.moveTo(i, n), e.lineTo(i, n + t.height), e.lineTo(i + t.width, n + t.height), e.moveTo(i + 3 * a, n + 14 * o), e.lineTo(i + 3 * a, n + 6 * o), e.lineTo(i + 4 * a, n + 6 * o), e.lineTo(i + 4 * a, n + 14 * o), e.moveTo(i + 7 * a, n + 14 * o), e.lineTo(i + 7 * a, n + 2 * o), e.lineTo(i + 8 * a, n + 2 * o), e.lineTo(i + 8 * a, n + 14 * o), e.moveTo(i + 11 * a, n + 14 * o), e.lineTo(i + 11 * a, n + 9 * o), e.lineTo(i + 12 * a, n + 9 * o), e.lineTo(i + 12 * a, n + 14 * o)
    }

    function h(e, t) {
        var i = t.x, n = t.y, a = t.width - 2, o = t.height - 2, r = Math.min(a, o) / 2;
        n += 2, e.moveTo(i + r + 3, n + r - 3), e.arc(i + r + 3, n + r - 3, r - 1, 0, -Math.PI / 2, !0), e.lineTo(i + r + 3, n + r - 3), e.moveTo(i + r, n), e.lineTo(i + r, n + r), e.arc(i + r, n + r, r, -Math.PI / 2, 2 * Math.PI, !0), e.lineTo(i + r, n + r), e.lineWidth = 1.5
    }

    function d(e, t) {
        var i = t.x, n = t.y, a = t.width / 16, o = t.height / 16;
        n -= o, e.moveTo(i + 1 * a, n + 2 * o), e.lineTo(i + 15 * a, n + 2 * o), e.lineTo(i + 14 * a, n + 3 * o), e.lineTo(i + 2 * a, n + 3 * o), e.moveTo(i + 3 * a, n + 6 * o), e.lineTo(i + 13 * a, n + 6 * o), e.lineTo(i + 12 * a, n + 7 * o), e.lineTo(i + 4 * a, n + 7 * o), e.moveTo(i + 5 * a, n + 10 * o), e.lineTo(i + 11 * a, n + 10 * o), e.lineTo(i + 10 * a, n + 11 * o), e.lineTo(i + 6 * a, n + 11 * o), e.moveTo(i + 7 * a, n + 14 * o), e.lineTo(i + 9 * a, n + 14 * o), e.lineTo(i + 8 * a, n + 15 * o), e.lineTo(i + 7 * a, n + 15 * o)
    }

    function m(e, t) {
        var i = t.x, n = t.y, a = t.width, o = t.height, r = a / 16, s = o / 16, l = 2 * Math.min(r, s);
        e.moveTo(i + r + l, n + s + l), e.arc(i + r, n + s, l, Math.PI / 4, 3 * Math.PI), e.lineTo(i + 7 * r - l, n + 6 * s - l), e.arc(i + 7 * r, n + 6 * s, l, Math.PI / 4 * 5, 4 * Math.PI), e.arc(i + 7 * r, n + 6 * s, l / 2, Math.PI / 4 * 5, 4 * Math.PI), e.moveTo(i + 7 * r - l / 2, n + 6 * s + l), e.lineTo(i + r + l, n + 14 * s - l), e.arc(i + r, n + 14 * s, l, -Math.PI / 4, 2 * Math.PI), e.moveTo(i + 7 * r + l / 2, n + 6 * s), e.lineTo(i + 14 * r - l, n + 10 * s - l / 2), e.moveTo(i + 16 * r, n + 10 * s), e.arc(i + 14 * r, n + 10 * s, l, 0, 3 * Math.PI), e.lineWidth = 1.5
    }

    function c(e, t) {
        var i = t.x, n = t.y, a = t.width, o = t.height, r = Math.min(a, o) / 2;
        e.moveTo(i + a, n + o / 2), e.arc(i + r, n + r, r, 0, 2 * Math.PI), e.arc(i + r, n, r, Math.PI / 4, Math.PI / 5 * 4), e.arc(i, n + r, r, -Math.PI / 3, Math.PI / 3), e.arc(i + a, n + o, r, Math.PI, Math.PI / 2 * 3), e.lineWidth = 1.5
    }

    function p(e, t) {
        for (var i = t.x, n = t.y, a = t.width, o = t.height, r = Math.round(o / 3), s = 3; s--;)e.rect(i, n + r * s + 2, a, 2)
    }

    function u(e, t) {
        for (var i = t.x, n = t.y, a = t.width, o = t.height, r = Math.round(a / 3), s = 3; s--;)e.rect(i + r * s, n, 2, o)
    }

    function V(e, t) {
        var i = t.x, n = t.y, a = t.width / 16;
        e.moveTo(i + a, n), e.lineTo(i + a, n + t.height), e.lineTo(i + 15 * a, n + t.height), e.lineTo(i + 15 * a, n), e.lineTo(i + a, n), e.moveTo(i + 3 * a, n + 3 * a), e.lineTo(i + 13 * a, n + 3 * a), e.moveTo(i + 3 * a, n + 6 * a), e.lineTo(i + 13 * a, n + 6 * a), e.moveTo(i + 3 * a, n + 9 * a), e.lineTo(i + 13 * a, n + 9 * a), e.moveTo(i + 3 * a, n + 12 * a), e.lineTo(i + 9 * a, n + 12 * a)
    }

    function U(e, t) {
        var i = t.x, n = t.y, a = t.width / 16, o = t.height / 16;
        e.moveTo(i, n), e.lineTo(i, n + t.height), e.lineTo(i + t.width, n + t.height), e.lineTo(i + t.width, n), e.lineTo(i, n), e.moveTo(i + 4 * a, n), e.lineTo(i + 4 * a, n + 8 * o), e.lineTo(i + 12 * a, n + 8 * o), e.lineTo(i + 12 * a, n), e.moveTo(i + 6 * a, n + 11 * o), e.lineTo(i + 6 * a, n + 13 * o), e.lineTo(i + 10 * a, n + 13 * o), e.lineTo(i + 10 * a, n + 11 * o), e.lineTo(i + 6 * a, n + 11 * o)
    }

    function y(e, t) {
        var i = t.x, n = t.y, a = t.width, o = t.height;
        e.moveTo(i, n + o / 2), e.lineTo(i + a, n + o / 2), e.moveTo(i + a / 2, n), e.lineTo(i + a / 2, n + o)
    }

    function g(e, t) {
        var i = t.width / 2, n = t.height / 2, a = Math.min(i, n);
        e.moveTo(t.x + i + a, t.y + n), e.arc(t.x + i, t.y + n, a, 0, 2 * Math.PI), e.closePath()
    }

    function f(e, t) {
        e.rect(t.x, t.y, t.width, t.height), e.closePath()
    }

    function b(e, t) {
        var i = t.width / 2, n = t.height / 2, a = t.x + i, o = t.y + n, r = Math.min(i, n);
        e.moveTo(a, o - r), e.lineTo(a + r, o + r), e.lineTo(a - r, o + r), e.lineTo(a, o - r), e.closePath()
    }

    function _(e, t) {
        var i = t.width / 2, n = t.height / 2, a = t.x + i, o = t.y + n, r = Math.min(i, n);
        e.moveTo(a, o - r), e.lineTo(a + r, o), e.lineTo(a, o + r), e.lineTo(a - r, o), e.lineTo(a, o - r), e.closePath()
    }

    function x(e, t) {
        var i = t.x, n = t.y, a = t.width / 16;
        e.moveTo(i + 8 * a, n), e.lineTo(i + a, n + t.height), e.lineTo(i + 8 * a, n + t.height / 4 * 3), e.lineTo(i + 15 * a, n + t.height), e.lineTo(i + 8 * a, n), e.closePath()
    }

    function k(t, i) {
        var n = e("zrender/shape/Star"), a = i.width / 2, o = i.height / 2;
        n.prototype.buildPath(t, {x: i.x + a, y: i.y + o, r: Math.min(a, o), n: i.n || 5})
    }

    function L(t, i) {
        var n = e("zrender/shape/Heart");
        n.prototype.buildPath(t, {x: i.x + i.width / 2, y: i.y + .2 * i.height, a: i.width / 2, b: .8 * i.height})
    }

    function v(t, i) {
        var n = e("zrender/shape/Droplet");
        n.prototype.buildPath(t, {x: i.x + .5 * i.width, y: i.y + .5 * i.height, a: .5 * i.width, b: .8 * i.height})
    }

    function W(e, t) {
        var i = t.x, n = t.y - t.height / 2 * 1.5, a = t.width / 2, o = t.height / 2, r = Math.min(a, o);
        e.arc(i + a, n + o, r, Math.PI / 5 * 4, Math.PI / 5), e.lineTo(i + a, n + o + 1.5 * r), e.closePath()
    }

    function w(t, i, n) {
        var a = e("zrender/shape/Image");
        this._imageShape = this._imageShape || new a({style: {}});
        for (var o in i)this._imageShape.style[o] = i[o];
        this._imageShape.brush(t, !1, n)
    }

    function X(e) {
        K.call(this, e)
    }

    var I = e("zrender/tool/util"), K = e("zrender/shape/Base");
    return X.prototype = {
        type: "icon",
        iconLibrary: {
            mark: t,
            markUndo: i,
            markClear: n,
            dataZoom: a,
            dataZoomReset: o,
            restore: r,
            lineChart: s,
            barChart: l,
            pieChart: h,
            funnelChart: d,
            forceChart: m,
            chordChart: c,
            stackChart: p,
            tiledChart: u,
            dataView: V,
            saveAsImage: U,
            cross: y,
            circle: g,
            rectangle: f,
            triangle: b,
            diamond: _,
            arrow: x,
            star: k,
            heart: L,
            droplet: v,
            pin: W,
            image: w
        },
        brush: function (t, i, n) {
            var a = i ? this.highlightStyle : this.style;
            a = a || {};
            var o = a.iconType || this.style.iconType;
            if ("image" === o) {
                var r = e("zrender/shape/Image");
                r.prototype.brush.call(this, t, i, n)
            } else {
                var a = this.beforeBrush(t, i);
                switch (t.beginPath(), this.buildPath(t, a, n), a.brushType) {
                    case"both":
                        t.fill();
                    case"stroke":
                        a.lineWidth > 0 && t.stroke();
                        break;
                    default:
                        t.fill()
                }
                this.drawText(t, a, this.style), this.afterBrush(t)
            }
        },
        buildPath: function (e, t, i) {
            this.iconLibrary[t.iconType] ? this.iconLibrary[t.iconType].call(this, e, t, i) : (e.moveTo(t.x, t.y), e.lineTo(t.x + t.width, t.y), e.lineTo(t.x + t.width, t.y + t.height), e.lineTo(t.x, t.y + t.height), e.lineTo(t.x, t.y), e.closePath())
        },
        getRect: function (e) {
            return e.__rect ? e.__rect : (e.__rect = {
                x: Math.round(e.x),
                y: Math.round(e.y - ("pin" == e.iconType ? e.height / 2 * 1.5 : 0)),
                width: e.width,
                height: e.height
            }, e.__rect)
        },
        isCover: function (e, t) {
            var i = this.getTansform(e, t);
            e = i[0], t = i[1];
            var n = this.style.__rect;
            n || (n = this.style.__rect = this.getRect(this.style));
            var a = n.height < 8 || n.width < 8 ? 4 : 0;
            return e >= n.x - a && e <= n.x + n.width + a && t >= n.y - a && t <= n.y + n.height + a ? !0 : !1
        }
    }, I.inherits(X, K), X
}), define("echarts/util/shape/MarkLine", ["require", "zrender/shape/Base", "./Icon", "zrender/shape/Line", "zrender/shape/BrokenLine", "zrender/tool/matrix", "zrender/tool/area", "zrender/shape/util/dashedLineTo", "zrender/shape/util/smoothSpline", "zrender/tool/util"], function (e) {
    function t(e) {
        i.call(this, e)
    }

    var i = e("zrender/shape/Base"), n = e("./Icon"), a = e("zrender/shape/Line"), o = new a({}), r = e("zrender/shape/BrokenLine"), s = new r({}), l = e("zrender/tool/matrix"), h = e("zrender/tool/area"), d = e("zrender/shape/util/dashedLineTo"), m = e("zrender/shape/util/smoothSpline"), c = e("zrender/tool/util");
    return t.prototype = {
        type: "mark-line", brush: function (e, t) {
            var i = this.style;
            t && (i = this.getHighlightStyle(i, this.highlightStyle || {})), e.save(), this.setContext(e, i), this.setTransform(e), e.save(), e.beginPath(), this.buildLinePath(e, i, this.style.lineWidth || 1), e.stroke(), e.restore(), this.brushSymbol(e, i, 0), this.brushSymbol(e, i, 1), this.drawText(e, i, this.style), e.restore()
        }, buildLinePath: function (e, t, i) {
            var n = t.pointList || this.getPointList(t);
            t.pointList = n;
            var a = Math.min(t.pointList.length, Math.round(t.pointListLength || t.pointList.length));
            if (t.lineType && "solid" != t.lineType) {
                if ("dashed" == t.lineType || "dotted" == t.lineType)if ("spline" !== t.smooth) {
                    var o = i * ("dashed" == t.lineType ? 5 : 1);
                    e.moveTo(n[0][0], n[0][1]);
                    for (var r = 1; a > r; r++)d(e, n[r - 1][0], n[r - 1][1], n[r][0], n[r][1], o)
                } else for (var r = 1; a > r; r += 2)e.moveTo(n[r - 1][0], n[r - 1][1]), e.lineTo(n[r][0], n[r][1])
            } else {
                e.moveTo(n[0][0], n[0][1]);
                for (var r = 1; a > r; r++)e.lineTo(n[r][0], n[r][1])
            }
        }, brushSymbol: function (e, t, i) {
            if ("none" != t.symbol[i]) {
                e.save(), e.beginPath(), e.lineWidth = t.symbolBorder, e.strokeStyle = t.symbolBorderColor, t.iconType = t.symbol[i].replace("empty", "").toLowerCase(), t.symbol[i].match("empty") && (e.fillStyle = "#fff");
                var a, o = Math.min(t.pointList.length, Math.round(t.pointListLength || t.pointList.length)), r = 0 === i ? t.pointList[0][0] : t.pointList[o - 1][0], s = 0 === i ? t.pointList[0][1] : t.pointList[o - 1][1], h = "undefined" != typeof t.symbolRotate[i] ? t.symbolRotate[i] - 0 : 0;
                if (0 !== h && (a = l.create(), l.identity(a), (r || s) && l.translate(a, a, [-r, -s]), l.rotate(a, a, h * Math.PI / 180), (r || s) && l.translate(a, a, [r, s]), e.transform.apply(e, a)), "arrow" == t.iconType && 0 === h)this.buildArrawPath(e, t, i); else {
                    var d = t.symbolSize[i];
                    t.x = r - d, t.y = s - d, t.width = 2 * d, t.height = 2 * d, n.prototype.buildPath(e, t)
                }
                e.closePath(), e.fill(), e.stroke(), e.restore()
            }
        }, buildArrawPath: function (e, t, i) {
            var n = Math.min(t.pointList.length, Math.round(t.pointListLength || t.pointList.length)), a = 2 * t.symbolSize[i], o = t.pointList[0][0], r = t.pointList[n - 1][0], s = t.pointList[0][1], l = t.pointList[n - 1][1], h = 0;
            "spline" === t.smooth && (h = .2);
            var d = Math.atan(Math.abs((l - s) / (o - r)));
            0 === i ? r > o ? l > s ? d = 2 * Math.PI - d + h : d += h : l > s ? d += Math.PI - h : d = Math.PI - d - h : o > r ? s > l ? d = 2 * Math.PI - d + h : d += h : s > l ? d += Math.PI - h : d = Math.PI - d - h;
            var m = Math.PI / 8, c = 0 === i ? o : r, p = 0 === i ? s : l, u = [[c + a * Math.cos(d - m), p - a * Math.sin(d - m)], [c + .6 * a * Math.cos(d), p - .6 * a * Math.sin(d)], [c + a * Math.cos(d + m), p - a * Math.sin(d + m)]];
            e.moveTo(c, p);
            for (var V = 0, U = u.length; U > V; V++)e.lineTo(u[V][0], u[V][1]);
            e.lineTo(c, p)
        }, getPointList: function (e) {
            var t = [[e.xStart, e.yStart], [e.xEnd, e.yEnd]];
            if ("spline" === e.smooth) {
                var i = t[1][0], n = t[1][1];
                t[3] = [i, n], t[1] = this.getOffetPoint(t[0], t[3]), t[2] = this.getOffetPoint(t[3], t[0]), t = m(t, !1), t[t.length - 1] = [i, n]
            }
            return t
        }, getOffetPoint: function (e, t) {
            var i, n = Math.sqrt(Math.round((e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]))) / 3, a = [e[0], e[1]], o = .2;
            if (e[0] != t[0] && e[1] != t[1]) {
                var r = (t[1] - e[1]) / (t[0] - e[0]);
                i = Math.atan(r)
            } else i = e[0] == t[0] ? (e[1] <= t[1] ? 1 : -1) * Math.PI / 2 : 0;
            var s, l;
            return e[0] <= t[0] ? (i -= o, s = Math.round(Math.cos(i) * n), l = Math.round(Math.sin(i) * n), a[0] += s, a[1] += l) : (i += o, s = Math.round(Math.cos(i) * n), l = Math.round(Math.sin(i) * n), a[0] -= s, a[1] -= l), a
        }, getRect: function (e) {
            if (e.__rect)return e.__rect;
            var t = e.lineWidth || 1;
            return e.__rect = {
                x: Math.min(e.xStart, e.xEnd) - t,
                y: Math.min(e.yStart, e.yEnd) - t,
                width: Math.abs(e.xStart - e.xEnd) + t,
                height: Math.abs(e.yStart - e.yEnd) + t
            }, e.__rect
        }, isCover: function (e, t) {
            var i = this.getTansform(e, t);
            e = i[0], t = i[1];
            var n = this.style.__rect;
            return n || (n = this.style.__rect = this.getRect(this.style)), e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height ? "spline" !== this.style.smooth ? h.isInside(o, this.style, e, t) : h.isInside(s, this.style, e, t) : !1
        }
    }, c.inherits(t, i), t
}), define("echarts/util/shape/Symbol", ["require", "zrender/shape/Base", "zrender/shape/Polygon", "zrender/tool/util", "./normalIsCover"], function (e) {
    function t(e) {
        i.call(this, e)
    }

    var i = e("zrender/shape/Base"), n = e("zrender/shape/Polygon"), a = new n({}), o = e("zrender/tool/util");
    return t.prototype = {
        type: "symbol", buildPath: function (e, t) {
            var i = t.pointList, n = i.length;
            if (0 !== n)for (var a, o, r, s, l, h = 1e4, d = Math.ceil(n / h), m = i[0] instanceof Array, c = t.size ? t.size : 2, p = c, u = c / 2, V = 2 * Math.PI, U = 0; d > U; U++) {
                e.beginPath(), a = U * h, o = a + h, o = o > n ? n : o;
                for (var y = a; o > y; y++)if (t.random && (r = t["randomMap" + y % 20] / 100, p = c * r * r, u = p / 2), m ? (s = i[y][0], l = i[y][1]) : (s = i[y].x, l = i[y].y), 3 > p)e.rect(s - u, l - u, p, p); else switch (t.iconType) {
                    case"circle":
                        e.moveTo(s, l), e.arc(s, l, u, 0, V, !0);
                        break;
                    case"diamond":
                        e.moveTo(s, l - u), e.lineTo(s + u / 3, l - u / 3), e.lineTo(s + u, l), e.lineTo(s + u / 3, l + u / 3), e.lineTo(s, l + u), e.lineTo(s - u / 3, l + u / 3), e.lineTo(s - u, l), e.lineTo(s - u / 3, l - u / 3), e.lineTo(s, l - u);
                        break;
                    default:
                        e.rect(s - u, l - u, p, p)
                }
                if (e.closePath(), d - 1 > U)switch (t.brushType) {
                    case"both":
                        e.fill(), t.lineWidth > 0 && e.stroke();
                        break;
                    case"stroke":
                        t.lineWidth > 0 && e.stroke();
                        break;
                    default:
                        e.fill()
                }
            }
        }, getRect: function (e) {
            return e.__rect || a.getRect(e)
        }, isCover: e("./normalIsCover")
    }, o.inherits(t, i), t
}), define("echarts/util/ecAnimation", ["require", "zrender/tool/util", "zrender/shape/Polygon"], function (e) {
    function t(e, t, i, n, a) {
        var o, r = i.style.pointList, s = r.length;
        if (!t) {
            if (o = [], "vertical" != i._orient)for (var l = r[0][1], h = 0; s > h; h++)o[h] = [r[h][0], l]; else for (var d = r[0][0], h = 0; s > h; h++)o[h] = [d, r[h][1]];
            "half-smooth-polygon" == i.type && (o[s - 1] = u.clone(r[s - 1]), o[s - 2] = u.clone(r[s - 2])), t = {style: {pointList: o}}
        }
        o = t.style.pointList;
        var m = o.length;
        i.style.pointList = m == s ? o : s > m ? o.concat(r.slice(m)) : o.slice(0, s), e.addShape(i), e.animate(i.id, "style").when(n, {pointList: r}).start(a)
    }

    function i(e, t) {
        for (var i = arguments.length, n = 2; i > n; n++) {
            var a = arguments[n];
            e.style[a] = t.style[a]
        }
    }

    function n(e, t, n, a, o) {
        var r = n.style;
        t || (t = {
            position: n.position,
            style: {
                x: r.x,
                y: "vertical" == n._orient ? r.y + r.height : r.y,
                width: "vertical" == n._orient ? r.width : 0,
                height: "vertical" != n._orient ? r.height : 0
            }
        });
        var s = r.x, l = r.y, h = r.width, d = r.height, m = [n.position[0], n.position[1]];
        i(n, t, "x", "y", "width", "height"), n.position = t.position, e.addShape(n), (m[0] != t.position[0] || m[1] != t.position[1]) && e.animate(n.id, "").when(a, {position: m}).start(o), e.animate(n.id, "style").when(a, {
            x: s,
            y: l,
            width: h,
            height: d
        }).start(o)
    }

    function a(e, t, i, n, a) {
        if (!t) {
            var o = i.style.y;
            t = {style: {y: [o[0], o[0], o[0], o[0]]}}
        }
        var r = i.style.y;
        i.style.y = t.style.y, e.addShape(i), e.animate(i.id, "style").when(n, {y: r}).start(a)
    }

    function o(e, t, i, n, a) {
        var o = i.style.x, r = i.style.y, s = i.style.r0, l = i.style.r;
        "r" != i._animationAdd ? (i.style.r0 = 0, i.style.r = 0, i.rotation = [2 * Math.PI, o, r], e.addShape(i), e.animate(i.id, "style").when(n, {
            r0: s,
            r: l
        }).start(a), e.animate(i.id, "").when(Math.round(n / 3 * 2), {rotation: [0, o, r]}).start(a)) : (i.style.r0 = i.style.r, e.addShape(i), e.animate(i.id, "style").when(n, {r0: s}).start(a))
    }

    function r(e, t, n, a, o) {
        t || (t = "r" != n._animationAdd ? {
            style: {
                startAngle: n.style.startAngle,
                endAngle: n.style.startAngle
            }
        } : {style: {r0: n.style.r}});
        var r = n.style.startAngle, s = n.style.endAngle;
        i(n, t, "startAngle", "endAngle"), e.addShape(n), e.animate(n.id, "style").when(a, {
            startAngle: r,
            endAngle: s
        }).start(o)
    }

    function s(e, t, n, a, o) {
        t || (t = {style: {x: "left" == n.style.textAlign ? n.style.x + 100 : n.style.x - 100, y: n.style.y}});
        var r = n.style.x, s = n.style.y;
        i(n, t, "x", "y"), e.addShape(n), e.animate(n.id, "style").when(a, {x: r, y: s}).start(o)
    }

    function l(t, i, n, a, o) {
        var r = e("zrender/shape/Polygon").prototype.getRect(n.style), s = r.x + r.width / 2, l = r.y + r.height / 2;
        n.scale = [.1, .1, s, l], t.addShape(n), t.animate(n.id, "").when(a, {scale: [1, 1, s, l]}).start(o)
    }

    function h(e, t, n, a, o) {
        t || (t = {
            style: {
                source0: 0,
                source1: n.style.source1 > 0 ? 360 : -360,
                target0: 0,
                target1: n.style.target1 > 0 ? 360 : -360
            }
        });
        var r = n.style.source0, s = n.style.source1, l = n.style.target0, h = n.style.target1;
        t.style && i(n, t, "source0", "source1", "target0", "target1"), e.addShape(n), e.animate(n.id, "style").when(a, {
            source0: r,
            source1: s,
            target0: l,
            target1: h
        }).start(o)
    }

    function d(e, t, i, n, a) {
        t || (t = {style: {angle: i.style.startAngle}});
        var o = i.style.angle;
        i.style.angle = t.style.angle, e.addShape(i), e.animate(i.id, "style").when(n, {angle: o}).start(a)
    }

    function m(e, t, i, a, o, r) {
        if (i.style._x = i.style.x, i.style._y = i.style.y, i.style._width = i.style.width, i.style._height = i.style.height, t)n(e, t, i, a, o); else {
            var s = i._x || 0, l = i._y || 0;
            i.scale = [.01, .01, s, l], e.addShape(i), e.animate(i.id, "").delay(r).when(a, {scale: [1, 1, s, l]}).start(o || "QuinticOut")
        }
    }

    function c(e, t, n, a, o) {
        t || (t = {
            style: {
                xStart: n.style.xStart,
                yStart: n.style.yStart,
                xEnd: n.style.xStart,
                yEnd: n.style.yStart
            }
        });
        var r = n.style.xStart, s = n.style.xEnd, l = n.style.yStart, h = n.style.yEnd;
        i(n, t, "xStart", "xEnd", "yStart", "yEnd"), e.addShape(n), e.animate(n.id, "style").when(a, {
            xStart: r,
            xEnd: s,
            yStart: l,
            yEnd: h
        }).start(o)
    }

    function p(e, t, i, n, a) {
        i.style.smooth ? t ? e.addShape(i) : (i.style.pointListLength = 1, e.addShape(i), i.style.pointList = i.style.pointList || i.getPointList(i.style), e.animate(i.id, "style").when(n, {pointListLength: i.style.pointList.length}).start(a || "QuinticOut")) : (i.style.pointList = t ? t.style.pointList : [[i.style.xStart, i.style.yStart], [i.style.xStart, i.style.yStart]], e.addShape(i), e.animate(i.id, "style").when(n, {pointList: [[i.style.xStart, i.style.yStart], [i._x || 0, i._y || 0]]}).start(a || "QuinticOut"))
    }

    var u = e("zrender/tool/util");
    return {
        pointList: t,
        rectangle: n,
        candle: a,
        ring: o,
        sector: r,
        text: s,
        polygon: l,
        ribbon: h,
        gaugePointer: d,
        icon: m,
        line: c,
        markline: p
    }
}), define("echarts/util/ecEffect", ["require", "../util/ecData", "zrender/shape/Circle", "zrender/shape/Image", "../util/shape/Icon", "../util/shape/Symbol", "zrender/tool/env"], function (e) {
    function t(e, t, i, n) {
        var o = i.effect, l = o.color || i.style.strokeColor || i.style.color, d = o.shadowColor || l, m = o.scaleSize, c = "undefined" != typeof o.shadowBlur ? o.shadowBlur : m, p = new s({
            zlevel: n,
            style: {
                brushType: "stroke",
                iconType: "pin" != i.style.iconType && "droplet" != i.style.iconType ? i.style.iconType : "circle",
                x: c + 1,
                y: c + 1,
                n: i.style.n,
                width: i.style._width * m,
                height: i.style._height * m,
                lineWidth: 1,
                strokeColor: l,
                shadowColor: d,
                shadowBlur: c
            },
            draggable: !1,
            hoverable: !1
        });
        h && (p.style.image = e.shapeToImage(p, p.style.width + 2 * c + 2, p.style.height + 2 * c + 2).style.image, p = new r({
            zlevel: p.zlevel,
            style: p.style,
            draggable: !1,
            hoverable: !1
        })), a.clone(i, p), p.position = i.position, t.push(p), e.addShape(p);
        var u = window.devicePixelRatio || 1, V = (p.style.width / u - i.style._width) / 2;
        p.style.x = i.style._x - V, p.style.y = i.style._y - V;
        var U = 100 * (o.period + 10 * Math.random());
        e.modShape(i.id, {invisible: !0});
        var y = p.style.x + p.style.width / 2 / u, g = p.style.y + p.style.height / 2 / u;
        e.modShape(p.id, {scale: [.1, .1, y, g]}), e.animate(p.id, "", o.loop).when(U, {scale: [1, 1, y, g]}).done(function () {
            i.effect.show = !1, e.delShape(p.id)
        }).start()
    }

    function i(e, t, i, n) {
        var a = i.effect, o = a.color || i.style.strokeColor || i.style.color, r = a.scaleSize, s = a.shadowColor || o, h = "undefined" != typeof a.shadowBlur ? a.shadowBlur : 2 * r, d = window.devicePixelRatio || 1, m = new l({
            zlevel: n,
            position: i.position,
            scale: i.scale,
            style: {
                pointList: i.style.pointList,
                iconType: i.style.iconType,
                color: o,
                strokeColor: o,
                shadowColor: s,
                shadowBlur: h * d,
                random: !0,
                brushType: "fill",
                lineWidth: 1,
                size: i.style.size
            },
            draggable: !1,
            hoverable: !1
        });
        t.push(m), e.addShape(m), e.modShape(i.id, {invisible: !0});
        for (var c = Math.round(100 * a.period), p = {}, u = {}, V = 0; 20 > V; V++)m.style["randomMap" + V] = 0, p = {}, p["randomMap" + V] = 100, u = {}, u["randomMap" + V] = 0, m.style["randomMap" + V] = 100 * Math.random(), e.animate(m.id, "style", !0).when(c, p).when(2 * c, u).when(3 * c, p).when(4 * c, p).delay(Math.random() * c * V).start()
    }

    function n(e, t, i, n) {
        var s, l = i.effect, d = l.color || i.style.strokeColor || i.style.color, m = l.shadowColor || i.style.strokeColor || d, c = i.style.lineWidth * l.scaleSize, p = "undefined" != typeof l.shadowBlur ? l.shadowBlur : c, u = new o({
            zlevel: n,
            style: {x: p, y: p, r: c, color: d, shadowColor: m, shadowBlur: p},
            draggable: !1,
            hoverable: !1
        });
        h ? (u.style.image = e.shapeToImage(u, 2 * (c + p), 2 * (c + p)).style.image, u = new r({
            zlevel: u.zlevel,
            style: u.style,
            draggable: !1,
            hoverable: !1
        }), s = p) : s = 0, a.clone(i, u), u.position = i.position, t.push(u), e.addShape(u), u.style.x = i.style.xStart - s, u.style.y = i.style.yStart - s;
        var V = (i.style.xStart - i.style.xEnd) * (i.style.xStart - i.style.xEnd) + (i.style.yStart - i.style.yEnd) * (i.style.yStart - i.style.yEnd), U = Math.round(Math.sqrt(Math.round(V * l.period * l.period)));
        if (i.style.smooth) {
            var y = i.style.pointList || i.getPointList(i.style), g = y.length;
            U = Math.round(U / g);
            for (var f = e.animate(u.id, "style", l.loop), b = Math.ceil(g / 8), _ = 0; g - b > _; _ += b)f.when(U * (_ + 1), {
                x: y[_][0] - s,
                y: y[_][1] - s
            });
            f.when(U * g, {x: y[g - 1][0] - s, y: y[g - 1][1] - s}), f.done(function () {
                i.effect.show = !1, e.delShape(u.id)
            }), f.start("spline")
        } else e.animate(u.id, "style", l.loop).when(U, {x: i._x - s, y: i._y - s}).done(function () {
            i.effect.show = !1, e.delShape(u.id)
        }).start()
    }

    var a = e("../util/ecData"), o = e("zrender/shape/Circle"), r = e("zrender/shape/Image"), s = e("../util/shape/Icon"), l = e("../util/shape/Symbol"), h = e("zrender/tool/env").canvasSupported;
    return {point: t, largePoint: i, line: n}
}), define("zrender/shape/Star", ["require", "../tool/math", "./Base", "../tool/util"], function (e) {
    var t = e("../tool/math"), i = t.sin, n = t.cos, a = Math.PI, o = e("./Base"), r = function (e) {
        o.call(this, e)
    };
    return r.prototype = {
        type: "star", buildPath: function (e, t) {
            var o = t.n;
            if (o && !(2 > o)) {
                var r = t.x, s = t.y, l = t.r, h = t.r0;
                null == h && (h = o > 4 ? l * n(2 * a / o) / n(a / o) : l / 3);
                var d = a / o, m = -a / 2, c = r + l * n(m), p = s + l * i(m);
                m += d;
                var u = t.pointList = [];
                u.push([c, p]);
                for (var V, U = 0, y = 2 * o - 1; y > U; U++)V = U % 2 === 0 ? h : l, u.push([r + V * n(m), s + V * i(m)]), m += d;
                u.push([c, p]), e.moveTo(u[0][0], u[0][1]);
                for (var U = 0; U < u.length; U++)e.lineTo(u[U][0], u[U][1]);
                e.closePath()
            }
        }, getRect: function (e) {
            if (e.__rect)return e.__rect;
            var t;
            return t = "stroke" == e.brushType || "fill" == e.brushType ? e.lineWidth || 1 : 0, e.__rect = {
                x: Math.round(e.x - e.r - t / 2),
                y: Math.round(e.y - e.r - t / 2),
                width: 2 * e.r + t,
                height: 2 * e.r + t
            }, e.__rect
        }
    }, e("../tool/util").inherits(r, o), r
}), define("zrender/shape/Heart", ["require", "./Base", "./util/PathProxy", "zrender/tool/area", "../tool/util"], function (e) {
    "use strict";
    var t = e("./Base"), i = e("./util/PathProxy"), n = e("zrender/tool/area"), a = function (e) {
        t.call(this, e), this._pathProxy = new i
    };
    return a.prototype = {
        type: "heart", buildPath: function (e, t) {
            var n = this._pathProxy || new i;
            n.begin(e), n.moveTo(t.x, t.y), n.bezierCurveTo(t.x + t.a / 2, t.y - 2 * t.b / 3, t.x + 2 * t.a, t.y + t.b / 3, t.x, t.y + t.b), n.bezierCurveTo(t.x - 2 * t.a, t.y + t.b / 3, t.x - t.a / 2, t.y - 2 * t.b / 3, t.x, t.y), n.closePath()
        }, getRect: function (e) {
            return e.__rect ? e.__rect : (this._pathProxy.isEmpty() || this.buildPath(null, e), this._pathProxy.fastBoundingRect())
        }, isCover: function (e, t) {
            var i = this.getTansform(e, t);
            e = i[0], t = i[1];
            var a = this.getRect(this.style);
            return e >= a.x && e <= a.x + a.width && t >= a.y && t <= a.y + a.height ? n.isInsidePath(this._pathProxy.pathCommands, this.style.lineWidth, this.style.brushType, e, t) : void 0
        }
    }, e("../tool/util").inherits(a, t), a
}), define("zrender/shape/Droplet", ["require", "./Base", "./util/PathProxy", "zrender/tool/area", "../tool/util"], function (e) {
    "use strict";
    var t = e("./Base"), i = e("./util/PathProxy"), n = e("zrender/tool/area"), a = function (e) {
        t.call(this, e), this._pathProxy = new i
    };
    return a.prototype = {
        type: "droplet", buildPath: function (e, t) {
            var n = this._pathProxy || new i;
            n.begin(e), n.moveTo(t.x, t.y + t.a), n.bezierCurveTo(t.x + t.a, t.y + t.a, t.x + 3 * t.a / 2, t.y - t.a / 3, t.x, t.y - t.b), n.bezierCurveTo(t.x - 3 * t.a / 2, t.y - t.a / 3, t.x - t.a, t.y + t.a, t.x, t.y + t.a), n.closePath()
        }, getRect: function (e) {
            return e.__rect ? e.__rect : (this._pathProxy.isEmpty() || this.buildPath(null, e), this._pathProxy.fastBoundingRect())
        }, isCover: function (e, t) {
            var i = this.getTansform(e, t);
            e = i[0], t = i[1];
            var a = this.getRect(this.style);
            return e >= a.x && e <= a.x + a.width && t >= a.y && t <= a.y + a.height ? n.isInsidePath(this._pathProxy.pathCommands, this.style.lineWidth, this.style.brushType, e, t) : void 0
        }
    }, e("../tool/util").inherits(a, t), a
}), define("zrender/tool/math", [], function () {
    function e(e, t) {
        return Math.sin(t ? e * a : e)
    }

    function t(e, t) {
        return Math.cos(t ? e * a : e)
    }

    function i(e) {
        return e * a
    }

    function n(e) {
        return e / a
    }

    var a = Math.PI / 180;
    return {sin: e, cos: t, degreeToRadian: i, radianToDegree: n}
}), define("zrender/shape/util/PathProxy", ["require", "../../tool/vector"], function (e) {
    var t = e("../../tool/vector"), i = function (e, t) {
        this.command = e, this.points = t || null
    }, n = function () {
        this.pathCommands = [], this._ctx = null, this._min = [], this._max = []
    };
    return n.prototype.fastBoundingRect = function () {
        var e = this._min, i = this._max;
        e[0] = e[1] = 1 / 0, i[0] = i[1] = -1 / 0;
        for (var n = 0; n < this.pathCommands.length; n++) {
            var a = this.pathCommands[n], o = a.points;
            switch (a.command) {
                case"M":
                    t.min(e, e, o), t.max(i, i, o);
                    break;
                case"L":
                    t.min(e, e, o), t.max(i, i, o);
                    break;
                case"C":
                    for (var r = 0; 6 > r; r += 2)e[0] = Math.min(e[0], e[0], o[r]), e[1] = Math.min(e[1], e[1], o[r + 1]), i[0] = Math.max(i[0], i[0], o[r]), i[1] = Math.max(i[1], i[1], o[r + 1]);
                    break;
                case"Q":
                    for (var r = 0; 4 > r; r += 2)e[0] = Math.min(e[0], e[0], o[r]), e[1] = Math.min(e[1], e[1], o[r + 1]), i[0] = Math.max(i[0], i[0], o[r]), i[1] = Math.max(i[1], i[1], o[r + 1]);
                    break;
                case"A":
                    var s = o[0], l = o[1], h = o[2], d = o[3];
                    e[0] = Math.min(e[0], e[0], s - h), e[1] = Math.min(e[1], e[1], l - d), i[0] = Math.max(i[0], i[0], s + h), i[1] = Math.max(i[1], i[1], l + d)
            }
        }
        return {x: e[0], y: e[1], width: i[0] - e[0], height: i[1] - e[1]}
    }, n.prototype.begin = function (e) {
        return this._ctx = e || null, this.pathCommands.length = 0, this
    }, n.prototype.moveTo = function (e, t) {
        return this.pathCommands.push(new i("M", [e, t])), this._ctx && this._ctx.moveTo(e, t), this
    }, n.prototype.lineTo = function (e, t) {
        return this.pathCommands.push(new i("L", [e, t])), this._ctx && this._ctx.lineTo(e, t), this
    }, n.prototype.bezierCurveTo = function (e, t, n, a, o, r) {
        return this.pathCommands.push(new i("C", [e, t, n, a, o, r])), this._ctx && this._ctx.bezierCurveTo(e, t, n, a, o, r), this
    }, n.prototype.quadraticCurveTo = function (e, t, n, a) {
        return this.pathCommands.push(new i("Q", [e, t, n, a])), this._ctx && this._ctx.quadraticCurveTo(e, t, n, a), this
    }, n.prototype.arc = function (e, t, n, a, o, r) {
        return this.pathCommands.push(new i("A", [e, t, n, n, a, o - a, 0, r ? 0 : 1])), this._ctx && this._ctx.arc(e, t, n, a, o, r), this
    }, n.prototype.arcTo = function (e, t, i, n, a) {
        return this._ctx && this._ctx.arcTo(e, t, i, n, a), this
    }, n.prototype.rect = function (e, t, i, n) {
        return this._ctx && this._ctx.rect(e, t, i, n), this
    }, n.prototype.closePath = function () {
        return this.pathCommands.push(new i("z")), this._ctx && this._ctx.closePath(), this
    }, n.prototype.isEmpty = function () {
        return 0 === this.pathCommands.length
    }, n.PathSegment = i, n
}), define("zrender/shape/Line", ["require", "./Base", "./util/dashedLineTo", "../tool/util"], function (e) {
    var t = e("./Base"), i = e("./util/dashedLineTo"), n = function (e) {
        this.brushTypeOnly = "stroke", this.textPosition = "end", t.call(this, e)
    };
    return n.prototype = {
        type: "line", buildPath: function (e, t) {
            if (t.lineType && "solid" != t.lineType) {
                if ("dashed" == t.lineType || "dotted" == t.lineType) {
                    var n = (t.lineWidth || 1) * ("dashed" == t.lineType ? 5 : 1);
                    i(e, t.xStart, t.yStart, t.xEnd, t.yEnd, n)
                }
            } else e.moveTo(t.xStart, t.yStart), e.lineTo(t.xEnd, t.yEnd)
        }, getRect: function (e) {
            if (e.__rect)return e.__rect;
            var t = e.lineWidth || 1;
            return e.__rect = {
                x: Math.min(e.xStart, e.xEnd) - t,
                y: Math.min(e.yStart, e.yEnd) - t,
                width: Math.abs(e.xStart - e.xEnd) + t,
                height: Math.abs(e.yStart - e.yEnd) + t
            }, e.__rect
        }
    }, e("../tool/util").inherits(n, t), n
}), define("zrender/shape/BrokenLine", ["require", "./Base", "./util/smoothSpline", "./util/smoothBezier", "./util/dashedLineTo", "./Polygon", "../tool/util"], function (e) {
    var t = e("./Base"), i = e("./util/smoothSpline"), n = e("./util/smoothBezier"), a = e("./util/dashedLineTo"), o = function (e) {
        this.brushTypeOnly = "stroke", this.textPosition = "end", t.call(this, e)
    };
    return o.prototype = {
        type: "broken-line", buildPath: function (e, t) {
            var o = t.pointList;
            if (!(o.length < 2)) {
                var r = Math.min(t.pointList.length, Math.round(t.pointListLength || t.pointList.length));
                if (t.smooth && "spline" !== t.smooth) {
                    var s = n(o, t.smooth, !1, t.smoothConstraint);
                    e.moveTo(o[0][0], o[0][1]);
                    for (var l, h, d, m = 0; r - 1 > m; m++)l = s[2 * m], h = s[2 * m + 1], d = o[m + 1], e.bezierCurveTo(l[0], l[1], h[0], h[1], d[0], d[1])
                } else if ("spline" === t.smooth && (o = i(o), r = o.length), t.lineType && "solid" != t.lineType) {
                    if ("dashed" == t.lineType || "dotted" == t.lineType) {
                        var c = (t.lineWidth || 1) * ("dashed" == t.lineType ? 5 : 1);
                        e.moveTo(o[0][0], o[0][1]);
                        for (var m = 1; r > m; m++)a(e, o[m - 1][0], o[m - 1][1], o[m][0], o[m][1], c)
                    }
                } else {
                    e.moveTo(o[0][0], o[0][1]);
                    for (var m = 1; r > m; m++)e.lineTo(o[m][0], o[m][1])
                }
            }
        }, getRect: function (t) {
            return e("./Polygon").prototype.getRect(t)
        }
    }, e("../tool/util").inherits(o, t), o
}), define("zrender/shape/util/dashedLineTo", [], function () {
    var e = [5, 5];
    return function (t, i, n, a, o, r) {
        if (t.setLineDash)return e[0] = e[1] = r, t.setLineDash(e), t.moveTo(i, n), void t.lineTo(a, o);
        r = "number" != typeof r ? 5 : r;
        var s = a - i, l = o - n, h = Math.floor(Math.sqrt(s * s + l * l) / r);
        s /= h, l /= h;
        for (var d = !0, m = 0; h > m; ++m)d ? t.moveTo(i, n) : t.lineTo(i, n), d = !d, i += s, n += l;
        t.lineTo(a, o)
    }
}), define("zrender/shape/util/smoothSpline", ["require", "../../tool/vector"], function (e) {
    function t(e, t, i, n, a, o, r) {
        var s = .5 * (i - e), l = .5 * (n - t);
        return (2 * (t - i) + s + l) * r + (-3 * (t - i) - 2 * s - l) * o + s * a + t
    }

    var i = e("../../tool/vector");
    return function (e, n) {
        for (var a = e.length, o = [], r = 0, s = 1; a > s; s++)r += i.distance(e[s - 1], e[s]);
        var l = r / 5;
        l = a > l ? a : l;
        for (var s = 0; l > s; s++) {
            var h, d, m, c = s / (l - 1) * (n ? a : a - 1), p = Math.floor(c), u = c - p, V = e[p % a];
            n ? (h = e[(p - 1 + a) % a], d = e[(p + 1) % a], m = e[(p + 2) % a]) : (h = e[0 === p ? p : p - 1], d = e[p > a - 2 ? a - 1 : p + 1], m = e[p > a - 3 ? a - 1 : p + 2]);
            var U = u * u, y = u * U;
            o.push([t(h[0], V[0], d[0], m[0], u, U, y), t(h[1], V[1], d[1], m[1], u, U, y)])
        }
        return o
    }
}), define("zrender/shape/util/smoothBezier", ["require", "../../tool/vector"], function (e) {
    var t = e("../../tool/vector");
    return function (e, i, n, a) {
        var o, r, s, l, h = [], d = [], m = [], c = [], p = !!a;
        if (p) {
            s = [1 / 0, 1 / 0], l = [-1 / 0, -1 / 0];
            for (var u = 0, V = e.length; V > u; u++)t.min(s, s, e[u]), t.max(l, l, e[u]);
            t.min(s, s, a[0]), t.max(l, l, a[1])
        }
        for (var u = 0, V = e.length; V > u; u++) {
            var o, r, U = e[u];
            if (n)o = e[u ? u - 1 : V - 1], r = e[(u + 1) % V]; else {
                if (0 === u || u === V - 1) {
                    h.push(e[u]);
                    continue
                }
                o = e[u - 1], r = e[u + 1]
            }
            t.sub(d, r, o), t.scale(d, d, i);
            var y = t.distance(U, o), g = t.distance(U, r), f = y + g;
            0 !== f && (y /= f, g /= f), t.scale(m, d, -y), t.scale(c, d, g);
            var b = t.add([], U, m), _ = t.add([], U, c);
            p && (t.max(b, b, s), t.min(b, b, l), t.max(_, _, s), t.min(_, _, l)), h.push(b), h.push(_)
        }
        return n && h.push(h.shift()), h
    }
}), define("zrender/shape/Polygon", ["require", "./Base", "./util/smoothSpline", "./util/smoothBezier", "./util/dashedLineTo", "../tool/util"], function (e) {
    var t = e("./Base"), i = e("./util/smoothSpline"), n = e("./util/smoothBezier"), a = e("./util/dashedLineTo"), o = function (e) {
        t.call(this, e)
    };
    return o.prototype = {
        type: "polygon", brush: function (e, t) {
            var i = this.style;
            t && (i = this.getHighlightStyle(i, this.highlightStyle || {})), e.save(), this.setContext(e, i), this.setTransform(e);
            var n = !1;
            ("fill" == i.brushType || "both" == i.brushType || "undefined" == typeof i.brushType) && (e.beginPath(), "dashed" == i.lineType || "dotted" == i.lineType ? (this.buildPath(e, {
                lineType: "solid",
                lineWidth: i.lineWidth,
                pointList: i.pointList
            }), n = !1) : (this.buildPath(e, i), n = !0), e.closePath(), e.fill()), i.lineWidth > 0 && ("stroke" == i.brushType || "both" == i.brushType) && (n || (e.beginPath(), this.buildPath(e, i)), e.stroke()), this.drawText(e, i, this.style), e.restore()
        }, buildPath: function (e, t) {
            var o = t.pointList;
            if (!(o.length < 2))if (t.smooth && "spline" !== t.smooth) {
                var r = n(o, t.smooth, !0, t.smoothConstraint);
                e.moveTo(o[0][0], o[0][1]);
                for (var s, l, h, d = o.length, m = 0; d > m; m++)s = r[2 * m], l = r[2 * m + 1], h = o[(m + 1) % d], e.bezierCurveTo(s[0], s[1], l[0], l[1], h[0], h[1])
            } else if ("spline" === t.smooth && (o = i(o, !0)), t.lineType && "solid" != t.lineType) {
                if ("dashed" == t.lineType || "dotted" == t.lineType) {
                    var c = t._dashLength || (t.lineWidth || 1) * ("dashed" == t.lineType ? 5 : 1);
                    t._dashLength = c, e.moveTo(o[0][0], o[0][1]);
                    for (var m = 1, p = o.length; p > m; m++)a(e, o[m - 1][0], o[m - 1][1], o[m][0], o[m][1], c);
                    a(e, o[o.length - 1][0], o[o.length - 1][1], o[0][0], o[0][1], c)
                }
            } else {
                e.moveTo(o[0][0], o[0][1]);
                for (var m = 1, p = o.length; p > m; m++)e.lineTo(o[m][0], o[m][1]);
                e.lineTo(o[0][0], o[0][1])
            }
        }, getRect: function (e) {
            if (e.__rect)return e.__rect;
            for (var t = Number.MAX_VALUE, i = Number.MIN_VALUE, n = Number.MAX_VALUE, a = Number.MIN_VALUE, o = e.pointList, r = 0, s = o.length; s > r; r++)o[r][0] < t && (t = o[r][0]), o[r][0] > i && (i = o[r][0]), o[r][1] < n && (n = o[r][1]), o[r][1] > a && (a = o[r][1]);
            var l;
            return l = "stroke" == e.brushType || "fill" == e.brushType ? e.lineWidth || 1 : 0, e.__rect = {
                x: Math.round(t - l / 2),
                y: Math.round(n - l / 2),
                width: i - t + l,
                height: a - n + l
            }, e.__rect
        }
    }, e("../tool/util").inherits(o, t), o
}), define("echarts/util/shape/normalIsCover", [], function () {
    return function (e, t) {
        var i = this.getTansform(e, t);
        e = i[0], t = i[1];
        var n = this.style.__rect;
        return n || (n = this.style.__rect = this.getRect(this.style)), e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height
    }
}), define("echarts/component/dataView", ["require", "./base", "../config", "zrender/tool/util", "../component"], function (e) {
    function t(e, t, n, a, o) {
        i.call(this, e, t, n, a, o), this.dom = o.dom, this._tDom = document.createElement("div"), this._textArea = document.createElement("textArea"), this._buttonRefresh = document.createElement("button"), this._buttonClose = document.createElement("button"), this._hasShow = !1, this._zrHeight = n.getHeight(), this._zrWidth = n.getWidth(), this._tDom.className = "echarts-dataview", this.hide(), this.dom.firstChild.appendChild(this._tDom), window.addEventListener ? (this._tDom.addEventListener("click", this._stop), this._tDom.addEventListener("mousewheel", this._stop), this._tDom.addEventListener("mousemove", this._stop), this._tDom.addEventListener("mousedown", this._stop), this._tDom.addEventListener("mouseup", this._stop), this._tDom.addEventListener("touchstart", this._stop), this._tDom.addEventListener("touchmove", this._stop), this._tDom.addEventListener("touchend", this._stop)) : (this._tDom.attachEvent("onclick", this._stop), this._tDom.attachEvent("onmousewheel", this._stop), this._tDom.attachEvent("onmousemove", this._stop), this._tDom.attachEvent("onmousedown", this._stop), this._tDom.attachEvent("onmouseup", this._stop))
    }

    var i = e("./base"), n = e("../config"), a = e("zrender/tool/util");
    return t.prototype = {
        type: n.COMPONENT_TYPE_DATAVIEW,
        _lang: ["Data View", "close", "refresh"],
        _gCssText: "position:absolute;display:block;overflow:hidden;transition:height 0.8s,background-color 1s;-moz-transition:height 0.8s,background-color 1s;-webkit-transition:height 0.8s,background-color 1s;-o-transition:height 0.8s,background-color 1s;z-index:1;left:0;top:0;",
        hide: function () {
            this._sizeCssText = "width:" + this._zrWidth + "px;height:0px;background-color:#f0ffff;", this._tDom.style.cssText = this._gCssText + this._sizeCssText
        },
        show: function (e) {
            this._hasShow = !0;
            var t = this.query(this.option, "toolbox.feature.dataView.lang") || this._lang;
            this.option = e, this._tDom.innerHTML = '<p style="padding:8px 0;margin:0 0 10px 0;border-bottom:1px solid #eee">' + (t[0] || this._lang[0]) + "</p>", this._textArea.style.cssText = "display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:" + (this._zrWidth - 15) + "px;height:" + (this._zrHeight - 100) + "px;";
            var i = this.query(this.option, "toolbox.feature.dataView.optionToContent");
            this._textArea.value = "function" != typeof i ? this._optionToContent() : i(this.option), this._tDom.appendChild(this._textArea), this._buttonClose.style.cssText = "float:right;padding:1px 6px;", this._buttonClose.innerHTML = t[1] || this._lang[1];
            var n = this;
            this._buttonClose.onclick = function () {
                n.hide()
            }, this._tDom.appendChild(this._buttonClose), this.query(this.option, "toolbox.feature.dataView.readOnly") === !1 ? (this._buttonRefresh.style.cssText = "float:right;margin-right:10px;padding:1px 6px;", this._buttonRefresh.innerHTML = t[2] || this._lang[2], this._buttonRefresh.onclick = function () {
                n._save()
            }, this._tDom.appendChild(this._buttonRefresh), this._textArea.readOnly = !1, this._textArea.style.cursor = "default") : (this._textArea.readOnly = !0, this._textArea.style.cursor = "text"), this._sizeCssText = "width:" + this._zrWidth + "px;height:" + this._zrHeight + "px;background-color:#fff;", this._tDom.style.cssText = this._gCssText + this._sizeCssText
        },
        _optionToContent: function () {
            var e, t, i, a, o, r, s = [], l = "";
            if (this.option.xAxis)for (s = this.option.xAxis instanceof Array ? this.option.xAxis : [this.option.xAxis], e = 0, a = s.length; a > e; e++)if ("category" == (s[e].type || "category")) {
                for (r = [], t = 0, i = s[e].data.length; i > t; t++)o = s[e].data[t], r.push("undefined" != typeof o.value ? o.value : o);
                l += r.join(", ") + "\n\n"
            }
            if (this.option.yAxis)for (s = this.option.yAxis instanceof Array ? this.option.yAxis : [this.option.yAxis], e = 0, a = s.length; a > e; e++)if ("category" == s[e].type) {
                for (r = [], t = 0, i = s[e].data.length; i > t; t++)o = s[e].data[t], r.push("undefined" != typeof o.value ? o.value : o);
                l += r.join(", ") + "\n\n"
            }
            var h, d = this.option.series;
            for (e = 0, a = d.length; a > e; e++) {
                for (r = [], t = 0, i = d[e].data.length; i > t; t++)o = d[e].data[t], h = d[e].type == n.CHART_TYPE_PIE || d[e].type == n.CHART_TYPE_MAP ? (o.name || "-") + ":" : "", d[e].type == n.CHART_TYPE_SCATTER && (o = "undefined" != typeof o.value ? o.value : o, o = o.join(", ")), r.push(h + ("undefined" != typeof o.value ? o.value : o));
                l += (d[e].name || "-") + " : \n", l += r.join(d[e].type == n.CHART_TYPE_SCATTER ? "\n" : ", "), l += "\n\n"
            }
            return l
        },
        _save: function () {
            var e = this._textArea.value, t = this.query(this.option, "toolbox.feature.dataView.contentToOption");
            if ("function" != typeof t) {
                e = e.split("\n");
                for (var i = [], a = 0, o = e.length; o > a; a++)e[a] = this._trim(e[a]), "" !== e[a] && i.push(e[a]);
                this._contentToOption(i)
            } else t(e, this.option);
            this.hide();
            var r = this;
            setTimeout(function () {
                r.messageCenter && r.messageCenter.dispatch(n.EVENT.DATA_VIEW_CHANGED, null, {option: r.option}, r.myChart)
            }, r.canvasSupported ? 800 : 100)
        },
        _contentToOption: function (e) {
            var t, i, a, o, r, s, l, h = [], d = 0;
            if (this.option.xAxis)for (h = this.option.xAxis instanceof Array ? this.option.xAxis : [this.option.xAxis], t = 0, o = h.length; o > t; t++)if ("category" == (h[t].type || "category")) {
                for (s = e[d].split(","), i = 0, a = h[t].data.length; a > i; i++)l = this._trim(s[i] || ""), r = h[t].data[i], "undefined" != typeof h[t].data[i].value ? h[t].data[i].value = l : h[t].data[i] = l;
                d++
            }
            if (this.option.yAxis)for (h = this.option.yAxis instanceof Array ? this.option.yAxis : [this.option.yAxis], t = 0, o = h.length; o > t; t++)if ("category" == h[t].type) {
                for (s = e[d].split(","), i = 0, a = h[t].data.length; a > i; i++)l = this._trim(s[i] || ""), r = h[t].data[i], "undefined" != typeof h[t].data[i].value ? h[t].data[i].value = l : h[t].data[i] = l;
                d++
            }
            var m = this.option.series;
            for (t = 0, o = m.length; o > t; t++)if (d++, m[t].type == n.CHART_TYPE_SCATTER)for (var i = 0, a = m[t].data.length; a > i; i++)s = e[d], l = s.replace(" ", "").split(","), "undefined" != typeof m[t].data[i].value ? m[t].data[i].value = l : m[t].data[i] = l, d++; else {
                s = e[d].split(",");
                for (var i = 0, a = m[t].data.length; a > i; i++)l = (s[i] || "").replace(/.*:/, ""), l = this._trim(l), l = "-" != l && "" !== l ? l - 0 : "-", "undefined" != typeof m[t].data[i].value ? m[t].data[i].value = l : m[t].data[i] = l;
                d++
            }
        },
        _trim: function (e) {
            var t = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
            return e.replace(t, "")
        },
        _stop: function (e) {
            e = e || window.event, e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
        },
        resize: function () {
            this._zrHeight = this.zr.getHeight(), this._zrWidth = this.zr.getWidth(), this._tDom.offsetHeight > 10 && (this._sizeCssText = "width:" + this._zrWidth + "px;height:" + this._zrHeight + "px;background-color:#fff;", this._tDom.style.cssText = this._gCssText + this._sizeCssText, this._textArea.style.cssText = "display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:" + (this._zrWidth - 15) + "px;height:" + (this._zrHeight - 100) + "px;")
        },
        dispose: function () {
            window.removeEventListener ? (this._tDom.removeEventListener("click", this._stop), this._tDom.removeEventListener("mousewheel", this._stop), this._tDom.removeEventListener("mousemove", this._stop), this._tDom.removeEventListener("mousedown", this._stop), this._tDom.removeEventListener("mouseup", this._stop), this._tDom.removeEventListener("touchstart", this._stop), this._tDom.removeEventListener("touchmove", this._stop), this._tDom.removeEventListener("touchend", this._stop)) : (this._tDom.detachEvent("onclick", this._stop), this._tDom.detachEvent("onmousewheel", this._stop), this._tDom.detachEvent("onmousemove", this._stop), this._tDom.detachEvent("onmousedown", this._stop), this._tDom.detachEvent("onmouseup", this._stop)), this._buttonRefresh.onclick = null, this._buttonClose.onclick = null, this._hasShow && (this._tDom.removeChild(this._textArea), this._tDom.removeChild(this._buttonRefresh), this._tDom.removeChild(this._buttonClose)), this._textArea = null, this._buttonRefresh = null, this._buttonClose = null, this.dom.firstChild.removeChild(this._tDom), this._tDom = null
        }
    }, a.inherits(t, i), e("../component").define("dataView", t), t
}), define("echarts/util/shape/Cross", ["require", "zrender/shape/Base", "zrender/shape/Line", "zrender/tool/util", "./normalIsCover"], function (e) {
    function t(e) {
        i.call(this, e)
    }

    var i = e("zrender/shape/Base"), n = e("zrender/shape/Line"), a = e("zrender/tool/util");
    return t.prototype = {
        type: "cross", buildPath: function (e, t) {
            var i = t.rect;
            t.xStart = i.x, t.xEnd = i.x + i.width, t.yStart = t.yEnd = t.y, n.prototype.buildPath(e, t), t.xStart = t.xEnd = t.x, t.yStart = i.y, t.yEnd = i.y + i.height, n.prototype.buildPath(e, t)
        }, getRect: function (e) {
            return e.rect
        }, isCover: e("./normalIsCover")
    }, a.inherits(t, i), t
}), define("zrender/shape/Sector", ["require", "../tool/math", "../tool/computeBoundingBox", "../tool/vector", "./Base", "../tool/util"], function (e) {
    var t = e("../tool/math"), i = e("../tool/computeBoundingBox"), n = e("../tool/vector"), a = e("./Base"), o = n.create(), r = n.create(), s = n.create(), l = n.create(), h = function (e) {
        a.call(this, e)
    };
    return h.prototype = {
        type: "sector", buildPath: function (e, i) {
            var n = i.x, a = i.y, o = i.r0 || 0, r = i.r, s = i.startAngle, l = i.endAngle, h = i.clockWise || !1;
            s = t.degreeToRadian(s), l = t.degreeToRadian(l), h || (s = -s, l = -l);
            var d = t.cos(s), m = t.sin(s);
            e.moveTo(d * o + n, m * o + a), e.lineTo(d * r + n, m * r + a), e.arc(n, a, r, s, l, !h), e.lineTo(t.cos(l) * o + n, t.sin(l) * o + a), 0 !== o && e.arc(n, a, o, l, s, h), e.closePath()
        }, getRect: function (e) {
            if (e.__rect)return e.__rect;
            var a = e.x, h = e.y, d = e.r0 || 0, m = e.r, c = t.degreeToRadian(e.startAngle), p = t.degreeToRadian(e.endAngle), u = e.clockWise;
            return u || (c = -c, p = -p), d > 1 ? i.arc(a, h, d, c, p, !u, o, s) : (o[0] = s[0] = a, o[1] = s[1] = h), i.arc(a, h, m, c, p, !u, r, l), n.min(o, o, r), n.max(s, s, l), e.__rect = {
                x: o[0],
                y: o[1],
                width: s[0] - o[0],
                height: s[1] - o[1]
            }, e.__rect
        }
    }, e("../tool/util").inherits(h, a), h
}), define("echarts/util/shape/Candle", ["require", "zrender/shape/Base", "zrender/tool/util", "./normalIsCover"], function (e) {
    function t(e) {
        i.call(this, e)
    }

    var i = e("zrender/shape/Base"), n = e("zrender/tool/util");
    return t.prototype = {
        type: "candle", _numberOrder: function (e, t) {
            return t - e
        }, buildPath: function (e, t) {
            var i = n.clone(t.y).sort(this._numberOrder);
            e.moveTo(t.x, i[3]), e.lineTo(t.x, i[2]), e.moveTo(t.x - t.width / 2, i[2]), e.rect(t.x - t.width / 2, i[2], t.width, i[1] - i[2]), e.moveTo(t.x, i[1]), e.lineTo(t.x, i[0])
        }, getRect: function (e) {
            if (!e.__rect) {
                var t = 0;
                ("stroke" == e.brushType || "fill" == e.brushType) && (t = e.lineWidth || 1);
                var i = n.clone(e.y).sort(this._numberOrder);
                e.__rect = {
                    x: Math.round(e.x - e.width / 2 - t / 2),
                    y: Math.round(i[3] - t / 2),
                    width: e.width + t,
                    height: i[0] - i[3] + t
                }
            }
            return e.__rect
        }, isCover: e("./normalIsCover")
    }, n.inherits(t, i), t
}), define("zrender/tool/computeBoundingBox", ["require", "./vector", "./curve"], function (e) {
    function t(e, t, i) {
        if (0 !== e.length) {
            for (var n = e[0][0], a = e[0][0], o = e[0][1], r = e[0][1], s = 1; s < e.length; s++) {
                var l = e[s];
                l[0] < n && (n = l[0]), l[0] > a && (a = l[0]), l[1] < o && (o = l[1]), l[1] > r && (r = l[1])
            }
            t[0] = n, t[1] = o, i[0] = a, i[1] = r
        }
    }

    function i(e, t, i, n, a, r) {
        var s = [];
        o.cubicExtrema(e[0], t[0], i[0], n[0], s);
        for (var l = 0; l < s.length; l++)s[l] = o.cubicAt(e[0], t[0], i[0], n[0], s[l]);
        var h = [];
        o.cubicExtrema(e[1], t[1], i[1], n[1], h);
        for (var l = 0; l < h.length; l++)h[l] = o.cubicAt(e[1], t[1], i[1], n[1], h[l]);
        s.push(e[0], n[0]), h.push(e[1], n[1]);
        var d = Math.min.apply(null, s), m = Math.max.apply(null, s), c = Math.min.apply(null, h), p = Math.max.apply(null, h);
        a[0] = d, a[1] = c, r[0] = m, r[1] = p
    }

    function n(e, t, i, n, a) {
        var r = o.quadraticExtremum(e[0], t[0], i[0]), s = o.quadraticExtremum(e[1], t[1], i[1]);
        r = Math.max(Math.min(r, 1), 0), s = Math.max(Math.min(s, 1), 0);
        var l = 1 - r, h = 1 - s, d = l * l * e[0] + 2 * l * r * t[0] + r * r * i[0], m = l * l * e[1] + 2 * l * r * t[1] + r * r * i[1], c = h * h * e[0] + 2 * h * s * t[0] + s * s * i[0], p = h * h * e[1] + 2 * h * s * t[1] + s * s * i[1];
        n[0] = Math.min(e[0], i[0], d, c), n[1] = Math.min(e[1], i[1], m, p), a[0] = Math.max(e[0], i[0], d, c), a[1] = Math.max(e[1], i[1], m, p)
    }

    var a = e("./vector"), o = e("./curve"), r = a.create(), s = a.create(), l = a.create(), h = function (e, t, i, n, o, h, d, m) {
        if (r[0] = Math.cos(n) * i + e, r[1] = Math.sin(n) * i + t, s[0] = Math.cos(o) * i + e, s[1] = Math.sin(o) * i + t, a.min(d, r, s), a.max(m, r, s), n %= 2 * Math.PI, 0 > n && (n += 2 * Math.PI), o %= 2 * Math.PI, 0 > o && (o += 2 * Math.PI), n > o && !h ? o += 2 * Math.PI : o > n && h && (n += 2 * Math.PI), h) {
            var c = o;
            o = n, n = c
        }
        for (var p = 0; o > p; p += Math.PI / 2)p > n && (l[0] = Math.cos(p) * i + e, l[1] = Math.sin(p) * i + t, a.min(d, l, d), a.max(m, l, m))
    };
    return t.cubeBezier = i, t.quadraticBezier = n, t.arc = h, t
}), define("echarts/util/shape/Chain", ["require", "zrender/shape/Base", "./Icon", "zrender/shape/util/dashedLineTo", "zrender/tool/util", "zrender/tool/matrix"], function (e) {
    function t(e) {
        i.call(this, e)
    }

    var i = e("zrender/shape/Base"), n = e("./Icon"), a = e("zrender/shape/util/dashedLineTo"), o = e("zrender/tool/util"), r = e("zrender/tool/matrix");
    return t.prototype = {
        type: "chain", brush: function (e, t) {
            var i = this.style;
            t && (i = this.getHighlightStyle(i, this.highlightStyle || {})), e.save(), this.setContext(e, i), this.setTransform(e), e.save(), e.beginPath(), this.buildLinePath(e, i), e.stroke(), e.restore(), this.brushSymbol(e, i), e.restore()
        }, buildLinePath: function (e, t) {
            var i = t.x, n = t.y + 5, o = t.width, r = t.height / 2 - 10;
            if (e.moveTo(i, n), e.lineTo(i, n + r), e.moveTo(i + o, n), e.lineTo(i + o, n + r), e.moveTo(i, n + r / 2), t.lineType && "solid" != t.lineType) {
                if ("dashed" == t.lineType || "dotted" == t.lineType) {
                    var s = (t.lineWidth || 1) * ("dashed" == t.lineType ? 5 : 1);
                    a(e, i, n + r / 2, i + o, n + r / 2, s)
                }
            } else e.lineTo(i + o, n + r / 2)
        }, brushSymbol: function (e, t) {
            var i = t.y + t.height / 4;
            e.save();
            for (var a, o = t.chainPoint, r = 0, s = o.length; s > r; r++) {
                if (a = o[r], "none" != a.symbol) {
                    e.beginPath();
                    var l = a.symbolSize;
                    n.prototype.buildPath(e, {
                        iconType: a.symbol,
                        x: a.x - l,
                        y: i - l,
                        width: 2 * l,
                        height: 2 * l,
                        n: a.n
                    }), e.fillStyle = a.isEmpty ? "#fff" : t.strokeColor, e.closePath(), e.fill(), e.stroke()
                }
                a.showLabel && (e.font = a.textFont, e.fillStyle = a.textColor, e.textAlign = a.textAlign, e.textBaseline = a.textBaseline, a.rotation ? (e.save(), this._updateTextTransform(e, a.rotation), e.fillText(a.name, a.textX, a.textY), e.restore()) : e.fillText(a.name, a.textX, a.textY))
            }
            e.restore()
        }, _updateTextTransform: function (e, t) {
            var i = r.create();
            if (r.identity(i), 0 !== t[0]) {
                var n = t[1] || 0, a = t[2] || 0;
                (n || a) && r.translate(i, i, [-n, -a]), r.rotate(i, i, t[0]), (n || a) && r.translate(i, i, [n, a])
            }
            e.transform.apply(e, i)
        }, isCover: function (e, t) {
            var i = this.style;
            return e >= i.x && e <= i.x + i.width && t >= i.y && t <= i.y + i.height ? !0 : !1
        }
    }, o.inherits(t, i), t
}), define("zrender/shape/Ring", ["require", "./Base", "../tool/util"], function (e) {
    var t = e("./Base"), i = function (e) {
        t.call(this, e)
    };
    return i.prototype = {
        type: "ring", buildPath: function (e, t) {
            e.arc(t.x, t.y, t.r, 0, 2 * Math.PI, !1), e.moveTo(t.x + t.r0, t.y), e.arc(t.x, t.y, t.r0, 0, 2 * Math.PI, !0)
        }, getRect: function (e) {
            if (e.__rect)return e.__rect;
            var t;
            return t = "stroke" == e.brushType || "fill" == e.brushType ? e.lineWidth || 1 : 0, e.__rect = {
                x: Math.round(e.x - e.r - t / 2),
                y: Math.round(e.y - e.r - t / 2),
                width: 2 * e.r + t,
                height: 2 * e.r + t
            }, e.__rect
        }
    }, e("../tool/util").inherits(i, t), i
}), define("echarts/component/axis", ["require", "./base", "zrender/shape/Line", "../config", "../util/ecData", "zrender/tool/util", "zrender/tool/color", "./categoryAxis", "./valueAxis", "../component"], function (e) {
    function t(e, t, n, a, o, r) {
        i.call(this, e, t, n, a, o), this.axisType = r, this._axisList = [], this.refresh(a)
    }

    var i = e("./base"), n = e("zrender/shape/Line"), a = e("../config"), o = e("../util/ecData"), r = e("zrender/tool/util"), s = e("zrender/tool/color");
    return t.prototype = {
        type: a.COMPONENT_TYPE_AXIS, axisBase: {
            _buildAxisLine: function () {
                var e = this.option.axisLine.lineStyle.width, t = e / 2, i = {
                    _axisShape: "axisLine",
                    zlevel: this._zlevelBase + 1,
                    hoverable: !1
                };
                switch (this.option.position) {
                    case"left":
                        i.style = {
                            xStart: this.grid.getX() - t,
                            yStart: this.grid.getYend(),
                            xEnd: this.grid.getX() - t,
                            yEnd: this.grid.getY(),
                            lineCap: "round"
                        };
                        break;
                    case"right":
                        i.style = {
                            xStart: this.grid.getXend() + t,
                            yStart: this.grid.getYend(),
                            xEnd: this.grid.getXend() + t,
                            yEnd: this.grid.getY(),
                            lineCap: "round"
                        };
                        break;
                    case"bottom":
                        i.style = {
                            xStart: this.grid.getX(),
                            yStart: this.grid.getYend() + t,
                            xEnd: this.grid.getXend(),
                            yEnd: this.grid.getYend() + t,
                            lineCap: "round"
                        };
                        break;
                    case"top":
                        i.style = {
                            xStart: this.grid.getX(),
                            yStart: this.grid.getY() - t,
                            xEnd: this.grid.getXend(),
                            yEnd: this.grid.getY() - t,
                            lineCap: "round"
                        }
                }
                "" !== this.option.name && (i.style.text = this.option.name, i.style.textPosition = this.option.nameLocation, i.style.textFont = this.getFont(this.option.nameTextStyle), this.option.nameTextStyle.align && (i.style.textAlign = this.option.nameTextStyle.align), this.option.nameTextStyle.baseline && (i.style.textBaseline = this.option.nameTextStyle.baseline), this.option.nameTextStyle.color && (i.style.textColor = this.option.nameTextStyle.color)), i.style.strokeColor = this.option.axisLine.lineStyle.color, i.style.lineWidth = e, this.isHorizontal() ? i.style.yStart = i.style.yEnd = this.subPixelOptimize(i.style.yEnd, e) : i.style.xStart = i.style.xEnd = this.subPixelOptimize(i.style.xEnd, e), i.style.lineType = this.option.axisLine.lineStyle.type, i = new n(i), this.shapeList.push(i)
            }, _axisLabelClickable: function (e, t) {
                return e ? (o.pack(t, void 0, -1, void 0, -1, t.style.text), t.hoverable = !0, t.clickable = !0, t.highlightStyle = {
                    color: s.lift(t.style.color, 1),
                    brushType: "fill"
                }, t) : t
            }, refixAxisShape: function (e, t) {
                if (this.option.axisLine.onZero) {
                    var i;
                    if (this.isHorizontal() && null != t)for (var n = 0, a = this.shapeList.length; a > n; n++)"axisLine" === this.shapeList[n]._axisShape ? (this.shapeList[n].style.yStart = this.shapeList[n].style.yEnd = this.subPixelOptimize(t, this.shapeList[n].stylelineWidth), this.zr.modShape(this.shapeList[n].id)) : "axisTick" === this.shapeList[n]._axisShape && (i = this.shapeList[n].style.yEnd - this.shapeList[n].style.yStart, this.shapeList[n].style.yStart = t - i, this.shapeList[n].style.yEnd = t, this.zr.modShape(this.shapeList[n].id));
                    if (!this.isHorizontal() && null != e)for (var n = 0, a = this.shapeList.length; a > n; n++)"axisLine" === this.shapeList[n]._axisShape ? (this.shapeList[n].style.xStart = this.shapeList[n].style.xEnd = this.subPixelOptimize(e, this.shapeList[n].stylelineWidth), this.zr.modShape(this.shapeList[n].id)) : "axisTick" === this.shapeList[n]._axisShape && (i = this.shapeList[n].style.xEnd - this.shapeList[n].style.xStart, this.shapeList[n].style.xStart = e, this.shapeList[n].style.xEnd = e + i, this.zr.modShape(this.shapeList[n].id))
                }
            }, getPosition: function () {
                return this.option.position
            }, isHorizontal: function () {
                return "bottom" === this.option.position || "top" === this.option.position
            }
        }, reformOption: function (e) {
            if (!e || e instanceof Array && 0 === e.length ? e = [{type: a.COMPONENT_TYPE_AXIS_VALUE}] : e instanceof Array || (e = [e]), e.length > 2 && (e = [e[0], e[1]]), "xAxis" === this.axisType) {
                (!e[0].position || "bottom" != e[0].position && "top" != e[0].position) && (e[0].position = "bottom"), e.length > 1 && (e[1].position = "bottom" === e[0].position ? "top" : "bottom");
                for (var t = 0, i = e.length; i > t; t++)e[t].type = e[t].type || "category", e[t].xAxisIndex = t, e[t].yAxisIndex = -1
            } else {
                (!e[0].position || "left" != e[0].position && "right" != e[0].position) && (e[0].position = "left"), e.length > 1 && (e[1].position = "left" === e[0].position ? "right" : "left");
                for (var t = 0, i = e.length; i > t; t++)e[t].type = e[t].type || "value", e[t].xAxisIndex = -1, e[t].yAxisIndex = t
            }
            return e
        }, refresh: function (t) {
            var i;
            t && (this.option = t, "xAxis" === this.axisType ? (this.option.xAxis = this.reformOption(t.xAxis), i = this.option.xAxis) : (this.option.yAxis = this.reformOption(t.yAxis), i = this.option.yAxis), this.series = t.series);
            for (var n = e("./categoryAxis"), a = e("./valueAxis"), o = Math.max(i && i.length || 0, this._axisList.length), r = 0; o > r; r++)!this._axisList[r] || !t || i[r] && this._axisList[r].type == i[r].type || (this._axisList[r].dispose && this._axisList[r].dispose(), this._axisList[r] = !1), this._axisList[r] ? this._axisList[r].refresh && this._axisList[r].refresh(i ? i[r] : !1, this.series) : i && i[r] && (this._axisList[r] = "category" === i[r].type ? new n(this.ecTheme, this.messageCenter, this.zr, i[r], this.myChart, this.axisBase) : new a(this.ecTheme, this.messageCenter, this.zr, i[r], this.myChart, this.axisBase, this.series))
        }, getAxis: function (e) {
            return this._axisList[e]
        }, clear: function () {
            for (var e = 0, t = this._axisList.length; t > e; e++)this._axisList[e].dispose && this._axisList[e].dispose();
            this._axisList = []
        }
    }, r.inherits(t, i), e("../component").define("axis", t), t
}), define("echarts/component/grid", ["require", "./base", "zrender/shape/Rectangle", "../config", "zrender/tool/util", "../component"], function (e) {
    function t(e, t, n, a, o) {
        i.call(this, e, t, n, a, o), this.refresh(a)
    }

    var i = e("./base"), n = e("zrender/shape/Rectangle"), a = e("../config"), o = e("zrender/tool/util");
    return t.prototype = {
        type: a.COMPONENT_TYPE_GRID, getX: function () {
            return this._x
        }, getY: function () {
            return this._y
        }, getWidth: function () {
            return this._width
        }, getHeight: function () {
            return this._height
        }, getXend: function () {
            return this._x + this._width
        }, getYend: function () {
            return this._y + this._height
        }, getArea: function () {
            return {x: this._x, y: this._y, width: this._width, height: this._height}
        }, getBbox: function () {
            return [[this._x, this._y], [this.getXend(), this.getYend()]]
        }, refixAxisShape: function (e) {
            for (var t, i, n, o = e.xAxis._axisList.concat(e.yAxis ? e.yAxis._axisList : []), r = o.length; r--;)n = o[r], n.type == a.COMPONENT_TYPE_AXIS_VALUE && n._min < 0 && n._max >= 0 && (n.isHorizontal() ? t = n.getCoord(0) : i = n.getCoord(0));
            if ("undefined" != typeof t || "undefined" != typeof i)for (r = o.length; r--;)o[r].refixAxisShape(t, i)
        }, refresh: function (e) {
            if (e || this._zrWidth != this.zr.getWidth() || this._zrHeight != this.zr.getHeight()) {
                this.clear(), this.option = e || this.option, this.option.grid = this.reformOption(this.option.grid);
                var t = this.option.grid;
                this._zrWidth = this.zr.getWidth(), this._zrHeight = this.zr.getHeight(), this._x = this.parsePercent(t.x, this._zrWidth), this._y = this.parsePercent(t.y, this._zrHeight);
                var i = this.parsePercent(t.x2, this._zrWidth), a = this.parsePercent(t.y2, this._zrHeight);
                this._width = "undefined" == typeof t.width ? this._zrWidth - this._x - i : this.parsePercent(t.width, this._zrWidth), this._width = this._width <= 0 ? 10 : this._width, this._height = "undefined" == typeof t.height ? this._zrHeight - this._y - a : this.parsePercent(t.height, this._zrHeight), this._height = this._height <= 0 ? 10 : this._height, this._x = this.subPixelOptimize(this._x, t.borderWidth), this._y = this.subPixelOptimize(this._y, t.borderWidth), this.shapeList.push(new n({
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {
                        x: this._x,
                        y: this._y,
                        width: this._width,
                        height: this._height,
                        brushType: t.borderWidth > 0 ? "both" : "fill",
                        color: t.backgroundColor,
                        strokeColor: t.borderColor,
                        lineWidth: t.borderWidth
                    }
                })), this.zr.addShape(this.shapeList[0])
            }
        }
    }, o.inherits(t, i), e("../component").define("grid", t), t
}), define("echarts/component/dataZoom", ["require", "./base", "zrender/shape/Rectangle", "zrender/shape/Polygon", "../util/shape/Icon", "../config", "../util/date", "zrender/tool/util", "../component"], function (e) {
    function t(e, t, n, a, o) {
        i.call(this, e, t, n, a, o);
        var r = this;
        r._ondrift = function (e, t) {
            return r.__ondrift(this, e, t)
        }, r._ondragend = function () {
            return r.__ondragend()
        }, this._fillerSize = 28, this._handleSize = 8, this._isSilence = !1, this._zoom = {}, this.option.dataZoom = this.reformOption(this.option.dataZoom), this.zoomOption = this.option.dataZoom, this.myChart.canvasSupported || (this.zoomOption.realtime = !1), this._location = this._getLocation(), this._zoom = this._getZoom(), this._backupData(), this.option.dataZoom.show && this._buildShape(), this._syncData()
    }

    var i = e("./base"), n = e("zrender/shape/Rectangle"), a = e("zrender/shape/Polygon"), o = e("../util/shape/Icon"), r = e("../config"), s = e("../util/date"), l = e("zrender/tool/util");
    return t.prototype = {
        type: r.COMPONENT_TYPE_DATAZOOM, _buildShape: function () {
            this._buildBackground(), this._buildFiller(), this._buildHandle(), this._buildFrame();
            for (var e = 0, t = this.shapeList.length; t > e; e++)this.zr.addShape(this.shapeList[e]);
            this._syncFrameShape()
        }, _getLocation: function () {
            var e, t, i, n, a = this.component.grid;
            return "horizontal" == this.zoomOption.orient ? (i = this.zoomOption.width || a.getWidth(), n = this.zoomOption.height || this._fillerSize, e = null != this.zoomOption.x ? this.zoomOption.x : a.getX(), t = null != this.zoomOption.y ? this.zoomOption.y : this.zr.getHeight() - n - 2) : (i = this.zoomOption.width || this._fillerSize, n = this.zoomOption.height || a.getHeight(), e = null != this.zoomOption.x ? this.zoomOption.x : 2, t = null != this.zoomOption.y ? this.zoomOption.y : a.getY()), {
                x: e,
                y: t,
                width: i,
                height: n
            }
        }, _getZoom: function () {
            var e = this.option.series, t = this.option.xAxis;
            !t || t instanceof Array || (t = [t], this.option.xAxis = t);
            var i = this.option.yAxis;
            !i || i instanceof Array || (i = [i], this.option.yAxis = i);
            var n, a, o = [], s = this.zoomOption.xAxisIndex;
            if (t && null == s) {
                n = [];
                for (var l = 0, h = t.length; h > l; l++)("category" == t[l].type || null == t[l].type) && n.push(l)
            } else n = s instanceof Array ? s : null != s ? [s] : [];
            if (s = this.zoomOption.yAxisIndex, i && null == s) {
                a = [];
                for (var l = 0, h = i.length; h > l; l++)"category" == i[l].type && a.push(l)
            } else a = s instanceof Array ? s : null != s ? [s] : [];
            for (var d, l = 0, h = e.length; h > l; l++)if (d = e[l], d.type == r.CHART_TYPE_LINE || d.type == r.CHART_TYPE_BAR || d.type == r.CHART_TYPE_SCATTER || d.type == r.CHART_TYPE_K) {
                for (var m = 0, c = n.length; c > m; m++)if (n[m] == (d.xAxisIndex || 0)) {
                    o.push(l);
                    break
                }
                for (var m = 0, c = a.length; c > m; m++)if (a[m] == (d.yAxisIndex || 0)) {
                    o.push(l);
                    break
                }
                null == this.zoomOption.xAxisIndex && null == this.zoomOption.yAxisIndex && d.data && d.data[0] && d.data[0] instanceof Array && (d.type == r.CHART_TYPE_SCATTER || d.type == r.CHART_TYPE_LINE || d.type == r.CHART_TYPE_BAR) && o.push(l)
            }
            var p = null != this._zoom.start ? this._zoom.start : null != this.zoomOption.start ? this.zoomOption.start : 0, u = null != this._zoom.end ? this._zoom.end : null != this.zoomOption.end ? this.zoomOption.end : 100;
            p > u && (p += u, u = p - u, p -= u);
            var V = Math.round((u - p) / 100 * ("horizontal" == this.zoomOption.orient ? this._location.width : this._location.height));
            return {
                start: p,
                end: u,
                start2: 0,
                end2: 100,
                size: V,
                xAxisIndex: n,
                yAxisIndex: a,
                seriesIndex: o,
                scatterMap: this._zoom.scatterMap || {}
            }
        }, _backupData: function () {
            this._originalData = {xAxis: {}, yAxis: {}, series: {}};
            for (var e = this.option.xAxis, t = this._zoom.xAxisIndex, i = 0, n = t.length; n > i; i++)this._originalData.xAxis[t[i]] = e[t[i]].data;
            for (var a = this.option.yAxis, o = this._zoom.yAxisIndex, i = 0, n = o.length; n > i; i++)this._originalData.yAxis[o[i]] = a[o[i]].data;
            for (var s, l = this.option.series, h = this._zoom.seriesIndex, i = 0, n = h.length; n > i; i++)s = l[h[i]], this._originalData.series[h[i]] = s.data, s.data && s.data[0] && s.data[0] instanceof Array && (s.type == r.CHART_TYPE_SCATTER || s.type == r.CHART_TYPE_LINE || s.type == r.CHART_TYPE_BAR) && (this._backupScale(), this._calculScatterMap(h[i]))
        }, _calculScatterMap: function (t) {
            this._zoom.scatterMap = this._zoom.scatterMap || {}, this._zoom.scatterMap[t] = this._zoom.scatterMap[t] || {};
            var i = e("../component"), n = i.get("axis"), a = l.clone(this.option.xAxis);
            "category" == a[0].type && (a[0].type = "value"), a[1] && "category" == a[1].type && (a[1].type = "value");
            var o = new n(this.ecTheme, null, !1, {
                xAxis: a,
                series: this.option.series
            }, this, "xAxis"), r = this.option.series[t].xAxisIndex || 0;
            this._zoom.scatterMap[t].x = o.getAxis(r).getExtremum(), o.dispose(), a = l.clone(this.option.yAxis), "category" == a[0].type && (a[0].type = "value"), a[1] && "category" == a[1].type && (a[1].type = "value"), o = new n(this.ecTheme, null, !1, {
                yAxis: a,
                series: this.option.series
            }, this, "yAxis"), r = this.option.series[t].yAxisIndex || 0, this._zoom.scatterMap[t].y = o.getAxis(r).getExtremum(), o.dispose()
        }, _buildBackground: function () {
            var e = this._location.width, t = this._location.height;
            this.shapeList.push(new n({
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: this._location.x,
                    y: this._location.y,
                    width: e,
                    height: t,
                    color: this.zoomOption.backgroundColor
                }
            }));
            for (var i = 0, o = this._originalData.xAxis, s = this._zoom.xAxisIndex, l = 0, h = s.length; h > l; l++)i = Math.max(i, o[s[l]].length);
            for (var d = this._originalData.yAxis, m = this._zoom.yAxisIndex, l = 0, h = m.length; h > l; l++)i = Math.max(i, d[m[l]].length);
            for (var c, p = this._zoom.seriesIndex[0], u = this._originalData.series[p], V = Number.MIN_VALUE, U = Number.MAX_VALUE, l = 0, h = u.length; h > l; l++)c = null != u[l] ? null != u[l].value ? u[l].value : u[l] : 0, this.option.series[p].type == r.CHART_TYPE_K && (c = c[1]), isNaN(c) && (c = 0), V = Math.max(V, c), U = Math.min(U, c);
            var y = V - U, g = [], f = e / (i - (i > 1 ? 1 : 0)), b = t / (i - (i > 1 ? 1 : 0)), _ = 1;
            "horizontal" == this.zoomOption.orient && 1 > f ? _ = Math.floor(3 * i / e) : "vertical" == this.zoomOption.orient && 1 > b && (_ = Math.floor(3 * i / t));
            for (var l = 0, h = i; h > l; l += _)c = null != u[l] ? null != u[l].value ? u[l].value : u[l] : 0, this.option.series[p].type == r.CHART_TYPE_K && (c = c[1]), isNaN(c) && (c = 0), g.push("horizontal" == this.zoomOption.orient ? [this._location.x + f * l, this._location.y + t - 1 - Math.round((c - U) / y * (t - 10))] : [this._location.x + 1 + Math.round((c - U) / y * (e - 10)), this._location.y + b * l]);
            "horizontal" == this.zoomOption.orient ? (g.push([this._location.x + e, this._location.y + t]), g.push([this._location.x, this._location.y + t])) : (g.push([this._location.x, this._location.y + t]), g.push([this._location.x, this._location.y])), this.shapeList.push(new a({
                zlevel: this._zlevelBase,
                style: {pointList: g, color: this.zoomOption.dataBackgroundColor},
                hoverable: !1
            }))
        }, _buildFiller: function () {
            this._fillerShae = {
                zlevel: this._zlevelBase,
                draggable: !0,
                ondrift: this._ondrift,
                ondragend: this._ondragend,
                _type: "filler"
            }, this._fillerShae.style = "horizontal" == this.zoomOption.orient ? {
                x: this._location.x + Math.round(this._zoom.start / 100 * this._location.width) + this._handleSize,
                y: this._location.y,
                width: this._zoom.size - 2 * this._handleSize,
                height: this._location.height,
                color: this.zoomOption.fillerColor,
                text: ":::",
                textPosition: "inside"
            } : {
                x: this._location.x,
                y: this._location.y + Math.round(this._zoom.start / 100 * this._location.height) + this._handleSize,
                width: this._location.width,
                height: this._zoom.size - 2 * this._handleSize,
                color: this.zoomOption.fillerColor,
                text: "::",
                textPosition: "inside"
            }, this._fillerShae.highlightStyle = {
                brushType: "fill",
                color: "rgba(0,0,0,0)"
            }, this._fillerShae = new n(this._fillerShae), this.shapeList.push(this._fillerShae)
        }, _buildHandle: function () {
            this._startShape = {
                zlevel: this._zlevelBase,
                draggable: !0,
                style: {
                    iconType: "rectangle",
                    x: this._location.x,
                    y: this._location.y,
                    width: this._handleSize,
                    height: this._handleSize,
                    color: this.zoomOption.handleColor,
                    text: "=",
                    textPosition: "inside"
                },
                highlightStyle: {text: "", brushType: "fill", textPosition: "left"},
                ondrift: this._ondrift,
                ondragend: this._ondragend
            }, "horizontal" == this.zoomOption.orient ? (this._startShape.style.height = this._location.height, this._endShape = l.clone(this._startShape), this._startShape.style.x = this._fillerShae.style.x - this._handleSize, this._endShape.style.x = this._fillerShae.style.x + this._fillerShae.style.width, this._endShape.highlightStyle.textPosition = "right") : (this._startShape.style.width = this._location.width, this._endShape = l.clone(this._startShape), this._startShape.style.y = this._fillerShae.style.y - this._handleSize, this._startShape.highlightStyle.textPosition = "top", this._endShape.style.y = this._fillerShae.style.y + this._fillerShae.style.height, this._endShape.highlightStyle.textPosition = "bottom"), this._startShape = new o(this._startShape), this._endShape = new o(this._endShape), this.shapeList.push(this._startShape), this.shapeList.push(this._endShape)
        }, _buildFrame: function () {
            var e = this.subPixelOptimize(this._location.x, 1), t = this.subPixelOptimize(this._location.y, 1);
            this._startFrameShape = {
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: e,
                    y: t,
                    width: this._location.width - (e > this._location.x ? 1 : 0),
                    height: this._location.height - (t > this._location.y ? 1 : 0),
                    lineWidth: 1,
                    brushType: "stroke",
                    strokeColor: this.zoomOption.handleColor
                }
            }, this._endFrameShape = l.clone(this._startFrameShape), this._startFrameShape = new n(this._startFrameShape), this._endFrameShape = new n(this._endFrameShape), this.shapeList.push(this._startFrameShape), this.shapeList.push(this._endFrameShape)
        }, _syncHandleShape: function () {
            "horizontal" == this.zoomOption.orient ? (this._startShape.style.x = this._fillerShae.style.x - this._handleSize, this._endShape.style.x = this._fillerShae.style.x + this._fillerShae.style.width, this._zoom.start = Math.floor((this._startShape.style.x - this._location.x) / this._location.width * 100), this._zoom.end = Math.ceil((this._endShape.style.x + this._handleSize - this._location.x) / this._location.width * 100)) : (this._startShape.style.y = this._fillerShae.style.y - this._handleSize, this._endShape.style.y = this._fillerShae.style.y + this._fillerShae.style.height, this._zoom.start = Math.floor((this._startShape.style.y - this._location.y) / this._location.height * 100), this._zoom.end = Math.ceil((this._endShape.style.y + this._handleSize - this._location.y) / this._location.height * 100)), this.zr.modShape(this._startShape.id), this.zr.modShape(this._endShape.id), this._syncFrameShape(), this.zr.refresh()
        }, _syncFillerShape: function () {
            var e, t;
            "horizontal" == this.zoomOption.orient ? (e = this._startShape.style.x, t = this._endShape.style.x, this._fillerShae.style.x = Math.min(e, t) + this._handleSize, this._fillerShae.style.width = Math.abs(e - t) - this._handleSize, this._zoom.start = Math.floor((Math.min(e, t) - this._location.x) / this._location.width * 100), this._zoom.end = Math.ceil((Math.max(e, t) + this._handleSize - this._location.x) / this._location.width * 100)) : (e = this._startShape.style.y, t = this._endShape.style.y, this._fillerShae.style.y = Math.min(e, t) + this._handleSize, this._fillerShae.style.height = Math.abs(e - t) - this._handleSize, this._zoom.start = Math.floor((Math.min(e, t) - this._location.y) / this._location.height * 100), this._zoom.end = Math.ceil((Math.max(e, t) + this._handleSize - this._location.y) / this._location.height * 100)), this.zr.modShape(this._fillerShae.id), this._syncFrameShape(), this.zr.refresh()
        }, _syncFrameShape: function () {
            "horizontal" == this.zoomOption.orient ? (this._startFrameShape.style.width = this._fillerShae.style.x - this._location.x, this._endFrameShape.style.x = this._fillerShae.style.x + this._fillerShae.style.width, this._endFrameShape.style.width = this._location.x + this._location.width - this._endFrameShape.style.x) : (this._startFrameShape.style.height = this._fillerShae.style.y - this._location.y, this._endFrameShape.style.y = this._fillerShae.style.y + this._fillerShae.style.height, this._endFrameShape.style.height = this._location.y + this._location.height - this._endFrameShape.style.y), this.zr.modShape(this._startFrameShape.id), this.zr.modShape(this._endFrameShape.id)
        }, _syncShape: function () {
            this.zoomOption.show && ("horizontal" == this.zoomOption.orient ? (this._startShape.style.x = this._location.x + this._zoom.start / 100 * this._location.width, this._endShape.style.x = this._location.x + this._zoom.end / 100 * this._location.width - this._handleSize, this._fillerShae.style.x = this._startShape.style.x + this._handleSize, this._fillerShae.style.width = this._endShape.style.x - this._startShape.style.x - this._handleSize) : (this._startShape.style.y = this._location.y + this._zoom.start / 100 * this._location.height, this._endShape.style.y = this._location.y + this._zoom.end / 100 * this._location.height - this._handleSize, this._fillerShae.style.y = this._startShape.style.y + this._handleSize, this._fillerShae.style.height = this._endShape.style.y - this._startShape.style.y - this._handleSize), this.zr.modShape(this._startShape.id), this.zr.modShape(this._endShape.id), this.zr.modShape(this._fillerShae.id), this._syncFrameShape(), this.zr.refresh())
        }, _syncData: function (e) {
            var t, i, n, a, o;
            for (var s in this._originalData) {
                t = this._originalData[s];
                for (var l in t)o = t[l], null != o && (a = o.length, i = Math.floor(this._zoom.start / 100 * a), n = Math.ceil(this._zoom.end / 100 * a), this.option[s][l].data[0] instanceof Array && this.option[s][l].type != r.CHART_TYPE_K ? (this._setScale(), this.option[s][l].data = this._synScatterData(l, o)) : this.option[s][l].data = o.slice(i, n))
            }
            this._isSilence || !this.zoomOption.realtime && !e || this.messageCenter.dispatch(r.EVENT.DATA_ZOOM, null, {zoom: this._zoom}, this.myChart)
        }, _synScatterData: function (e, t) {
            if (0 === this._zoom.start && 100 == this._zoom.end && 0 === this._zoom.start2 && 100 == this._zoom.end2)return t;
            var i, n, a, o, r, s = [], l = this._zoom.scatterMap[e];
            "horizontal" == this.zoomOption.orient ? (i = l.x.max - l.x.min, n = this._zoom.start / 100 * i + l.x.min, a = this._zoom.end / 100 * i + l.x.min, i = l.y.max - l.y.min, o = this._zoom.start2 / 100 * i + l.y.min, r = this._zoom.end2 / 100 * i + l.y.min) : (i = l.x.max - l.x.min, n = this._zoom.start2 / 100 * i + l.x.min, a = this._zoom.end2 / 100 * i + l.x.min, i = l.y.max - l.y.min, o = this._zoom.start / 100 * i + l.y.min, r = this._zoom.end / 100 * i + l.y.min);
            for (var h, d = 0, m = t.length; m > d; d++)h = t[d].value || t[d], h[0] >= n && h[0] <= a && h[1] >= o && h[1] <= r && s.push(t[d]);
            return s
        }, _setScale: function () {
            var e = 0 !== this._zoom.start || 100 !== this._zoom.end || 0 !== this._zoom.start2 || 100 !== this._zoom.end2, t = {
                xAxis: this.option.xAxis,
                yAxis: this.option.yAxis
            };
            for (var i in t)for (var n = 0, a = t[i].length; a > n; n++)t[i][n].scale = e || t[i][n]._scale
        }, _backupScale: function () {
            var e = {xAxis: this.option.xAxis, yAxis: this.option.yAxis};
            for (var t in e)for (var i = 0, n = e[t].length; n > i; i++)e[t][i]._scale = e[t][i].scale
        }, _getDetail: function () {
            var e = "horizontal" == this.zoomOption.orient ? "xAxis" : "yAxis", t = this._originalData[e];
            for (var i in t) {
                var n = t[i];
                if (null != n) {
                    var a = n.length, o = Math.floor(this._zoom.start / 100 * a), r = Math.ceil(this._zoom.end / 100 * a);
                    return r -= r >= a ? 1 : 0, {
                        start: null != n[o].value ? n[o].value : n[o],
                        end: null != n[r].value ? n[r].value : n[r]
                    }
                }
            }
            var l = this._zoom.seriesIndex[0], h = this.option.series[l][e + "Index"] || 0, d = this.option[e][h].type, m = this._zoom.scatterMap[l][e.charAt(0)].min, c = this._zoom.scatterMap[l][e.charAt(0)].max, p = c - m;
            if ("value" == d)return {start: m + p * this._zoom.start / 100, end: m + p * this._zoom.end / 100};
            if ("time" == d) {
                c = m + p * this._zoom.end / 100, m += p * this._zoom.start / 100;
                var u = s.getAutoFormatter(m, c).formatter;
                return {start: s.format(u, m), end: s.format(u, c)}
            }
            return {start: "", end: ""}
        }, __ondrift: function (e, t, i) {
            this.zoomOption.zoomLock && (e = this._fillerShae);
            var n = "filler" == e._type ? this._handleSize : 0;
            if ("horizontal" == this.zoomOption.orient ? e.style.x + t - n <= this._location.x ? e.style.x = this._location.x + n : e.style.x + t + e.style.width + n >= this._location.x + this._location.width ? e.style.x = this._location.x + this._location.width - e.style.width - n : e.style.x += t : e.style.y + i - n <= this._location.y ? e.style.y = this._location.y + n : e.style.y + i + e.style.height + n >= this._location.y + this._location.height ? e.style.y = this._location.y + this._location.height - e.style.height - n : e.style.y += i, "filler" == e._type ? this._syncHandleShape() : this._syncFillerShape(), this.zoomOption.realtime && this._syncData(), this.zoomOption.showDetail) {
                var a = this._getDetail();
                this._startShape.style.text = this._startShape.highlightStyle.text = a.start, this._endShape.style.text = this._endShape.highlightStyle.text = a.end, this._startShape.style.textPosition = this._startShape.highlightStyle.textPosition, this._endShape.style.textPosition = this._endShape.highlightStyle.textPosition
            }
            return !0
        }, __ondragend: function () {
            this.zoomOption.showDetail && (this._startShape.style.text = this._endShape.style.text = "=", this._startShape.style.textPosition = this._endShape.style.textPosition = "inside", this.zr.modShape(this._startShape.id), this.zr.modShape(this._endShape.id), this.zr.refreshNextFrame()), this.isDragend = !0
        }, ondragend: function (e, t) {
            this.isDragend && e.target && (!this.zoomOption.realtime && this._syncData(), t.dragOut = !0, t.dragIn = !0, this._isSilence || this.zoomOption.realtime || this.messageCenter.dispatch(r.EVENT.DATA_ZOOM, null, {zoom: this._zoom}, this.myChart), t.needRefresh = !1, this.isDragend = !1)
        }, ondataZoom: function (e, t) {
            t.needRefresh = !0
        }, absoluteZoom: function (e) {
            this._zoom.start = e.start, this._zoom.end = e.end, this._zoom.start2 = e.start2, this._zoom.end2 = e.end2, this._syncShape(), this._syncData(!0)
        }, rectZoom: function (e) {
            if (!e)return this._zoom.start = this._zoom.start2 = 0, this._zoom.end = this._zoom.end2 = 100, this._syncShape(), this._syncData(!0), this._zoom;
            var t = this.component.grid.getArea(), i = {x: e.x, y: e.y, width: e.width, height: e.height};
            if (i.width < 0 && (i.x += i.width, i.width = -i.width), i.height < 0 && (i.y += i.height, i.height = -i.height), i.x > t.x + t.width || i.y > t.y + t.height)return !1;
            i.x < t.x && (i.x = t.x), i.x + i.width > t.x + t.width && (i.width = t.x + t.width - i.x), i.y + i.height > t.y + t.height && (i.height = t.y + t.height - i.y);
            var n, a = (i.x - t.x) / t.width, o = 1 - (i.x + i.width - t.x) / t.width, r = 1 - (i.y + i.height - t.y) / t.height, s = (i.y - t.y) / t.height;
            return "horizontal" == this.zoomOption.orient ? (n = this._zoom.end - this._zoom.start, this._zoom.start += n * a, this._zoom.end -= n * o, n = this._zoom.end2 - this._zoom.start2, this._zoom.start2 += n * r, this._zoom.end2 -= n * s) : (n = this._zoom.end - this._zoom.start, this._zoom.start += n * r, this._zoom.end -= n * s, n = this._zoom.end2 - this._zoom.start2, this._zoom.start2 += n * a, this._zoom.end2 -= n * o), this._syncShape(), this._syncData(!0), this._zoom
        }, syncBackupData: function (e) {
            for (var t, i, n = this._originalData.series, a = e.series, o = 0, r = a.length; r > o; o++) {
                i = a[o].data || a[o].eventList, t = n[o] ? Math.floor(this._zoom.start / 100 * n[o].length) : 0;
                for (var s = 0, l = i.length; l > s; s++)n[o] && (n[o][s + t] = i[s])
            }
        }, syncOption: function (e) {
            this.silence(!0), this.option = e, this.option.dataZoom = this.reformOption(this.option.dataZoom), this.zoomOption = this.option.dataZoom, this.myChart.canvasSupported || (this.zoomOption.realtime = !1), this.clear(), this._location = this._getLocation(), this._zoom = this._getZoom(), this._backupData(), this.option.dataZoom && this.option.dataZoom.show && this._buildShape(), this._syncData(), this.silence(!1)
        }, silence: function (e) {
            this._isSilence = e
        }, getRealDataIndex: function (e, t) {
            if (!this._originalData || 0 === this._zoom.start && 100 == this._zoom.end)return t;
            var i = this._originalData.series;
            return i[e] ? Math.floor(this._zoom.start / 100 * i[e].length) + t : -1
        }, resize: function () {
            this.clear(), this._location = this._getLocation(), this._zoom = this._getZoom(), this.option.dataZoom.show && this._buildShape()
        }
    }, l.inherits(t, i), e("../component").define("dataZoom", t), t
}), define("echarts/component/categoryAxis", ["require", "./base", "zrender/shape/Text", "zrender/shape/Line", "zrender/shape/Rectangle", "../config", "zrender/tool/util", "zrender/tool/area", "../component"], function (e) {
    function t(e, t, n, a, o, r) {
        if (a.data.length < 1)return void console.error("option.data.length < 1.");
        i.call(this, e, t, n, a, o), this.grid = this.component.grid;
        for (var s in r)this[s] = r[s];
        this.refresh(a)
    }

    var i = e("./base"), n = e("zrender/shape/Text"), a = e("zrender/shape/Line"), o = e("zrender/shape/Rectangle"), r = e("../config"), s = e("zrender/tool/util"), l = e("zrender/tool/area");
    return t.prototype = {
        type: r.COMPONENT_TYPE_AXIS_CATEGORY, _getReformedLabel: function (e) {
            var t = "undefined" != typeof this.option.data[e].value ? this.option.data[e].value : this.option.data[e], i = this.option.data[e].formatter || this.option.axisLabel.formatter;
            return i && ("function" == typeof i ? t = i.call(this.myChart, t) : "string" == typeof i && (t = i.replace("{value}", t))), t
        }, _getInterval: function () {
            var e = this.option.axisLabel.interval;
            if ("auto" == e) {
                var t = this.option.axisLabel.textStyle.fontSize, i = this.option.data, n = this.option.data.length;
                if (this.isHorizontal())if (n > 3) {
                    var a, o, r = this.getGap(), h = !1, d = Math.floor(.5 / r);
                    for (d = 1 > d ? 1 : d, e = Math.floor(15 / r); !h && n > e;) {
                        e += d, h = !0, a = Math.floor(r * e);
                        for (var m = Math.floor((n - 1) / e) * e; m >= 0; m -= e) {
                            if (0 !== this.option.axisLabel.rotate)o = t; else if (i[m].textStyle)o = l.getTextWidth(this._getReformedLabel(m), this.getFont(s.merge(i[m].textStyle, this.option.axisLabel.textStyle))); else {
                                var c = this._getReformedLabel(m) + "", p = (c.match(/\w/g) || "").length, u = c.length - p;
                                o = p * t * 2 / 3 + u * t
                            }
                            if (o > a) {
                                h = !1;
                                break
                            }
                        }
                    }
                } else e = 1; else if (n > 3) {
                    var r = this.getGap();
                    for (e = Math.floor(11 / r); t > r * e - 6 && n > e;)e++
                } else e = 1
            } else e = e - 0 + 1;
            return e
        }, _buildShape: function () {
            if (this._interval = this._getInterval(), this.option.show) {
                this.option.splitArea.show && this._buildSplitArea(), this.option.splitLine.show && this._buildSplitLine(), this.option.axisLine.show && this._buildAxisLine(), this.option.axisTick.show && this._buildAxisTick(), this.option.axisLabel.show && this._buildAxisLabel();
                for (var e = 0, t = this.shapeList.length; t > e; e++)this.zr.addShape(this.shapeList[e])
            }
        }, _buildAxisTick: function () {
            var e, t = this.option.data.length, i = this.option.axisTick, n = i.length, o = i.lineStyle.color, r = i.lineStyle.width, s = "auto" == i.interval ? this._interval : i.interval - 0 + 1, l = i.onGap, h = l ? this.getGap() / 2 : "undefined" == typeof l && this.option.boundaryGap ? this.getGap() / 2 : 0, d = h > 0 ? -s : 0;
            if (this.isHorizontal())for (var m, c = "bottom" == this.option.position ? i.inside ? this.grid.getYend() - n - 1 : this.grid.getYend() + 1 : i.inside ? this.grid.getY() + 1 : this.grid.getY() - n - 1, p = d; t > p; p += s)m = this.subPixelOptimize(this.getCoordByIndex(p) + (p >= 0 ? h : 0), r), e = {
                _axisShape: "axisTick",
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {xStart: m, yStart: c, xEnd: m, yEnd: c + n, strokeColor: o, lineWidth: r}
            }, this.shapeList.push(new a(e));
            else for (var u, V = "left" == this.option.position ? i.inside ? this.grid.getX() + 1 : this.grid.getX() - n - 1 : i.inside ? this.grid.getXend() - n - 1 : this.grid.getXend() + 1, p = d; t > p; p += s)u = this.subPixelOptimize(this.getCoordByIndex(p) - (p >= 0 ? h : 0), r), e = {
                _axisShape: "axisTick",
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {xStart: V, yStart: u, xEnd: V + n, yEnd: u, strokeColor: o, lineWidth: r}
            }, this.shapeList.push(new a(e))
        }, _buildAxisLabel: function () {
            var e, t, i = this.option.data, a = this.option.data.length, o = this.option.axisLabel.rotate, r = this.option.axisLabel.margin, l = this.option.axisLabel.clickable, h = this.option.axisLabel.textStyle;
            if (this.isHorizontal()) {
                var d, m;
                "bottom" == this.option.position ? (d = this.grid.getYend() + r, m = "top") : (d = this.grid.getY() - r, m = "bottom");
                for (var c = 0; a > c; c += this._interval)"" !== this._getReformedLabel(c) && (t = s.merge(i[c].textStyle || {}, h), e = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {
                        x: this.getCoordByIndex(c),
                        y: d,
                        color: t.color,
                        text: this._getReformedLabel(c),
                        textFont: this.getFont(t),
                        textAlign: t.align || "center",
                        textBaseline: t.baseline || m
                    }
                }, o && (e.style.textAlign = o > 0 ? "bottom" == this.option.position ? "right" : "left" : "bottom" == this.option.position ? "left" : "right", e.rotation = [o * Math.PI / 180, e.style.x, e.style.y]), this.shapeList.push(new n(this._axisLabelClickable(l, e))))
            } else {
                var p, u;
                "left" == this.option.position ? (p = this.grid.getX() - r, u = "right") : (p = this.grid.getXend() + r, u = "left");
                for (var c = 0; a > c; c += this._interval)"" !== this._getReformedLabel(c) && (t = s.merge(i[c].textStyle || {}, h), e = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {
                        x: p,
                        y: this.getCoordByIndex(c),
                        color: t.color,
                        text: this._getReformedLabel(c),
                        textFont: this.getFont(t),
                        textAlign: t.align || u,
                        textBaseline: t.baseline || 0 === c && "" !== this.option.name ? "bottom" : c == a - 1 && "" !== this.option.name ? "top" : "middle"
                    }
                }, o && (e.rotation = [o * Math.PI / 180, e.style.x, e.style.y]), this.shapeList.push(new n(this._axisLabelClickable(l, e))))
            }
        }, _buildSplitLine: function () {
            var e, t = this.option.data.length, i = this.option.splitLine, n = i.lineStyle.type, o = i.lineStyle.width, r = i.lineStyle.color;
            r = r instanceof Array ? r : [r];
            var s = r.length, l = i.onGap, h = l ? this.getGap() / 2 : "undefined" == typeof l && this.option.boundaryGap ? this.getGap() / 2 : 0;
            if (t -= l || "undefined" == typeof l && this.option.boundaryGap ? 1 : 0, this.isHorizontal())for (var d, m = this.grid.getY(), c = this.grid.getYend(), p = 0; t > p; p += this._interval)d = this.subPixelOptimize(this.getCoordByIndex(p) + h, o), e = {
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    xStart: d,
                    yStart: m,
                    xEnd: d,
                    yEnd: c,
                    strokeColor: r[p / this._interval % s],
                    lineType: n,
                    lineWidth: o
                }
            }, this.shapeList.push(new a(e)); else for (var u, V = this.grid.getX(), U = this.grid.getXend(), p = 0; t > p; p += this._interval)u = this.subPixelOptimize(this.getCoordByIndex(p) - h, o), e = {
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    xStart: V,
                    yStart: u,
                    xEnd: U,
                    yEnd: u,
                    strokeColor: r[p / this._interval % s],
                    linetype: n,
                    lineWidth: o
                }
            }, this.shapeList.push(new a(e))
        }, _buildSplitArea: function () {
            var e, t = this.option.splitArea, i = t.areaStyle.color;
            if (i instanceof Array) {
                var n = i.length, a = this.option.data.length, r = t.onGap, s = r ? this.getGap() / 2 : "undefined" == typeof r && this.option.boundaryGap ? this.getGap() / 2 : 0;
                if (this.isHorizontal())for (var l, h = this.grid.getY(), d = this.grid.getHeight(), m = this.grid.getX(), c = 0; a >= c; c += this._interval)l = a > c ? this.getCoordByIndex(c) + s : this.grid.getXend(), e = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {x: m, y: h, width: l - m, height: d, color: i[c / this._interval % n]}
                }, this.shapeList.push(new o(e)), m = l; else for (var p, u = this.grid.getX(), V = this.grid.getWidth(), U = this.grid.getYend(), c = 0; a >= c; c += this._interval)p = a > c ? this.getCoordByIndex(c) - s : this.grid.getY(), e = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {x: u, y: p, width: V, height: U - p, color: i[c / this._interval % n]}
                }, this.shapeList.push(new o(e)), U = p
            } else e = {
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: this.grid.getX(),
                    y: this.grid.getY(),
                    width: this.grid.getWidth(),
                    height: this.grid.getHeight(),
                    color: i
                }
            }, this.shapeList.push(new o(e))
        }, refresh: function (e) {
            e && (this.option = this.reformOption(e), this.option.axisLabel.textStyle = s.merge(this.option.axisLabel.textStyle || {}, this.ecTheme.textStyle)), this.clear(), this._buildShape()
        }, getGap: function () {
            var e = this.option.data.length, t = this.isHorizontal() ? this.grid.getWidth() : this.grid.getHeight();
            return this.option.boundaryGap ? t / e : t / (e > 1 ? e - 1 : 1)
        }, getCoord: function (e) {
            for (var t = this.option.data, i = t.length, n = this.getGap(), a = this.option.boundaryGap ? n / 2 : 0, o = 0; i > o; o++) {
                if (t[o] == e || "undefined" != typeof t[o].value && t[o].value == e)return a = this.isHorizontal() ? this.grid.getX() + a : this.grid.getYend() - a;
                a += n
            }
        }, getCoordByIndex: function (e) {
            if (0 > e)return this.isHorizontal() ? this.grid.getX() : this.grid.getYend();
            if (e > this.option.data.length - 1)return this.isHorizontal() ? this.grid.getXend() : this.grid.getY();
            var t = this.getGap(), i = this.option.boundaryGap ? t / 2 : 0;
            return i += e * t, i = this.isHorizontal() ? this.grid.getX() + i : this.grid.getYend() - i
        }, getNameByIndex: function (e) {
            var t = this.option.data[e];
            return "undefined" != typeof t && "undefined" != typeof t.value ? t.value : t
        }, getIndexByName: function (e) {
            for (var t = this.option.data, i = t.length, n = 0; i > n; n++)if (t[n] == e || "undefined" != typeof t[n].value && t[n].value == e)return n;
            return -1
        }, getValueFromCoord: function () {
            return ""
        }, isMainAxis: function (e) {
            return e % this._interval === 0
        }
    }, s.inherits(t, i), e("../component").define("categoryAxis", t), t
}), define("echarts/component/valueAxis", ["require", "./base", "zrender/shape/Text", "zrender/shape/Line", "zrender/shape/Rectangle", "../config", "../util/date", "zrender/tool/util", "../util/smartSteps", "../util/accMath", "../component"], function (e) {
    function t(e, t, n, a, o, r, s) {
        if (!s || 0 === s.length)return void console.err("option.series.length == 0.");
        i.call(this, e, t, n, a, o), this.series = s, this.grid = this.component.grid;
        for (var l in r)this[l] = r[l];
        this.refresh(a, s)
    }

    var i = e("./base"), n = e("zrender/shape/Text"), a = e("zrender/shape/Line"), o = e("zrender/shape/Rectangle"), r = e("../config"), s = e("../util/date"), l = e("zrender/tool/util");
    return t.prototype = {
        type: r.COMPONENT_TYPE_AXIS_VALUE, _buildShape: function () {
            if (this._hasData = !1, this._calculateValue(), this._hasData && this.option.show) {
                this.option.splitArea.show && this._buildSplitArea(), this.option.splitLine.show && this._buildSplitLine(), this.option.axisLine.show && this._buildAxisLine(), this.option.axisTick.show && this._buildAxisTick(), this.option.axisLabel.show && this._buildAxisLabel();
                for (var e = 0, t = this.shapeList.length; t > e; e++)this.zr.addShape(this.shapeList[e])
            }
        }, _buildAxisTick: function () {
            var e, t = this._valueList, i = this._valueList.length, n = this.option.axisTick, o = n.length, r = n.lineStyle.color, s = n.lineStyle.width;
            if (this.isHorizontal())for (var l, h = "bottom" === this.option.position ? n.inside ? this.grid.getYend() - o - 1 : this.grid.getYend() + 1 : n.inside ? this.grid.getY() + 1 : this.grid.getY() - o - 1, d = 0; i > d; d++)l = this.subPixelOptimize(this.getCoord(t[d]), s), e = {
                _axisShape: "axisTick",
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {xStart: l, yStart: h, xEnd: l, yEnd: h + o, strokeColor: r, lineWidth: s}
            }, this.shapeList.push(new a(e)); else for (var m, c = "left" === this.option.position ? n.inside ? this.grid.getX() + 1 : this.grid.getX() - o - 1 : n.inside ? this.grid.getXend() - o - 1 : this.grid.getXend() + 1, d = 0; i > d; d++)m = this.subPixelOptimize(this.getCoord(t[d]), s), e = {
                _axisShape: "axisTick",
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {xStart: c, yStart: m, xEnd: c + o, yEnd: m, strokeColor: r, lineWidth: s}
            }, this.shapeList.push(new a(e))
        }, _buildAxisLabel: function () {
            var e, t = this._valueList, i = this._valueList.length, a = this.option.axisLabel.rotate, o = this.option.axisLabel.margin, r = this.option.axisLabel.clickable, s = this.option.axisLabel.textStyle;
            if (this.isHorizontal()) {
                var l, h;
                "bottom" === this.option.position ? (l = this.grid.getYend() + o, h = "top") : (l = this.grid.getY() - o, h = "bottom");
                for (var d = 0; i > d; d++)e = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {
                        x: this.getCoord(t[d]),
                        y: l,
                        color: "function" == typeof s.color ? s.color(t[d]) : s.color,
                        text: this._valueLabel[d],
                        textFont: this.getFont(s),
                        textAlign: s.align || "center",
                        textBaseline: s.baseline || h
                    }
                }, a && (e.style.textAlign = a > 0 ? "bottom" === this.option.position ? "right" : "left" : "bottom" === this.option.position ? "left" : "right", e.rotation = [a * Math.PI / 180, e.style.x, e.style.y]), this.shapeList.push(new n(this._axisLabelClickable(r, e)))
            } else {
                var m, c;
                "left" === this.option.position ? (m = this.grid.getX() - o, c = "right") : (m = this.grid.getXend() + o, c = "left");
                for (var d = 0; i > d; d++)e = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {
                        x: m,
                        y: this.getCoord(t[d]),
                        color: "function" == typeof s.color ? s.color(t[d]) : s.color,
                        text: this._valueLabel[d],
                        textFont: this.getFont(s),
                        textAlign: s.align || c,
                        textBaseline: s.baseline || 0 === d && "" !== this.option.name ? "bottom" : d === i - 1 && "" !== this.option.name ? "top" : "middle"
                    }
                }, a && (e.rotation = [a * Math.PI / 180, e.style.x, e.style.y]), this.shapeList.push(new n(this._axisLabelClickable(r, e)))
            }
        }, _buildSplitLine: function () {
            var e, t = this._valueList, i = this._valueList.length, n = this.option.splitLine, o = n.lineStyle.type, r = n.lineStyle.width, s = n.lineStyle.color;
            s = s instanceof Array ? s : [s];
            var l = s.length;
            if (this.isHorizontal())for (var h, d = this.grid.getY(), m = this.grid.getYend(), c = 0; i > c; c++)h = this.subPixelOptimize(this.getCoord(t[c]), r), e = {
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {xStart: h, yStart: d, xEnd: h, yEnd: m, strokeColor: s[c % l], lineType: o, lineWidth: r}
            }, this.shapeList.push(new a(e)); else for (var p, u = this.grid.getX(), V = this.grid.getXend(), c = 0; i > c; c++)p = this.subPixelOptimize(this.getCoord(t[c]), r), e = {
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {xStart: u, yStart: p, xEnd: V, yEnd: p, strokeColor: s[c % l], lineType: o, lineWidth: r}
            }, this.shapeList.push(new a(e))
        }, _buildSplitArea: function () {
            var e, t = this.option.splitArea.areaStyle.color;
            if (t instanceof Array) {
                var i = t.length, n = this._valueList, a = this._valueList.length;
                if (this.isHorizontal())for (var r, s = this.grid.getY(), l = this.grid.getHeight(), h = this.grid.getX(), d = 0; a >= d; d++)r = a > d ? this.getCoord(n[d]) : this.grid.getXend(), e = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {x: h, y: s, width: r - h, height: l, color: t[d % i]}
                }, this.shapeList.push(new o(e)), h = r; else for (var m, c = this.grid.getX(), p = this.grid.getWidth(), u = this.grid.getYend(), d = 0; a >= d; d++)m = a > d ? this.getCoord(n[d]) : this.grid.getY(), e = {
                    zlevel: this._zlevelBase,
                    hoverable: !1,
                    style: {x: c, y: m, width: p, height: u - m, color: t[d % i]}
                }, this.shapeList.push(new o(e)), u = m
            } else e = {
                zlevel: this._zlevelBase,
                hoverable: !1,
                style: {
                    x: this.grid.getX(),
                    y: this.grid.getY(),
                    width: this.grid.getWidth(),
                    height: this.grid.getHeight(),
                    color: t
                }
            }, this.shapeList.push(new o(e))
        }, _calculateValue: function () {
            if (isNaN(this.option.min - 0) || isNaN(this.option.max - 0)) {
                for (var e, t, i = {}, n = this.component.legend, a = 0, o = this.series.length; o > a; a++)!(this.series[a].type != r.CHART_TYPE_LINE && this.series[a].type != r.CHART_TYPE_BAR && this.series[a].type != r.CHART_TYPE_SCATTER && this.series[a].type != r.CHART_TYPE_K && this.series[a].type != r.CHART_TYPE_EVENTRIVER || n && !n.isSelected(this.series[a].name) || (e = this.series[a].xAxisIndex || 0, t = this.series[a].yAxisIndex || 0, this.option.xAxisIndex != e && this.option.yAxisIndex != t || !this._calculSum(i, a)));
                var s;
                for (var a in i) {
                    s = i[a];
                    for (var l = 0, h = s.length; h > l; l++)if (!isNaN(s[l])) {
                        this._hasData = !0, this._min = s[l], this._max = s[l];
                        break
                    }
                    if (this._hasData)break
                }
                for (var a in i) {
                    s = i[a];
                    for (var l = 0, h = s.length; h > l; l++)isNaN(s[l]) || (this._min = Math.min(this._min, s[l]), this._max = Math.max(this._max, s[l]))
                }
                var d = Math.abs(this._max - this._min);
                this._min = isNaN(this.option.min - 0) ? this._min - Math.abs(d * this.option.boundaryGap[0]) : this.option.min - 0, this._max = isNaN(this.option.max - 0) ? this._max + Math.abs(d * this.option.boundaryGap[1]) : this.option.max - 0, this._min === this._max && (0 === this._max ? this._max = 1 : this._max > 0 ? this._min = this._max / this.option.splitNumber != null ? this.option.splitNumber : 5 : this._max = this._max / this.option.splitNumber != null ? this.option.splitNumber : 5), "time" != this.option.type ? this._reformValue(this.option.scale) : this._reformTimeValue()
            } else this._hasData = !0, this._min = this.option.min - 0, this._max = this.option.max - 0, "time" != this.option.type ? this._customerValue() : this._reformTimeValue()
        }, _calculSum: function (e, t) {
            var i, n, a = this.series[t].name || "kener";
            if (this.series[t].stack) {
                var o = "__Magic_Key_Positive__" + this.series[t].stack, l = "__Magic_Key_Negative__" + this.series[t].stack;
                e[o] = e[o] || [], e[l] = e[l] || [], e[a] = e[a] || [], n = this.series[t].data;
                for (var h = 0, d = n.length; d > h; h++)i = null != n[h].value ? n[h].value : n[h], "-" !== i && (i -= 0, i >= 0 ? null != e[o][h] ? e[o][h] += i : e[o][h] = i : null != e[l][h] ? e[l][h] += i : e[l][h] = i, this.option.scale && e[a].push(i))
            } else if (e[a] = e[a] || [], this.series[t].type != r.CHART_TYPE_EVENTRIVER) {
                n = this.series[t].data;
                for (var h = 0, d = n.length; d > h; h++)i = null != n[h].value ? n[h].value : n[h], this.series[t].type === r.CHART_TYPE_K ? (e[a].push(i[0]), e[a].push(i[1]), e[a].push(i[2]), e[a].push(i[3])) : i instanceof Array ? (-1 != this.option.xAxisIndex && e[a].push("time" != this.option.type ? i[0] : s.getNewDate(i[0])), -1 != this.option.yAxisIndex && e[a].push("time" != this.option.type ? i[1] : s.getNewDate(i[1]))) : e[a].push(i)
            } else {
                n = this.series[t].eventList;
                for (var h = 0, d = n.length; d > h; h++)for (var m = n[h].evolution, c = 0, p = m.length; p > c; c++)e[a].push(s.getNewDate(m[c].time))
            }
        }, _reformValue: function (t) {
            var i = e("../util/smartSteps"), n = this.option.splitNumber;
            !t && this._min >= 0 && this._max >= 0 && (this._min = 0), !t && this._min <= 0 && this._max <= 0 && (this._max = 0);
            var a = i(this._min, this._max, n);
            n = null != n ? n : a.secs, this.option.splitNumber = n, this._min = a.min, this._max = a.max, this._valueList = a.pnts, this._reformLabelData()
        }, _reformTimeValue: function () {
            var e = null != this.option.splitNumber ? this.option.splitNumber : 5, t = s.getAutoFormatter(this._min, this._max, e), i = t.formatter, n = t.gapValue;
            this._valueList = [s.getNewDate(this._min)];
            var a;
            switch (i) {
                case"week":
                    a = s.nextMonday(this._min);
                    break;
                case"month":
                    a = s.nextNthOnMonth(this._min, 1);
                    break;
                case"quarter":
                    a = s.nextNthOnQuarterYear(this._min, 1);
                    break;
                case"half-year":
                    a = s.nextNthOnHalfYear(this._min, 1);
                    break;
                case"year":
                    a = s.nextNthOnYear(this._min, 1);
                    break;
                default:
                    72e5 >= n ? a = (Math.floor(this._min / n) + 1) * n : (a = s.getNewDate(this._min - -n), a.setHours(6 * Math.round(a.getHours() / 6)), a.setMinutes(0), a.setSeconds(0))
            }
            for (a - this._min < n / 2 && (a -= -n), t = s.getNewDate(a), e *= 1.5; e-- >= 0 && (("month" == i || "quarter" == i || "half-year" == i || "year" == i) && t.setDate(1), !(this._max - t < n / 2));)this._valueList.push(t), t = s.getNewDate(t - -n);
            this._valueList.push(s.getNewDate(this._max)), this._reformLabelData(i)
        }, _customerValue: function () {
            var t = e("../util/accMath"), i = null != this.option.splitNumber ? this.option.splitNumber : 5, n = (this._max - this._min) / i;
            this._valueList = [];
            for (var a = 0; i >= a; a++)this._valueList.push(t.accAdd(this._min, t.accMul(n, a)));
            this._reformLabelData()
        }, _reformLabelData: function (e) {
            this._valueLabel = [];
            var t = this.option.axisLabel.formatter;
            if (t)for (var i = 0, n = this._valueList.length; n > i; i++)"function" == typeof t ? this._valueLabel.push(e ? t.call(this.myChart, this._valueList[i], e) : t.call(this.myChart, this._valueList[i])) : "string" == typeof t && this._valueLabel.push(e ? s.format(t, this._valueList[i]) : t.replace("{value}", this._valueList[i])); else if (e)for (var i = 0, n = this._valueList.length; n > i; i++)this._valueLabel.push(s.format(e, this._valueList[i])); else for (var i = 0, n = this._valueList.length; n > i; i++)this._valueLabel.push(this.numAddCommas(this._valueList[i]))
        }, getExtremum: function () {
            return this._calculateValue(), {min: this._min, max: this._max}
        }, refresh: function (e, t) {
            e && (this.option = this.reformOption(e), this.option.axisLabel.textStyle = l.merge(this.option.axisLabel.textStyle || {}, this.ecTheme.textStyle), this.series = t), this.zr && (this.clear(), this._buildShape())
        }, getCoord: function (e) {
            e = e < this._min ? this._min : e, e = e > this._max ? this._max : e;
            var t;
            return t = this.isHorizontal() ? this.grid.getX() + (e - this._min) / (this._max - this._min) * this.grid.getWidth() : this.grid.getYend() - (e - this._min) / (this._max - this._min) * this.grid.getHeight()
        }, getCoordSize: function (e) {
            return Math.abs(this.isHorizontal() ? e / (this._max - this._min) * this.grid.getWidth() : e / (this._max - this._min) * this.grid.getHeight())
        }, getValueFromCoord: function (e) {
            var t;
            return this.isHorizontal() ? (e = e < this.grid.getX() ? this.grid.getX() : e, e = e > this.grid.getXend() ? this.grid.getXend() : e, t = this._min + (e - this.grid.getX()) / this.grid.getWidth() * (this._max - this._min)) : (e = e < this.grid.getY() ? this.grid.getY() : e, e = e > this.grid.getYend() ? this.grid.getYend() : e, t = this._max - (e - this.grid.getY()) / this.grid.getHeight() * (this._max - this._min)), t.toFixed(2) - 0
        }, isMaindAxis: function (e) {
            for (var t = 0, i = this._valueList.length; i > t; t++)if (this._valueList[t] === e)return !0;
            return !1
        }
    }, l.inherits(t, i), e("../component").define("valueAxis", t), t
}), define("echarts/util/date", [], function () {
    function e(e, t, i) {
        i = i > 1 ? i : 2;
        for (var n, a, o, r, s = 0, l = d.length; l > s; s++)if (n = d[s].value, a = Math.ceil(t / n) * n - Math.floor(e / n) * n, Math.round(a / n) <= 1.2 * i) {
            o = d[s].formatter, r = d[s].value;
            break
        }
        return null == o && (o = "year", n = 317088e5, a = Math.ceil(t / n) * n - Math.floor(e / n) * n, r = Math.round(a / (i - 1) / n) * n), {
            formatter: o,
            gapValue: r
        }
    }

    function t(e) {
        return 10 > e ? "0" + e : e
    }

    function i(e, i) {
        ("week" == e || "month" == e || "quarter" == e || "half-year" == e || "year" == e) && (e = "MM - dd\nyyyy");
        var n = h(i), a = n.getFullYear(), o = n.getMonth() + 1, r = n.getDate(), s = n.getHours(), l = n.getMinutes(), d = n.getSeconds();
        return e = e.replace("MM", t(o)), e = e.toLowerCase(), e = e.replace("yyyy", a), e = e.replace("yy", a % 100), e = e.replace("dd", t(r)), e = e.replace("d", r), e = e.replace("hh", t(s)), e = e.replace("h", s), e = e.replace("mm", t(l)), e = e.replace("m", l), e = e.replace("ss", t(d)), e = e.replace("s", d)
    }

    function n(e) {
        return e = h(e), e.setDate(e.getDate() + 8 - e.getDay()), e
    }

    function a(e, t, i) {
        return e = h(e), e.setMonth(Math.ceil((e.getMonth() + 1) / i) * i), e.setDate(t), e
    }

    function o(e, t) {
        return a(e, t, 1)
    }

    function r(e, t) {
        return a(e, t, 3)
    }

    function s(e, t) {
        return a(e, t, 6)
    }

    function l(e, t) {
        return a(e, t, 12)
    }

    function h(e) {
        return e instanceof Date ? e : new Date("string" == typeof e ? e.replace(/-/g, "/") : e)
    }

    var d = [{formatter: "hh : mm : ss", value: 1e3}, {
        formatter: "hh : mm : ss",
        value: 5e3
    }, {formatter: "hh : mm : ss", value: 1e4}, {formatter: "hh : mm : ss", value: 15e3}, {
        formatter: "hh : mm : ss",
        value: 3e4
    }, {formatter: "hh : mm\nMM - dd", value: 6e4}, {
        formatter: "hh : mm\nMM - dd",
        value: 3e5
    }, {formatter: "hh : mm\nMM - dd", value: 6e5}, {
        formatter: "hh : mm\nMM - dd",
        value: 9e5
    }, {formatter: "hh : mm\nMM - dd", value: 18e5}, {
        formatter: "hh : mm\nMM - dd",
        value: 36e5
    }, {formatter: "hh : mm\nMM - dd", value: 72e5}, {
        formatter: "hh : mm\nMM - dd",
        value: 216e5
    }, {formatter: "hh : mm\nMM - dd", value: 432e5}, {formatter: "MM - dd\nyyyy", value: 864e5}, {
        formatter: "week",
        value: 6048e5
    }, {formatter: "month", value: 26784e5}, {formatter: "quarter", value: 8208e6}, {
        formatter: "half-year",
        value: 16416e6
    }, {formatter: "year", value: 32832e6}];
    return {
        getAutoFormatter: e,
        getNewDate: h,
        format: i,
        nextMonday: n,
        nextNthPerNmonth: a,
        nextNthOnMonth: o,
        nextNthOnQuarterYear: r,
        nextNthOnHalfYear: s,
        nextNthOnYear: l
    }
}), define("echarts/util/smartSteps", [], function () {
    function e(e) {
        return W.log(K(e)) / W.LN10
    }

    function t(e) {
        return W.pow(10, e)
    }

    function i(e) {
        return e === X(e)
    }

    function n(e, t, n, a) {
        f = a || {}, b = f.steps || L, _ = f.secs || v, n = w(+n || 0) % 99, e = +e || 0, t = +t || 0, x = k = 0, "min" in f && (e = +f.min || 0, x = 1), "max" in f && (t = +f.max || 0, k = 1), e > t && (t = [e, e = t][0]);
        var o = t - e;
        if (x && k)return g(e, t, n);
        if ((n || 5) > o) {
            if (i(e) && i(t))return p(e, t, n);
            if (0 === o)return u(e, t, n)
        }
        return h(e, t, n)
    }

    function a(e, i, n, a) {
        a = a || 0;
        var s = o((i - e) / n, -1), l = o(e, -1, 1), h = o(i, -1), d = W.min(s.e, l.e, h.e);
        r(s, {c: 0, e: d}), r(l, s, 1), r(h, s), a += d, e = l.c, i = h.c;
        for (var m = (i - e) / n, c = t(a), p = 0, u = [], V = n + 1; V--;)u[V] = (e + m * V) * c;
        if (0 > a) {
            p = U(c), m = +(m * c).toFixed(p), e = +(e * c).toFixed(p), i = +(i * c).toFixed(p);
            for (var V = u.length; V--;)u[V] = u[V].toFixed(p), 0 === +u[V] && (u[V] = "0")
        } else e *= c, i *= c, m *= c;
        return _ = 0, b = 0, f = 0, {min: e, max: i, secs: n, step: m, fix: p, exp: a, pnts: u}
    }

    function o(n, a, o) {
        a = w(a % 10) || 2, 0 > a && (i(n) ? a = ("" + K(n)).replace(/0+$/, "").length || 1 : (n = n.toFixed(15).replace(/0+$/, ""), a = n.replace(".", "").replace(/^[-0]+/, "").length, n = +n));
        var r = X(e(n)) - a + 1, s = +(n * t(-r)).toFixed(15) || 0;
        return s = o ? X(s) : I(s), !s && (r = 0), ("" + K(s)).length > a && (r += 1, s /= 10), {c: s, e: r}
    }

    function r(e, i, n) {
        var a = i.e - e.e;
        a && (e.e += a, e.c *= t(-a), e.c = n ? X(e.c) : I(e.c))
    }

    function s(e, t, i) {
        e.e < t.e ? r(t, e, i) : r(e, t, i)
    }

    function l(e, t) {
        t = t || L, e = o(e);
        for (var i = e.c, n = 0; i > t[n];)n++;
        if (!t[n])for (i /= 10, e.e += 1, n = 0; i > t[n];)n++;
        return e.c = t[n], e
    }

    function h(e, t, n) {
        var s, h = n || +_.slice(-1), u = l((t - e) / h, b), U = o(t - e), g = o(e, -1, 1), f = o(t, -1);
        if (r(U, u), r(g, u, 1), r(f, u), n ? s = m(g, f, h) : h = d(g, f), i(e) && i(t) && e * t >= 0) {
            if (h > t - e)return p(e, t, h);
            h = c(e, t, n, g, f, h)
        }
        var L = V(e, t, g.c, f.c);
        return g.c = L[0], f.c = L[1], (x || k) && y(e, t, g, f), a(g.c, f.c, h, f.e)
    }

    function d(e, i) {
        for (var n, a, o, r, s = [], h = _.length; h--;)n = _[h], a = l((i.c - e.c) / n, b), a = a.c * t(a.e), o = X(e.c / a) * a, r = I(i.c / a) * a, s[h] = {
            min: o,
            max: r,
            step: a,
            span: r - o
        };
        return s.sort(function (e, t) {
            return e.span - t.span
        }), s = s[0], n = s.span / s.step, e.c = s.min, i.c = s.max, 3 > n ? 2 * n : n
    }

    function m(e, i, n) {
        for (var a, o, r = i.c, s = (i.c - e.c) / n - 1; r > e.c;)s = l(s + 1, b), s = s.c * t(s.e), a = s * n, o = I(i.c / s) * s, r = o - a;
        var h = e.c - r, d = o - i.c, m = h - d;
        return m >= 2 * s && (m = X(m / s) * s, r += m, o += m), e.c = r, i.c = o, s
    }

    function c(e, n, a, o, r, s) {
        var l = r.c - o.c, h = l / s * t(r.e);
        if (!i(h) && (h = X(h), l = h * s, n - e > l && (h += 1, l = h * s, !a && h * (s - 1) >= n - e && (s -= 1, l = h * s)), l >= n - e)) {
            var d = l - (n - e);
            o.c = w(e - d / 2), r.c = w(n + d / 2), o.e = 0, r.e = 0
        }
        return s
    }

    function p(e, t, i) {
        if (i = i || 5, x)t = e + i; else if (k)e = t - i; else {
            var n = i - (t - e), o = w(e - n / 2), r = w(t + n / 2), s = V(e, t, o, r);
            e = s[0], t = s[1]
        }
        return a(e, t, i)
    }

    function u(e, t, i) {
        i = i || 5;
        var n = W.min(K(t / i), i) / 2.1;
        return x ? t = e + n : k ? e = t - n : (e -= n, t += n), h(e, t, i)
    }

    function V(e, t, i, n) {
        return e >= 0 && 0 > i ? (n -= i, i = 0) : 0 >= t && n > 0 && (i -= n, n = 0), [i, n]
    }

    function U(e) {
        return e = (+e).toFixed(15).split("."), e.pop().replace(/0+$/, "").length
    }

    function y(e, t, i, n) {
        if (x) {
            var a = o(e, 4, 1);
            i.e - a.e > 6 && (a = {c: 0, e: i.e}), s(i, a), s(n, a), n.c += a.c - i.c, i.c = a.c
        } else if (k) {
            var r = o(t, 4);
            n.e - r.e > 6 && (r = {c: 0, e: n.e}), s(i, r), s(n, r), i.c += r.c - n.c, n.c = r.c
        }
    }

    function g(e, t, i) {
        var n = i ? [i] : _, s = t - e;
        if (0 === s)return t = o(t, 3), i = n[0], t.c = w(t.c + i / 2), a(t.c - i, t.c, i, t.e);
        K(t / s) < 1e-6 && (t = 0), K(e / s) < 1e-6 && (e = 0);
        var l, h, d, m = [[5, 10], [10, 2], [50, 10], [100, 2]], c = [], p = [], u = o(t - e, 3), V = o(e, -1, 1), U = o(t, -1);
        r(V, u, 1), r(U, u), s = U.c - V.c, u.c = s;
        for (var y = n.length; y--;) {
            i = n[y], l = I(s / i), h = l * i - s, d = 3 * (h + 3), d += 2 * (i - n[0] + 2), i % 5 === 0 && (d -= 10);
            for (var g = m.length; g--;)l % m[g][0] === 0 && (d /= m[g][1]);
            p[y] = [i, l, h, d].join(), c[y] = {secs: i, step: l, delta: h, score: d}
        }
        return c.sort(function (e, t) {
            return e.score - t.score
        }), c = c[0], V.c = w(V.c - c.delta / 2), U.c = w(U.c + c.delta / 2), a(V.c, U.c, c.secs, u.e)
    }

    var f, b, _, x, k, L = [10, 25, 50], v = [4, 5, 6], W = Math, w = W.round, X = W.floor, I = W.ceil, K = W.abs;
    return n
});