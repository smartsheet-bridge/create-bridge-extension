"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[152],{5318:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var r=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=l(n),m=a,h=p["".concat(c,".").concat(m)]||p[m]||u[m]||i;return n?r.createElement(h,o(o({ref:t},d),{},{components:n})):r.createElement(h,o({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=p;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},3596:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(7378),a=n(8944),i="tableOfContentsInline_1jjz";function o(e){var t=e.toc,n=e.isChild;return t.length?r.createElement("ul",{className:n?"":"table-of-contents"},t.map((function(e){return r.createElement("li",{key:e.id},r.createElement("a",{href:"#"+e.id,dangerouslySetInnerHTML:{__html:e.value}}),r.createElement(o,{isChild:!0,toc:e.children}))}))):null}var s=function(e){var t=e.toc;return r.createElement("div",{className:(0,a.Z)(i)},r.createElement(o,{toc:t}))}},517:function(e,t,n){var r=n(7378);t.Z=function(e){var t=e.children,n=e.hidden,a=e.className;return r.createElement("div",{role:"tabpanel",hidden:n,className:a},t)}},6359:function(e,t,n){n.d(t,{Z:function(){return d}});var r=n(7378),a=n(4309),i=n(8944),o="tabItem_c0e5",s="tabItemActive_28AG";var c=37,l=39;var d=function(e){var t=e.lazy,n=e.block,d=e.defaultValue,u=e.values,p=e.groupId,m=e.className,h=(0,a.Z)(),f=h.tabGroupChoices,v=h.setTabGroupChoices,g=(0,r.useState)(d),b=g[0],k=g[1],y=r.Children.toArray(e.children),w=[];if(null!=p){var x=f[p];null!=x&&x!==b&&u.some((function(e){return e.value===x}))&&k(x)}var N=function(e){var t=e.currentTarget,n=w.indexOf(t),r=u[n].value;k(r),null!=p&&(v(p,r),setTimeout((function(){var e,n,r,a,i,o,c,l;(e=t.getBoundingClientRect(),n=e.top,r=e.left,a=e.bottom,i=e.right,o=window,c=o.innerHeight,l=o.innerWidth,n>=0&&i<=l&&a<=c&&r>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(s),setTimeout((function(){return t.classList.remove(s)}),2e3))}),150))},S=function(e){var t,n;switch(e.keyCode){case l:var r=w.indexOf(e.target)+1;n=w[r]||w[0];break;case c:var a=w.indexOf(e.target)-1;n=w[a]||w[w.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},m)},u.map((function(e){var t=e.value,n=e.label;return r.createElement("li",{role:"tab",tabIndex:b===t?0:-1,"aria-selected":b===t,className:(0,i.Z)("tabs__item",o,{"tabs__item--active":b===t}),key:t,ref:function(e){return w.push(e)},onKeyDown:S,onFocus:N,onClick:N},n)}))),t?(0,r.cloneElement)(y.filter((function(e){return e.props.value===b}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},y.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==b})}))))}},4956:function(e,t,n){var r=(0,n(7378).createContext)(void 0);t.Z=r},4309:function(e,t,n){var r=n(7378),a=n(4956);t.Z=function(){var e=(0,r.useContext)(a.Z);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},2100:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},metadata:function(){return c},toc:function(){return l},default:function(){return u}});var r=n(5773),a=n(808),i=(n(7378),n(5318)),o=(n(6359),n(517),n(3596)),s={id:"intro",title:"Introduction",sidebar_label:"Introduction",slug:"/"},c={unversionedId:"getting_started/intro",id:"getting_started/intro",isDocsHomePage:!1,title:"Introduction",description:"This page is an overview of the Bridge by Smartsheet extension documentation and related resources.",source:"@site/docs/getting_started/intro.mdx",sourceDirName:"getting_started",slug:"/",permalink:"/create-bridge-extension/",version:"current",sidebar_label:"Introduction",frontMatter:{id:"intro",title:"Introduction",sidebar_label:"Introduction",slug:"/"},sidebar:"docs",next:{title:"Quick Start",permalink:"/create-bridge-extension/getting_started/quick_start"}},l=[{value:"Getting Started",id:"getting-started",children:[{value:"Create a new Extension",id:"create-a-new-extension",children:[]}]},{value:"Learn Extension Development",id:"learn-extension-development",children:[{value:"First Steps",id:"first-steps",children:[]},{value:"Extensions for Beginners",id:"extensions-for-beginners",children:[]},{value:"Common Recipes",id:"common-recipes",children:[]},{value:"Advanced Concepts",id:"advanced-concepts",children:[]},{value:"For Enterprise Teams",id:"for-enterprise-teams",children:[]},{value:"API Reference",id:"api-reference",children:[]}]},{value:"Staying Informed",id:"staying-informed",children:[]},{value:"Something Missing?",id:"something-missing",children:[]}],d={toc:l};function u(e){var t=e.components,n=(0,a.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"This page is an overview of the ",(0,i.kt)("a",{parentName:"em",href:"https://www.smartsheet.com/platform/bridge"},"Bridge by Smartsheet")," extension documentation and related resources.")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.smartsheet.com/platform/bridge"},"Bridge by Smartsheet")," workflow system is an extensible platform that offers users the ability to run arbitrary code at specific points in a workflow that can be as simple as executing a calculation or as advanced as integrating with third-party app or platform. There are numerous integrations and utilities that come with the platform but it's also possible to create your own. This documentation will describe how to create an extension using the best practices set out by the ",(0,i.kt)("a",{parentName:"p",href:"https://www.smartsheet.com/platform/bridge"},"Bridge by Smartsheet")," Extensions team."),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},(0,i.kt)("a",{parentName:"p",href:"https://www.smartsheet.com/platform/bridge"},"Bridge by Smartsheet")," extensions can be deployed on versions 10, 12, and 14 of ",(0,i.kt)("a",{parentName:"p",href:"https://nodejs.org/en/"},(0,i.kt)("inlineCode",{parentName:"a"},"NodeJS")),". The recommended version is v14."))),(0,i.kt)("hr",null),(0,i.kt)(o.Z,{toc:l,mdxType:"TOCInline"}),(0,i.kt)("h2",{id:"getting-started"},"Getting Started"),(0,i.kt)("p",null,"Extensions have been designed for easy adoption, and our goal is to reduce the barrier of entry for potential extension developers allowing you to focus on the business objectives of your extension offloading everything else that makes a good system reliable on us."),(0,i.kt)("h3",{id:"create-a-new-extension"},"Create a new Extension"),(0,i.kt)("p",null,"When starting an Extension project, the recommended approach is to use our ",(0,i.kt)("a",{parentName:"p",href:"/getting_started/quick_start"},"Quick Start")," guide. It only takes a minute to set up!"),(0,i.kt)("p",null,"As your extension requirements grow, you might want to consider a more enterprise setup. There are several toolchains we recommend for larger extension development teams."),(0,i.kt)("h2",{id:"learn-extension-development"},"Learn Extension Development"),(0,i.kt)("p",null,"Like any unfamiliar technology, Extension development does have a learning curve. However, we have designed the extension development to be as familiar with JavaScript developers as possible allowing us to flatten that learning curve significantly. With some light reading, and a little practice, you ",(0,i.kt)("em",{parentName:"p"},"will")," find extension development very easy."),(0,i.kt)("h3",{id:"first-steps"},"First Steps"),(0,i.kt)("p",null,"Follow the ",(0,i.kt)("a",{parentName:"p",href:"/getting_started/quick_start"},"Quick Start"),' guide to set up a simple "Hello, World!" extension including deploying the extension to a ',(0,i.kt)("a",{parentName:"p",href:"https://www.smartsheet.com/platform/bridge"},"Bridge by Smartsheet")," account."),(0,i.kt)("h3",{id:"extensions-for-beginners"},"Extensions for Beginners"),(0,i.kt)("p",null,"Once you are comfortable with the examples above, check out this extensions ",(0,i.kt)("a",{parentName:"p",href:"/concepts/introduction"},"main concepts")," guide. It introduces the most important concepts in a detailed, beginner-friendly way."),(0,i.kt)("h4",{id:"javascript-resources"},"JavaScript Resources"),(0,i.kt)("p",null,"This documentation assumes some familiarity with programming in the JavaScript language. You don't have to be an expert, but it's harder to learn extension development and JavaScript at the same time."),(0,i.kt)("p",null,"We recommend going through ",(0,i.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript"},"this JavaScript overview")," to check your knowledge level. It will take you between 30 minutes and an hour but you will feel more confident learning extension development."),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Whenever you get confused by something in JavaScript, ",(0,i.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript"},"MDN")," and ",(0,i.kt)("a",{parentName:"p",href:"https://javascript.info/"},"javascript.info")," are great websites to check."))),(0,i.kt)("h3",{id:"common-recipes"},"Common Recipes"),(0,i.kt)("p",null,"Once you\u2019re done with the ",(0,i.kt)("a",{parentName:"p",href:"/concepts/introduction"},"main concepts"),", you should check out common recipes including ",(0,i.kt)("a",{parentName:"p",href:"/recipes/add_module"},"add module"),". You'll then have everything you need to know to build custom extensions and provide added value for your organization's experience on Smartsheet."),(0,i.kt)("h3",{id:"advanced-concepts"},"Advanced Concepts"),(0,i.kt)("p",null,"Once you're comfortable with the ",(0,i.kt)("a",{parentName:"p",href:"/concepts/introduction"},"main concepts")," and played with extensions a little bit, you might be interested in more advanced guides. This section will introduce you to the powerful, but less commonly used extension features like ",(0,i.kt)("a",{parentName:"p",href:"/advanced/thunks"},"thunks")," and ",(0,i.kt)("a",{parentName:"p",href:"/advanced/best_practices"},"best practices"),"."),(0,i.kt)("h3",{id:"for-enterprise-teams"},"For Enterprise Teams"),(0,i.kt)("p",null,"If you're coming to this documentation as part of an enterprise engineering team, then check our ",(0,i.kt)("a",{parentName:"p",href:"/advanced/best_practices"},"these resources")," on best practices and how to make use of features like using ",(0,i.kt)("a",{parentName:"p",href:"/advanced/typescript"},"TypeScript"),", ",(0,i.kt)("a",{parentName:"p",href:"/advanced/tests"},"running tests"),", and integrating with ",(0,i.kt)("a",{parentName:"p",href:"/advanced/pipeline"},"CI/CD pipelines"),"."),(0,i.kt)("h3",{id:"api-reference"},"API Reference"),(0,i.kt)("p",null,"This documentation section is useful when you want to learn more details about a particular extensions API."),(0,i.kt)("h2",{id:"staying-informed"},"Staying Informed"),(0,i.kt)("p",null,"The team is working on a way to provide simple communication around releases. However, the best way to ensure you don't miss anything is to star us on ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/smartsheet-bridge/create-bridge-extension"},"GitHub")," and watch out for releases."),(0,i.kt)("h2",{id:"something-missing"},"Something Missing?"),(0,i.kt)("p",null,"If something is missing in the documentation or if you found some part confusing, please file an issue for the documentation on ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/smartsheet-bridge/create-bridge-extension"},"GitHub")," with your suggestions for improvement."))}u.isMDXComponent=!0},8944:function(e,t,n){function r(e){var t,n,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(a&&(a+=" "),a+=n);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}function a(){for(var e,t,n=0,a="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(a&&(a+=" "),a+=t);return a}n.d(t,{Z:function(){return a}})}}]);