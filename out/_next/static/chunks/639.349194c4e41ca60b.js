(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[639],{18340:function(e,t,l){"use strict";l.r(t);var s=l(85893),a=l(61286),i=l(97551),n=l(73236),r=l(67294),o=l(5678);let c=new i.Z("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh"),d=e=>{let{setShowModal:t,setGifAttachment:l}=e,[i,d]=(0,r.useState)([]),[u,h]=(0,r.useState)(""),m=(0,o.Nr)(u,500),v=async()=>{let{data:e}=await c.categories();d(e)},f=e=>{l(e),h(""),t(!1)};(0,o.qR)(()=>{v()});let g=e=>c.search(m,{offset:e,limit:10}),x=e=>{let t=e.target.value;h(t)};return(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"m-3",children:(0,s.jsx)(a.I,{type:"text",placeholder:"Search for GIFs",value:u,onChange:x})}),(0,s.jsx)("div",{className:"flex h-[45vh] overflow-y-auto overflow-x-hidden",children:m?(0,s.jsx)(n.Z,{onGifClick:e=>f(e),fetchGifs:g,width:498,hideAttribution:!0,columns:3,noResultsMessage:(0,s.jsx)("div",{className:"grid h-full place-items-center",children:"No GIFs found."}),noLink:!0},u):(0,s.jsx)("div",{className:"grid w-full grid-cols-2 gap-1",children:i.map(e=>{var t,l;return(0,s.jsxs)("button",{type:"button",className:"relative flex outline-none",onClick:()=>h(e.name),children:[(0,s.jsx)("img",{className:"h-32 w-full cursor-pointer object-cover",height:128,src:null===(t=e.gif)||void 0===t?void 0:null===(l=t.images)||void 0===l?void 0:l.original_still.url,alt:"",draggable:!1}),(0,s.jsx)("div",{className:"absolute bottom-0 right-0 w-full bg-gradient-to-b from-transparent to-gray-800 px-2 py-1 text-right text-lg font-bold text-white",children:(0,s.jsx)("span",{className:"capitalize",children:e.name})})]},e.name_encoded)})})})]})};t.default=d},24654:function(){}}]);