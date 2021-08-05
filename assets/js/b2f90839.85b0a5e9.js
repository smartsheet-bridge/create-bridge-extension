(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[739],{5318:function(e,t,n){"use strict";n.d(t,{Zo:function(){return m},kt:function(){return p}});var a=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),d=u(n),p=r,g=d["".concat(s,".").concat(p)]||d[p]||c[p]||i;return n?a.createElement(g,l(l({ref:t},m),{},{components:n})):a.createElement(g,l({ref:t},m))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var u=2;u<i;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},517:function(e,t,n){"use strict";var a=n(7378);t.Z=function(e){var t=e.children,n=e.hidden,r=e.className;return a.createElement("div",{role:"tabpanel",hidden:n,className:r},t)}},6359:function(e,t,n){"use strict";n.d(t,{Z:function(){return m}});var a=n(7378),r=n(4309),i=n(8944),l="tabItem_c0e5",o="tabItemActive_28AG";var s=37,u=39;var m=function(e){var t=e.lazy,n=e.block,m=e.defaultValue,c=e.values,d=e.groupId,p=e.className,g=(0,r.Z)(),h=g.tabGroupChoices,k=g.setTabGroupChoices,N=(0,a.useState)(m),M=N[0],y=N[1],v=a.Children.toArray(e.children),w=[];if(null!=d){var L=h[d];null!=L&&L!==M&&c.some((function(e){return e.value===L}))&&y(L)}var I=function(e){var t=e.currentTarget,n=w.indexOf(t),a=c[n].value;y(a),null!=d&&(k(d,a),setTimeout((function(){var e,n,a,r,i,l,s,u;(e=t.getBoundingClientRect(),n=e.top,a=e.left,r=e.bottom,i=e.right,l=window,s=l.innerHeight,u=l.innerWidth,n>=0&&i<=u&&r<=s&&a>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(o),setTimeout((function(){return t.classList.remove(o)}),2e3))}),150))},j=function(e){var t,n;switch(e.keyCode){case u:var a=w.indexOf(e.target)+1;n=w[a]||w[0];break;case s:var r=w.indexOf(e.target)-1;n=w[r]||w[w.length-1]}null==(t=n)||t.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},p)},c.map((function(e){var t=e.value,n=e.label;return a.createElement("li",{role:"tab",tabIndex:M===t?0:-1,"aria-selected":M===t,className:(0,i.Z)("tabs__item",l,{"tabs__item--active":M===t}),key:t,ref:function(e){return w.push(e)},onKeyDown:j,onFocus:I,onClick:I},n)}))),t?(0,a.cloneElement)(v.filter((function(e){return e.props.value===M}))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},v.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==M})}))))}},4956:function(e,t,n){"use strict";var a=(0,n(7378).createContext)(void 0);t.Z=a},4309:function(e,t,n){"use strict";var a=n(7378),r=n(4956);t.Z=function(){var e=(0,a.useContext)(r.Z);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},2981:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return s},metadata:function(){return u},toc:function(){return m},default:function(){return d}});var a=n(9603),r=n(120),i=(n(7378),n(5318)),l=n(6359),o=n(517),s={id:"doc1",title:"Style Guide"},u={unversionedId:"doc1",id:"doc1",isDocsHomePage:!1,title:"Style Guide",description:"You can write content using GitHub-flavored Markdown syntax.",source:"@site/docs/doc1.md",sourceDirName:".",slug:"/doc1",permalink:"/create-bridge-extension/doc1",version:"current",frontMatter:{id:"doc1",title:"Style Guide"}},m=[{value:"Markdown Syntax",id:"markdown-syntax",children:[]},{value:"Headers",id:"headers",children:[]},{value:"H2 - Create the best documentation",id:"h2---create-the-best-documentation",children:[{value:"H3 - Create the best documentation",id:"h3---create-the-best-documentation",children:[]}]},{value:"Emphasis",id:"emphasis",children:[]},{value:"Lists",id:"lists",children:[]},{value:"Links",id:"links",children:[]},{value:"Images",id:"images",children:[]},{value:"Code",id:"code",children:[]},{value:"Tables",id:"tables",children:[]},{value:"Blockquotes",id:"blockquotes",children:[]},{value:"Inline HTML",id:"inline-html",children:[]},{value:"Line Breaks",id:"line-breaks",children:[]},{value:"Admonitions",id:"admonitions",children:[]}],c={toc:m};function d(e){var t=e.components,s=(0,r.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,a.Z)({},c,s,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"You can write content using ",(0,i.kt)("a",{parentName:"p",href:"https://github.github.com/gfm/"},"GitHub-flavored Markdown syntax"),"."),(0,i.kt)("h2",{id:"markdown-syntax"},"Markdown Syntax"),(0,i.kt)("p",null,"To serve as an example page when styling markdown based Docusaurus sites."),(0,i.kt)("h2",{id:"headers"},"Headers"),(0,i.kt)("h1",{id:"h1---create-the-best-documentation"},"H1 - Create the best documentation"),(0,i.kt)("h2",{id:"h2---create-the-best-documentation"},"H2 - Create the best documentation"),(0,i.kt)("h3",{id:"h3---create-the-best-documentation"},"H3 - Create the best documentation"),(0,i.kt)("h4",{id:"h4---create-the-best-documentation"},"H4 - Create the best documentation"),(0,i.kt)("h5",{id:"h5---create-the-best-documentation"},"H5 - Create the best documentation"),(0,i.kt)("h6",{id:"h6---create-the-best-documentation"},"H6 - Create the best documentation"),(0,i.kt)("hr",null),(0,i.kt)("h2",{id:"emphasis"},"Emphasis"),(0,i.kt)("p",null,"Emphasis, aka italics, with ",(0,i.kt)("em",{parentName:"p"},"asterisks")," or ",(0,i.kt)("em",{parentName:"p"},"underscores"),"."),(0,i.kt)("p",null,"Strong emphasis, aka bold, with ",(0,i.kt)("strong",{parentName:"p"},"asterisks")," or ",(0,i.kt)("strong",{parentName:"p"},"underscores"),"."),(0,i.kt)("p",null,"Combined emphasis with ",(0,i.kt)("strong",{parentName:"p"},"asterisks and ",(0,i.kt)("em",{parentName:"strong"},"underscores")),"."),(0,i.kt)("p",null,"Strikethrough uses two tildes. ",(0,i.kt)("del",{parentName:"p"},"Scratch this.")),(0,i.kt)("hr",null),(0,i.kt)("h2",{id:"lists"},"Lists"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"First ordered list item"),(0,i.kt)("li",{parentName:"ol"},"Another item",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Unordered sub-list."))),(0,i.kt)("li",{parentName:"ol"},"Actual numbers don't matter, just that it's a number",(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"Ordered sub-list"))),(0,i.kt)("li",{parentName:"ol"},"And another item.")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Unordered list can use asterisks")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Or minuses")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Or pluses")),(0,i.kt)("hr",null),(0,i.kt)("h2",{id:"links"},"Links"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.google.com/"},"I'm an inline-style link")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.google.com/",title:"Google's Homepage"},"I'm an inline-style link with title")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.mozilla.org/"},"I'm a reference-style link")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"http://slashdot.org/"},"You can use numbers for reference-style link definitions")),(0,i.kt)("p",null,"Or leave it empty and use the ",(0,i.kt)("a",{parentName:"p",href:"http://www.reddit.com/"},"link text itself"),"."),(0,i.kt)("p",null,"URLs and URLs in angle brackets will automatically get turned into links. ",(0,i.kt)("a",{parentName:"p",href:"http://www.example.com/"},"http:",(0,i.kt)("div",{parentName:"a"}))," or ",(0,i.kt)("a",{parentName:"p",href:"http://www.example.com/"},"http:",(0,i.kt)("div",{parentName:"a"}))," and sometimes example.com (but not on GitHub, for example)."),(0,i.kt)("p",null,"Some text to show that the reference links can follow later."),(0,i.kt)("hr",null),(0,i.kt)("h2",{id:"images"},"Images"),(0,i.kt)("p",null,"Here's our logo (hover to see the title text):"),(0,i.kt)("p",null,"Inline-style: ",(0,i.kt)("img",{parentName:"p",src:"https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png",alt:"alt text",title:"Logo Title Text 1"})),(0,i.kt)("p",null,"Reference-style: ",(0,i.kt)("img",{parentName:"p",src:"https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png",alt:"alt text",title:"Logo Title Text 2"})),(0,i.kt)("p",null,"Images from any folder can be used by providing path to file. Path should be relative to markdown file."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(9424).Z})),(0,i.kt)("hr",null),(0,i.kt)("h2",{id:"code"},"Code"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"var s = 'JavaScript syntax highlighting';\nalert(s);\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},'s = "Python syntax highlighting"\nprint(s)\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"No language indicated, so no syntax highlighting.\nBut let's throw in a <b>tag</b>.\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:"{2}","{2}":!0},"function highlightMe() {\n  console.log('This line can be highlighted!');\n}\n")),(0,i.kt)("hr",null),(0,i.kt)("h2",{id:"tables"},"Tables"),(0,i.kt)("p",null,"Colons can be used to align columns."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Tables"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Are"),(0,i.kt)("th",{parentName:"tr",align:"right"},"Cool"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"col 3 is"),(0,i.kt)("td",{parentName:"tr",align:"center"},"right-aligned"),(0,i.kt)("td",{parentName:"tr",align:"right"},"\\$1600")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"col 2 is"),(0,i.kt)("td",{parentName:"tr",align:"center"},"centered"),(0,i.kt)("td",{parentName:"tr",align:"right"},"\\$12")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"zebra stripes"),(0,i.kt)("td",{parentName:"tr",align:"center"},"are neat"),(0,i.kt)("td",{parentName:"tr",align:"right"},"\\$1")))),(0,i.kt)("p",null,"There must be at least 3 dashes separating each header cell. The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Markdown"),(0,i.kt)("th",{parentName:"tr",align:null},"Less"),(0,i.kt)("th",{parentName:"tr",align:null},"Pretty"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("em",{parentName:"td"},"Still")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"renders")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("strong",{parentName:"td"},"nicely"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"1"),(0,i.kt)("td",{parentName:"tr",align:null},"2"),(0,i.kt)("td",{parentName:"tr",align:null},"3")))),(0,i.kt)("hr",null),(0,i.kt)("h2",{id:"blockquotes"},"Blockquotes"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Blockquotes are very handy in email to emulate reply text. This line is part of the same quote.")),(0,i.kt)("p",null,"Quote break."),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can ",(0,i.kt)("em",{parentName:"p"},"put")," ",(0,i.kt)("strong",{parentName:"p"},"Markdown")," into a blockquote.")),(0,i.kt)("hr",null),(0,i.kt)("h2",{id:"inline-html"},"Inline HTML"),(0,i.kt)("dl",null,(0,i.kt)("dt",null,"Definition list"),(0,i.kt)("dd",null,"Is something people use sometimes."),(0,i.kt)("dt",null,"Markdown in HTML"),(0,i.kt)("dd",null,"Does *not* work **very** well. Use HTML ",(0,i.kt)("em",null,"tags"),".")),(0,i.kt)("hr",null),(0,i.kt)("h2",{id:"line-breaks"},"Line Breaks"),(0,i.kt)("p",null,"Here's a line for us to start with."),(0,i.kt)("p",null,"This line is separated from the one above by two newlines, so it will be a ",(0,i.kt)("em",{parentName:"p"},"separate paragraph"),"."),(0,i.kt)("p",null,"This line is also a separate paragraph, but... This line is only separated by a single newline, so it's a separate line in the ",(0,i.kt)("em",{parentName:"p"},"same paragraph"),"."),(0,i.kt)("hr",null),(0,i.kt)("h2",{id:"admonitions"},"Admonitions"),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"This is a note"))),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"This is a tip"))),(0,i.kt)("div",{className:"admonition admonition-important alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"important")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"This is important"))),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"This is a caution"))),(0,i.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"This is a warning"))),(0,i.kt)(l.Z,{defaultValue:"npm",groupId:"npm2yarn",values:[{label:"npm",value:"npm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"npm",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm @smartsheet-bridge/extension [name] [--template=js]\n"))),(0,i.kt)(o.Z,{value:"yarn",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"yarn @smartsheet-bridge/extension [name] [--template=js]\n# couldn't auto-convert command\n")))))}d.isMDXComponent=!0},8944:function(e,t,n){"use strict";function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function r(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}n.d(t,{Z:function(){return r}})},9424:function(e,t){"use strict";t.Z="data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI4MS4wNyA5Ny43NiI+PHBhdGggZD0iTS4wOCA3Ni41NFY0aDI1LjQxcTEzLjIgMCAyMCA1dDYuODMgMTQuODNhMTYuNDUgMTYuNDUgMCAwIDEtMi43NCA5LjM5IDE1LjggMTUuOCAwIDAgMS03LjYzIDYgMTUuMzUgMTUuMzUgMCAwIDEgOC44IDUuNjRBMTYuNjMgMTYuNjMgMCAwIDEgNTQgNTUuMjFxMCAxMC40Ny02LjY3IDE1Ljg1dC0xOSA1LjQ4ek0xNSAzNC4zOGgxMS4wOXExMS4zMS0uMiAxMS4zMS05YzAtMy4yOS0xLTUuNjUtMi44Ny03LjFzLTQuOTItMi4xNy05LTIuMTdIMTV6TTE1IDQ1djE5LjUzaDEyLjhxNS4yOCAwIDguMjUtMi41MmE4LjY0IDguNjQgMCAwIDAgMy02Ljk1UTM5IDQ1LjEgMjguNzMgNDV6bTc3LjUxLTguODdhMzguNDcgMzguNDcgMCAwIDAtNS4xOC0uNHEtOC4xNyAwLTEwLjcxIDUuNTN2MzUuMjhoLTE0LjRWMjIuNjJoMTMuNmwuNCA2LjQzcTQuMzQtNy40MyAxMi03LjQyYTE1LjEyIDE1LjEyIDAgMCAxIDQuNDguNjR6TTk3LjMgOC42N2E3LjA5IDcuMDkgMCAwIDEgMi4xNi01LjMzIDkuMzYgOS4zNiAwIDAgMSAxMS43OSAwIDcgNyAwIDAgMSAyLjE5IDUuMzMgNy4wNiA3LjA2IDAgMCAxLTIuMjIgNS4zOCA5LjI1IDkuMjUgMCAwIDEtMTEuNzEgMCA3LjA5IDcuMDkgMCAwIDEtMi4yMS01LjM4em0xNS4yOSA2Ny44N0g5OC4xNFYyMi42MmgxNC40NXptNy41OC0yNy4zNnEwLTEyLjYgNS42Ni0yMC4wOHQxNS40Ny03LjQ3YTE2LjUyIDE2LjUyIDAgMCAxIDEzIDUuODdWMGgxNC40NXY3Ni41NGgtMTNsLS43LTUuNzNhMTcgMTcgMCAwIDEtMTMuODUgNi43MkExOC4yOCAxOC4yOCAwIDAgMSAxMjUuOTMgNzBxLTUuNzYtNy40NS01Ljc2LTIwLjgyem0xNC40IDEuMDdxMCA3LjU5IDIuNjQgMTEuNjNhOC41OSA4LjU5IDAgMCAwIDcuNjggNHE2LjY4IDAgOS40MS01LjY0VjM5Yy0xLjc5LTMuNzUtNC45LTUuNjQtOS4zMS01LjY0cS0xMC40Mi0uMDMtMTAuNDIgMTYuODl6bTQxLjIxLTEuMDdxMC0xMi40MSA1LjkxLTIwYTE5LjExIDE5LjExIDAgMCAxIDE1LjkyLTcuNTdxOC44NyAwIDEzLjggNi4wN2wuNi01LjA4aDEzLjA1djUyLjE0YTIzLjA3IDIzLjA3IDAgMCAxLTMuMjEgMTIuMzEgMjAuNTYgMjAuNTYgMCAwIDEtOSA4IDMxLjcgMzEuNyAwIDAgMS0xMy42NSAyLjc0IDI5LjY5IDI5LjY5IDAgMCAxLTExLjU2LTIuMzYgMjAuNiAyMC42IDAgMCAxLTguNTItNi4xMWw2LjM4LTguNzdhMTYuODcgMTYuODcgMCAwIDAgMTMuMDUgNmMzLjgyIDAgNi44LTEgOC45Mi0zLjA2czMuMTktNC45NCAzLjE5LTguN1Y3MS45YTE2LjYzIDE2LjYzIDAgMCAxLTEzLjEgNS42MyAxOS4wNiAxOS4wNiAwIDAgMS0xNS43Mi03LjZxLTYtNy41OS02LTIwLjE1em0xNC40IDEuMDdxMCA3LjM0IDIuOTQgMTEuNTFhOS4zNiA5LjM2IDAgMCAwIDguMDcgNC4xNnE2LjU5IDAgOS40Mi00Ljk0di0yMi43cS0yLjktNS05LjMyLTVhOS40IDkuNCAwIDAgMC04LjE0IDQuMjVxLTIuOTcgNC4zLTIuOTcgMTIuNzJ6bTY4LjcyIDI3LjI4cS0xMS44NiAwLTE5LjMxLTcuMjd0LTcuNDUtMTkuMzl2LTEuMzlBMzIuNjUgMzIuNjUgMCAwIDEgMjM1LjI4IDM1YTIzLjA5IDIzLjA5IDAgMCAxIDguODktOS44NiAyNSAyNSAwIDAgMSAxMy4xMy0zLjQ2cTExLjA3IDAgMTcuNDIgN3Q2LjM1IDE5Ljc4djUuODhoLTM0LjMzYTEzLjM1IDEzLjM1IDAgMCAwIDQuMjYgOC4zOSAxMi43MiAxMi43MiAwIDAgMCA4LjkgMy4xOXE4LjMxIDAgMTMtNmw3LjA4IDcuOTNhMjEuNzEgMjEuNzEgMCAwIDEtOC44MiA3LjE1IDI4LjgxIDI4LjgxIDAgMCAxLTEyLjI2IDIuNTN6bS0xLjY1LTQ0LjI5YTkgOSAwIDAgMC02Ljk1IDIuOXEtMi42NiAyLjg5LTMuNDEgOC4zMWgyMFY0My4zYy0uMDctMy4yMS0uOTMtNS42OC0yLjU5LTcuNDRzLTMuOTktMi42Mi03LjA1LTIuNjJ6IiBmaWxsPSIjMDAzMDU5Ii8+PC9zdmc+"}}]);