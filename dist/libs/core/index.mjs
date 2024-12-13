import { jsx as ir, Fragment as fn } from "react/jsx-runtime";
import * as O from "react";
import or, { useRef as xr, useEffect as ht } from "react";
import "react-dom";
const si = {
  production: !1
};
/**
 * @remix-run/router v1.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function k() {
  return k = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, k.apply(this, arguments);
}
var W;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(W || (W = {}));
const lr = "popstate";
function hn(e) {
  e === void 0 && (e = {});
  let {
    initialEntries: t = ["/"],
    initialIndex: r,
    v5Compat: n = !1
  } = e, a;
  a = t.map((g, w) => m(g, typeof g == "string" ? null : g.state, w === 0 ? "default" : void 0));
  let i = s(r ?? a.length - 1), o = W.Pop, c = null;
  function s(g) {
    return Math.min(Math.max(g, 0), a.length - 1);
  }
  function d() {
    return a[i];
  }
  function m(g, w, y) {
    w === void 0 && (w = null);
    let P = He(a ? d().pathname : "/", g, w, y);
    return te(P.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(g)), P;
  }
  function p(g) {
    return typeof g == "string" ? g : pe(g);
  }
  return {
    get index() {
      return i;
    },
    get action() {
      return o;
    },
    get location() {
      return d();
    },
    createHref: p,
    createURL(g) {
      return new URL(p(g), "http://localhost");
    },
    encodeLocation(g) {
      let w = typeof g == "string" ? Re(g) : g;
      return {
        pathname: w.pathname || "",
        search: w.search || "",
        hash: w.hash || ""
      };
    },
    push(g, w) {
      o = W.Push;
      let y = m(g, w);
      i += 1, a.splice(i, a.length, y), n && c && c({
        action: o,
        location: y,
        delta: 1
      });
    },
    replace(g, w) {
      o = W.Replace;
      let y = m(g, w);
      a[i] = y, n && c && c({
        action: o,
        location: y,
        delta: 0
      });
    },
    go(g) {
      o = W.Pop;
      let w = s(i + g), y = a[w];
      i = w, c && c({
        action: o,
        location: y,
        delta: g
      });
    },
    listen(g) {
      return c = g, () => {
        c = null;
      };
    }
  };
}
function mn(e) {
  e === void 0 && (e = {});
  function t(n, a) {
    let {
      pathname: i,
      search: o,
      hash: c
    } = n.location;
    return He(
      "",
      {
        pathname: i,
        search: o,
        hash: c
      },
      // state defaults to `null` because `window.history.state` does
      a.state && a.state.usr || null,
      a.state && a.state.key || "default"
    );
  }
  function r(n, a) {
    return typeof a == "string" ? a : pe(a);
  }
  return vn(t, r, null, e);
}
function T(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function te(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function pn() {
  return Math.random().toString(36).substr(2, 8);
}
function sr(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t
  };
}
function He(e, t, r, n) {
  return r === void 0 && (r = null), k({
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: ""
  }, typeof t == "string" ? Re(t) : t, {
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: t && t.key || n || pn()
  });
}
function pe(e) {
  let {
    pathname: t = "/",
    search: r = "",
    hash: n = ""
  } = e;
  return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n), t;
}
function Re(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substr(n), e = e.substr(0, n)), e && (t.pathname = e);
  }
  return t;
}
function vn(e, t, r, n) {
  n === void 0 && (n = {});
  let {
    window: a = document.defaultView,
    v5Compat: i = !1
  } = n, o = a.history, c = W.Pop, s = null, d = m();
  d == null && (d = 0, o.replaceState(k({}, o.state, {
    idx: d
  }), ""));
  function m() {
    return (o.state || {
      idx: null
    }).idx;
  }
  function p() {
    c = W.Pop;
    let P = m(), I = P == null ? null : P - d;
    d = P, s && s({
      action: c,
      location: y.location,
      delta: I
    });
  }
  function E(P, I) {
    c = W.Push;
    let b = He(y.location, P, I);
    d = m() + 1;
    let M = sr(b, d), _ = y.createHref(b);
    try {
      o.pushState(M, "", _);
    } catch (Y) {
      if (Y instanceof DOMException && Y.name === "DataCloneError")
        throw Y;
      a.location.assign(_);
    }
    i && s && s({
      action: c,
      location: y.location,
      delta: 1
    });
  }
  function g(P, I) {
    c = W.Replace;
    let b = He(y.location, P, I);
    d = m();
    let M = sr(b, d), _ = y.createHref(b);
    o.replaceState(M, "", _), i && s && s({
      action: c,
      location: y.location,
      delta: 0
    });
  }
  function w(P) {
    let I = a.location.origin !== "null" ? a.location.origin : a.location.href, b = typeof P == "string" ? P : pe(P);
    return b = b.replace(/ $/, "%20"), T(I, "No window.location.(origin|href) available to create URL for href: " + b), new URL(b, I);
  }
  let y = {
    get action() {
      return c;
    },
    get location() {
      return e(a, o);
    },
    listen(P) {
      if (s)
        throw new Error("A history only accepts one active listener");
      return a.addEventListener(lr, p), s = P, () => {
        a.removeEventListener(lr, p), s = null;
      };
    },
    createHref(P) {
      return t(a, P);
    },
    createURL: w,
    encodeLocation(P) {
      let I = w(P);
      return {
        pathname: I.pathname,
        search: I.search,
        hash: I.hash
      };
    },
    push: E,
    replace: g,
    go(P) {
      return o.go(P);
    }
  };
  return y;
}
var B;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(B || (B = {}));
const gn = /* @__PURE__ */ new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function yn(e) {
  return e.index === !0;
}
function mt(e, t, r, n) {
  return r === void 0 && (r = []), n === void 0 && (n = {}), e.map((a, i) => {
    let o = [...r, String(i)], c = typeof a.id == "string" ? a.id : o.join("-");
    if (T(a.index !== !0 || !a.children, "Cannot specify children on an index route"), T(!n[c], 'Found a route id collision on id "' + c + `".  Route id's must be globally unique within Data Router usages`), yn(a)) {
      let s = k({}, a, t(a), {
        id: c
      });
      return n[c] = s, s;
    } else {
      let s = k({}, a, t(a), {
        id: c,
        children: void 0
      });
      return n[c] = s, a.children && (s.children = mt(a.children, t, o, n)), s;
    }
  });
}
function Ve(e, t, r) {
  return r === void 0 && (r = "/"), ct(e, t, r, !1);
}
function ct(e, t, r, n) {
  let a = typeof t == "string" ? Re(t) : t, i = le(a.pathname || "/", r);
  if (i == null)
    return null;
  let o = Dr(e);
  bn(o);
  let c = null;
  for (let s = 0; c == null && s < o.length; ++s) {
    let d = Cn(i);
    c = On(o[s], d, n);
  }
  return c;
}
function En(e, t) {
  let {
    route: r,
    pathname: n,
    params: a
  } = e;
  return {
    id: r.id,
    pathname: n,
    params: a,
    data: t[r.id],
    handle: r.handle
  };
}
function Dr(e, t, r, n) {
  t === void 0 && (t = []), r === void 0 && (r = []), n === void 0 && (n = "");
  let a = (i, o, c) => {
    let s = {
      relativePath: c === void 0 ? i.path || "" : c,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: o,
      route: i
    };
    s.relativePath.startsWith("/") && (T(s.relativePath.startsWith(n), 'Absolute route path "' + s.relativePath + '" nested under path ' + ('"' + n + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), s.relativePath = s.relativePath.slice(n.length));
    let d = be([n, s.relativePath]), m = r.concat(s);
    i.children && i.children.length > 0 && (T(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      i.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + d + '".')
    ), Dr(i.children, t, m, d)), !(i.path == null && !i.index) && t.push({
      path: d,
      score: Ln(d, i.index),
      routesMeta: m
    });
  };
  return e.forEach((i, o) => {
    var c;
    if (i.path === "" || !((c = i.path) != null && c.includes("?")))
      a(i, o);
    else
      for (let s of Lr(i.path))
        a(i, o, s);
  }), t;
}
function Lr(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...n] = t, a = r.endsWith("?"), i = r.replace(/\?$/, "");
  if (n.length === 0)
    return a ? [i, ""] : [i];
  let o = Lr(n.join("/")), c = [];
  return c.push(...o.map((s) => s === "" ? i : [i, s].join("/"))), a && c.push(...o), c.map((s) => e.startsWith("/") && s === "" ? "/" : s);
}
function bn(e) {
  e.sort((t, r) => t.score !== r.score ? r.score - t.score : Pn(t.routesMeta.map((n) => n.childrenIndex), r.routesMeta.map((n) => n.childrenIndex)));
}
const wn = /^:[\w-]+$/, Rn = 3, Sn = 2, Nn = 1, xn = 10, Dn = -2, ur = (e) => e === "*";
function Ln(e, t) {
  let r = e.split("/"), n = r.length;
  return r.some(ur) && (n += Dn), t && (n += Sn), r.filter((a) => !ur(a)).reduce((a, i) => a + (wn.test(i) ? Rn : i === "" ? Nn : xn), n);
}
function Pn(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, a) => n === t[a]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - t[t.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function On(e, t, r) {
  r === void 0 && (r = !1);
  let {
    routesMeta: n
  } = e, a = {}, i = "/", o = [];
  for (let c = 0; c < n.length; ++c) {
    let s = n[c], d = c === n.length - 1, m = i === "/" ? t : t.slice(i.length) || "/", p = pt({
      path: s.relativePath,
      caseSensitive: s.caseSensitive,
      end: d
    }, m), E = s.route;
    if (!p && d && r && !n[n.length - 1].route.index && (p = pt({
      path: s.relativePath,
      caseSensitive: s.caseSensitive,
      end: !1
    }, m)), !p)
      return null;
    Object.assign(a, p.params), o.push({
      // TODO: Can this as be avoided?
      params: a,
      pathname: be([i, p.pathname]),
      pathnameBase: An(be([i, p.pathnameBase])),
      route: E
    }), p.pathnameBase !== "/" && (i = be([i, p.pathnameBase]));
  }
  return o;
}
function pt(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [r, n] = Tn(e.path, e.caseSensitive, e.end), a = t.match(r);
  if (!a) return null;
  let i = a[0], o = i.replace(/(.)\/+$/, "$1"), c = a.slice(1);
  return {
    params: n.reduce((d, m, p) => {
      let {
        paramName: E,
        isOptional: g
      } = m;
      if (E === "*") {
        let y = c[p] || "";
        o = i.slice(0, i.length - y.length).replace(/(.)\/+$/, "$1");
      }
      const w = c[p];
      return g && !w ? d[E] = void 0 : d[E] = (w || "").replace(/%2F/g, "/"), d;
    }, {}),
    pathname: i,
    pathnameBase: o,
    pattern: e
  };
}
function Tn(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !0), te(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let n = [], a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (o, c, s) => (n.push({
    paramName: c,
    isOptional: s != null
  }), s ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (n.push({
    paramName: "*"
  }), a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? a += "\\/*$" : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"), [new RegExp(a, t ? void 0 : "i"), n];
}
function Cn(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return te(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e;
  }
}
function le(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function _n(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: r,
    search: n = "",
    hash: a = ""
  } = typeof e == "string" ? Re(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : Mn(r, t) : t,
    search: In(n),
    hash: Un(a)
  };
}
function Mn(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((a) => {
    a === ".." ? r.length > 1 && r.pop() : a !== "." && r.push(a);
  }), r.length > 1 ? r.join("/") : "/";
}
function Pt(e, t, r, n) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Pr(e) {
  return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0);
}
function Et(e, t) {
  let r = Pr(e);
  return t ? r.map((n, a) => a === r.length - 1 ? n.pathname : n.pathnameBase) : r.map((n) => n.pathnameBase);
}
function bt(e, t, r, n) {
  n === void 0 && (n = !1);
  let a;
  typeof e == "string" ? a = Re(e) : (a = k({}, e), T(!a.pathname || !a.pathname.includes("?"), Pt("?", "pathname", "search", a)), T(!a.pathname || !a.pathname.includes("#"), Pt("#", "pathname", "hash", a)), T(!a.search || !a.search.includes("#"), Pt("#", "search", "hash", a)));
  let i = e === "" || a.pathname === "", o = i ? "/" : a.pathname, c;
  if (o == null)
    c = r;
  else {
    let p = t.length - 1;
    if (!n && o.startsWith("..")) {
      let E = o.split("/");
      for (; E[0] === ".."; )
        E.shift(), p -= 1;
      a.pathname = E.join("/");
    }
    c = p >= 0 ? t[p] : "/";
  }
  let s = _n(a, c), d = o && o !== "/" && o.endsWith("/"), m = (i || o === ".") && r.endsWith("/");
  return !s.pathname.endsWith("/") && (d || m) && (s.pathname += "/"), s;
}
const be = (e) => e.join("/").replace(/\/\/+/g, "/"), An = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), In = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Un = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
class vt {
  constructor(t, r, n, a) {
    a === void 0 && (a = !1), this.status = t, this.statusText = r || "", this.internal = a, n instanceof Error ? (this.data = n.toString(), this.error = n) : this.data = n;
  }
}
function jt(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
const Or = ["post", "put", "patch", "delete"], Fn = new Set(Or), jn = ["get", ...Or], Vn = new Set(jn), Bn = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), Hn = /* @__PURE__ */ new Set([307, 308]), Ot = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, kn = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Je = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, Vt = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, zn = (e) => ({
  hasErrorBoundary: !!e.hasErrorBoundary
}), Tr = "remix-router-transitions";
function Cr(e) {
  const t = e.window ? e.window : typeof window < "u" ? window : void 0, r = typeof t < "u" && typeof t.document < "u" && typeof t.document.createElement < "u", n = !r;
  T(e.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let a;
  if (e.mapRouteProperties)
    a = e.mapRouteProperties;
  else if (e.detectErrorBoundary) {
    let l = e.detectErrorBoundary;
    a = (u) => ({
      hasErrorBoundary: l(u)
    });
  } else
    a = zn;
  let i = {}, o = mt(e.routes, a, void 0, i), c, s = e.basename || "/", d = e.dataStrategy || Kn, m = e.patchRoutesOnNavigation, p = k({
    v7_fetcherPersist: !1,
    v7_normalizeFormMethod: !1,
    v7_partialHydration: !1,
    v7_prependBasename: !1,
    v7_relativeSplatPath: !1,
    v7_skipActionErrorRevalidation: !1
  }, e.future), E = null, g = /* @__PURE__ */ new Set(), w = null, y = null, P = null, I = e.hydrationData != null, b = Ve(o, e.history.location, s), M = null;
  if (b == null && !m) {
    let l = re(404, {
      pathname: e.history.location.pathname
    }), {
      matches: u,
      route: f
    } = br(o);
    b = u, M = {
      [f.id]: l
    };
  }
  b && !e.hydrationData && at(b, o, e.history.location.pathname).active && (b = null);
  let _;
  if (b)
    if (b.some((l) => l.route.lazy))
      _ = !1;
    else if (!b.some((l) => l.route.loader))
      _ = !0;
    else if (p.v7_partialHydration) {
      let l = e.hydrationData ? e.hydrationData.loaderData : null, u = e.hydrationData ? e.hydrationData.errors : null;
      if (u) {
        let f = b.findIndex((v) => u[v.route.id] !== void 0);
        _ = b.slice(0, f + 1).every((v) => !It(v.route, l, u));
      } else
        _ = b.every((f) => !It(f.route, l, u));
    } else
      _ = e.hydrationData != null;
  else if (_ = !1, b = [], p.v7_partialHydration) {
    let l = at(null, o, e.history.location.pathname);
    l.active && l.matches && (b = l.matches);
  }
  let Y, h = {
    historyAction: e.history.action,
    location: e.history.location,
    matches: b,
    initialized: _,
    navigation: Ot,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: e.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: e.hydrationData && e.hydrationData.loaderData || {},
    actionData: e.hydrationData && e.hydrationData.actionData || null,
    errors: e.hydrationData && e.hydrationData.errors || M,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, X = W.Pop, z = !1, V, J = !1, q = /* @__PURE__ */ new Map(), ue = null, ae = !1, ce = !1, Ze = [], qe = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Map(), et = 0, ke = -1, _e = /* @__PURE__ */ new Map(), de = /* @__PURE__ */ new Set(), Me = /* @__PURE__ */ new Map(), ze = /* @__PURE__ */ new Map(), fe = /* @__PURE__ */ new Set(), Se = /* @__PURE__ */ new Map(), Ne = /* @__PURE__ */ new Map(), tt;
  function Jr() {
    if (E = e.history.listen((l) => {
      let {
        action: u,
        location: f,
        delta: v
      } = l;
      if (tt) {
        tt(), tt = void 0;
        return;
      }
      te(Ne.size === 0 || v != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
      let R = tr({
        currentLocation: h.location,
        nextLocation: f,
        historyAction: u
      });
      if (R && v != null) {
        let D = new Promise((C) => {
          tt = C;
        });
        e.history.go(v * -1), nt(R, {
          state: "blocked",
          location: f,
          proceed() {
            nt(R, {
              state: "proceeding",
              proceed: void 0,
              reset: void 0,
              location: f
            }), D.then(() => e.history.go(v));
          },
          reset() {
            let C = new Map(h.blockers);
            C.set(R, Je), ee({
              blockers: C
            });
          }
        });
        return;
      }
      return xe(u, f);
    }), r) {
      la(t, q);
      let l = () => sa(t, q);
      t.addEventListener("pagehide", l), ue = () => t.removeEventListener("pagehide", l);
    }
    return h.initialized || xe(W.Pop, h.location, {
      initialHydration: !0
    }), Y;
  }
  function Yr() {
    E && E(), ue && ue(), g.clear(), V && V.abort(), h.fetchers.forEach((l, u) => rt(u)), h.blockers.forEach((l, u) => er(u));
  }
  function Xr(l) {
    return g.add(l), () => g.delete(l);
  }
  function ee(l, u) {
    u === void 0 && (u = {}), h = k({}, h, l);
    let f = [], v = [];
    p.v7_fetcherPersist && h.fetchers.forEach((R, D) => {
      R.state === "idle" && (fe.has(D) ? v.push(D) : f.push(D));
    }), [...g].forEach((R) => R(h, {
      deletedFetchers: v,
      viewTransitionOpts: u.viewTransitionOpts,
      flushSync: u.flushSync === !0
    })), p.v7_fetcherPersist && (f.forEach((R) => h.fetchers.delete(R)), v.forEach((R) => rt(R)));
  }
  function Ae(l, u, f) {
    var v, R;
    let {
      flushSync: D
    } = f === void 0 ? {} : f, C = h.actionData != null && h.navigation.formMethod != null && ie(h.navigation.formMethod) && h.navigation.state === "loading" && ((v = l.state) == null ? void 0 : v._isRedirect) !== !0, N;
    u.actionData ? Object.keys(u.actionData).length > 0 ? N = u.actionData : N = null : C ? N = h.actionData : N = null;
    let x = u.loaderData ? yr(h.loaderData, u.loaderData, u.matches || [], u.errors) : h.loaderData, S = h.blockers;
    S.size > 0 && (S = new Map(S), S.forEach((U, Z) => S.set(Z, Je)));
    let L = z === !0 || h.navigation.formMethod != null && ie(h.navigation.formMethod) && ((R = l.state) == null ? void 0 : R._isRedirect) !== !0;
    c && (o = c, c = void 0), ae || X === W.Pop || (X === W.Push ? e.history.push(l, l.state) : X === W.Replace && e.history.replace(l, l.state));
    let A;
    if (X === W.Pop) {
      let U = q.get(h.location.pathname);
      U && U.has(l.pathname) ? A = {
        currentLocation: h.location,
        nextLocation: l
      } : q.has(l.pathname) && (A = {
        currentLocation: l,
        nextLocation: h.location
      });
    } else if (J) {
      let U = q.get(h.location.pathname);
      U ? U.add(l.pathname) : (U = /* @__PURE__ */ new Set([l.pathname]), q.set(h.location.pathname, U)), A = {
        currentLocation: h.location,
        nextLocation: l
      };
    }
    ee(k({}, u, {
      actionData: N,
      loaderData: x,
      historyAction: X,
      location: l,
      initialized: !0,
      navigation: Ot,
      revalidation: "idle",
      restoreScrollPosition: nr(l, u.matches || h.matches),
      preventScrollReset: L,
      blockers: S
    }), {
      viewTransitionOpts: A,
      flushSync: D === !0
    }), X = W.Pop, z = !1, J = !1, ae = !1, ce = !1, Ze = [];
  }
  async function Kt(l, u) {
    if (typeof l == "number") {
      e.history.go(l);
      return;
    }
    let f = At(h.location, h.matches, s, p.v7_prependBasename, l, p.v7_relativeSplatPath, u == null ? void 0 : u.fromRouteId, u == null ? void 0 : u.relative), {
      path: v,
      submission: R,
      error: D
    } = cr(p.v7_normalizeFormMethod, !1, f, u), C = h.location, N = He(h.location, v, u && u.state);
    N = k({}, N, e.history.encodeLocation(N));
    let x = u && u.replace != null ? u.replace : void 0, S = W.Push;
    x === !0 ? S = W.Replace : x === !1 || R != null && ie(R.formMethod) && R.formAction === h.location.pathname + h.location.search && (S = W.Replace);
    let L = u && "preventScrollReset" in u ? u.preventScrollReset === !0 : void 0, A = (u && u.flushSync) === !0, U = tr({
      currentLocation: C,
      nextLocation: N,
      historyAction: S
    });
    if (U) {
      nt(U, {
        state: "blocked",
        location: N,
        proceed() {
          nt(U, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: N
          }), Kt(l, u);
        },
        reset() {
          let Z = new Map(h.blockers);
          Z.set(U, Je), ee({
            blockers: Z
          });
        }
      });
      return;
    }
    return await xe(S, N, {
      submission: R,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: D,
      preventScrollReset: L,
      replace: u && u.replace,
      enableViewTransition: u && u.viewTransition,
      flushSync: A
    });
  }
  function Qr() {
    if (Nt(), ee({
      revalidation: "loading"
    }), h.navigation.state !== "submitting") {
      if (h.navigation.state === "idle") {
        xe(h.historyAction, h.location, {
          startUninterruptedRevalidation: !0
        });
        return;
      }
      xe(X || h.historyAction, h.navigation.location, {
        overrideNavigation: h.navigation,
        // Proxy through any rending view transition
        enableViewTransition: J === !0
      });
    }
  }
  async function xe(l, u, f) {
    V && V.abort(), V = null, X = l, ae = (f && f.startUninterruptedRevalidation) === !0, sn(h.location, h.matches), z = (f && f.preventScrollReset) === !0, J = (f && f.enableViewTransition) === !0;
    let v = c || o, R = f && f.overrideNavigation, D = Ve(v, u, s), C = (f && f.flushSync) === !0, N = at(D, v, u.pathname);
    if (N.active && N.matches && (D = N.matches), !D) {
      let {
        error: H,
        notFoundMatches: j,
        route: $
      } = xt(u.pathname);
      Ae(u, {
        matches: j,
        loaderData: {},
        errors: {
          [$.id]: H
        }
      }, {
        flushSync: C
      });
      return;
    }
    if (h.initialized && !ce && qn(h.location, u) && !(f && f.submission && ie(f.submission.formMethod))) {
      Ae(u, {
        matches: D
      }, {
        flushSync: C
      });
      return;
    }
    V = new AbortController();
    let x = je(e.history, u, V.signal, f && f.submission), S;
    if (f && f.pendingError)
      S = [Pe(D).route.id, {
        type: B.error,
        error: f.pendingError
      }];
    else if (f && f.submission && ie(f.submission.formMethod)) {
      let H = await Zr(x, u, f.submission, D, N.active, {
        replace: f.replace,
        flushSync: C
      });
      if (H.shortCircuited)
        return;
      if (H.pendingActionResult) {
        let [j, $] = H.pendingActionResult;
        if (ne($) && jt($.error) && $.error.status === 404) {
          V = null, Ae(u, {
            matches: H.matches,
            loaderData: {},
            errors: {
              [j]: $.error
            }
          });
          return;
        }
      }
      D = H.matches || D, S = H.pendingActionResult, R = Tt(u, f.submission), C = !1, N.active = !1, x = je(e.history, x.url, x.signal);
    }
    let {
      shortCircuited: L,
      matches: A,
      loaderData: U,
      errors: Z
    } = await qr(x, u, D, N.active, R, f && f.submission, f && f.fetcherSubmission, f && f.replace, f && f.initialHydration === !0, C, S);
    L || (V = null, Ae(u, k({
      matches: A || D
    }, Er(S), {
      loaderData: U,
      errors: Z
    })));
  }
  async function Zr(l, u, f, v, R, D) {
    D === void 0 && (D = {}), Nt();
    let C = ia(u, f);
    if (ee({
      navigation: C
    }, {
      flushSync: D.flushSync === !0
    }), R) {
      let S = await it(v, u.pathname, l.signal);
      if (S.type === "aborted")
        return {
          shortCircuited: !0
        };
      if (S.type === "error") {
        let L = Pe(S.partialMatches).route.id;
        return {
          matches: S.partialMatches,
          pendingActionResult: [L, {
            type: B.error,
            error: S.error
          }]
        };
      } else if (S.matches)
        v = S.matches;
      else {
        let {
          notFoundMatches: L,
          error: A,
          route: U
        } = xt(u.pathname);
        return {
          matches: L,
          pendingActionResult: [U.id, {
            type: B.error,
            error: A
          }]
        };
      }
    }
    let N, x = Xe(v, u);
    if (!x.route.action && !x.route.lazy)
      N = {
        type: B.error,
        error: re(405, {
          method: l.method,
          pathname: u.pathname,
          routeId: x.route.id
        })
      };
    else if (N = (await We("action", h, l, [x], v, null))[x.route.id], l.signal.aborted)
      return {
        shortCircuited: !0
      };
    if (Oe(N)) {
      let S;
      return D && D.replace != null ? S = D.replace : S = pr(N.response.headers.get("Location"), new URL(l.url), s) === h.location.pathname + h.location.search, await De(l, N, !0, {
        submission: f,
        replace: S
      }), {
        shortCircuited: !0
      };
    }
    if (Ee(N))
      throw re(400, {
        type: "defer-action"
      });
    if (ne(N)) {
      let S = Pe(v, x.route.id);
      return (D && D.replace) !== !0 && (X = W.Push), {
        matches: v,
        pendingActionResult: [S.route.id, N]
      };
    }
    return {
      matches: v,
      pendingActionResult: [x.route.id, N]
    };
  }
  async function qr(l, u, f, v, R, D, C, N, x, S, L) {
    let A = R || Tt(u, D), U = D || C || Rr(A), Z = !ae && (!p.v7_partialHydration || !x);
    if (v) {
      if (Z) {
        let G = Jt(L);
        ee(k({
          navigation: A
        }, G !== void 0 ? {
          actionData: G
        } : {}), {
          flushSync: S
        });
      }
      let F = await it(f, u.pathname, l.signal);
      if (F.type === "aborted")
        return {
          shortCircuited: !0
        };
      if (F.type === "error") {
        let G = Pe(F.partialMatches).route.id;
        return {
          matches: F.partialMatches,
          loaderData: {},
          errors: {
            [G]: F.error
          }
        };
      } else if (F.matches)
        f = F.matches;
      else {
        let {
          error: G,
          notFoundMatches: Ue,
          route: Ke
        } = xt(u.pathname);
        return {
          matches: Ue,
          loaderData: {},
          errors: {
            [Ke.id]: G
          }
        };
      }
    }
    let H = c || o, [j, $] = fr(e.history, h, f, U, u, p.v7_partialHydration && x === !0, p.v7_skipActionErrorRevalidation, ce, Ze, qe, fe, Me, de, H, s, L);
    if (Dt((F) => !(f && f.some((G) => G.route.id === F)) || j && j.some((G) => G.route.id === F)), ke = ++et, j.length === 0 && $.length === 0) {
      let F = Zt();
      return Ae(u, k({
        matches: f,
        loaderData: {},
        // Commit pending error if we're short circuiting
        errors: L && ne(L[1]) ? {
          [L[0]]: L[1].error
        } : null
      }, Er(L), F ? {
        fetchers: new Map(h.fetchers)
      } : {}), {
        flushSync: S
      }), {
        shortCircuited: !0
      };
    }
    if (Z) {
      let F = {};
      if (!v) {
        F.navigation = A;
        let G = Jt(L);
        G !== void 0 && (F.actionData = G);
      }
      $.length > 0 && (F.fetchers = en($)), ee(F, {
        flushSync: S
      });
    }
    $.forEach((F) => {
      ge(F.key), F.controller && Q.set(F.key, F.controller);
    });
    let Ie = () => $.forEach((F) => ge(F.key));
    V && V.signal.addEventListener("abort", Ie);
    let {
      loaderResults: $e,
      fetcherResults: me
    } = await Yt(h, f, j, $, l);
    if (l.signal.aborted)
      return {
        shortCircuited: !0
      };
    V && V.signal.removeEventListener("abort", Ie), $.forEach((F) => Q.delete(F.key));
    let oe = st($e);
    if (oe)
      return await De(l, oe.result, !0, {
        replace: N
      }), {
        shortCircuited: !0
      };
    if (oe = st(me), oe)
      return de.add(oe.key), await De(l, oe.result, !0, {
        replace: N
      }), {
        shortCircuited: !0
      };
    let {
      loaderData: Lt,
      errors: Ge
    } = gr(h, f, $e, L, $, me, Se);
    Se.forEach((F, G) => {
      F.subscribe((Ue) => {
        (Ue || F.done) && Se.delete(G);
      });
    }), p.v7_partialHydration && x && h.errors && (Ge = k({}, h.errors, Ge));
    let Le = Zt(), ot = qt(ke), lt = Le || ot || $.length > 0;
    return k({
      matches: f,
      loaderData: Lt,
      errors: Ge
    }, lt ? {
      fetchers: new Map(h.fetchers)
    } : {});
  }
  function Jt(l) {
    if (l && !ne(l[1]))
      return {
        [l[0]]: l[1].data
      };
    if (h.actionData)
      return Object.keys(h.actionData).length === 0 ? null : h.actionData;
  }
  function en(l) {
    return l.forEach((u) => {
      let f = h.fetchers.get(u.key), v = Ye(void 0, f ? f.data : void 0);
      h.fetchers.set(u.key, v);
    }), new Map(h.fetchers);
  }
  function tn(l, u, f, v) {
    if (n)
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
    ge(l);
    let R = (v && v.flushSync) === !0, D = c || o, C = At(h.location, h.matches, s, p.v7_prependBasename, f, p.v7_relativeSplatPath, u, v == null ? void 0 : v.relative), N = Ve(D, C, s), x = at(N, D, C);
    if (x.active && x.matches && (N = x.matches), !N) {
      he(l, u, re(404, {
        pathname: C
      }), {
        flushSync: R
      });
      return;
    }
    let {
      path: S,
      submission: L,
      error: A
    } = cr(p.v7_normalizeFormMethod, !0, C, v);
    if (A) {
      he(l, u, A, {
        flushSync: R
      });
      return;
    }
    let U = Xe(N, S), Z = (v && v.preventScrollReset) === !0;
    if (L && ie(L.formMethod)) {
      rn(l, u, S, U, N, x.active, R, Z, L);
      return;
    }
    Me.set(l, {
      routeId: u,
      path: S
    }), nn(l, u, S, U, N, x.active, R, Z, L);
  }
  async function rn(l, u, f, v, R, D, C, N, x) {
    Nt(), Me.delete(l);
    function S(K) {
      if (!K.route.action && !K.route.lazy) {
        let Fe = re(405, {
          method: x.formMethod,
          pathname: f,
          routeId: u
        });
        return he(l, u, Fe, {
          flushSync: C
        }), !0;
      }
      return !1;
    }
    if (!D && S(v))
      return;
    let L = h.fetchers.get(l);
    ve(l, oa(x, L), {
      flushSync: C
    });
    let A = new AbortController(), U = je(e.history, f, A.signal, x);
    if (D) {
      let K = await it(R, f, U.signal);
      if (K.type === "aborted")
        return;
      if (K.type === "error") {
        he(l, u, K.error, {
          flushSync: C
        });
        return;
      } else if (K.matches) {
        if (R = K.matches, v = Xe(R, f), S(v))
          return;
      } else {
        he(l, u, re(404, {
          pathname: f
        }), {
          flushSync: C
        });
        return;
      }
    }
    Q.set(l, A);
    let Z = et, j = (await We("action", h, U, [v], R, l))[v.route.id];
    if (U.signal.aborted) {
      Q.get(l) === A && Q.delete(l);
      return;
    }
    if (p.v7_fetcherPersist && fe.has(l)) {
      if (Oe(j) || ne(j)) {
        ve(l, ye(void 0));
        return;
      }
    } else {
      if (Oe(j))
        if (Q.delete(l), ke > Z) {
          ve(l, ye(void 0));
          return;
        } else
          return de.add(l), ve(l, Ye(x)), De(U, j, !1, {
            fetcherSubmission: x,
            preventScrollReset: N
          });
      if (ne(j)) {
        he(l, u, j.error);
        return;
      }
    }
    if (Ee(j))
      throw re(400, {
        type: "defer-action"
      });
    let $ = h.navigation.location || h.location, Ie = je(e.history, $, A.signal), $e = c || o, me = h.navigation.state !== "idle" ? Ve($e, h.navigation.location, s) : h.matches;
    T(me, "Didn't find any matches after fetcher action");
    let oe = ++et;
    _e.set(l, oe);
    let Lt = Ye(x, j.data);
    h.fetchers.set(l, Lt);
    let [Ge, Le] = fr(e.history, h, me, x, $, !1, p.v7_skipActionErrorRevalidation, ce, Ze, qe, fe, Me, de, $e, s, [v.route.id, j]);
    Le.filter((K) => K.key !== l).forEach((K) => {
      let Fe = K.key, ar = h.fetchers.get(Fe), dn = Ye(void 0, ar ? ar.data : void 0);
      h.fetchers.set(Fe, dn), ge(Fe), K.controller && Q.set(Fe, K.controller);
    }), ee({
      fetchers: new Map(h.fetchers)
    });
    let ot = () => Le.forEach((K) => ge(K.key));
    A.signal.addEventListener("abort", ot);
    let {
      loaderResults: lt,
      fetcherResults: F
    } = await Yt(h, me, Ge, Le, Ie);
    if (A.signal.aborted)
      return;
    A.signal.removeEventListener("abort", ot), _e.delete(l), Q.delete(l), Le.forEach((K) => Q.delete(K.key));
    let G = st(lt);
    if (G)
      return De(Ie, G.result, !1, {
        preventScrollReset: N
      });
    if (G = st(F), G)
      return de.add(G.key), De(Ie, G.result, !1, {
        preventScrollReset: N
      });
    let {
      loaderData: Ue,
      errors: Ke
    } = gr(h, me, lt, void 0, Le, F, Se);
    if (h.fetchers.has(l)) {
      let K = ye(j.data);
      h.fetchers.set(l, K);
    }
    qt(oe), h.navigation.state === "loading" && oe > ke ? (T(X, "Expected pending action"), V && V.abort(), Ae(h.navigation.location, {
      matches: me,
      loaderData: Ue,
      errors: Ke,
      fetchers: new Map(h.fetchers)
    })) : (ee({
      errors: Ke,
      loaderData: yr(h.loaderData, Ue, me, Ke),
      fetchers: new Map(h.fetchers)
    }), ce = !1);
  }
  async function nn(l, u, f, v, R, D, C, N, x) {
    let S = h.fetchers.get(l);
    ve(l, Ye(x, S ? S.data : void 0), {
      flushSync: C
    });
    let L = new AbortController(), A = je(e.history, f, L.signal);
    if (D) {
      let j = await it(R, f, A.signal);
      if (j.type === "aborted")
        return;
      if (j.type === "error") {
        he(l, u, j.error, {
          flushSync: C
        });
        return;
      } else if (j.matches)
        R = j.matches, v = Xe(R, f);
      else {
        he(l, u, re(404, {
          pathname: f
        }), {
          flushSync: C
        });
        return;
      }
    }
    Q.set(l, L);
    let U = et, H = (await We("loader", h, A, [v], R, l))[v.route.id];
    if (Ee(H) && (H = await Bt(H, A.signal, !0) || H), Q.get(l) === L && Q.delete(l), !A.signal.aborted) {
      if (fe.has(l)) {
        ve(l, ye(void 0));
        return;
      }
      if (Oe(H))
        if (ke > U) {
          ve(l, ye(void 0));
          return;
        } else {
          de.add(l), await De(A, H, !1, {
            preventScrollReset: N
          });
          return;
        }
      if (ne(H)) {
        he(l, u, H.error);
        return;
      }
      T(!Ee(H), "Unhandled fetcher deferred data"), ve(l, ye(H.data));
    }
  }
  async function De(l, u, f, v) {
    let {
      submission: R,
      fetcherSubmission: D,
      preventScrollReset: C,
      replace: N
    } = v === void 0 ? {} : v;
    u.response.headers.has("X-Remix-Revalidate") && (ce = !0);
    let x = u.response.headers.get("Location");
    T(x, "Expected a Location header on the redirect Response"), x = pr(x, new URL(l.url), s);
    let S = He(h.location, x, {
      _isRedirect: !0
    });
    if (r) {
      let j = !1;
      if (u.response.headers.has("X-Remix-Reload-Document"))
        j = !0;
      else if (Vt.test(x)) {
        const $ = e.history.createURL(x);
        j = // Hard reload if it's an absolute URL to a new origin
        $.origin !== t.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        le($.pathname, s) == null;
      }
      if (j) {
        N ? t.location.replace(x) : t.location.assign(x);
        return;
      }
    }
    V = null;
    let L = N === !0 || u.response.headers.has("X-Remix-Replace") ? W.Replace : W.Push, {
      formMethod: A,
      formAction: U,
      formEncType: Z
    } = h.navigation;
    !R && !D && A && U && Z && (R = Rr(h.navigation));
    let H = R || D;
    if (Hn.has(u.response.status) && H && ie(H.formMethod))
      await xe(L, S, {
        submission: k({}, H, {
          formAction: x
        }),
        // Preserve these flags across redirects
        preventScrollReset: C || z,
        enableViewTransition: f ? J : void 0
      });
    else {
      let j = Tt(S, R);
      await xe(L, S, {
        overrideNavigation: j,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: D,
        // Preserve these flags across redirects
        preventScrollReset: C || z,
        enableViewTransition: f ? J : void 0
      });
    }
  }
  async function We(l, u, f, v, R, D) {
    let C, N = {};
    try {
      C = await Jn(d, l, u, f, v, R, D, i, a);
    } catch (x) {
      return v.forEach((S) => {
        N[S.route.id] = {
          type: B.error,
          error: x
        };
      }), N;
    }
    for (let [x, S] of Object.entries(C))
      if (ea(S)) {
        let L = S.result;
        N[x] = {
          type: B.redirect,
          response: Qn(L, f, x, R, s, p.v7_relativeSplatPath)
        };
      } else
        N[x] = await Xn(S);
    return N;
  }
  async function Yt(l, u, f, v, R) {
    let D = l.matches, C = We("loader", l, R, f, u, null), N = Promise.all(v.map(async (L) => {
      if (L.matches && L.match && L.controller) {
        let U = (await We("loader", l, je(e.history, L.path, L.controller.signal), [L.match], L.matches, L.key))[L.match.route.id];
        return {
          [L.key]: U
        };
      } else
        return Promise.resolve({
          [L.key]: {
            type: B.error,
            error: re(404, {
              pathname: L.path
            })
          }
        });
    })), x = await C, S = (await N).reduce((L, A) => Object.assign(L, A), {});
    return await Promise.all([na(u, x, R.signal, D, l.loaderData), aa(u, S, v)]), {
      loaderResults: x,
      fetcherResults: S
    };
  }
  function Nt() {
    ce = !0, Ze.push(...Dt()), Me.forEach((l, u) => {
      Q.has(u) && qe.add(u), ge(u);
    });
  }
  function ve(l, u, f) {
    f === void 0 && (f = {}), h.fetchers.set(l, u), ee({
      fetchers: new Map(h.fetchers)
    }, {
      flushSync: (f && f.flushSync) === !0
    });
  }
  function he(l, u, f, v) {
    v === void 0 && (v = {});
    let R = Pe(h.matches, u);
    rt(l), ee({
      errors: {
        [R.route.id]: f
      },
      fetchers: new Map(h.fetchers)
    }, {
      flushSync: (v && v.flushSync) === !0
    });
  }
  function Xt(l) {
    return p.v7_fetcherPersist && (ze.set(l, (ze.get(l) || 0) + 1), fe.has(l) && fe.delete(l)), h.fetchers.get(l) || kn;
  }
  function rt(l) {
    let u = h.fetchers.get(l);
    Q.has(l) && !(u && u.state === "loading" && _e.has(l)) && ge(l), Me.delete(l), _e.delete(l), de.delete(l), fe.delete(l), qe.delete(l), h.fetchers.delete(l);
  }
  function an(l) {
    if (p.v7_fetcherPersist) {
      let u = (ze.get(l) || 0) - 1;
      u <= 0 ? (ze.delete(l), fe.add(l)) : ze.set(l, u);
    } else
      rt(l);
    ee({
      fetchers: new Map(h.fetchers)
    });
  }
  function ge(l) {
    let u = Q.get(l);
    u && (u.abort(), Q.delete(l));
  }
  function Qt(l) {
    for (let u of l) {
      let f = Xt(u), v = ye(f.data);
      h.fetchers.set(u, v);
    }
  }
  function Zt() {
    let l = [], u = !1;
    for (let f of de) {
      let v = h.fetchers.get(f);
      T(v, "Expected fetcher: " + f), v.state === "loading" && (de.delete(f), l.push(f), u = !0);
    }
    return Qt(l), u;
  }
  function qt(l) {
    let u = [];
    for (let [f, v] of _e)
      if (v < l) {
        let R = h.fetchers.get(f);
        T(R, "Expected fetcher: " + f), R.state === "loading" && (ge(f), _e.delete(f), u.push(f));
      }
    return Qt(u), u.length > 0;
  }
  function on(l, u) {
    let f = h.blockers.get(l) || Je;
    return Ne.get(l) !== u && Ne.set(l, u), f;
  }
  function er(l) {
    h.blockers.delete(l), Ne.delete(l);
  }
  function nt(l, u) {
    let f = h.blockers.get(l) || Je;
    T(f.state === "unblocked" && u.state === "blocked" || f.state === "blocked" && u.state === "blocked" || f.state === "blocked" && u.state === "proceeding" || f.state === "blocked" && u.state === "unblocked" || f.state === "proceeding" && u.state === "unblocked", "Invalid blocker state transition: " + f.state + " -> " + u.state);
    let v = new Map(h.blockers);
    v.set(l, u), ee({
      blockers: v
    });
  }
  function tr(l) {
    let {
      currentLocation: u,
      nextLocation: f,
      historyAction: v
    } = l;
    if (Ne.size === 0)
      return;
    Ne.size > 1 && te(!1, "A router only supports one blocker at a time");
    let R = Array.from(Ne.entries()), [D, C] = R[R.length - 1], N = h.blockers.get(D);
    if (!(N && N.state === "proceeding") && C({
      currentLocation: u,
      nextLocation: f,
      historyAction: v
    }))
      return D;
  }
  function xt(l) {
    let u = re(404, {
      pathname: l
    }), f = c || o, {
      matches: v,
      route: R
    } = br(f);
    return Dt(), {
      notFoundMatches: v,
      route: R,
      error: u
    };
  }
  function Dt(l) {
    let u = [];
    return Se.forEach((f, v) => {
      (!l || l(v)) && (f.cancel(), u.push(v), Se.delete(v));
    }), u;
  }
  function ln(l, u, f) {
    if (w = l, P = u, y = f || null, !I && h.navigation === Ot) {
      I = !0;
      let v = nr(h.location, h.matches);
      v != null && ee({
        restoreScrollPosition: v
      });
    }
    return () => {
      w = null, P = null, y = null;
    };
  }
  function rr(l, u) {
    return y && y(l, u.map((v) => En(v, h.loaderData))) || l.key;
  }
  function sn(l, u) {
    if (w && P) {
      let f = rr(l, u);
      w[f] = P();
    }
  }
  function nr(l, u) {
    if (w) {
      let f = rr(l, u), v = w[f];
      if (typeof v == "number")
        return v;
    }
    return null;
  }
  function at(l, u, f) {
    if (m)
      if (l) {
        if (Object.keys(l[0].params).length > 0)
          return {
            active: !0,
            matches: ct(u, f, s, !0)
          };
      } else
        return {
          active: !0,
          matches: ct(u, f, s, !0) || []
        };
    return {
      active: !1,
      matches: null
    };
  }
  async function it(l, u, f) {
    if (!m)
      return {
        type: "success",
        matches: l
      };
    let v = l;
    for (; ; ) {
      let R = c == null, D = c || o, C = i;
      try {
        await m({
          path: u,
          matches: v,
          patch: (S, L) => {
            f.aborted || mr(S, L, D, C, a);
          }
        });
      } catch (S) {
        return {
          type: "error",
          error: S,
          partialMatches: v
        };
      } finally {
        R && !f.aborted && (o = [...o]);
      }
      if (f.aborted)
        return {
          type: "aborted"
        };
      let N = Ve(D, u, s);
      if (N)
        return {
          type: "success",
          matches: N
        };
      let x = ct(D, u, s, !0);
      if (!x || v.length === x.length && v.every((S, L) => S.route.id === x[L].route.id))
        return {
          type: "success",
          matches: null
        };
      v = x;
    }
  }
  function un(l) {
    i = {}, c = mt(l, a, void 0, i);
  }
  function cn(l, u) {
    let f = c == null;
    mr(l, u, c || o, i, a), f && (o = [...o], ee({}));
  }
  return Y = {
    get basename() {
      return s;
    },
    get future() {
      return p;
    },
    get state() {
      return h;
    },
    get routes() {
      return o;
    },
    get window() {
      return t;
    },
    initialize: Jr,
    subscribe: Xr,
    enableScrollRestoration: ln,
    navigate: Kt,
    fetch: tn,
    revalidate: Qr,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (l) => e.history.createHref(l),
    encodeLocation: (l) => e.history.encodeLocation(l),
    getFetcher: Xt,
    deleteFetcher: an,
    dispose: Yr,
    getBlocker: on,
    deleteBlocker: er,
    patchRoutes: cn,
    _internalFetchControllers: Q,
    _internalActiveDeferreds: Se,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: un
  }, Y;
}
function Wn(e) {
  return e != null && ("formData" in e && e.formData != null || "body" in e && e.body !== void 0);
}
function At(e, t, r, n, a, i, o, c) {
  let s, d;
  if (o) {
    s = [];
    for (let p of t)
      if (s.push(p), p.route.id === o) {
        d = p;
        break;
      }
  } else
    s = t, d = t[t.length - 1];
  let m = bt(a || ".", Et(s, i), le(e.pathname, r) || e.pathname, c === "path");
  if (a == null && (m.search = e.search, m.hash = e.hash), (a == null || a === "" || a === ".") && d) {
    let p = Ht(m.search);
    if (d.route.index && !p)
      m.search = m.search ? m.search.replace(/^\?/, "?index&") : "?index";
    else if (!d.route.index && p) {
      let E = new URLSearchParams(m.search), g = E.getAll("index");
      E.delete("index"), g.filter((y) => y).forEach((y) => E.append("index", y));
      let w = E.toString();
      m.search = w ? "?" + w : "";
    }
  }
  return n && r !== "/" && (m.pathname = m.pathname === "/" ? r : be([r, m.pathname])), pe(m);
}
function cr(e, t, r, n) {
  if (!n || !Wn(n))
    return {
      path: r
    };
  if (n.formMethod && !ra(n.formMethod))
    return {
      path: r,
      error: re(405, {
        method: n.formMethod
      })
    };
  let a = () => ({
    path: r,
    error: re(400, {
      type: "invalid-body"
    })
  }), i = n.formMethod || "get", o = e ? i.toUpperCase() : i.toLowerCase(), c = Ar(r);
  if (n.body !== void 0) {
    if (n.formEncType === "text/plain") {
      if (!ie(o))
        return a();
      let E = typeof n.body == "string" ? n.body : n.body instanceof FormData || n.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(n.body.entries()).reduce((g, w) => {
          let [y, P] = w;
          return "" + g + y + "=" + P + `
`;
        }, "")
      ) : String(n.body);
      return {
        path: r,
        submission: {
          formMethod: o,
          formAction: c,
          formEncType: n.formEncType,
          formData: void 0,
          json: void 0,
          text: E
        }
      };
    } else if (n.formEncType === "application/json") {
      if (!ie(o))
        return a();
      try {
        let E = typeof n.body == "string" ? JSON.parse(n.body) : n.body;
        return {
          path: r,
          submission: {
            formMethod: o,
            formAction: c,
            formEncType: n.formEncType,
            formData: void 0,
            json: E,
            text: void 0
          }
        };
      } catch {
        return a();
      }
    }
  }
  T(typeof FormData == "function", "FormData is not available in this environment");
  let s, d;
  if (n.formData)
    s = Ut(n.formData), d = n.formData;
  else if (n.body instanceof FormData)
    s = Ut(n.body), d = n.body;
  else if (n.body instanceof URLSearchParams)
    s = n.body, d = vr(s);
  else if (n.body == null)
    s = new URLSearchParams(), d = new FormData();
  else
    try {
      s = new URLSearchParams(n.body), d = vr(s);
    } catch {
      return a();
    }
  let m = {
    formMethod: o,
    formAction: c,
    formEncType: n && n.formEncType || "application/x-www-form-urlencoded",
    formData: d,
    json: void 0,
    text: void 0
  };
  if (ie(m.formMethod))
    return {
      path: r,
      submission: m
    };
  let p = Re(r);
  return t && p.search && Ht(p.search) && s.append("index", ""), p.search = "?" + s, {
    path: pe(p),
    submission: m
  };
}
function dr(e, t, r) {
  r === void 0 && (r = !1);
  let n = e.findIndex((a) => a.route.id === t);
  return n >= 0 ? e.slice(0, r ? n + 1 : n) : e;
}
function fr(e, t, r, n, a, i, o, c, s, d, m, p, E, g, w, y) {
  let P = y ? ne(y[1]) ? y[1].error : y[1].data : void 0, I = e.createURL(t.location), b = e.createURL(a), M = r;
  i && t.errors ? M = dr(r, Object.keys(t.errors)[0], !0) : y && ne(y[1]) && (M = dr(r, y[0]));
  let _ = y ? y[1].statusCode : void 0, Y = o && _ && _ >= 400, h = M.filter((z, V) => {
    let {
      route: J
    } = z;
    if (J.lazy)
      return !0;
    if (J.loader == null)
      return !1;
    if (i)
      return It(J, t.loaderData, t.errors);
    if ($n(t.loaderData, t.matches[V], z) || s.some((ae) => ae === z.route.id))
      return !0;
    let q = t.matches[V], ue = z;
    return hr(z, k({
      currentUrl: I,
      currentParams: q.params,
      nextUrl: b,
      nextParams: ue.params
    }, n, {
      actionResult: P,
      actionStatus: _,
      defaultShouldRevalidate: Y ? !1 : (
        // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
        c || I.pathname + I.search === b.pathname + b.search || // Search params affect all loaders
        I.search !== b.search || _r(q, ue)
      )
    }));
  }), X = [];
  return p.forEach((z, V) => {
    if (i || !r.some((ce) => ce.route.id === z.routeId) || m.has(V))
      return;
    let J = Ve(g, z.path, w);
    if (!J) {
      X.push({
        key: V,
        routeId: z.routeId,
        path: z.path,
        matches: null,
        match: null,
        controller: null
      });
      return;
    }
    let q = t.fetchers.get(V), ue = Xe(J, z.path), ae = !1;
    E.has(V) ? ae = !1 : d.has(V) ? (d.delete(V), ae = !0) : q && q.state !== "idle" && q.data === void 0 ? ae = c : ae = hr(ue, k({
      currentUrl: I,
      currentParams: t.matches[t.matches.length - 1].params,
      nextUrl: b,
      nextParams: r[r.length - 1].params
    }, n, {
      actionResult: P,
      actionStatus: _,
      defaultShouldRevalidate: Y ? !1 : c
    })), ae && X.push({
      key: V,
      routeId: z.routeId,
      path: z.path,
      matches: J,
      match: ue,
      controller: new AbortController()
    });
  }), [h, X];
}
function It(e, t, r) {
  if (e.lazy)
    return !0;
  if (!e.loader)
    return !1;
  let n = t != null && t[e.id] !== void 0, a = r != null && r[e.id] !== void 0;
  return !n && a ? !1 : typeof e.loader == "function" && e.loader.hydrate === !0 ? !0 : !n && !a;
}
function $n(e, t, r) {
  let n = (
    // [a] -> [a, b]
    !t || // [a, b] -> [a, c]
    r.route.id !== t.route.id
  ), a = e[r.route.id] === void 0;
  return n || a;
}
function _r(e, t) {
  let r = e.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    e.pathname !== t.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && e.params["*"] !== t.params["*"]
  );
}
function hr(e, t) {
  if (e.route.shouldRevalidate) {
    let r = e.route.shouldRevalidate(t);
    if (typeof r == "boolean")
      return r;
  }
  return t.defaultShouldRevalidate;
}
function mr(e, t, r, n, a) {
  var i;
  let o;
  if (e) {
    let d = n[e];
    T(d, "No route found to patch children into: routeId = " + e), d.children || (d.children = []), o = d.children;
  } else
    o = r;
  let c = t.filter((d) => !o.some((m) => Mr(d, m))), s = mt(c, a, [e || "_", "patch", String(((i = o) == null ? void 0 : i.length) || "0")], n);
  o.push(...s);
}
function Mr(e, t) {
  return "id" in e && "id" in t && e.id === t.id ? !0 : e.index === t.index && e.path === t.path && e.caseSensitive === t.caseSensitive ? (!e.children || e.children.length === 0) && (!t.children || t.children.length === 0) ? !0 : e.children.every((r, n) => {
    var a;
    return (a = t.children) == null ? void 0 : a.some((i) => Mr(r, i));
  }) : !1;
}
async function Gn(e, t, r) {
  if (!e.lazy)
    return;
  let n = await e.lazy();
  if (!e.lazy)
    return;
  let a = r[e.id];
  T(a, "No route found in manifest");
  let i = {};
  for (let o in n) {
    let s = a[o] !== void 0 && // This property isn't static since it should always be updated based
    // on the route updates
    o !== "hasErrorBoundary";
    te(!s, 'Route "' + a.id + '" has a static property "' + o + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + o + '" will be ignored.')), !s && !gn.has(o) && (i[o] = n[o]);
  }
  Object.assign(a, i), Object.assign(a, k({}, t(a), {
    lazy: void 0
  }));
}
async function Kn(e) {
  let {
    matches: t
  } = e, r = t.filter((a) => a.shouldLoad);
  return (await Promise.all(r.map((a) => a.resolve()))).reduce((a, i, o) => Object.assign(a, {
    [r[o].route.id]: i
  }), {});
}
async function Jn(e, t, r, n, a, i, o, c, s, d) {
  let m = i.map((g) => g.route.lazy ? Gn(g.route, s, c) : void 0), p = i.map((g, w) => {
    let y = m[w], P = a.some((b) => b.route.id === g.route.id);
    return k({}, g, {
      shouldLoad: P,
      resolve: async (b) => (b && n.method === "GET" && (g.route.lazy || g.route.loader) && (P = !0), P ? Yn(t, n, g, y, b, d) : Promise.resolve({
        type: B.data,
        result: void 0
      }))
    });
  }), E = await e({
    matches: p,
    request: n,
    params: i[0].params,
    fetcherKey: o,
    context: d
  });
  try {
    await Promise.all(m);
  } catch {
  }
  return E;
}
async function Yn(e, t, r, n, a, i) {
  let o, c, s = (d) => {
    let m, p = new Promise((w, y) => m = y);
    c = () => m(), t.signal.addEventListener("abort", c);
    let E = (w) => typeof d != "function" ? Promise.reject(new Error("You cannot call the handler for a route which defines a boolean " + ('"' + e + '" [routeId: ' + r.route.id + "]"))) : d({
      request: t,
      params: r.params,
      context: i
    }, ...w !== void 0 ? [w] : []), g = (async () => {
      try {
        return {
          type: "data",
          result: await (a ? a((y) => E(y)) : E())
        };
      } catch (w) {
        return {
          type: "error",
          result: w
        };
      }
    })();
    return Promise.race([g, p]);
  };
  try {
    let d = r.route[e];
    if (n)
      if (d) {
        let m, [p] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          s(d).catch((E) => {
            m = E;
          }),
          n
        ]);
        if (m !== void 0)
          throw m;
        o = p;
      } else if (await n, d = r.route[e], d)
        o = await s(d);
      else if (e === "action") {
        let m = new URL(t.url), p = m.pathname + m.search;
        throw re(405, {
          method: t.method,
          pathname: p,
          routeId: r.route.id
        });
      } else
        return {
          type: B.data,
          result: void 0
        };
    else if (d)
      o = await s(d);
    else {
      let m = new URL(t.url), p = m.pathname + m.search;
      throw re(404, {
        pathname: p
      });
    }
    T(o.result !== void 0, "You defined " + (e === "action" ? "an action" : "a loader") + " for route " + ('"' + r.route.id + "\" but didn't return anything from your `" + e + "` ") + "function. Please return a value or `null`.");
  } catch (d) {
    return {
      type: B.error,
      result: d
    };
  } finally {
    c && t.signal.removeEventListener("abort", c);
  }
  return o;
}
async function Xn(e) {
  let {
    result: t,
    type: r
  } = e;
  if (Ir(t)) {
    let d;
    try {
      let m = t.headers.get("Content-Type");
      m && /\bapplication\/json\b/.test(m) ? t.body == null ? d = null : d = await t.json() : d = await t.text();
    } catch (m) {
      return {
        type: B.error,
        error: m
      };
    }
    return r === B.error ? {
      type: B.error,
      error: new vt(t.status, t.statusText, d),
      statusCode: t.status,
      headers: t.headers
    } : {
      type: B.data,
      data: d,
      statusCode: t.status,
      headers: t.headers
    };
  }
  if (r === B.error) {
    if (wr(t)) {
      var n;
      if (t.data instanceof Error) {
        var a;
        return {
          type: B.error,
          error: t.data,
          statusCode: (a = t.init) == null ? void 0 : a.status
        };
      }
      t = new vt(((n = t.init) == null ? void 0 : n.status) || 500, void 0, t.data);
    }
    return {
      type: B.error,
      error: t,
      statusCode: jt(t) ? t.status : void 0
    };
  }
  if (ta(t)) {
    var i, o;
    return {
      type: B.deferred,
      deferredData: t,
      statusCode: (i = t.init) == null ? void 0 : i.status,
      headers: ((o = t.init) == null ? void 0 : o.headers) && new Headers(t.init.headers)
    };
  }
  if (wr(t)) {
    var c, s;
    return {
      type: B.data,
      data: t.data,
      statusCode: (c = t.init) == null ? void 0 : c.status,
      headers: (s = t.init) != null && s.headers ? new Headers(t.init.headers) : void 0
    };
  }
  return {
    type: B.data,
    data: t
  };
}
function Qn(e, t, r, n, a, i) {
  let o = e.headers.get("Location");
  if (T(o, "Redirects returned/thrown from loaders/actions must have a Location header"), !Vt.test(o)) {
    let c = n.slice(0, n.findIndex((s) => s.route.id === r) + 1);
    o = At(new URL(t.url), c, a, !0, o, i), e.headers.set("Location", o);
  }
  return e;
}
function pr(e, t, r) {
  if (Vt.test(e)) {
    let n = e, a = n.startsWith("//") ? new URL(t.protocol + n) : new URL(n), i = le(a.pathname, r) != null;
    if (a.origin === t.origin && i)
      return a.pathname + a.search + a.hash;
  }
  return e;
}
function je(e, t, r, n) {
  let a = e.createURL(Ar(t)).toString(), i = {
    signal: r
  };
  if (n && ie(n.formMethod)) {
    let {
      formMethod: o,
      formEncType: c
    } = n;
    i.method = o.toUpperCase(), c === "application/json" ? (i.headers = new Headers({
      "Content-Type": c
    }), i.body = JSON.stringify(n.json)) : c === "text/plain" ? i.body = n.text : c === "application/x-www-form-urlencoded" && n.formData ? i.body = Ut(n.formData) : i.body = n.formData;
  }
  return new Request(a, i);
}
function Ut(e) {
  let t = new URLSearchParams();
  for (let [r, n] of e.entries())
    t.append(r, typeof n == "string" ? n : n.name);
  return t;
}
function vr(e) {
  let t = new FormData();
  for (let [r, n] of e.entries())
    t.append(r, n);
  return t;
}
function Zn(e, t, r, n, a) {
  let i = {}, o = null, c, s = !1, d = {}, m = r && ne(r[1]) ? r[1].error : void 0;
  return e.forEach((p) => {
    if (!(p.route.id in t))
      return;
    let E = p.route.id, g = t[E];
    if (T(!Oe(g), "Cannot handle redirect results in processLoaderData"), ne(g)) {
      let w = g.error;
      m !== void 0 && (w = m, m = void 0), o = o || {};
      {
        let y = Pe(e, E);
        o[y.route.id] == null && (o[y.route.id] = w);
      }
      i[E] = void 0, s || (s = !0, c = jt(g.error) ? g.error.status : 500), g.headers && (d[E] = g.headers);
    } else
      Ee(g) ? (n.set(E, g.deferredData), i[E] = g.deferredData.data, g.statusCode != null && g.statusCode !== 200 && !s && (c = g.statusCode), g.headers && (d[E] = g.headers)) : (i[E] = g.data, g.statusCode && g.statusCode !== 200 && !s && (c = g.statusCode), g.headers && (d[E] = g.headers));
  }), m !== void 0 && r && (o = {
    [r[0]]: m
  }, i[r[0]] = void 0), {
    loaderData: i,
    errors: o,
    statusCode: c || 200,
    loaderHeaders: d
  };
}
function gr(e, t, r, n, a, i, o) {
  let {
    loaderData: c,
    errors: s
  } = Zn(t, r, n, o);
  return a.forEach((d) => {
    let {
      key: m,
      match: p,
      controller: E
    } = d, g = i[m];
    if (T(g, "Did not find corresponding fetcher result"), !(E && E.signal.aborted))
      if (ne(g)) {
        let w = Pe(e.matches, p == null ? void 0 : p.route.id);
        s && s[w.route.id] || (s = k({}, s, {
          [w.route.id]: g.error
        })), e.fetchers.delete(m);
      } else if (Oe(g))
        T(!1, "Unhandled fetcher revalidation redirect");
      else if (Ee(g))
        T(!1, "Unhandled fetcher deferred data");
      else {
        let w = ye(g.data);
        e.fetchers.set(m, w);
      }
  }), {
    loaderData: c,
    errors: s
  };
}
function yr(e, t, r, n) {
  let a = k({}, t);
  for (let i of r) {
    let o = i.route.id;
    if (t.hasOwnProperty(o) ? t[o] !== void 0 && (a[o] = t[o]) : e[o] !== void 0 && i.route.loader && (a[o] = e[o]), n && n.hasOwnProperty(o))
      break;
  }
  return a;
}
function Er(e) {
  return e ? ne(e[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [e[0]]: e[1].data
    }
  } : {};
}
function Pe(e, t) {
  return (t ? e.slice(0, e.findIndex((n) => n.route.id === t) + 1) : [...e]).reverse().find((n) => n.route.hasErrorBoundary === !0) || e[0];
}
function br(e) {
  let t = e.length === 1 ? e[0] : e.find((r) => r.index || !r.path || r.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route: t
    }],
    route: t
  };
}
function re(e, t) {
  let {
    pathname: r,
    routeId: n,
    method: a,
    type: i,
    message: o
  } = t === void 0 ? {} : t, c = "Unknown Server Error", s = "Unknown @remix-run/router error";
  return e === 400 ? (c = "Bad Request", a && r && n ? s = "You made a " + a + ' request to "' + r + '" but ' + ('did not provide a `loader` for route "' + n + '", ') + "so there is no way to handle the request." : i === "defer-action" ? s = "defer() is not supported in actions" : i === "invalid-body" && (s = "Unable to encode submission body")) : e === 403 ? (c = "Forbidden", s = 'Route "' + n + '" does not match URL "' + r + '"') : e === 404 ? (c = "Not Found", s = 'No route matches URL "' + r + '"') : e === 405 && (c = "Method Not Allowed", a && r && n ? s = "You made a " + a.toUpperCase() + ' request to "' + r + '" but ' + ('did not provide an `action` for route "' + n + '", ') + "so there is no way to handle the request." : a && (s = 'Invalid request method "' + a.toUpperCase() + '"')), new vt(e || 500, c, new Error(s), !0);
}
function st(e) {
  let t = Object.entries(e);
  for (let r = t.length - 1; r >= 0; r--) {
    let [n, a] = t[r];
    if (Oe(a))
      return {
        key: n,
        result: a
      };
  }
}
function Ar(e) {
  let t = typeof e == "string" ? Re(e) : e;
  return pe(k({}, t, {
    hash: ""
  }));
}
function qn(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search ? !1 : e.hash === "" ? t.hash !== "" : e.hash === t.hash ? !0 : t.hash !== "";
}
function ea(e) {
  return Ir(e.result) && Bn.has(e.result.status);
}
function Ee(e) {
  return e.type === B.deferred;
}
function ne(e) {
  return e.type === B.error;
}
function Oe(e) {
  return (e && e.type) === B.redirect;
}
function wr(e) {
  return typeof e == "object" && e != null && "type" in e && "data" in e && "init" in e && e.type === "DataWithResponseInit";
}
function ta(e) {
  let t = e;
  return t && typeof t == "object" && typeof t.data == "object" && typeof t.subscribe == "function" && typeof t.cancel == "function" && typeof t.resolveData == "function";
}
function Ir(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
function ra(e) {
  return Vn.has(e.toLowerCase());
}
function ie(e) {
  return Fn.has(e.toLowerCase());
}
async function na(e, t, r, n, a) {
  let i = Object.entries(t);
  for (let o = 0; o < i.length; o++) {
    let [c, s] = i[o], d = e.find((E) => (E == null ? void 0 : E.route.id) === c);
    if (!d)
      continue;
    let m = n.find((E) => E.route.id === d.route.id), p = m != null && !_r(m, d) && (a && a[d.route.id]) !== void 0;
    Ee(s) && p && await Bt(s, r, !1).then((E) => {
      E && (t[c] = E);
    });
  }
}
async function aa(e, t, r) {
  for (let n = 0; n < r.length; n++) {
    let {
      key: a,
      routeId: i,
      controller: o
    } = r[n], c = t[a];
    e.find((d) => (d == null ? void 0 : d.route.id) === i) && Ee(c) && (T(o, "Expected an AbortController for revalidating fetcher deferred result"), await Bt(c, o.signal, !0).then((d) => {
      d && (t[a] = d);
    }));
  }
}
async function Bt(e, t, r) {
  if (r === void 0 && (r = !1), !await e.deferredData.resolveData(t)) {
    if (r)
      try {
        return {
          type: B.data,
          data: e.deferredData.unwrappedData
        };
      } catch (a) {
        return {
          type: B.error,
          error: a
        };
      }
    return {
      type: B.data,
      data: e.deferredData.data
    };
  }
}
function Ht(e) {
  return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function Xe(e, t) {
  let r = typeof t == "string" ? Re(t).search : t.search;
  if (e[e.length - 1].route.index && Ht(r || ""))
    return e[e.length - 1];
  let n = Pr(e);
  return n[n.length - 1];
}
function Rr(e) {
  let {
    formMethod: t,
    formAction: r,
    formEncType: n,
    text: a,
    formData: i,
    json: o
  } = e;
  if (!(!t || !r || !n)) {
    if (a != null)
      return {
        formMethod: t,
        formAction: r,
        formEncType: n,
        formData: void 0,
        json: void 0,
        text: a
      };
    if (i != null)
      return {
        formMethod: t,
        formAction: r,
        formEncType: n,
        formData: i,
        json: void 0,
        text: void 0
      };
    if (o !== void 0)
      return {
        formMethod: t,
        formAction: r,
        formEncType: n,
        formData: void 0,
        json: o,
        text: void 0
      };
  }
}
function Tt(e, t) {
  return t ? {
    state: "loading",
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text
  } : {
    state: "loading",
    location: e,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function ia(e, t) {
  return {
    state: "submitting",
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text
  };
}
function Ye(e, t) {
  return e ? {
    state: "loading",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t
  } : {
    state: "loading",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: t
  };
}
function oa(e, t) {
  return {
    state: "submitting",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0
  };
}
function ye(e) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e
  };
}
function la(e, t) {
  try {
    let r = e.sessionStorage.getItem(Tr);
    if (r) {
      let n = JSON.parse(r);
      for (let [a, i] of Object.entries(n || {}))
        i && Array.isArray(i) && t.set(a, new Set(i || []));
    }
  } catch {
  }
}
function sa(e, t) {
  if (t.size > 0) {
    let r = {};
    for (let [n, a] of t)
      r[n] = [...a];
    try {
      e.sessionStorage.setItem(Tr, JSON.stringify(r));
    } catch (n) {
      te(!1, "Failed to save applied view transitions in sessionStorage (" + n + ").");
    }
  }
}
/**
 * React Router v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function gt() {
  return gt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, gt.apply(this, arguments);
}
const wt = /* @__PURE__ */ O.createContext(null);
process.env.NODE_ENV !== "production" && (wt.displayName = "DataRouter");
const Ur = /* @__PURE__ */ O.createContext(null);
process.env.NODE_ENV !== "production" && (Ur.displayName = "DataRouterState");
const ua = /* @__PURE__ */ O.createContext(null);
process.env.NODE_ENV !== "production" && (ua.displayName = "Await");
const se = /* @__PURE__ */ O.createContext(null);
process.env.NODE_ENV !== "production" && (se.displayName = "Navigation");
const kt = /* @__PURE__ */ O.createContext(null);
process.env.NODE_ENV !== "production" && (kt.displayName = "Location");
const Te = /* @__PURE__ */ O.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (Te.displayName = "Route");
const ca = /* @__PURE__ */ O.createContext(null);
process.env.NODE_ENV !== "production" && (ca.displayName = "RouteError");
function da(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t;
  Rt() || (process.env.NODE_ENV !== "production" ? T(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : T(!1));
  let {
    basename: n,
    navigator: a
  } = O.useContext(se), {
    hash: i,
    pathname: o,
    search: c
  } = Qe(e, {
    relative: r
  }), s = o;
  return n !== "/" && (s = o === "/" ? n : be([n, o])), a.createHref({
    pathname: s,
    search: c,
    hash: i
  });
}
function Rt() {
  return O.useContext(kt) != null;
}
function Ce() {
  return Rt() || (process.env.NODE_ENV !== "production" ? T(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : T(!1)), O.useContext(kt).location;
}
const Fr = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function jr(e) {
  O.useContext(se).static || O.useLayoutEffect(e);
}
function zt() {
  let {
    isDataRoute: e
  } = O.useContext(Te);
  return e ? va() : fa();
}
function fa() {
  Rt() || (process.env.NODE_ENV !== "production" ? T(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : T(!1));
  let e = O.useContext(wt), {
    basename: t,
    future: r,
    navigator: n
  } = O.useContext(se), {
    matches: a
  } = O.useContext(Te), {
    pathname: i
  } = Ce(), o = JSON.stringify(Et(a, r.v7_relativeSplatPath)), c = O.useRef(!1);
  return jr(() => {
    c.current = !0;
  }), O.useCallback(function(d, m) {
    if (m === void 0 && (m = {}), process.env.NODE_ENV !== "production" && te(c.current, Fr), !c.current) return;
    if (typeof d == "number") {
      n.go(d);
      return;
    }
    let p = bt(d, JSON.parse(o), i, m.relative === "path");
    e == null && t !== "/" && (p.pathname = p.pathname === "/" ? t : be([t, p.pathname])), (m.replace ? n.replace : n.push)(p, m.state, m);
  }, [t, n, o, i, e]);
}
function Qe(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    future: n
  } = O.useContext(se), {
    matches: a
  } = O.useContext(Te), {
    pathname: i
  } = Ce(), o = JSON.stringify(Et(a, n.v7_relativeSplatPath));
  return O.useMemo(() => bt(e, JSON.parse(o), i, r === "path"), [e, o, i, r]);
}
var Vr = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(Vr || {}), Wt = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(Wt || {});
function Br(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function ha(e) {
  let t = O.useContext(wt);
  return t || (process.env.NODE_ENV !== "production" ? T(!1, Br(e)) : T(!1)), t;
}
function ma(e) {
  let t = O.useContext(Te);
  return t || (process.env.NODE_ENV !== "production" ? T(!1, Br(e)) : T(!1)), t;
}
function Hr(e) {
  let t = ma(e), r = t.matches[t.matches.length - 1];
  return r.route.id || (process.env.NODE_ENV !== "production" ? T(!1, e + ' can only be used on routes that contain a unique "id"') : T(!1)), r.route.id;
}
function pa() {
  return Hr(Wt.UseRouteId);
}
function va() {
  let {
    router: e
  } = ha(Vr.UseNavigateStable), t = Hr(Wt.UseNavigateStable), r = O.useRef(!1);
  return jr(() => {
    r.current = !0;
  }), O.useCallback(function(a, i) {
    i === void 0 && (i = {}), process.env.NODE_ENV !== "production" && te(r.current, Fr), r.current && (typeof a == "number" ? e.navigate(a) : e.navigate(a, gt({
      fromRouteId: t
    }, i)));
  }, [e, t]);
}
function ga(e) {
  let {
    to: t,
    replace: r,
    state: n,
    relative: a
  } = e;
  Rt() || (process.env.NODE_ENV !== "production" ? T(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  ) : T(!1));
  let {
    future: i,
    static: o
  } = O.useContext(se);
  process.env.NODE_ENV !== "production" && te(!o, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: c
  } = O.useContext(Te), {
    pathname: s
  } = Ce(), d = zt(), m = bt(t, Et(c, i.v7_relativeSplatPath), s, a === "path"), p = JSON.stringify(m);
  return O.useEffect(() => d(JSON.parse(p), {
    replace: r,
    state: n,
    relative: a
  }), [d, p, a, r, n]), null;
}
new Promise(() => {
});
function kr(e) {
  let t = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null
  };
  return e.Component && (process.env.NODE_ENV !== "production" && e.element && process.env.NODE_ENV !== "production" && te(!1, "You should not include both `Component` and `element` on your route - `Component` will be used."), Object.assign(t, {
    element: /* @__PURE__ */ O.createElement(e.Component),
    Component: void 0
  })), e.HydrateFallback && (process.env.NODE_ENV !== "production" && e.hydrateFallbackElement && process.env.NODE_ENV !== "production" && te(!1, "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."), Object.assign(t, {
    hydrateFallbackElement: /* @__PURE__ */ O.createElement(e.HydrateFallback),
    HydrateFallback: void 0
  })), e.ErrorBoundary && (process.env.NODE_ENV !== "production" && e.errorElement && process.env.NODE_ENV !== "production" && te(!1, "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."), Object.assign(t, {
    errorElement: /* @__PURE__ */ O.createElement(e.ErrorBoundary),
    ErrorBoundary: void 0
  })), t;
}
function ya(e, t) {
  return Cr({
    basename: t == null ? void 0 : t.basename,
    future: gt({}, t == null ? void 0 : t.future, {
      v7_prependBasename: !0
    }),
    history: hn({
      initialEntries: t == null ? void 0 : t.initialEntries,
      initialIndex: t == null ? void 0 : t.initialIndex
    }),
    hydrationData: t == null ? void 0 : t.hydrationData,
    routes: e,
    mapRouteProperties: kr,
    dataStrategy: t == null ? void 0 : t.dataStrategy,
    patchRoutesOnNavigation: t == null ? void 0 : t.patchRoutesOnNavigation
  }).initialize();
}
/**
 * React Router DOM v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function we() {
  return we = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, we.apply(this, arguments);
}
function $t(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
const dt = "get", ft = "application/x-www-form-urlencoded";
function St(e) {
  return e != null && typeof e.tagName == "string";
}
function Ea(e) {
  return St(e) && e.tagName.toLowerCase() === "button";
}
function ba(e) {
  return St(e) && e.tagName.toLowerCase() === "form";
}
function wa(e) {
  return St(e) && e.tagName.toLowerCase() === "input";
}
function Ra(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Sa(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !Ra(e);
}
let ut = null;
function Na() {
  if (ut === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), ut = !1;
    } catch {
      ut = !0;
    }
  return ut;
}
const xa = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Ct(e) {
  return e != null && !xa.has(e) ? (process.env.NODE_ENV !== "production" && te(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + ft + '"')), null) : e;
}
function Da(e, t) {
  let r, n, a, i, o;
  if (ba(e)) {
    let c = e.getAttribute("action");
    n = c ? le(c, t) : null, r = e.getAttribute("method") || dt, a = Ct(e.getAttribute("enctype")) || ft, i = new FormData(e);
  } else if (Ea(e) || wa(e) && (e.type === "submit" || e.type === "image")) {
    let c = e.form;
    if (c == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let s = e.getAttribute("formaction") || c.getAttribute("action");
    if (n = s ? le(s, t) : null, r = e.getAttribute("formmethod") || c.getAttribute("method") || dt, a = Ct(e.getAttribute("formenctype")) || Ct(c.getAttribute("enctype")) || ft, i = new FormData(c, e), !Na()) {
      let {
        name: d,
        type: m,
        value: p
      } = e;
      if (m === "image") {
        let E = d ? d + "." : "";
        i.append(E + "x", "0"), i.append(E + "y", "0");
      } else d && i.append(d, p);
    }
  } else {
    if (St(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    r = dt, n = null, a = ft, o = e;
  }
  return i && a === "text/plain" && (o = i, i = void 0), {
    action: n,
    method: r.toLowerCase(),
    encType: a,
    formData: i,
    body: o
  };
}
const La = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Pa = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], Oa = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], Ta = "6";
try {
  window.__reactRouterVersion = Ta;
} catch {
}
function Ca(e, t) {
  return Cr({
    basename: void 0,
    future: we({}, void 0, {
      v7_prependBasename: !0
    }),
    history: mn({
      window: void 0
    }),
    hydrationData: _a(),
    routes: e,
    mapRouteProperties: kr,
    dataStrategy: void 0,
    patchRoutesOnNavigation: void 0,
    window: void 0
  }).initialize();
}
function _a() {
  var e;
  let t = (e = window) == null ? void 0 : e.__staticRouterHydrationData;
  return t && t.errors && (t = we({}, t, {
    errors: Ma(t.errors)
  })), t;
}
function Ma(e) {
  if (!e) return null;
  let t = Object.entries(e), r = {};
  for (let [n, a] of t)
    if (a && a.__type === "RouteErrorResponse")
      r[n] = new vt(a.status, a.statusText, a.data, a.internal === !0);
    else if (a && a.__type === "Error") {
      if (a.__subType) {
        let i = window[a.__subType];
        if (typeof i == "function")
          try {
            let o = new i(a.message);
            o.stack = "", r[n] = o;
          } catch {
          }
      }
      if (r[n] == null) {
        let i = new Error(a.message);
        i.stack = "", r[n] = i;
      }
    } else
      r[n] = a;
  return r;
}
const zr = /* @__PURE__ */ O.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (zr.displayName = "ViewTransition");
const Aa = /* @__PURE__ */ O.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (Aa.displayName = "Fetchers");
process.env.NODE_ENV;
const Ia = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Ua = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Wr = /* @__PURE__ */ O.forwardRef(function(t, r) {
  let {
    onClick: n,
    relative: a,
    reloadDocument: i,
    replace: o,
    state: c,
    target: s,
    to: d,
    preventScrollReset: m,
    viewTransition: p
  } = t, E = $t(t, La), {
    basename: g
  } = O.useContext(se), w, y = !1;
  if (typeof d == "string" && Ua.test(d) && (w = d, Ia))
    try {
      let M = new URL(window.location.href), _ = d.startsWith("//") ? new URL(M.protocol + d) : new URL(d), Y = le(_.pathname, g);
      _.origin === M.origin && Y != null ? d = Y + _.search + _.hash : y = !0;
    } catch {
      process.env.NODE_ENV !== "production" && te(!1, '<Link to="' + d + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let P = da(d, {
    relative: a
  }), I = Ba(d, {
    replace: o,
    state: c,
    target: s,
    preventScrollReset: m,
    relative: a,
    viewTransition: p
  });
  function b(M) {
    n && n(M), M.defaultPrevented || I(M);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ O.createElement("a", we({}, E, {
      href: w || P,
      onClick: y || i ? n : b,
      ref: r,
      target: s
    }))
  );
});
process.env.NODE_ENV !== "production" && (Wr.displayName = "Link");
const Fa = /* @__PURE__ */ O.forwardRef(function(t, r) {
  let {
    "aria-current": n = "page",
    caseSensitive: a = !1,
    className: i = "",
    end: o = !1,
    style: c,
    to: s,
    viewTransition: d,
    children: m
  } = t, p = $t(t, Pa), E = Qe(s, {
    relative: p.relative
  }), g = Ce(), w = O.useContext(Ur), {
    navigator: y,
    basename: P
  } = O.useContext(se), I = w != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Ga(E) && d === !0, b = y.encodeLocation ? y.encodeLocation(E).pathname : E.pathname, M = g.pathname, _ = w && w.navigation && w.navigation.location ? w.navigation.location.pathname : null;
  a || (M = M.toLowerCase(), _ = _ ? _.toLowerCase() : null, b = b.toLowerCase()), _ && P && (_ = le(_, P) || _);
  const Y = b !== "/" && b.endsWith("/") ? b.length - 1 : b.length;
  let h = M === b || !o && M.startsWith(b) && M.charAt(Y) === "/", X = _ != null && (_ === b || !o && _.startsWith(b) && _.charAt(b.length) === "/"), z = {
    isActive: h,
    isPending: X,
    isTransitioning: I
  }, V = h ? n : void 0, J;
  typeof i == "function" ? J = i(z) : J = [i, h ? "active" : null, X ? "pending" : null, I ? "transitioning" : null].filter(Boolean).join(" ");
  let q = typeof c == "function" ? c(z) : c;
  return /* @__PURE__ */ O.createElement(Wr, we({}, p, {
    "aria-current": V,
    className: J,
    ref: r,
    style: q,
    to: s,
    viewTransition: d
  }), typeof m == "function" ? m(z) : m);
});
process.env.NODE_ENV !== "production" && (Fa.displayName = "NavLink");
const ja = /* @__PURE__ */ O.forwardRef((e, t) => {
  let {
    fetcherKey: r,
    navigate: n,
    reloadDocument: a,
    replace: i,
    state: o,
    method: c = dt,
    action: s,
    onSubmit: d,
    relative: m,
    preventScrollReset: p,
    viewTransition: E
  } = e, g = $t(e, Oa), w = Wa(), y = $a(s, {
    relative: m
  }), P = c.toLowerCase() === "get" ? "get" : "post", I = (b) => {
    if (d && d(b), b.defaultPrevented) return;
    b.preventDefault();
    let M = b.nativeEvent.submitter, _ = (M == null ? void 0 : M.getAttribute("formmethod")) || c;
    w(M || b.currentTarget, {
      fetcherKey: r,
      method: _,
      navigate: n,
      replace: i,
      state: o,
      relative: m,
      preventScrollReset: p,
      viewTransition: E
    });
  };
  return /* @__PURE__ */ O.createElement("form", we({
    ref: t,
    method: P,
    action: y,
    onSubmit: a ? d : I
  }, g));
});
process.env.NODE_ENV !== "production" && (ja.displayName = "Form");
process.env.NODE_ENV;
var yt;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(yt || (yt = {}));
var Sr;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Sr || (Sr = {}));
function Va(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function $r(e) {
  let t = O.useContext(wt);
  return t || (process.env.NODE_ENV !== "production" ? T(!1, Va(e)) : T(!1)), t;
}
function Ba(e, t) {
  let {
    target: r,
    replace: n,
    state: a,
    preventScrollReset: i,
    relative: o,
    viewTransition: c
  } = t === void 0 ? {} : t, s = zt(), d = Ce(), m = Qe(e, {
    relative: o
  });
  return O.useCallback((p) => {
    if (Sa(p, r)) {
      p.preventDefault();
      let E = n !== void 0 ? n : pe(d) === pe(m);
      s(e, {
        replace: E,
        state: a,
        preventScrollReset: i,
        relative: o,
        viewTransition: c
      });
    }
  }, [d, s, m, n, a, r, e, i, o, c]);
}
function Ha() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let ka = 0, za = () => "__" + String(++ka) + "__";
function Wa() {
  let {
    router: e
  } = $r(yt.UseSubmit), {
    basename: t
  } = O.useContext(se), r = pa();
  return O.useCallback(function(n, a) {
    a === void 0 && (a = {}), Ha();
    let {
      action: i,
      method: o,
      encType: c,
      formData: s,
      body: d
    } = Da(n, t);
    if (a.navigate === !1) {
      let m = a.fetcherKey || za();
      e.fetch(m, r, a.action || i, {
        preventScrollReset: a.preventScrollReset,
        formData: s,
        body: d,
        formMethod: a.method || o,
        formEncType: a.encType || c,
        flushSync: a.flushSync
      });
    } else
      e.navigate(a.action || i, {
        preventScrollReset: a.preventScrollReset,
        formData: s,
        body: d,
        formMethod: a.method || o,
        formEncType: a.encType || c,
        replace: a.replace,
        state: a.state,
        fromRouteId: r,
        flushSync: a.flushSync,
        viewTransition: a.viewTransition
      });
  }, [e, t, r]);
}
function $a(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    basename: n
  } = O.useContext(se), a = O.useContext(Te);
  a || (process.env.NODE_ENV !== "production" ? T(!1, "useFormAction must be used inside a RouteContext") : T(!1));
  let [i] = a.matches.slice(-1), o = we({}, Qe(e || ".", {
    relative: r
  })), c = Ce();
  if (e == null) {
    o.search = c.search;
    let s = new URLSearchParams(o.search), d = s.getAll("index");
    if (d.some((p) => p === "")) {
      s.delete("index"), d.filter((E) => E).forEach((E) => s.append("index", E));
      let p = s.toString();
      o.search = p ? "?" + p : "";
    }
  }
  return (!e || e === ".") && i.route.index && (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (o.pathname = o.pathname === "/" ? n : be([n, o.pathname])), pe(o);
}
function Ga(e, t) {
  t === void 0 && (t = {});
  let r = O.useContext(zr);
  r == null && (process.env.NODE_ENV !== "production" ? T(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : T(!1));
  let {
    basename: n
  } = $r(yt.useViewTransitionState), a = Qe(e, {
    relative: t.relative
  });
  if (!r.isTransitioning)
    return !1;
  let i = le(r.currentLocation.pathname, n) || r.currentLocation.pathname, o = le(r.nextLocation.pathname, n) || r.nextLocation.pathname;
  return pt(a.pathname, o) != null || pt(a.pathname, i) != null;
}
const Nr = (e) => {
  let t;
  const r = /* @__PURE__ */ new Set(), n = (d, m) => {
    const p = typeof d == "function" ? d(t) : d;
    if (!Object.is(p, t)) {
      const E = t;
      t = m ?? (typeof p != "object" || p === null) ? p : Object.assign({}, t, p), r.forEach((g) => g(t, E));
    }
  }, a = () => t, c = { setState: n, getState: a, getInitialState: () => s, subscribe: (d) => (r.add(d), () => r.delete(d)) }, s = t = e(n, a, c);
  return c;
}, Ka = (e) => e ? Nr(e) : Nr, Ja = (e) => e;
function Ya(e, t = Ja) {
  const r = or.useSyncExternalStore(
    e.subscribe,
    () => t(e.getState()),
    () => t(e.getInitialState())
  );
  return or.useDebugValue(r), r;
}
const Xa = (e) => {
  const t = Ka(e), r = (n) => Ya(t, n);
  return Object.assign(r, t), r;
}, Gr = (e) => Xa;
function Gt(e, t) {
  let r;
  try {
    r = e();
  } catch {
    return;
  }
  return {
    getItem: (a) => {
      var i;
      const o = (s) => s === null ? null : JSON.parse(s, void 0), c = (i = r.getItem(a)) != null ? i : null;
      return c instanceof Promise ? c.then(o) : o(c);
    },
    setItem: (a, i) => r.setItem(
      a,
      JSON.stringify(i, void 0)
    ),
    removeItem: (a) => r.removeItem(a)
  };
}
const Ft = (e) => (t) => {
  try {
    const r = e(t);
    return r instanceof Promise ? r : {
      then(n) {
        return Ft(n)(r);
      },
      catch(n) {
        return this;
      }
    };
  } catch (r) {
    return {
      then(n) {
        return this;
      },
      catch(n) {
        return Ft(n)(r);
      }
    };
  }
}, Qa = (e, t) => (r, n, a) => {
  let i = {
    storage: Gt(() => localStorage),
    partialize: (y) => y,
    version: 0,
    merge: (y, P) => ({
      ...P,
      ...y
    }),
    ...t
  }, o = !1;
  const c = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  let d = i.storage;
  if (!d)
    return e(
      (...y) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`
        ), r(...y);
      },
      n,
      a
    );
  const m = () => {
    const y = i.partialize({ ...n() });
    return d.setItem(i.name, {
      state: y,
      version: i.version
    });
  }, p = a.setState;
  a.setState = (y, P) => {
    p(y, P), m();
  };
  const E = e(
    (...y) => {
      r(...y), m();
    },
    n,
    a
  );
  a.getInitialState = () => E;
  let g;
  const w = () => {
    var y, P;
    if (!d) return;
    o = !1, c.forEach((b) => {
      var M;
      return b((M = n()) != null ? M : E);
    });
    const I = ((P = i.onRehydrateStorage) == null ? void 0 : P.call(i, (y = n()) != null ? y : E)) || void 0;
    return Ft(d.getItem.bind(d))(i.name).then((b) => {
      if (b)
        if (typeof b.version == "number" && b.version !== i.version) {
          if (i.migrate) {
            const M = i.migrate(
              b.state,
              b.version
            );
            return M instanceof Promise ? M.then((_) => [!0, _]) : [!0, M];
          }
          console.error(
            "State loaded from storage couldn't be migrated since no migrate function was provided"
          );
        } else
          return [!1, b.state];
      return [!1, void 0];
    }).then((b) => {
      var M;
      const [_, Y] = b;
      if (g = i.merge(
        Y,
        (M = n()) != null ? M : E
      ), r(g, !0), _)
        return m();
    }).then(() => {
      I == null || I(g, void 0), g = n(), o = !0, s.forEach((b) => b(g));
    }).catch((b) => {
      I == null || I(void 0, b);
    });
  };
  return a.persist = {
    setOptions: (y) => {
      i = {
        ...i,
        ...y
      }, y.storage && (d = y.storage);
    },
    clearStorage: () => {
      d == null || d.removeItem(i.name);
    },
    getOptions: () => i,
    rehydrate: () => w(),
    hasHydrated: () => o,
    onHydrate: (y) => (c.add(y), () => {
      c.delete(y);
    }),
    onFinishHydration: (y) => (s.add(y), () => {
      s.delete(y);
    })
  }, i.skipHydration || w(), g || E;
}, Kr = Qa, Za = Gr()(
  Kr(
    (e) => ({
      isAuthenticated: !0,
      setAuthenticated: (t) => e({ isAuthenticated: t }),
      logout: () => e({ isAuthenticated: !1 })
    }),
    {
      name: "auth-storage",
      storage: Gt(() => localStorage),
      partialize: (e) => ({ isAuthenticated: e.isAuthenticated })
    }
  )
);
Gr()(
  Kr(
    (e) => ({
      isStandalone: !1,
      setStandalone: (t) => e({ isStandalone: t })
    }),
    {
      name: "app-mode-storage",
      storage: Gt(() => localStorage),
      partialize: (e) => ({ isStandalone: e.isStandalone })
    }
  )
);
const ui = ({
  children: e,
  redirectTo: t = "/"
}) => Za((n) => n.isAuthenticated) ? /* @__PURE__ */ ir(fn, { children: e }) : /* @__PURE__ */ ir(ga, { to: t, replace: !0 }), qa = "account-upgrade", ei = "host", Be = {
  ROUTING: {
    REMOTE_NAVIGATION: "[account-upgrade]:remote-navigation",
    HOST_NAVIGATION: "[account-upgrade]:host-navigation",
    // TODO: this should be dynamic, and also sync with the host angular app
    MAIN_HOST_NAVIGATION: ei,
    MAIN_REMOTE_NAVIGATION: qa
  }
}, ci = "/onboarding-v3", di = {
  BO: "bo",
  BRM: "brm"
}, fi = (e) => {
  const t = zt(), r = Ce(), n = xr(null);
  ht(() => {
    const i = (o) => {
      const { appName: c, path: s } = o.detail;
      c === e && s !== r.pathname && t(s);
    };
    return window.addEventListener(
      Be.ROUTING.REMOTE_NAVIGATION,
      i
    ), () => {
      window.removeEventListener(
        Be.ROUTING.REMOTE_NAVIGATION,
        i
      );
    };
  }, [t, r.pathname, e]), ht(() => {
    r.pathname.includes(`/${e}`) && a(r.pathname);
  }, [r.pathname, e]);
  const a = (i) => {
    if (i !== n.current) {
      n.current = i;
      const o = new CustomEvent(Be.ROUTING.HOST_NAVIGATION, {
        detail: {
          appName: e,
          path: i
        }
      });
      window.dispatchEvent(o);
    }
  };
  return a;
}, ti = (e, t) => {
  const r = xr(null);
  return ht(() => {
    const a = (i) => {
      const { appName: o, path: c } = i.detail;
      if (o === e) {
        const s = c.replace(`/${e}`, "");
        s !== r.current && t(s || "/");
      }
    };
    return window.addEventListener(
      Be.ROUTING.HOST_NAVIGATION,
      a
    ), () => {
      window.removeEventListener(
        Be.ROUTING.HOST_NAVIGATION,
        a
      );
    };
  }, [e, t]), (a) => {
    if (a !== r.current) {
      r.current = a;
      const i = `/${e}${a}`, o = new CustomEvent(
        Be.ROUTING.REMOTE_NAVIGATION,
        {
          detail: {
            appName: e,
            path: i
          }
        }
      );
      window.dispatchEvent(o);
    }
  };
}, hi = ({
  isStandAlone: e = !1,
  routes: t,
  initialPath: r,
  appName: n
}) => {
  const a = e ? Ca(t) : ya(t, {
    initialEntries: [r ?? "/"]
  }), i = ti(n, (o) => {
    e || a.navigate(o);
  });
  return ht(() => {
    if (e) return;
    const o = a.subscribe((c) => {
      const s = c.location.pathname;
      i(s);
    });
    return () => o();
  }, [a, e, i]), a;
}, _t = "", ri = {
  ROOT: _t,
  KYC_LVL2: `${_t}/kyc-lvl2`,
  KYC_LVL3: `${_t}/kyc-lvl3`
}, Mt = "", ni = {
  ROOT: Mt,
  KYC_LVL2: `${Mt}/kyc-lvl2`,
  KYC_LVL3: `${Mt}/kyc-lvl3`
}, mi = {
  BO: { ...ri },
  BRM: { ...ni }
};
var ai = /* @__PURE__ */ ((e) => (e.BO = "bo", e.BRM = "brm", e))(ai || {});
export {
  ei as ANGULAR_HOST_APP_NAME,
  ri as BO_ROUTES,
  ni as BRM_ROUTES,
  Be as EVENTS,
  ci as HOST_FEDERATED_BASE_PATH,
  di as MFE_APPS_BASE_PATH,
  qa as MFE_APP_NAME_INSIDE_ANGULAR_HOST,
  ai as MicroFrontendApp,
  mi as PATHS,
  ui as ProtectedRoute,
  si as config,
  fi as useHostNavigation,
  ti as useRemoteNavigation,
  hi as useRemoteRouter
};
