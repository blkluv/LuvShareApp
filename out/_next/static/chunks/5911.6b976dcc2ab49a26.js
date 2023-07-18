"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5911],{35911:function(e,t,r){r.r(t),r.d(t,{default:function(){return b}});var n=r(85893),a=r(91158),i=r(33962),o=r(93300),l=r(34625),u=r(11600),s=r(24604),c=r(7814),d=r(67294);let m=d.forwardRef(function({title:e,titleId:t,...r},n){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:n,"aria-labelledby":t},r),e?d.createElement("title",{id:t},e):null,d.createElement("path",{strokeLinecap:"round",d:"M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"}))});var f=r(28166),p=r(86010),v=r(86501),g=r(48113),h=r(5678);let x=()=>{let e=(0,g.l)(e=>e.attachments),t=(0,g.l)(e=>e.isUploading),{handleUploadAttachments:r}=(0,u.Z)(),[x,b]=(0,d.useState)(!1),y=(0,d.useId)(),I=(0,d.useRef)(null);(0,h.t$)(I,()=>b(!1));let R=e=>{for(let t of e)if(l.RA.includes(t.type))return!0;return!1},w=t=>{var r;return(null===(r=t[0])||void 0===r?void 0:r.type.slice(0,5))==="image"?e.length+t.length<=4:1===t.length},M=()=>{let t=e[0]&&"image"!==e[0].original.mimeType.slice(0,5),r=!t&&e.length>=4;return t||r},F=async e=>{e.preventDefault(),b(!1);try{let{files:t}=e.target;if(!w(t)){v.ZP.error("Exceeded max limit of 1 audio, or 1 video, or 4 images");return}if(!R(t))return v.ZP.error("File format not allowed.");await r(t),e.target.value=""}catch(n){console.error("Failed to upload attachments",n),v.ZP.error("Something went wrong while uploading!")}};return(0,n.jsxs)(s.v,{as:"div",children:[(0,n.jsx)(s.v.Button,{as:d.Fragment,children:(0,n.jsx)("button",{onClick:()=>b(!x),"aria-label":"More",children:t?(0,n.jsx)(i.$,{size:"sm"}):(0,n.jsx)(o.u,{placement:"top",content:"Media",children:(0,n.jsx)(c.Z,{className:"text-brand h-5 w-5"})})})}),(0,n.jsx)(a.Z,{show:x,children:(0,n.jsxs)(s.v.Items,{ref:I,className:"absolute z-[5] mt-2 rounded-xl border bg-white py-1 shadow-sm focus:outline-none dark:border-gray-700 dark:bg-white",static:!0,children:[(0,n.jsxs)(s.v.Item,{as:"label",disabled:M(),className:e=>{let{active:t}=e;return(0,p.Z)({"dropdown-active":t},"menu-item !flex cursor-pointer items-center gap-1 space-x-1 rounded-lg")},htmlFor:"image_".concat(y),children:[(0,n.jsx)(c.Z,{className:"text-brand h-4 w-4"}),(0,n.jsx)("span",{className:"text-sm",children:"Upload image(s)"}),(0,n.jsx)("input",{id:"image_".concat(y),type:"file",multiple:!0,accept:l.JF.join(","),className:"hidden",onChange:F,disabled:M()})]}),(0,n.jsxs)(s.v.Item,{as:"label",disabled:Boolean(e.length),className:e=>{let{active:t}=e;return(0,p.Z)({"dropdown-active":t},"menu-item !flex cursor-pointer items-center gap-1 space-x-1 rounded-lg")},htmlFor:"video_".concat(y),children:[(0,n.jsx)(m,{className:"text-brand h-4 w-4"}),(0,n.jsx)("span",{className:"text-sm",children:"Upload video"}),(0,n.jsx)("input",{id:"video_".concat(y),type:"file",accept:l.Xe.join(","),className:"hidden",onChange:F,disabled:Boolean(e.length)})]}),(0,n.jsxs)(s.v.Item,{disabled:Boolean(e.length),as:"label",className:e=>{let{active:t}=e;return(0,p.Z)({"dropdown-active":t},"menu-item !flex cursor-pointer items-center gap-1 space-x-1 rounded-lg")},htmlFor:"audio_".concat(y),children:[(0,n.jsx)(f.Z,{className:"text-brand h-4 w-4"}),(0,n.jsx)("span",{className:"text-sm",children:"Upload audio"}),(0,n.jsx)("input",{id:"audio_".concat(y),type:"file",accept:l.cV.join(","),className:"hidden",onChange:F,disabled:Boolean(e.length)})]})]})})]})};var b=x},91158:function(e,t,r){var n=r(85893),a=r(44080),i=r(67294);let o=e=>{let{children:t,show:r}=e;return(0,n.jsx)(a.u,{as:i.Fragment,show:r,enter:"transition ease-out duration-100",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:t})};t.Z=o},24604:function(e,t,r){r.d(t,{v:function(){return z}});var n,a,i,o,l=r(67294),u=r(32984),s=r(12351),c=r(9362),d=r(94192),m=r(16723),f=r(23784),p=r(19946),v=r(61363),g=((n=g||{})[n.First=0]="First",n[n.Previous=1]="Previous",n[n.Next=2]="Next",n[n.Last=3]="Last",n[n.Specific=4]="Specific",n[n.Nothing=5]="Nothing",n),h=r(64103),x=r(84575),b=r(39650),y=r(15466),I=r(16567),R=r(14157),w=r(51074),M=r(73781);function F(e){return[e.screenX,e.screenY]}let E=/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;function S(e){var t,r;let n=null!=(t=e.innerText)?t:"",a=e.cloneNode(!0);if(!(a instanceof HTMLElement))return n;let i=!1;for(let o of a.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))o.remove(),i=!0;let l=i?null!=(r=a.innerText)?r:"":n;return E.test(l)&&(l=l.replace(E,"")),l}var D=((a=D||{})[a.Open=0]="Open",a[a.Closed=1]="Closed",a),T=((i=T||{})[i.Pointer=0]="Pointer",i[i.Other=1]="Other",i),k=((o=k||{})[o.OpenMenu=0]="OpenMenu",o[o.CloseMenu=1]="CloseMenu",o[o.GoToItem=2]="GoToItem",o[o.Search=3]="Search",o[o.ClearSearch=4]="ClearSearch",o[o.RegisterItem=5]="RegisterItem",o[o.UnregisterItem=6]="UnregisterItem",o);function P(e,t=e=>e){let r=null!==e.activeItemIndex?e.items[e.activeItemIndex]:null,n=(0,x.z2)(t(e.items.slice()),e=>e.dataRef.current.domRef.current),a=r?n.indexOf(r):null;return -1===a&&(a=null),{items:n,activeItemIndex:a}}let N={1:e=>1===e.menuState?e:{...e,activeItemIndex:null,menuState:1},0:e=>0===e.menuState?e:{...e,__demoMode:!1,menuState:0},2:(e,t)=>{var r;let n=P(e),a=function(e,t){let r=t.resolveItems();if(r.length<=0)return null;let n=t.resolveActiveIndex(),a=null!=n?n:-1,i=(()=>{switch(e.focus){case 0:return r.findIndex(e=>!t.resolveDisabled(e));case 1:{let n=r.slice().reverse().findIndex((e,r,n)=>(-1===a||!(n.length-r-1>=a))&&!t.resolveDisabled(e));return -1===n?n:r.length-1-n}case 2:return r.findIndex((e,r)=>!(r<=a)&&!t.resolveDisabled(e));case 3:{let i=r.slice().reverse().findIndex(e=>!t.resolveDisabled(e));return -1===i?i:r.length-1-i}case 4:return r.findIndex(r=>t.resolveId(r)===e.id);case 5:return null;default:!function(e){throw Error("Unexpected object: "+e)}(e)}})();return -1===i?n:i}(t,{resolveItems:()=>n.items,resolveActiveIndex:()=>n.activeItemIndex,resolveId:e=>e.id,resolveDisabled:e=>e.dataRef.current.disabled});return{...e,...n,searchQuery:"",activeItemIndex:a,activationTrigger:null!=(r=t.trigger)?r:1}},3:(e,t)=>{let r=""!==e.searchQuery?0:1,n=e.searchQuery+t.value.toLowerCase(),a=(null!==e.activeItemIndex?e.items.slice(e.activeItemIndex+r).concat(e.items.slice(0,e.activeItemIndex+r)):e.items).find(e=>{var t;return(null==(t=e.dataRef.current.textValue)?void 0:t.startsWith(n))&&!e.dataRef.current.disabled}),i=a?e.items.indexOf(a):-1;return -1===i||i===e.activeItemIndex?{...e,searchQuery:n}:{...e,searchQuery:n,activeItemIndex:i,activationTrigger:1}},4:e=>""===e.searchQuery?e:{...e,searchQuery:"",searchActiveItemIndex:null},5:(e,t)=>{let r=P(e,e=>[...e,{id:t.id,dataRef:t.dataRef}]);return{...e,...r}},6:(e,t)=>{let r=P(e,e=>{let r=e.findIndex(e=>e.id===t.id);return -1!==r&&e.splice(r,1),e});return{...e,...r,activationTrigger:1}}},j=(0,l.createContext)(null);function C(e){let t=(0,l.useContext)(j);if(null===t){let r=Error(`<${e} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,C),r}return t}function _(e,t){return(0,u.E)(t.type,N,e,t)}j.displayName="MenuContext";let A=l.Fragment,L=s.AN.RenderStrategy|s.AN.Static,O=l.Fragment,z=Object.assign((0,s.yV)(function(e,t){let{__demoMode:r=!1,...n}=e,a=(0,l.useReducer)(_,{__demoMode:r,menuState:r?0:1,buttonRef:(0,l.createRef)(),itemsRef:(0,l.createRef)(),items:[],searchQuery:"",activeItemIndex:null,activationTrigger:1}),[{menuState:i,itemsRef:o,buttonRef:c},d]=a,m=(0,f.T)(t);(0,b.O)([c,o],(e,t)=>{var r;d({type:1}),(0,x.sP)(t,x.tJ.Loose)||(e.preventDefault(),null==(r=c.current)||r.focus())},0===i);let p=(0,M.z)(()=>{d({type:1})}),v=(0,l.useMemo)(()=>({open:0===i,close:p}),[i,p]);return l.createElement(j.Provider,{value:a},l.createElement(I.up,{value:(0,u.E)(i,{0:I.ZM.Open,1:I.ZM.Closed})},(0,s.sY)({ourProps:{ref:m},theirProps:n,slot:v,defaultTag:A,name:"Menu"})))}),{Button:(0,s.yV)(function(e,t){var r;let n=(0,p.M)(),{id:a=`headlessui-menu-button-${n}`,...i}=e,[o,u]=C("Menu.Button"),c=(0,f.T)(o.buttonRef,t),m=(0,d.G)(),x=(0,M.z)(e=>{switch(e.key){case v.R.Space:case v.R.Enter:case v.R.ArrowDown:e.preventDefault(),e.stopPropagation(),u({type:0}),m.nextFrame(()=>u({type:2,focus:g.First}));break;case v.R.ArrowUp:e.preventDefault(),e.stopPropagation(),u({type:0}),m.nextFrame(()=>u({type:2,focus:g.Last}))}}),b=(0,M.z)(e=>{e.key===v.R.Space&&e.preventDefault()}),y=(0,M.z)(t=>{if((0,h.P)(t.currentTarget))return t.preventDefault();e.disabled||(0===o.menuState?(u({type:1}),m.nextFrame(()=>{var e;return null==(e=o.buttonRef.current)?void 0:e.focus({preventScroll:!0})})):(t.preventDefault(),u({type:0})))}),I=(0,l.useMemo)(()=>({open:0===o.menuState}),[o]),w={ref:c,id:a,type:(0,R.f)(e,o.buttonRef),"aria-haspopup":"menu","aria-controls":null==(r=o.itemsRef.current)?void 0:r.id,"aria-expanded":e.disabled?void 0:0===o.menuState,onKeyDown:x,onKeyUp:b,onClick:y};return(0,s.sY)({ourProps:w,theirProps:i,slot:I,defaultTag:"button",name:"Menu.Button"})}),Items:(0,s.yV)(function(e,t){var r,n;let a=(0,p.M)(),{id:i=`headlessui-menu-items-${a}`,...o}=e,[u,h]=C("Menu.Items"),b=(0,f.T)(u.itemsRef,t),R=(0,w.i)(u.itemsRef),F=(0,d.G)(),E=(0,I.oJ)(),S=null!==E?(E&I.ZM.Open)===I.ZM.Open:0===u.menuState;(0,l.useEffect)(()=>{let e=u.itemsRef.current;e&&0===u.menuState&&e!==(null==R?void 0:R.activeElement)&&e.focus({preventScroll:!0})},[u.menuState,u.itemsRef,R]),function({container:e,accept:t,walk:r,enabled:n=!0}){let a=(0,l.useRef)(t),i=(0,l.useRef)(r);(0,l.useEffect)(()=>{a.current=t,i.current=r},[t,r]),(0,m.e)(()=>{if(!e||!n)return;let t=(0,y.r)(e);if(!t)return;let r=a.current,o=i.current,l=Object.assign(e=>r(e),{acceptNode:r}),u=t.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,l,!1);for(;u.nextNode();)o(u.currentNode)},[e,n,a,i])}({container:u.itemsRef.current,enabled:0===u.menuState,accept:e=>"menuitem"===e.getAttribute("role")?NodeFilter.FILTER_REJECT:e.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT,walk(e){e.setAttribute("role","none")}});let D=(0,M.z)(e=>{var t,r;switch(F.dispose(),e.key){case v.R.Space:if(""!==u.searchQuery)return e.preventDefault(),e.stopPropagation(),h({type:3,value:e.key});case v.R.Enter:if(e.preventDefault(),e.stopPropagation(),h({type:1}),null!==u.activeItemIndex){let{dataRef:n}=u.items[u.activeItemIndex];null==(r=null==(t=n.current)?void 0:t.domRef.current)||r.click()}(0,x.wI)(u.buttonRef.current);break;case v.R.ArrowDown:return e.preventDefault(),e.stopPropagation(),h({type:2,focus:g.Next});case v.R.ArrowUp:return e.preventDefault(),e.stopPropagation(),h({type:2,focus:g.Previous});case v.R.Home:case v.R.PageUp:return e.preventDefault(),e.stopPropagation(),h({type:2,focus:g.First});case v.R.End:case v.R.PageDown:return e.preventDefault(),e.stopPropagation(),h({type:2,focus:g.Last});case v.R.Escape:e.preventDefault(),e.stopPropagation(),h({type:1}),(0,c.k)().nextFrame(()=>{var e;return null==(e=u.buttonRef.current)?void 0:e.focus({preventScroll:!0})});break;case v.R.Tab:e.preventDefault(),e.stopPropagation(),h({type:1}),(0,c.k)().nextFrame(()=>{(0,x.EO)(u.buttonRef.current,e.shiftKey?x.TO.Previous:x.TO.Next)});break;default:1===e.key.length&&(h({type:3,value:e.key}),F.setTimeout(()=>h({type:4}),350))}}),T=(0,M.z)(e=>{e.key===v.R.Space&&e.preventDefault()}),k=(0,l.useMemo)(()=>({open:0===u.menuState}),[u]),P={"aria-activedescendant":null===u.activeItemIndex||null==(r=u.items[u.activeItemIndex])?void 0:r.id,"aria-labelledby":null==(n=u.buttonRef.current)?void 0:n.id,id:i,onKeyDown:D,onKeyUp:T,role:"menu",tabIndex:0,ref:b};return(0,s.sY)({ourProps:P,theirProps:o,slot:k,defaultTag:"div",features:L,visible:S,name:"Menu.Items"})}),Item:(0,s.yV)(function(e,t){let r,n,a,i=(0,p.M)(),{id:o=`headlessui-menu-item-${i}`,disabled:u=!1,...d}=e,[v,h]=C("Menu.Item"),b=null!==v.activeItemIndex&&v.items[v.activeItemIndex].id===o,y=(0,l.useRef)(null),I=(0,f.T)(t,y);(0,m.e)(()=>{if(v.__demoMode||0!==v.menuState||!b||0===v.activationTrigger)return;let e=(0,c.k)();return e.requestAnimationFrame(()=>{var e,t;null==(t=null==(e=y.current)?void 0:e.scrollIntoView)||t.call(e,{block:"nearest"})}),e.dispose},[v.__demoMode,y,b,v.menuState,v.activationTrigger,v.activeItemIndex]);let R=(r=(0,l.useRef)(""),n=(0,l.useRef)(""),(0,M.z)(()=>{let e=y.current;if(!e)return"";let t=e.innerText;if(r.current===t)return n.current;let a=(function(e){let t=e.getAttribute("aria-label");if("string"==typeof t)return t.trim();let r=e.getAttribute("aria-labelledby");if(r){let n=r.split(" ").map(e=>{let t=document.getElementById(e);if(t){let r=t.getAttribute("aria-label");return"string"==typeof r?r.trim():S(t).trim()}return null}).filter(Boolean);if(n.length>0)return n.join(", ")}return S(e).trim()})(e).trim().toLowerCase();return r.current=t,n.current=a,a})),w=(0,l.useRef)({disabled:u,domRef:y,get textValue(){return R()}});(0,m.e)(()=>{w.current.disabled=u},[w,u]),(0,m.e)(()=>(h({type:5,id:o,dataRef:w}),()=>h({type:6,id:o})),[w,o]);let E=(0,M.z)(()=>{h({type:1})}),D=(0,M.z)(e=>{if(u)return e.preventDefault();h({type:1}),(0,x.wI)(v.buttonRef.current)}),T=(0,M.z)(()=>{if(u)return h({type:2,focus:g.Nothing});h({type:2,focus:g.Specific,id:o})}),k=(a=(0,l.useRef)([-1,-1]),{wasMoved(e){let t=F(e);return(a.current[0]!==t[0]||a.current[1]!==t[1])&&(a.current=t,!0)},update(e){a.current=F(e)}}),P=(0,M.z)(e=>k.update(e)),N=(0,M.z)(e=>{k.wasMoved(e)&&(u||b||h({type:2,focus:g.Specific,id:o,trigger:0}))}),j=(0,M.z)(e=>{k.wasMoved(e)&&(u||b&&h({type:2,focus:g.Nothing}))}),_=(0,l.useMemo)(()=>({active:b,disabled:u,close:E}),[b,u,E]);return(0,s.sY)({ourProps:{id:o,ref:I,role:"menuitem",tabIndex:!0===u?void 0:-1,"aria-disabled":!0===u||void 0,disabled:void 0,onClick:D,onFocus:T,onPointerEnter:P,onMouseEnter:P,onPointerMove:N,onMouseMove:N,onPointerLeave:j,onMouseLeave:j},theirProps:d,slot:_,defaultTag:O,name:"Menu.Item"})})})},14157:function(e,t,r){r.d(t,{f:function(){return o}});var n=r(67294),a=r(16723);function i(e){var t;if(e.type)return e.type;let r=null!=(t=e.as)?t:"button";if("string"==typeof r&&"button"===r.toLowerCase())return"button"}function o(e,t){let[r,o]=(0,n.useState)(()=>i(e));return(0,a.e)(()=>{o(i(e))},[e.type,e.as]),(0,a.e)(()=>{r||t.current&&t.current instanceof HTMLButtonElement&&!t.current.hasAttribute("type")&&o("button")},[r,t]),r}},28166:function(e,t,r){var n=r(67294);let a=n.forwardRef(function({title:e,titleId:t,...r},a){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:a,"aria-labelledby":t},r),e?n.createElement("title",{id:t},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"}))});t.Z=a}}]);