"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[412],{5318:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var a=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,h=u["".concat(s,".").concat(m)]||u[m]||c[m]||l;return n?a.createElement(h,i(i({ref:t},d),{},{components:n})):a.createElement(h,i({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var p=2;p<l;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},517:function(e,t,n){var a=n(7378);t.Z=function(e){var t=e.children,n=e.hidden,r=e.className;return a.createElement("div",{role:"tabpanel",hidden:n,className:r},t)}},6359:function(e,t,n){n.d(t,{Z:function(){return d}});var a=n(7378),r=n(4309),l=n(8944),i="tabItem_c0e5",o="tabItemActive_28AG";var s=37,p=39;var d=function(e){var t=e.lazy,n=e.block,d=e.defaultValue,c=e.values,u=e.groupId,m=e.className,h=(0,r.Z)(),k=h.tabGroupChoices,y=h.setTabGroupChoices,f=(0,a.useState)(d),v=f[0],g=f[1],b=a.Children.toArray(e.children),N=[];if(null!=u){var x=k[u];null!=x&&x!==v&&c.some((function(e){return e.value===x}))&&g(x)}var w=function(e){var t=e.currentTarget,n=N.indexOf(t),a=c[n].value;g(a),null!=u&&(y(u,a),setTimeout((function(){var e,n,a,r,l,i,s,p;(e=t.getBoundingClientRect(),n=e.top,a=e.left,r=e.bottom,l=e.right,i=window,s=i.innerHeight,p=i.innerWidth,n>=0&&l<=p&&r<=s&&a>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(o),setTimeout((function(){return t.classList.remove(o)}),2e3))}),150))},T=function(e){var t,n;switch(e.keyCode){case p:var a=N.indexOf(e.target)+1;n=N[a]||N[0];break;case s:var r=N.indexOf(e.target)-1;n=N[r]||N[N.length-1]}null==(t=n)||t.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":n},m)},c.map((function(e){var t=e.value,n=e.label;return a.createElement("li",{role:"tab",tabIndex:v===t?0:-1,"aria-selected":v===t,className:(0,l.Z)("tabs__item",i,{"tabs__item--active":v===t}),key:t,ref:function(e){return N.push(e)},onKeyDown:T,onFocus:w,onClick:w},n)}))),t?(0,a.cloneElement)(b.filter((function(e){return e.props.value===v}))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},b.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==v})}))))}},4956:function(e,t,n){var a=(0,n(7378).createContext)(void 0);t.Z=a},4309:function(e,t,n){var a=n(7378),r=n(4956);t.Z=function(){var e=(0,a.useContext)(r.Z);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},8988:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},metadata:function(){return p},toc:function(){return d},default:function(){return u}});var a=n(5773),r=n(808),l=(n(7378),n(5318)),i=n(6359),o=n(517),s={id:"setup",title:"Manual Setup"},p={unversionedId:"advanced/setup",id:"advanced/setup",isDocsHomePage:!1,title:"Manual Setup",description:"\x3c!--",source:"@site/docs/advanced/setup.mdx",sourceDirName:"advanced",slug:"/advanced/setup",permalink:"/create-bridge-extension/advanced/setup",version:"current",frontMatter:{id:"setup",title:"Manual Setup"},sidebar:"docs",previous:{title:"Use Auth",permalink:"/create-bridge-extension/recipes/use_auth"},next:{title:"Using Thunks",permalink:"/create-bridge-extension/advanced/thunks"}},d=[{value:"Prerequisits",id:"prerequisits",children:[]},{value:"Create a new project folder",id:"create-a-new-project-folder",children:[]},{value:"Set up NPM and install the required dependencies",id:"set-up-npm-and-install-the-required-dependencies",children:[]},{value:"Add dependencies",id:"add-dependencies",children:[{value:"Install <code>dependencies</code>.",id:"install-dependencies",children:[]},{value:"Install <code>devDependencies</code>",id:"install-devdependencies",children:[]}]},{value:"Add entry point",id:"add-entry-point",children:[]},{value:"Add first module",id:"add-first-module",children:[]},{value:"Create Spec file",id:"create-spec-file",children:[]},{value:"Deploy Extension",id:"deploy-extension",children:[]}],c={toc:d};function u(e){var t=e.components,n=(0,r.Z)(e,["components"]);return(0,l.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"prerequisits"},"Prerequisits"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Make sure you have ",(0,l.kt)("inlineCode",{parentName:"li"},"NodeJS")," installed."),(0,l.kt)("li",{parentName:"ul"},"You can use ",(0,l.kt)("inlineCode",{parentName:"li"},"npm")," installed with ",(0,l.kt)("inlineCode",{parentName:"li"},"NodeJS")," but you can also use ",(0,l.kt)("inlineCode",{parentName:"li"},"yarn"),"."),(0,l.kt)("li",{parentName:"ul"},"To run the extension on ",(0,l.kt)("a",{parentName:"li",href:"https://www.smartsheet.com/platform/bridge"},"Bridge by Smartsheet")," you will need an account."),(0,l.kt)("li",{parentName:"ul"},"Knowledge and understanding of JavaScript or TypeScript on NodeJS.")),(0,l.kt)("h2",{id:"create-a-new-project-folder"},"Create a new project folder"),(0,l.kt)("p",null,"In a terminal, navigate to where you want your project to exist and create a new directory for your extension."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir helloworld\ncd helloworld\n")),(0,l.kt)("h2",{id:"set-up-npm-and-install-the-required-dependencies"},"Set up NPM and install the required dependencies"),(0,l.kt)("p",null,"Create a file called ",(0,l.kt)("inlineCode",{parentName:"p"},"package.json")," at the root of your project directory and populate the file with the contents below depending on whether you are making a JavaScript or TypeScript extension."),(0,l.kt)(i.Z,{groupId:"js2ts",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"TypeScript",value:"ts"}],mdxType:"Tabs"},(0,l.kt)(o.Z,{value:"js",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "name": "helloworld",\n  "version": "1.0.0",\n  "private": true,\n  "publishConfig": {\n    "access": "restricted"\n  },\n  "main": "src/index.js",\n  "scripts": {\n    "logs": "extension-scripts logs",\n    "deploy": "extension-scripts deploy",\n    "deploy:verbose": "extension-scripts deploy -l verbose"\n  }\n}\n'))),(0,l.kt)(o.Z,{value:"ts",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "name": "helloworld",\n  "version": "1.0.0",\n  "private": true,\n  "publishConfig": {\n    "access": "restricted"\n  },\n  "main": "lib/index.js",\n  "scripts": {\n    "account": "extension-scripts account",\n    "logs": "extension-scripts logs",\n    "deploy": "extension-scripts deploy",\n    "deploy:verbose": "extension-scripts deploy -l verbose"\n  }\n}\n')))),(0,l.kt)("p",null,"The first line is the name of your extension. The next 5 lines are less important for extension development but they ensure NPM is configrued correctly."),(0,l.kt)("p",null,"The next two lines are important properties for extension development: ",(0,l.kt)("inlineCode",{parentName:"p"},"main")," is the ",(0,l.kt)("a",{parentName:"p",href:"/concepts/entry"},"Entry Point"),"; ",(0,l.kt)("inlineCode",{parentName:"p"},"scripts")," is a colection of npm scripts to help interact with the extension tooling."),(0,l.kt)("p",null,"This file will continue to grow through this setup."),(0,l.kt)("h2",{id:"add-dependencies"},"Add dependencies"),(0,l.kt)("h3",{id:"install-dependencies"},"Install ",(0,l.kt)("inlineCode",{parentName:"h3"},"dependencies"),"."),(0,l.kt)(i.Z,{groupId:"npm2yarn",defaultValue:"npm",values:[{label:"NPM",value:"npm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},(0,l.kt)(o.Z,{value:"npm",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"npm i @smartsheet-bridge/extension-handler\n"))),(0,l.kt)(o.Z,{value:"yarn",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add @smartsheet-bridge/extension-handler\n")))),(0,l.kt)("h3",{id:"install-devdependencies"},"Install ",(0,l.kt)("inlineCode",{parentName:"h3"},"devDependencies")),(0,l.kt)(i.Z,{groupId:"npm2yarn",defaultValue:"npm",values:[{label:"NPM",value:"npm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},(0,l.kt)(o.Z,{value:"npm",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"npm i -D @smartsheet-bridge/extension-scripts\n"))),(0,l.kt)(o.Z,{value:"yarn",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add -D @smartsheet-bridge/extension-scripts\n")))),(0,l.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"If you are creating a TypeScript extension make sure you install TypeScript as a ",(0,l.kt)("inlineCode",{parentName:"p"},"devDependency")," too."),(0,l.kt)(i.Z,{groupId:"npm2yarn",defaultValue:"npm",values:[{label:"NPM",value:"npm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},(0,l.kt)(o.Z,{value:"npm",mdxType:"TabItem"},(0,l.kt)("pre",{parentName:"div"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"npm i -D typescript\n"))),(0,l.kt)(o.Z,{value:"yarn",mdxType:"TabItem"},(0,l.kt)("pre",{parentName:"div"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add -D typescript\n")))))),(0,l.kt)("h2",{id:"add-entry-point"},"Add ",(0,l.kt)("a",{parentName:"h2",href:"/concepts/entry"},"Entry Point")),(0,l.kt)("p",null,"The filepath of the ",(0,l.kt)("a",{parentName:"p",href:"/concepts/entry"},"Entry Point")," relative to the ",(0,l.kt)("inlineCode",{parentName:"p"},"package.json")," file must match the ",(0,l.kt)("inlineCode",{parentName:"p"},"main")," property within. E.g. if you are creating a JavaScript extension and you've created a ",(0,l.kt)("inlineCode",{parentName:"p"},"package.json")," file with the value of property ",(0,l.kt)("inlineCode",{parentName:"p"},"main")," set to ",(0,l.kt)("inlineCode",{parentName:"p"},"src/index.js")," then this file must exist at the path ",(0,l.kt)("inlineCode",{parentName:"p"},"src/index.js"),"."),(0,l.kt)(i.Z,{groupId:"js2ts",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"TypeScript",value:"ts"}],mdxType:"Tabs"},(0,l.kt)(o.Z,{value:"js",mdxType:"TabItem"},(0,l.kt)("p",null,"Create a ",(0,l.kt)("inlineCode",{parentName:"p"},"src")," directory and an ",(0,l.kt)("inlineCode",{parentName:"p"},"index.js")," file within. Add the following content."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="src/index.js"',title:'"src/index.js"'},'const { createBridgeHandler } = require("@smartsheet-bridge/extension-handler");\n\nexports.main = createBridgeHandler();\n'))),(0,l.kt)(o.Z,{value:"ts",mdxType:"TabItem"},(0,l.kt)("p",null,"Create a ",(0,l.kt)("inlineCode",{parentName:"p"},"src")," directory and an ",(0,l.kt)("inlineCode",{parentName:"p"},"index.ts")," file within. Add the following content."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="src/index.ts"',title:'"src/index.ts"'},'import { createBridgeHandler } from "@smartsheet-bridge/extension-handler";\n\nexport const main = createBridgeHandler();\n')))),(0,l.kt)("p",null,"The first line imports the necessary dependencies. "),(0,l.kt)("p",null,"The third line exports your extension ",(0,l.kt)("a",{parentName:"p",href:"/concepts/entry"},"Entry Point")," that we will configure next."),(0,l.kt)("h2",{id:"add-first-module"},"Add first module"),(0,l.kt)("p",null,"Create a module that can take one input, called ",(0,l.kt)("inlineCode",{parentName:"p"},"input"),", and return a property called ",(0,l.kt)("inlineCode",{parentName:"p"},"result")," that is a concatenated string. This file should also live in the ",(0,l.kt)("inlineCode",{parentName:"p"},"src")," directory."),(0,l.kt)(i.Z,{groupId:"js2ts",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"TypeScript",value:"ts"}],mdxType:"Tabs"},(0,l.kt)(o.Z,{value:"js",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="src/helloworld.js"',title:'"src/helloworld.js"'},"exports.helloworld = (params) => {\n  return { result: `Hello, ${params.input}!` };\n};\n"))),(0,l.kt)(o.Z,{value:"ts",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="src/helloworld.ts"',title:'"src/helloworld.ts"'},'import { ModuleFunction } from "@smartsheet-bridge/extension-handler";\n\ntype HelloWorldParams = { input: string };\n\nexport const helloworld: ModuleFunction<HelloWorldParams> = (params) => {\n  return { result: `Hello, ${params.input}!` };\n};\n')))),(0,l.kt)("p",null,"Ammend the ",(0,l.kt)("inlineCode",{parentName:"p"},"src/index")," file to include the newly made module."),(0,l.kt)(i.Z,{groupId:"js2ts",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"TypeScript",value:"ts"}],mdxType:"Tabs"},(0,l.kt)(o.Z,{value:"js",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="src/index.js" {2,4-8}',title:'"src/index.js"',"{2,4-8}":!0},'const { createBridgeHandler } = require("@smartsheet-bridge/extension-handler");\nconst { helloworld } = require("./helloworld");\n\nexports.main = createBridgeHandler({\n  modules: {\n    helloworld: helloworld,\n  },\n});\n'))),(0,l.kt)(o.Z,{value:"ts",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="src/index.ts" {2,4-8}',title:'"src/index.ts"',"{2,4-8}":!0},'import { createBridgeHandler } from "@smartsheet-bridge/extension-handler";\nimport { helloworld } from "./helloworld";\n\nexport const main = createBridgeHandler({\n  modules: {\n    helloworld: helloworld,\n  },\n});\n')))),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"The property of the module must equal the name defined in the ",(0,l.kt)("a",{parentName:"em",href:"/concepts/spec"},"Spec File")," described next. In this case, helloworld is the name of the module so we shall use that in the ",(0,l.kt)("a",{parentName:"em",href:"/concepts/spec"},"Spec File"),".")),(0,l.kt)("h2",{id:"create-spec-file"},"Create ",(0,l.kt)("a",{parentName:"h2",href:"/concepts/spec"},"Spec File")),(0,l.kt)("p",null,"Finally, you must create a ",(0,l.kt)("a",{parentName:"p",href:"/concepts/spec"},"Spec File")," to help describe the extension to the user interface. This is the same regardless of the language used to create the extension."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="extension.json"',title:'"extension.json"'},'{\n  "name": "helloworld",\n  "displayName": "Hello World",\n  "module": [\n    {\n      "id": "helloworld",\n      "name": "Hello World",\n      "hasReturn": true,\n      "param": [\n        {\n          "param": "input",\n          "displayName": "Your name",\n          "type": "STRING"\n        }\n      ]\n    }\n  ]\n}\n')),(0,l.kt)("p",null,"This file describes the extension with the name ",(0,l.kt)("inlineCode",{parentName:"p"},"helloworld"),", that has one module with the id ",(0,l.kt)("inlineCode",{parentName:"p"},"helloworld"),", that has one parameter with the param called ",(0,l.kt)("inlineCode",{parentName:"p"},"input"),"."),(0,l.kt)("p",null,"In this example, ",(0,l.kt)("inlineCode",{parentName:"p"},"helloworld")," is the unique id of the extension you are going to deploy next but also the unique id of the module within the extension that must exist in the ",(0,l.kt)("inlineCode",{parentName:"p"},"modules")," property of ",(0,l.kt)("inlineCode",{parentName:"p"},"createBridgeHandler"),". The module has one parameter called ",(0,l.kt)("inlineCode",{parentName:"p"},"input")," that will be accessible on the first parameter of the module. E.g. ",(0,l.kt)("inlineCode",{parentName:"p"},"params.input"),"."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"And you're finished \ud83d\ude0e")),(0,l.kt)("h2",{id:"deploy-extension"},"Deploy Extension"),(0,l.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"To deploy an extension on ",(0,l.kt)("a",{parentName:"p",href:"https://www.smartsheet.com/platform/bridge"},"Bridge by Smartsheet")," you will need an account."))),(0,l.kt)("p",null,"To deploy an extension created with the ",(0,l.kt)("inlineCode",{parentName:"p"},"create-bridge-extension")," tool simply run the following command from the project directory where ",(0,l.kt)("inlineCode",{parentName:"p"},"<insert url here>")," is the url of your ",(0,l.kt)("a",{parentName:"p",href:"https://www.smartsheet.com/platform/bridge"},"Bridge by Smartsheet")," account that you can find in the browser when viewing the application, and ",(0,l.kt)("inlineCode",{parentName:"p"},"<insert key here>")," is an API key that can be generated in your Bridge by Smartsheet account."),(0,l.kt)(i.Z,{groupId:"npm2yarn",defaultValue:"npm",values:[{label:"NPM",value:"npm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},(0,l.kt)(o.Z,{value:"npm",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"npm run deploy -- --url=<insert url here> --key=<insert key here>\n"))),(0,l.kt)(o.Z,{value:"yarn",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"yarn deploy --url=<insert url here> --key=<insert key here>\n")))))}u.isMDXComponent=!0},8944:function(e,t,n){function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function r(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}n.d(t,{Z:function(){return r}})}}]);