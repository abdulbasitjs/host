import _ from "react";
const H = (t) => {
  let r;
  const e = /* @__PURE__ */ new Set(), s = (i, g) => {
    const f = typeof i == "function" ? i(r) : i;
    if (!Object.is(f, r)) {
      const h = r;
      r = g ?? (typeof f != "object" || f === null) ? f : Object.assign({}, r, f), e.forEach((m) => m(r, h));
    }
  }, a = () => r, u = { setState: s, getState: a, getInitialState: () => d, subscribe: (i) => (e.add(i), () => e.delete(i)) }, d = r = t(s, a, u);
  return u;
}, w = (t) => t ? H(t) : H, E = (t) => t;
function x(t, r = E) {
  const e = _.useSyncExternalStore(
    t.subscribe,
    () => r(t.getState()),
    () => r(t.getInitialState())
  );
  return _.useDebugValue(e), e;
}
const F = (t) => {
  const r = w(t), e = (s) => x(r, s);
  return Object.assign(e, r), e;
}, O = (t) => F;
function I(t, r) {
  let e;
  try {
    e = t();
  } catch {
    return;
  }
  return {
    getItem: (a) => {
      var o;
      const S = (d) => d === null ? null : JSON.parse(d, void 0), u = (o = e.getItem(a)) != null ? o : null;
      return u instanceof Promise ? u.then(S) : S(u);
    },
    setItem: (a, o) => e.setItem(
      a,
      JSON.stringify(o, void 0)
    ),
    removeItem: (a) => e.removeItem(a)
  };
}
const b = (t) => (r) => {
  try {
    const e = t(r);
    return e instanceof Promise ? e : {
      then(s) {
        return b(s)(e);
      },
      catch(s) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(s) {
        return this;
      },
      catch(s) {
        return b(s)(e);
      }
    };
  }
}, J = (t, r) => (e, s, a) => {
  let o = {
    storage: I(() => localStorage),
    partialize: (n) => n,
    version: 0,
    merge: (n, v) => ({
      ...v,
      ...n
    }),
    ...r
  }, S = !1;
  const u = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
  let i = o.storage;
  if (!i)
    return t(
      (...n) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`
        ), e(...n);
      },
      s,
      a
    );
  const g = () => {
    const n = o.partialize({ ...s() });
    return i.setItem(o.name, {
      state: n,
      version: o.version
    });
  }, f = a.setState;
  a.setState = (n, v) => {
    f(n, v), g();
  };
  const h = t(
    (...n) => {
      e(...n), g();
    },
    s,
    a
  );
  a.getInitialState = () => h;
  let m;
  const A = () => {
    var n, v;
    if (!i) return;
    S = !1, u.forEach((c) => {
      var l;
      return c((l = s()) != null ? l : h);
    });
    const p = ((v = o.onRehydrateStorage) == null ? void 0 : v.call(o, (n = s()) != null ? n : h)) || void 0;
    return b(i.getItem.bind(i))(o.name).then((c) => {
      if (c)
        if (typeof c.version == "number" && c.version !== o.version) {
          if (o.migrate) {
            const l = o.migrate(
              c.state,
              c.version
            );
            return l instanceof Promise ? l.then((y) => [!0, y]) : [!0, l];
          }
          console.error(
            "State loaded from storage couldn't be migrated since no migrate function was provided"
          );
        } else
          return [!1, c.state];
      return [!1, void 0];
    }).then((c) => {
      var l;
      const [y, R] = c;
      if (m = o.merge(
        R,
        (l = s()) != null ? l : h
      ), e(m, !0), y)
        return g();
    }).then(() => {
      p == null || p(m, void 0), m = s(), S = !0, d.forEach((c) => c(m));
    }).catch((c) => {
      p == null || p(void 0, c);
    });
  };
  return a.persist = {
    setOptions: (n) => {
      o = {
        ...o,
        ...n
      }, n.storage && (i = n.storage);
    },
    clearStorage: () => {
      i == null || i.removeItem(o.name);
    },
    getOptions: () => o,
    rehydrate: () => A(),
    hasHydrated: () => S,
    onHydrate: (n) => (u.add(n), () => {
      u.delete(n);
    }),
    onFinishHydration: (n) => (d.add(n), () => {
      d.delete(n);
    })
  }, o.skipHydration || A(), m || h;
}, j = J, P = O()(
  j(
    (t) => ({
      isAuthenticated: !0,
      setAuthenticated: (r) => t({ isAuthenticated: r }),
      logout: () => t({ isAuthenticated: !1 })
    }),
    {
      name: "auth-storage",
      storage: I(() => localStorage),
      partialize: (t) => ({ isAuthenticated: t.isAuthenticated })
    }
  )
), k = O()(
  j(
    (t) => ({
      isStandalone: !1,
      setStandalone: (r) => t({ isStandalone: r })
    }),
    {
      name: "app-mode-storage",
      storage: I(() => localStorage),
      partialize: (t) => ({ isStandalone: t.isStandalone })
    }
  )
);
export {
  k as useAppModeStore,
  P as useAuthStore
};
