(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[441],{5318:function(e,t,n){"use strict";n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(7378);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),f=l(n),m=o,d=f["".concat(s,".").concat(m)]||f[m]||p[m]||i;return n?r.createElement(d,a(a({ref:t},u),{},{components:n})):r.createElement(d,a({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=f;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},517:function(e,t,n){"use strict";var r=n(7378);t.Z=function(e){var t=e.children,n=e.hidden,o=e.className;return r.createElement("div",{role:"tabpanel",hidden:n,className:o},t)}},6359:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var r=n(7378),o=n(4309),i=n(8944),a="tabItem_c0e5",c="tabItemActive_28AG";var s=37,l=39;var u=function(e){var t=e.lazy,n=e.block,u=e.defaultValue,p=e.values,f=e.groupId,m=e.className,d=(0,o.Z)(),y=d.tabGroupChoices,h=d.setTabGroupChoices,g=(0,r.useState)(u),v=g[0],b=g[1],k=r.Children.toArray(e.children),x=[];if(null!=f){var w=y[f];null!=w&&w!==v&&p.some((function(e){return e.value===w}))&&b(w)}var O=function(e){var t=e.currentTarget,n=x.indexOf(t),r=p[n].value;b(r),null!=f&&(h(f,r),setTimeout((function(){var e,n,r,o,i,a,s,l;(e=t.getBoundingClientRect(),n=e.top,r=e.left,o=e.bottom,i=e.right,a=window,s=a.innerHeight,l=a.innerWidth,n>=0&&i<=l&&o<=s&&r>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(c),setTimeout((function(){return t.classList.remove(c)}),2e3))}),150))},E=function(e){var t,n;switch(e.keyCode){case l:var r=x.indexOf(e.target)+1;n=x[r]||x[0];break;case s:var o=x.indexOf(e.target)-1;n=x[o]||x[x.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},m)},p.map((function(e){var t=e.value,n=e.label;return r.createElement("li",{role:"tab",tabIndex:v===t?0:-1,"aria-selected":v===t,className:(0,i.Z)("tabs__item",a,{"tabs__item--active":v===t}),key:t,ref:function(e){return x.push(e)},onKeyDown:E,onFocus:O,onClick:O},n)}))),t?(0,r.cloneElement)(k.filter((function(e){return e.props.value===v}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},k.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==v})}))))}},4956:function(e,t,n){"use strict";var r=(0,n(7378).createContext)(void 0);t.Z=r},4309:function(e,t,n){"use strict";var r=n(7378),o=n(4956);t.Z=function(){var e=(0,r.useContext)(o.Z);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},8026:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return s},metadata:function(){return l},toc:function(){return u},default:function(){return f}});var r=n(9603),o=n(120),i=(n(7378),n(5318)),a=n(6359),c=n(517),s={id:"entry",title:"Entry Point"},l={unversionedId:"concepts/entry",id:"concepts/entry",isDocsHomePage:!1,title:"Entry Point",description:'The "entry point" is the point of entry for the application and is used to configure and serve the entire extension for runtime execution. All extension requests will enter through this point.',source:"@site/docs/concepts/entry.mdx",sourceDirName:"concepts",slug:"/concepts/entry",permalink:"/create-bridge-extension/concepts/entry",version:"current",frontMatter:{id:"entry",title:"Entry Point"},sidebar:"docs",previous:{title:"Intoduction to Extensions",permalink:"/create-bridge-extension/concepts/introduction"},next:{title:"Functions",permalink:"/create-bridge-extension/concepts/function"}},u=[],p={toc:u};function f(e){var t=e.components,n=(0,o.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,'The "',(0,i.kt)("a",{parentName:"p",href:"/concepts/entry"},"Entry Point"),'" is the point of entry for the application and is used to configure and serve the entire extension for runtime execution. All extension requests will enter through this point.'),(0,i.kt)("p",null,"The only requirement for the ",(0,i.kt)("a",{parentName:"p",href:"/concepts/entry"},"Entry Point")," is that it ",(0,i.kt)("strong",{parentName:"p"},"must")," export a function called ",(0,i.kt)("inlineCode",{parentName:"p"},"main")," that has the signature of the expected runtime platform."),(0,i.kt)("p",null,"E.g."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"export const main = ...\n")),(0,i.kt)("p",null,"or"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"export function main...\n")),(0,i.kt)("p",null,"In nearly all cases the you will never need to write this function by hand. Instead, you can use one of the helper methods designed for the platform you wish to work with to create this function for you. E.g. The ",(0,i.kt)("inlineCode",{parentName:"p"},"createBridgeHandler")," will set up this function perfectly so that your extension will work with Bridge now and in the futre. This is the recommended way of developing extensions to ensure you are always up to date."),(0,i.kt)(a.Z,{groupId:"js2ts",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"TypeScript",value:"ts"}],mdxType:"Tabs"},(0,i.kt)(c.Z,{value:"js",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"import { createBridgeHandler } from '@smartsheet-bridge/extension-handler';\nimport { myFunction } from './myFunction';\nimport { onRegister } from './onRegister';\n\nexport const main = createBridgeHandler({\n  onRegister,\n  modules: { myFunction },\n});\n"))),(0,i.kt)(c.Z,{value:"ts",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"import { createBridgeHandler } from '@smartsheet-bridge/extension-handler';\nimport { myFunction } from './myFunction';\nimport { onRegister } from './onRegister';\n\nexport const main = createBridgeHandler({\n  onRegister,\n  modules: { myFunction },\n});\n")))),(0,i.kt)("p",null,"As you add more functions and callbacks to your extension you simply need to add them to the handler and it will handle all requests to your extension."))}f.isMDXComponent=!0},8944:function(e,t,n){"use strict";function r(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(o&&(o+=" "),o+=n);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function o(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(o&&(o+=" "),o+=t);return o}n.d(t,{Z:function(){return o}})}}]);