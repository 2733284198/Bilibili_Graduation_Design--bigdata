!function () {
    "use strict";
    function e(e) {
        var n = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;"
        };
        return String(e).replace(/[&<>"'\/]/g, function (e) { return n[e] })
    }
    function n(e) {
        var n = [];
        return h.dom.findAll("a:not([data-nosearch])").map(function (t) {
            var o = t.href, i = t.getAttribute("href"), r = e.parse(o).path;
            r && -1 === n.indexOf(r) && !Docsify.util.isAbsolutePath(i) && n.push(r)
        }), n
    }
    function t(e) {
        localStorage.setItem("docsify.search.expires", Date.now() + e),
            localStorage.setItem("docsify.search.index", JSON.stringify(g))
    }
    function o(e, n, t, o) {
        void 0 === n && (n = "");
        var i, r = window.marked.lexer(n), a = window.Docsify.slugify, s = {};
        return r.forEach(function (n) {
            if ("heading" === n.type && n.depth <= o)
                i = t.toURL(e, { id: a(n.text) }), s[i] = { slug: i, title: n.text, body: "" };
            else {
                if (!i) return;
                s[i] ? s[i].body ? s[i].body += "\n" + (n.text || "") : s[i].body = n.text : s[i] = { slug: i, title: "", body: "" }
            }
        }), a.clear(), s
    }
    function i(n) {
        var t = [], o = []; Object.keys(g).forEach(function (e) {
            o = o.concat(Object.keys(g[e]).map(function (n) { return g[e][n] }))
        }), n = n.trim();
        var i = n.split(/[\s\-\，\\\/]+/);
        1 !== i.length && (i = [].concat(n, i));
        for (var r = 0; r < o.length; r++)!function (n) {
            var r = o[n], a = !1, s = "", c = r.title && r.title.trim(), l = r.body && r.body.trim(), f = r.slug || "";
            if (c && l && (i.forEach(function (n, t) {
                var o = new RegExp(n, "gi"), i = -1, r = -1;
                if (i = c && c.search(o), r = l && l.search(o), i < 0 && r < 0)
                    a = !1;
                else {
                    a = !0, r < 0 && (r = 0);
                    var f = 0, d = 0;
                    f = r < 11 ? 0 : r - 10, d = 0 === f ? 70 : r + n.length + 60, d > l.length && (d = l.length);
                    var p = "..." + e(l).substring(f, d).replace(o, '<em class="search-keyword">' + n + "</em>") + "...";
                    s += p
                }
            }), a)) {
                var d = {
                    title: e(c),
                    content: s,
                    url: f
                };
                t.push(d)
            }
        }(r);
        return t
    }
    function r(e, i) {
        h = Docsify;
        var r = "auto" === e.paths, a = localStorage.getItem("docsify.search.expires") < Date.now();
        if (g = JSON.parse(localStorage.getItem("docsify.search.index")), a)
            g = {};
        else if (!r)
            return;
        var s = r ? n(i.router) : e.paths, c = s.length, l = 0; s.forEach(function (n) {
            if (g[n])
                return l++;
            h.get(i.router.getFile(n)).then(function (r) {
                g[n] = o(n, r, i.router, e.depth), c === ++l && t(e.maxAge)
            })
        })
    }
    function a() {
        Docsify.dom.style("\n.sidebar {\n  padding-top: 0;\n}\n\n.search {\n  margin-bottom: 20px;\n  padding: 6px;\n  border-bottom: 1px solid #eee;\n}\n\n.search .results-panel {\n  display: none;\n}\n\n.search .results-panel.show {\n  display: block;\n}\n\n.search input {\n  outline: none;\n  border: none;\n  width: 100%;\n  padding: 7px;\n  line-height: 22px;\n  font-size: 14px;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n\n.search h2 {\n  font-size: 17px;\n  margin: 10px 0;\n}\n\n.search a {\n  text-decoration: none;\n  color: inherit;\n}\n\n.search .matching-post {\n  border-bottom: 1px solid #eee;\n}\n\n.search .matching-post:last-child {\n  border-bottom: 0;\n}\n\n.search p {\n  font-size: 14px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n\n.search p.empty {\n  text-align: center;\n}")
    } function s(e, n) { void 0 === n && (n = ""); var t = '<input type="search" value="' + n + '" /><div class="results-panel"></div></div>', o = Docsify.dom.create("div", t), i = Docsify.dom.find("aside"); Docsify.dom.toggleClass(o, "search"), Docsify.dom.before(i, o) } function c(e) { var n = Docsify.dom.find("div.search"), t = Docsify.dom.find(n, ".results-panel"); if (!e) return t.classList.remove("show"), void (t.innerHTML = ""); var o = i(e), r = ""; o.forEach(function (e) { r += '<div class="matching-post">\n<a href="' + e.url + '">    \n<h2>' + e.title + "</h2>\n<p>" + e.content + "</p>\n</a>\n</div>" }), t.classList.add("show"), t.innerHTML = r || '<p class="empty">' + y + "</p>" } function l() { var e, n = Docsify.dom.find("div.search"), t = Docsify.dom.find(n, "input"); Docsify.dom.on(n, "click", function (e) { return "A" !== e.target.tagName && e.stopPropagation() }), Docsify.dom.on(t, "input", function (n) { clearTimeout(e), e = setTimeout(function (e) { return c(n.target.value.trim()) }, 100) }) } function f(e, n) { var t = Docsify.dom.getNode('.search input[type="search"]'); if (t) if ("string" == typeof e) t.placeholder = e; else { var o = Object.keys(e).filter(function (e) { return n.indexOf(e) > -1 })[0]; t.placeholder = e[o] } } function d(e, n) { if ("string" == typeof e) y = e; else { var t = Object.keys(e).filter(function (e) { return n.indexOf(e) > -1 })[0]; y = e[t] } } function p(e, n) { var t = n.router.parse().query.s; a(), s(e, t), l(), t && setTimeout(function (e) { return c(t) }, 500) } function u(e, n) { f(e.placeholder, n.route.path), d(e.noData, n.route.path) } var h, g = {}, y = "", m = { placeholder: "Type to search", noData: "No Results!", paths: "auto", depth: 2, maxAge: 864e5 }, v = function (e, n) { var t = Docsify.util, o = n.config.search || m; Array.isArray(o) ? m.paths = o : "object" == typeof o && (m.paths = Array.isArray(o.paths) ? o.paths : "auto", m.maxAge = t.isPrimitive(o.maxAge) ? o.maxAge : m.maxAge, m.placeholder = o.placeholder || m.placeholder, m.noData = o.noData || m.noData, m.depth = o.depth || m.depth); var i = "auto" === m.paths; e.mounted(function (e) { p(m, n), !i && r(m, n) }), e.doneEach(function (e) { u(m, n), i && r(m, n) }) };
    $docsify.plugins = [].concat(v, $docsify.plugins)
}();
