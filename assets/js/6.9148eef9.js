(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{446:function(t,n,e){"use strict";e.d(n,"c",(function(){return o})),e.d(n,"d",(function(){return u})),e.d(n,"e",(function(){return s})),e.d(n,"a",(function(){return c})),e.d(n,"b",(function(){return f}));e(41),e(102),e(105),e(253);var r=/#.*$/,i=/\.(md|html)$/,l=/\/$/,a=/^(https?:|mailto:|tel:)/;function o(t){return a.test(t)}function u(t){return/^mailto:/.test(t)}function s(t){return/^tel:/.test(t)}function c(t){if(o(t))return t;var n=t.match(r),e=n?n[0]:"",a=function(t){return decodeURI(t).replace(r,"").replace(i,"")}(t);return l.test(a)?t:a+".html"+e}function f(t,n,e){if(!t)return e;for(var r,i=n;(i=i.$parent)&&!r;)r=i.$refs[t];return r&&r.$el&&(r=r.$el),r||e}},472:function(t,n,e){},484:function(t,n,e){"use strict";e(472)},500:function(t,n,e){"use strict";e.r(n);e(256),e(108),e(9),e(107);var r=e(446),i={props:{link:{required:!0}},computed:{normalizedlink:function(){return Object(r.a)(this.link)},exact:function(){var t=this;return this.$site.locales?Object.keys(this.$site.locales).some((function(n){return n===t.normalizedlink})):"/"===this.normalizedlink}},methods:{isExternal:r.c,isMailto:r.d,isTel:r.e}},l=(e(484),e(18)),a=Object(l.a)(i,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return t.isExternal(t.normalizedlink)?e("a",{staticClass:"nav-link external",attrs:{href:t.normalizedlink,target:t.isMailto(t.normalizedlink)||t.isTel(t.normalizedlink)?null:"_blank",rel:t.isMailto(t.normalizedlink)||t.isTel(t.normalizedlink)?null:"noopener noreferrer"}},[t._t("default")],2):e("router-link",{staticClass:"nav-link",attrs:{to:t.normalizedlink,exact:t.exact}},[t._t("default")],2)}),[],!1,null,null,null);n.default=a.exports}}]);