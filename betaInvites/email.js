var emailjs = (function (e) {
  "use strict";
  const t = {
      origin: "https://api.emailjs.com",
      blockHeadless: !1,
      storageProvider: (() => {
        if ("undefined" != typeof localStorage)
          return {
            get: (e) => localStorage.getItem(e),
            set: (e, t) => localStorage.setItem(e, t),
            remove: (e) => localStorage.removeItem(e),
          };
      })(),
    },
    i = (e) =>
      e
        ? "string" == typeof e
          ? { publicKey: e }
          : "[object Object]" === e.toString()
          ? e
          : {}
        : {},
    r = function (e) {
      let r =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : "https://api.emailjs.com";
      if (!e) return;
      const o = i(e);
      (t.publicKey = o.publicKey),
        (t.blockHeadless = o.blockHeadless),
        (t.storageProvider = o.storageProvider),
        (t.blockList = o.blockList),
        (t.limitRate = o.limitRate),
        (t.origin = o.origin || r);
    };
  class o {
    constructor() {
      let e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
        t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : "Network Error";
      (this.status = e), (this.text = t);
    }
  }
  const s = async function (e, i) {
      let r =
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      const s = await fetch(t.origin + e, {
          method: "POST",
          headers: r,
          body: i,
        }),
        a = await s.text(),
        n = new o(s.status, a);
      if (s.ok) return n;
      throw n;
    },
    a = (e, t, i) => {
      if (!e || "string" != typeof e)
        throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
      if (!t || "string" != typeof t)
        throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
      if (!i || "string" != typeof i)
        throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
    },
    n = (e) => e.webdriver || !e.languages || 0 === e.languages.length,
    l = () => new o(451, "Unavailable For Headless Browser"),
    c = (e, t) => {
      if (
        ((e) => {
          var t;
          return !(
            null !== (t = e.list) &&
            void 0 !== t &&
            t.length &&
            e.watchVariable
          );
        })(e)
      )
        return !1;
      ((e, t) => {
        if (!Array.isArray(e)) throw "The BlockList list has to be an array";
        if ("string" != typeof t)
          throw "The BlockList watchVariable has to be a string";
      })(e.list, e.watchVariable);
      const i =
        ((r = t),
        (o = e.watchVariable),
        r instanceof FormData ? r.get(o) : r[o]);
      var r, o;
      return "string" == typeof i && e.list.includes(i);
    },
    d = () => new o(403, "Forbidden"),
    m = (e, t, i) => {
      setTimeout(() => {
        i.remove(e);
      }, t);
    },
    h = (e, t, i) => {
      if (!t.throttle || !i) return !1;
      ((e, t) => {
        if ("number" != typeof e || e < 0)
          throw "The LimitRate throttle has to be a positive number";
        if (t && "string" != typeof t)
          throw "The LimitRate ID has to be a string";
      })(t.throttle, t.id);
      const r = t.id || e,
        o = ((e, t, i) => {
          const r = Number(i.get(e) || 0);
          return t - Date.now() + r;
        })(r, t.throttle, i);
      return o > 0
        ? (m(r, o, i), !0)
        : (i.set(r, Date.now().toString()), m(r, t.throttle, i), !1);
    },
    p = () => new o(429, "Too Many Requests"),
    u = (e, r, o, m) => {
      const u = i(m),
        b = u.publicKey || t.publicKey,
        g = u.blockHeadless || t.blockHeadless,
        f = t.storageProvider || u.storageProvider,
        v = { ...t.blockList, ...u.blockList },
        w = { ...t.limitRate, ...u.limitRate };
      if (g && n(navigator)) return Promise.reject(l());
      if (
        (a(b, e, r),
        ((e) => {
          if (e && "[object Object]" !== e.toString())
            throw "The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/";
        })(o),
        o && c(v, o))
      )
        return Promise.reject(d());
      if (h(location.pathname, w, f)) return Promise.reject(p());
      const y = {
        lib_version: "4.2.0",
        user_id: b,
        service_id: e,
        template_id: r,
        template_params: o,
      };
      return s("/api/v1.0/email/send", JSON.stringify(y), {
        "Content-type": "application/json",
      });
    },
    b = (e, r, o, m) => {
      const u = i(m),
        b = u.publicKey || t.publicKey,
        g = u.blockHeadless || t.blockHeadless,
        f = t.storageProvider || u.storageProvider,
        v = { ...t.blockList, ...u.blockList },
        w = { ...t.limitRate, ...u.limitRate };
      if (g && n(navigator)) return Promise.reject(l());
      const y = ((e) => ("string" == typeof e ? document.querySelector(e) : e))(
        o
      );
      a(b, e, r),
        ((e) => {
          if (!e || "FORM" !== e.nodeName)
            throw "The 3rd parameter is expected to be the HTML form element or the style selector of the form";
        })(y);
      const j = new FormData(y);
      return c(v, j)
        ? Promise.reject(d())
        : h(location.pathname, w, f)
        ? Promise.reject(p())
        : (j.append("lib_version", "4.2.0"),
          j.append("service_id", e),
          j.append("template_id", r),
          j.append("user_id", b),
          s("/api/v1.0/email/send-form", j));
    };
  var g = { init: r, send: u, sendForm: b };
  return (
    (e.default = g),
    (e.init = r),
    (e.send = u),
    (e.sendForm = b),
    Object.defineProperty(e, "__esModule", { value: !0 }),
    e
  );
})({});
