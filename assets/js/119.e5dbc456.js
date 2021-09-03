"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[119],{3204:function(e,t,n){var r=n(5773),a=n(808),l=n(7378);t.Z=function(e){var t=e.width,n=void 0===t?30:t,o=e.height,c=void 0===o?30:o,i=e.className,s=(0,a.Z)(e,["width","height","className"]);return l.createElement("svg",(0,r.Z)({"aria-label":"Menu",className:i,width:n,height:c,viewBox:"0 0 30 30",role:"img",focusable:"false"},s),l.createElement("title",null,"Menu"),l.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"2",d:"M4 7h22M4 15h22M4 23h22"}))}},1148:function(e,t,n){n.d(t,{Z:function(){return we}});var r=n(7378),a=n(8944),l=n(1787),o=n(1765),c="skipToContent_3wvD";function i(e){e.setAttribute("tabindex","-1"),e.focus(),e.removeAttribute("tabindex")}var s=function(){var e=(0,r.useRef)(null);return(0,o.ru)((function(){e.current&&i(e.current)})),r.createElement("div",{ref:e},r.createElement("a",{href:"#main",className:c,onClick:function(e){e.preventDefault();var t=document.querySelector("main:first-of-type")||document.querySelector(".main-wrapper");t&&i(t)}},r.createElement(l.Z,{id:"theme.common.skipToMainContent",description:"The skip to content label used for accessibility, allowing to rapidly navigate to main content with keyboard tab/enter navigation"},"Skip to main content")))},u=n(4309),m="announcementBar_2FrG",d="announcementBarClose_QGKR",f="announcementBarContent_1th2",v="announcementBarCloseable_B17v";var h=function(){var e,t=(0,u.Z)(),n=t.isAnnouncementBarClosed,c=t.closeAnnouncementBar,i=(0,o.LU)().announcementBar;if(!i)return null;var s=i.content,h=i.backgroundColor,g=i.textColor,b=i.isCloseable;return!s||b&&n?null:r.createElement("div",{className:m,style:{backgroundColor:h,color:g},role:"banner"},r.createElement("div",{className:(0,a.Z)(f,(e={},e[v]=b,e)),dangerouslySetInnerHTML:{__html:s}}),b?r.createElement("button",{type:"button",className:d,onClick:c,"aria-label":(0,l.I)({id:"theme.AnnouncementBar.closeButtonAriaLabel",message:"Close",description:"The ARIA label for close button of announcement bar"})},r.createElement("span",{"aria-hidden":"true"},"\xd7")):null)},g=n(5773),b=function(){return null},p=n(353),E={toggle:"toggle_2wFP"},k=function(e){var t=e.icon,n=e.style;return r.createElement("span",{className:(0,a.Z)(E.toggle,E.dark),style:n},t)},Z=function(e){var t=e.icon,n=e.style;return r.createElement("span",{className:(0,a.Z)(E.toggle,E.light),style:n},t)},_=(0,r.memo)((function(e){var t=e.className,n=e.icons,l=e.checked,o=e.disabled,c=e.onChange,i=(0,r.useState)(l),s=i[0],u=i[1],m=(0,r.useState)(!1),d=m[0],f=m[1],v=(0,r.useRef)(null);return r.createElement("div",{className:(0,a.Z)("react-toggle",t,{"react-toggle--checked":s,"react-toggle--focus":d,"react-toggle--disabled":o}),role:"button",tabIndex:-1,onClick:function(e){var t=v.current;if(t)return e.target!==t?(e.preventDefault(),t.focus(),void t.click()):void u(null==t?void 0:t.checked)}},r.createElement("div",{className:"react-toggle-track"},r.createElement("div",{className:"react-toggle-track-check"},n.checked),r.createElement("div",{className:"react-toggle-track-x"},n.unchecked)),r.createElement("div",{className:"react-toggle-thumb"}),r.createElement("input",{ref:v,checked:s,type:"checkbox",className:"react-toggle-screenreader-only","aria-label":"Switch between dark and light mode",onChange:c,onFocus:function(){return f(!0)},onBlur:function(){return f(!1)}}))}));function N(e){var t=(0,o.LU)().colorMode.switchConfig,n=t.darkIcon,a=t.darkIconStyle,l=t.lightIcon,c=t.lightIconStyle,i=(0,p.Z)().isClient;return r.createElement(_,(0,g.Z)({disabled:!i,icons:{checked:r.createElement(k,{icon:n,style:a}),unchecked:r.createElement(Z,{icon:l,style:c})}},e))}var w=n(9237),y=n(9635),C=n(5135),I=function(e){var t=(0,y.TH)(),n=(0,r.useState)(e),a=n[0],l=n[1],c=(0,r.useRef)(!1),i=(0,r.useState)(0),s=i[0],u=i[1],m=(0,r.useCallback)((function(e){null!==e&&u(e.getBoundingClientRect().height)}),[]);return(0,C.Z)((function(t,n){var r=t.scrollY,a=n.scrollY;if(e)if(r<s)l(!0);else{if(c.current)return c.current=!1,void l(!1);a&&0===r&&l(!0);var o=document.documentElement.scrollHeight-s,i=window.innerHeight;a&&r>=a?l(!1):r+i<o&&l(!0)}}),[s,c]),(0,o.ru)((function(){e&&l(!0)})),(0,r.useEffect)((function(){e&&t.hash&&(c.current=!0)}),[t.hash]),{navbarRef:m,isNavbarVisible:a}},L=n(1080),A=n(8245),T=n(808),B=n(9970),D=function(e){var t=e.width,n=void 0===t?20:t,a=e.height,l=void 0===a?20:a,o=(0,T.Z)(e,["width","height"]);return r.createElement("svg",(0,g.Z)({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",width:n,height:l},o),r.createElement("path",{fill:"currentColor",d:"M19.753 10.909c-.624-1.707-2.366-2.726-4.661-2.726-.09 0-.176.002-.262.006l-.016-2.063 3.525-.607c.115-.019.133-.119.109-.231-.023-.111-.167-.883-.188-.976-.027-.131-.102-.127-.207-.109-.104.018-3.25.461-3.25.461l-.013-2.078c-.001-.125-.069-.158-.194-.156l-1.025.016c-.105.002-.164.049-.162.148l.033 2.307s-3.061.527-3.144.543c-.084.014-.17.053-.151.143.019.09.19 1.094.208 1.172.018.08.072.129.188.107l2.924-.504.035 2.018c-1.077.281-1.801.824-2.256 1.303-.768.807-1.207 1.887-1.207 2.963 0 1.586.971 2.529 2.328 2.695 3.162.387 5.119-3.06 5.769-4.715 1.097 1.506.256 4.354-2.094 5.98-.043.029-.098.129-.033.207l.619.756c.08.096.206.059.256.023 2.51-1.73 3.661-4.515 2.869-6.683zm-7.386 3.188c-.966-.121-.944-.914-.944-1.453 0-.773.327-1.58.876-2.156a3.21 3.21 0 011.229-.799l.082 4.277a2.773 2.773 0 01-1.243.131zm2.427-.553l.046-4.109c.084-.004.166-.01.252-.01.773 0 1.494.145 1.885.361.391.217-1.023 2.713-2.183 3.758zm-8.95-7.668a.196.196 0 00-.196-.145h-1.95a.194.194 0 00-.194.144L.008 16.916c-.017.051-.011.076.062.076h1.733c.075 0 .099-.023.114-.072l1.008-3.318h3.496l1.008 3.318c.016.049.039.072.113.072h1.734c.072 0 .078-.025.062-.076-.014-.05-3.083-9.741-3.494-11.04zm-2.618 6.318l1.447-5.25 1.447 5.25H3.226z"}))};function S(e){var t=e.mobile,n=e.dropdownItemsBefore,a=e.dropdownItemsAfter,l=(0,T.Z)(e,["mobile","dropdownItemsBefore","dropdownItemsAfter"]),c=(0,p.Z)().i18n,i=c.currentLocale,s=c.locales,u=c.localeConfigs,m=(0,o.l5)();function d(e){return u[e].label}var f=s.map((function(e){var t="pathname://"+m.createUrl({locale:e,fullyQualified:!1});return{isNavLink:!0,label:d(e),to:t,target:"_self",autoAddBaseUrl:!1,className:e===i?"dropdown__link--active":"",style:{textTransform:"capitalize"}}})),v=[].concat(n,f,a),h=t?"Languages":d(i);return r.createElement(B.Z,(0,g.Z)({},l,{href:"#",mobile:t,label:r.createElement("span",null,r.createElement(D,{style:{verticalAlign:"text-bottom",marginRight:5}}),r.createElement("span",null,h)),items:v}))}var x="searchWrapper_36Ie";function M(e){return e.mobile?null:r.createElement("div",{className:x},r.createElement(b,null))}var U={default:function(){return B.Z},localeDropdown:function(){return S},search:function(){return M},docsVersion:function(){return n(1393).Z},docsVersionDropdown:function(){return n(8259).Z},doc:function(){return n(5807).Z}};function P(e){var t=e.type,n=(0,T.Z)(e,["type"]),a=function(e){void 0===e&&(e="default");var t=U[e];if(!t)throw new Error("No NavbarItem component found for type="+e+".");return t()}(t);return r.createElement(a,n)}var H=n(3059),R=n(3204),W="displayOnlyInLargeViewport_2XYw",V="navbarHideable_z9Sw",O="navbarHidden_2kTK",F="right";var z=function(){var e,t=(0,o.LU)(),n=t.navbar,l=n.items,c=n.hideOnScroll,i=n.style,s=t.colorMode.disableSwitch,u=(0,r.useState)(!1),m=u[0],d=u[1],f=(0,w.Z)(),v=f.isDarkTheme,h=f.setLightTheme,p=f.setDarkTheme,E=I(c),k=E.navbarRef,Z=E.isNavbarVisible;(0,L.Z)(m);var _=(0,r.useCallback)((function(){d(!0)}),[d]),y=(0,r.useCallback)((function(){d(!1)}),[d]),C=(0,r.useCallback)((function(e){return e.target.checked?p():h()}),[h,p]),T=(0,A.Z)();(0,r.useEffect)((function(){T===A.D.desktop&&d(!1)}),[T]);var B=l.some((function(e){return"search"===e.type})),D=function(e){return{leftItems:e.filter((function(e){var t;return"left"===(null!=(t=e.position)?t:F)})),rightItems:e.filter((function(e){var t;return"right"===(null!=(t=e.position)?t:F)}))}}(l),S=D.leftItems,x=D.rightItems;return r.createElement("nav",{ref:k,className:(0,a.Z)("navbar","navbar--fixed-top",(e={"navbar--dark":"dark"===i,"navbar--primary":"primary"===i,"navbar-sidebar--show":m},e[V]=c,e[O]=c&&!Z,e))},r.createElement("div",{className:"navbar__inner"},r.createElement("div",{className:"navbar__items"},null!=l&&0!==l.length&&r.createElement("button",{"aria-label":"Navigation bar toggle",className:"navbar__toggle",type:"button",tabIndex:0,onClick:_,onKeyDown:_},r.createElement(R.Z,null)),r.createElement(H.Z,{className:"navbar__brand",imageClassName:"navbar__logo",titleClassName:(0,a.Z)("navbar__title")}),S.map((function(e,t){return r.createElement(P,(0,g.Z)({},e,{key:t}))}))),r.createElement("div",{className:"navbar__items navbar__items--right"},x.map((function(e,t){return r.createElement(P,(0,g.Z)({},e,{key:t}))})),!s&&r.createElement(N,{className:W,checked:v,onChange:C}),!B&&r.createElement(b,null))),r.createElement("div",{role:"presentation",className:"navbar-sidebar__backdrop",onClick:y}),r.createElement("div",{className:"navbar-sidebar"},r.createElement("div",{className:"navbar-sidebar__brand"},r.createElement(H.Z,{className:"navbar__brand",imageClassName:"navbar__logo",titleClassName:"navbar__title",onClick:y}),!s&&m&&r.createElement(N,{checked:v,onChange:C})),r.createElement("div",{className:"navbar-sidebar__items"},r.createElement("div",{className:"menu"},r.createElement("ul",{className:"menu__list"},l.map((function(e,t){return r.createElement(P,(0,g.Z)({mobile:!0},e,{onClick:y,key:t}))})))))))},G=n(4142),j=n(8948),K="footerLogoLink_1gX9",X=n(8167);function Y(e){var t=e.to,n=e.href,a=e.label,l=e.prependBaseUrlToHref,o=(0,T.Z)(e,["to","href","label","prependBaseUrlToHref"]),c=(0,j.Z)(t),i=(0,j.Z)(n,{forcePrependBaseUrl:!0});return r.createElement(G.Z,(0,g.Z)({className:"footer__link-item"},n?{href:l?i:n}:{to:c},o),a)}var J=function(e){var t=e.sources,n=e.alt;return r.createElement(X.Z,{className:"footer__logo",alt:n,sources:t})};var Q=function(){var e=(0,o.LU)().footer,t=e||{},n=t.copyright,l=t.links,c=void 0===l?[]:l,i=t.logo,s=void 0===i?{}:i,u={light:(0,j.Z)(s.src),dark:(0,j.Z)(s.srcDark||s.src)};return e?r.createElement("footer",{className:(0,a.Z)("footer",{"footer--dark":"dark"===e.style})},r.createElement("div",{className:"container"},c&&c.length>0&&r.createElement("div",{className:"row footer__links"},c.map((function(e,t){return r.createElement("div",{key:t,className:"col footer__col"},null!=e.title?r.createElement("div",{className:"footer__title"},e.title):null,null!=e.items&&Array.isArray(e.items)&&e.items.length>0?r.createElement("ul",{className:"footer__items"},e.items.map((function(e,t){return e.html?r.createElement("li",{key:t,className:"footer__item",dangerouslySetInnerHTML:{__html:e.html}}):r.createElement("li",{key:e.href||e.to,className:"footer__item"},r.createElement(Y,e))}))):null)}))),(s||n)&&r.createElement("div",{className:"footer__bottom text--center"},s&&(s.src||s.srcDark)&&r.createElement("div",{className:"margin-bottom--sm"},s.href?r.createElement(G.Z,{href:s.href,className:K},r.createElement(J,{alt:s.alt,sources:u})):r.createElement(J,{alt:s.alt,sources:u})),n?r.createElement("div",{className:"footer__copyright",dangerouslySetInnerHTML:{__html:n}}):null))):null},q=n(161),$=(0,o.WA)("theme"),ee="light",te="dark",ne=function(e){return e===te?te:ee},re=function(e){(0,o.WA)("theme").set(ne(e))},ae=function(){var e=(0,o.LU)().colorMode,t=e.defaultMode,n=e.disableSwitch,a=e.respectPrefersColorScheme,l=(0,r.useState)(function(e){return q.Z.canUseDOM?ne(document.documentElement.getAttribute("data-theme")):ne(e)}(t)),c=l[0],i=l[1],s=(0,r.useCallback)((function(){i(ee),re(ee)}),[]),u=(0,r.useCallback)((function(){i(te),re(te)}),[]);return(0,r.useEffect)((function(){document.documentElement.setAttribute("data-theme",ne(c))}),[c]),(0,r.useEffect)((function(){if(!n)try{var e=$.get();null!==e&&i(ne(e))}catch(t){console.error(t)}}),[i]),(0,r.useEffect)((function(){n&&!a||window.matchMedia("(prefers-color-scheme: dark)").addListener((function(e){var t=e.matches;i(t?te:ee)}))}),[]),{isDarkTheme:c===te,setLightTheme:s,setDarkTheme:u}},le=n(579);var oe=function(e){var t=ae(),n=t.isDarkTheme,a=t.setLightTheme,l=t.setDarkTheme;return r.createElement(le.Z.Provider,{value:{isDarkTheme:n,setLightTheme:a,setDarkTheme:l}},e.children)};function ce(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ie(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return ce(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ce(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}var se="docusaurus.tab.",ue=function(){var e=(0,r.useState)({}),t=e[0],n=e[1],a=(0,r.useCallback)((function(e,t){(0,o.WA)("docusaurus.tab."+e).set(t)}),[]);return(0,r.useEffect)((function(){try{for(var e,t={},r=ie((0,o._f)());!(e=r()).done;){var a=e.value;if(a.startsWith(se))t[a.substring(se.length)]=(0,o.WA)(a).get()}n(t)}catch(l){console.error(l)}}),[]),{tabGroupChoices:t,setTabGroupChoices:function(e,t){n((function(n){var r;return Object.assign({},n,((r={})[e]=t,r))})),a(e,t)}}},me=(0,o.WA)("docusaurus.announcement.dismiss"),de=(0,o.WA)("docusaurus.announcement.id"),fe=function(){var e=(0,o.LU)().announcementBar,t=(0,r.useState)(!0),n=t[0],a=t[1],l=(0,r.useCallback)((function(){me.set("true"),a(!0)}),[]);return(0,r.useEffect)((function(){if(e){var t=e.id,n=de.get();"annoucement-bar"===n&&(n="announcement-bar");var r=t!==n;de.set(t),r&&me.set("false"),(r||"false"===me.get())&&a(!1)}}),[]),{isAnnouncementBarClosed:n,closeAnnouncementBar:l}},ve=n(4956);var he=function(e){var t=ue(),n=t.tabGroupChoices,a=t.setTabGroupChoices,l=fe(),o=l.isAnnouncementBarClosed,c=l.closeAnnouncementBar;return r.createElement(ve.Z.Provider,{value:{tabGroupChoices:n,setTabGroupChoices:a,isAnnouncementBarClosed:o,closeAnnouncementBar:c}},e.children)};function ge(e){var t=e.children;return r.createElement(oe,null,r.createElement(he,null,r.createElement(o.L5,null,t)))}var be=n(5361);function pe(e){var t=e.locale,n=e.version,a=e.tag;return r.createElement(be.Z,null,t&&r.createElement("meta",{name:"docusaurus_locale",content:""+t}),n&&r.createElement("meta",{name:"docusaurus_version",content:n}),a&&r.createElement("meta",{name:"docusaurus_tag",content:a}))}var Ee=n(1956);function ke(){var e=(0,p.Z)().i18n,t=e.defaultLocale,n=e.locales,a=(0,o.l5)();return r.createElement(be.Z,null,n.map((function(e){return r.createElement("link",{key:e,rel:"alternate",href:a.createUrl({locale:e,fullyQualified:!0}),hrefLang:e})})),r.createElement("link",{rel:"alternate",href:a.createUrl({locale:t,fullyQualified:!0}),hrefLang:"x-default"}))}function Ze(e){var t=e.permalink,n=(0,p.Z)().siteConfig.url,a=function(){var e=(0,p.Z)().siteConfig.url,t=(0,y.TH)().pathname;return e+(0,j.Z)(t)}(),l=t?""+n+t:a;return r.createElement(be.Z,null,r.createElement("meta",{property:"og:url",content:l}),r.createElement("link",{rel:"canonical",href:l}))}function _e(e){var t=(0,p.Z)(),n=t.siteConfig,a=n.favicon,l=n.themeConfig.metadatas,c=t.i18n,i=c.currentLocale,s=c.localeConfigs,u=e.title,m=e.description,d=e.image,f=e.keywords,v=e.searchMetadatas,h=(0,j.Z)(a),b=(0,o.pe)(u),E=i,k=s[i].direction;return r.createElement(r.Fragment,null,r.createElement(be.Z,null,r.createElement("html",{lang:E,dir:k}),a&&r.createElement("link",{rel:"shortcut icon",href:h}),r.createElement("title",null,b),r.createElement("meta",{property:"og:title",content:b})),r.createElement(Ee.Z,{description:m,keywords:f,image:d}),r.createElement(Ze,null),r.createElement(ke,null),r.createElement(pe,(0,g.Z)({tag:o.HX,locale:i},v)),r.createElement(be.Z,null,l.map((function(e,t){return r.createElement("meta",(0,g.Z)({key:"metadata_"+t},e))}))))}var Ne=function(){(0,r.useEffect)((function(){var e="navigation-with-keyboard";function t(t){"keydown"===t.type&&"Tab"===t.key&&document.body.classList.add(e),"mousedown"===t.type&&document.body.classList.remove(e)}return document.addEventListener("keydown",t),document.addEventListener("mousedown",t),function(){document.body.classList.remove(e),document.removeEventListener("keydown",t),document.removeEventListener("mousedown",t)}}),[])};var we=function(e){var t=e.children,n=e.noFooter,l=e.wrapperClassName,c=e.pageClassName;return Ne(),r.createElement(ge,null,r.createElement(_e,e),r.createElement(s,null),r.createElement(h,null),r.createElement(z,null),r.createElement("div",{className:(0,a.Z)(o.kM.wrapper.main,l,c)},t),!n&&r.createElement(Q,null))}},3059:function(e,t,n){var r=n(5773),a=n(808),l=n(7378),o=n(4142),c=n(8167),i=n(8948),s=n(353),u=n(1765);t.Z=function(e){var t=(0,s.Z)().isClient,n=(0,u.LU)().navbar,m=n.title,d=n.logo,f=void 0===d?{src:""}:d,v=e.imageClassName,h=e.titleClassName,g=(0,a.Z)(e,["imageClassName","titleClassName"]),b=(0,i.Z)(f.href||"/"),p={light:(0,i.Z)(f.src),dark:(0,i.Z)(f.srcDark||f.src)};return l.createElement(o.Z,(0,r.Z)({to:b},g,f.target&&{target:f.target}),f.src&&l.createElement(c.Z,{key:t,className:v,sources:p,alt:f.alt||m||"Logo"}),null!=m&&l.createElement("strong",{className:h},m))}},9970:function(e,t,n){var r=n(5773),a=n(808),l=n(7378),o=n(8944),c=n(4142),i=n(8948),s=n(9635),u=n(1765);function m(e){var t=e.activeBasePath,n=e.activeBaseRegex,o=e.to,s=e.href,u=e.label,m=e.activeClassName,d=void 0===m?"navbar__link--active":m,f=e.prependBaseUrlToHref,v=(0,a.Z)(e,["activeBasePath","activeBaseRegex","to","href","label","activeClassName","prependBaseUrlToHref"]),h=(0,i.Z)(o),g=(0,i.Z)(t),b=(0,i.Z)(s,{forcePrependBaseUrl:!0});return l.createElement(c.Z,(0,r.Z)({},s?{href:f?b:s}:Object.assign({isNavLink:!0,activeClassName:d,to:h},t||n?{isActive:function(e,t){return n?new RegExp(n).test(t.pathname):t.pathname.startsWith(g)}}:null),v),u)}function d(e){var t,n=e.items,c=e.position,i=e.className,s=(0,a.Z)(e,["items","position","className"]),u=(0,l.useRef)(null),d=(0,l.useRef)(null),f=(0,l.useState)(!1),v=f[0],h=f[1];(0,l.useEffect)((function(){var e=function(e){u.current&&!u.current.contains(e.target)&&h(!1)};return document.addEventListener("mousedown",e),document.addEventListener("touchstart",e),function(){document.removeEventListener("mousedown",e),document.removeEventListener("touchstart",e)}}),[u]);var g=function(e,t){return void 0===t&&(t=!1),(0,o.Z)({"navbar__item navbar__link":!t,dropdown__link:t},e)};return n?l.createElement("div",{ref:u,className:(0,o.Z)("navbar__item","dropdown","dropdown--hoverable",{"dropdown--left":"left"===c,"dropdown--right":"right"===c,"dropdown--show":v})},l.createElement(m,(0,r.Z)({className:g(i)},s,{onClick:s.to?void 0:function(e){return e.preventDefault()},onKeyDown:function(e){"Enter"===e.key&&(e.preventDefault(),h(!v))}}),null!=(t=s.children)?t:s.label),l.createElement("ul",{ref:d,className:"dropdown__menu"},n.map((function(e,t){var o=e.className,c=(0,a.Z)(e,["className"]);return l.createElement("li",{key:t},l.createElement(m,(0,r.Z)({onKeyDown:function(e){if(t===n.length-1&&"Tab"===e.key){e.preventDefault(),h(!1);var r=u.current.nextElementSibling;r&&r.focus()}},activeClassName:"dropdown__link--active",className:g(o,!0)},c)))})))):l.createElement(m,(0,r.Z)({className:g(i)},s))}function f(e){var t,n,c,i=e.items,d=e.className,f=(e.position,(0,a.Z)(e,["items","className","position"])),v=(0,l.useRef)(null),h=(0,s.TH)().pathname,g=(0,l.useState)((function(){var e;return null==(e=!(null!=i&&i.some((function(e){return(0,u.Mg)(e.to,h)}))))||e})),b=g[0],p=g[1],E=function(e,t){return void 0===t&&(t=!1),(0,o.Z)("menu__link",{"menu__link--sublist":t},e)};if(!i)return l.createElement("li",{className:"menu__list-item"},l.createElement(m,(0,r.Z)({className:E(d)},f)));var k=null!=(t=v.current)&&t.scrollHeight?(null==(n=v.current)?void 0:n.scrollHeight)+"px":void 0;return l.createElement("li",{className:(0,o.Z)("menu__list-item",{"menu__list-item--collapsed":b})},l.createElement(m,(0,r.Z)({role:"button",className:E(d,!0)},f,{onClick:function(e){e.preventDefault(),p((function(e){return!e}))}}),null!=(c=f.children)?c:f.label),l.createElement("ul",{className:"menu__list",ref:v,style:{height:b?void 0:k}},i.map((function(e,t){var n=e.className,o=(0,a.Z)(e,["className"]);return l.createElement("li",{className:"menu__list-item",key:t},l.createElement(m,(0,r.Z)({activeClassName:"menu__link--active",className:E(n)},o,{onClick:f.onClick})))}))))}t.Z=function(e){var t=e.mobile,n=void 0!==t&&t,r=(0,a.Z)(e,["mobile"]),o=n?f:d;return l.createElement(o,r)}},5807:function(e,t,n){n.d(t,{Z:function(){return u}});var r=n(5773),a=n(808),l=n(7378),o=n(9970),c=n(6889),i=n(8944),s=n(1765);function u(e){var t,n,u=e.docId,m=e.activeSidebarClassName,d=e.label,f=e.docsPluginId,v=(0,a.Z)(e,["docId","activeSidebarClassName","label","docsPluginId"]),h=(0,c.Iw)(f),g=h.activeVersion,b=h.activeDoc,p=(0,s.J)(f).preferredVersion,E=(0,c.yW)(f),k=null!=(t=null!=g?g:p)?t:E,Z=k.docs.find((function(e){return e.id===u}));if(!Z){var _=k.docs.map((function(e){return e.id})).join("\n- ");throw new Error("DocNavbarItem: couldn't find any doc with id="+u+" in version "+k.name+".\nAvailable docIds=\n- "+_)}return l.createElement(o.Z,(0,r.Z)({exact:!0},v,{className:(0,i.Z)(v.className,(n={},n[m]=b&&b.sidebar===Z.sidebar,n)),label:null!=d?d:Z.id,to:Z.path}))}},8259:function(e,t,n){n.d(t,{Z:function(){return u}});var r=n(5773),a=n(808),l=n(7378),o=n(9970),c=n(6889),i=n(1765),s=function(e){return e.docs.find((function(t){return t.id===e.mainDocId}))};function u(e){var t,n,u=e.mobile,m=e.docsPluginId,d=e.dropdownActiveClassDisabled,f=e.dropdownItemsBefore,v=e.dropdownItemsAfter,h=(0,a.Z)(e,["mobile","docsPluginId","dropdownActiveClassDisabled","dropdownItemsBefore","dropdownItemsAfter"]),g=(0,c.Iw)(m),b=(0,c.gB)(m),p=(0,c.yW)(m),E=(0,i.J)(m),k=E.preferredVersion,Z=E.savePreferredVersionName;var _=null!=(t=null!=(n=g.activeVersion)?n:k)?t:p,N=u?"Versions":_.label,w=u?void 0:s(_).path;return l.createElement(o.Z,(0,r.Z)({},h,{mobile:u,label:N,to:w,items:function(){var e=b.map((function(e){var t=(null==g?void 0:g.alternateDocVersions[e.name])||s(e);return{isNavLink:!0,label:e.label,to:t.path,isActive:function(){return e===(null==g?void 0:g.activeVersion)},onClick:function(){Z(e.name)}}})),t=[].concat(f,e,v);if(!(t.length<=1))return t}(),isActive:d?function(){return!1}:void 0}))}},1393:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(5773),a=n(808),l=n(7378),o=n(9970),c=n(6889),i=n(1765);function s(e){var t,n=e.label,s=e.to,u=e.docsPluginId,m=(0,a.Z)(e,["label","to","docsPluginId"]),d=(0,c.zu)(u),f=(0,i.J)(u).preferredVersion,v=(0,c.yW)(u),h=null!=(t=null!=d?d:f)?t:v,g=null!=n?n:h.label,b=null!=s?s:function(e){return e.docs.find((function(t){return t.id===e.mainDocId}))}(h).path;return l.createElement(o.Z,(0,r.Z)({},m,{label:g,to:b}))}},6119:function(e,t,n){n.r(t);var r=n(7378),a=n(1148),l=n(1787);t.default=function(){return r.createElement(a.Z,{title:"Page Not Found"},r.createElement("main",{className:"container margin-vert--xl"},r.createElement("div",{className:"row"},r.createElement("div",{className:"col col--6 col--offset-3"},r.createElement("h1",{className:"hero__title"},r.createElement(l.Z,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),r.createElement("p",null,r.createElement(l.Z,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),r.createElement("p",null,r.createElement(l.Z,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."))))))}},579:function(e,t,n){var r=n(7378).createContext(void 0);t.Z=r},8167:function(e,t,n){n.d(t,{Z:function(){return u}});var r=n(5773),a=n(808),l=n(7378),o=n(8944),c=n(353),i=n(9237),s={themedImage:"themedImage_Ir0T","themedImage--light":"themedImage--light_2_E0","themedImage--dark":"themedImage--dark_2JiM"},u=function(e){var t=(0,c.Z)().isClient,n=(0,i.Z)().isDarkTheme,u=e.sources,m=e.className,d=e.alt,f=void 0===d?"":d,v=(0,a.Z)(e,["sources","className","alt"]),h=t?n?["dark"]:["light"]:["light","dark"];return l.createElement(l.Fragment,null,h.map((function(e){return l.createElement("img",(0,r.Z)({key:e,src:u[e],alt:f,className:(0,o.Z)(s.themedImage,s["themedImage--"+e],m)},v))})))}},4956:function(e,t,n){var r=(0,n(7378).createContext)(void 0);t.Z=r},1080:function(e,t,n){var r=n(7378);t.Z=function(e){void 0===e&&(e=!0),(0,r.useEffect)((function(){return document.body.style.overflow=e?"hidden":"visible",function(){document.body.style.overflow="visible"}}),[e])}},5135:function(e,t,n){var r=n(7378),a=n(161),l=function(){return{scrollX:a.Z.canUseDOM?window.pageXOffset:0,scrollY:a.Z.canUseDOM?window.pageYOffset:0}};t.Z=function(e,t){void 0===t&&(t=[]);var n=(0,r.useRef)(l()),a=function(){var t=l();e&&e(t,n.current),n.current=t};(0,r.useEffect)((function(){var e={passive:!0};return a(),window.addEventListener("scroll",a,e),function(){return window.removeEventListener("scroll",a,e)}}),t)}},9237:function(e,t,n){var r=n(7378),a=n(579);t.Z=function(){var e=(0,r.useContext)(a.Z);if(null==e)throw new Error("`useThemeContext` is used outside of `Layout` Component. See https://docusaurus.io/docs/api/themes/configuration#usethemecontext.");return e}},4309:function(e,t,n){var r=n(7378),a=n(4956);t.Z=function(){var e=(0,r.useContext)(a.Z);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},8245:function(e,t,n){n.d(t,{D:function(){return l}});var r=n(7378),a=n(161),l={desktop:"desktop",mobile:"mobile"};t.Z=function(){var e=a.Z.canUseDOM;function t(){if(e)return window.innerWidth>996?l.desktop:l.mobile}var n=(0,r.useState)(t),o=n[0],c=n[1];return(0,r.useEffect)((function(){if(e)return window.addEventListener("resize",n),function(){return window.removeEventListener("resize",n)};function n(){c(t())}}),[]),o}}}]);