(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3261],{52363:function(e,t,l){"use strict";l.d(t,{Z:function(){return tm}});var a=l(85893),n=l(847),i=l(34625),r=l(68980),o=l(20243),s=l(36571),c=l(84260),d=l(86010),u=l(32998),m=l(5152),p=l.n(m),h=l(11163),x=l(67294),g=l(86501),v=l(67946),y=l(92882),b=l(20269),f=l(48113),w=l(5678),j=l(57632),N=l(31618),C=l(56843),D=l(29780),_=l(11761),T=l(61286),M=l(64208),S=l(93300),k=l(20445),R=l(5362),A=l(78680),E=l(53854);let O=()=>{let e=(0,f.l)(e=>e.setShowPollEditor),t=(0,f.l)(e=>e.pollConfig),l=(0,f.l)(e=>e.setPollConfig),n=(0,f.l)(e=>e.resetPollConfig),[i,r]=(0,x.useState)(!1);return(0,a.jsxs)(_.Z,{className:"m-5 px-5 py-3",forceRounded:!0,children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-2 text-sm",children:[(0,a.jsx)(E.ZES,{className:"text-brand h-4 w-4"}),(0,a.jsx)("b",{children:"Poll"})]}),(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,a.jsxs)(D.z,{variant:"primary",size:"sm",icon:(0,a.jsx)(k.Z,{className:"h-4 w-4"}),onClick:()=>r(!0),outline:!0,children:[t.length," "]}),(0,a.jsx)(M.u,{title:"Poll length",icon:(0,a.jsx)(k.Z,{className:"text-brand h-5 w-5"}),show:i,onClose:()=>r(!1),children:(0,a.jsxs)("div",{className:"p-5",children:[(0,a.jsx)(T.I,{label:"Poll length (days)",type:"number",value:t.length,min:1,max:30,onChange:e=>l({...t,length:Number(e.target.value)})}),(0,a.jsxs)("div",{className:"flex space-x-2 pt-5",children:[(0,a.jsx)(D.z,{className:"ml-auto",variant:"danger",onClick:()=>{l({...t,length:7}),r(!1)},outline:!0,children:"Cancel"}),(0,a.jsx)(D.z,{className:"ml-auto",variant:"primary",onClick:()=>r(!1),children:"Save"})]})]})}),(0,a.jsx)(S.u,{placement:"top",content:"Delete",children:(0,a.jsx)("button",{className:"flex",onClick:()=>{n(),e(!1)},children:(0,a.jsx)(R.Z,{className:"h-5 w-5 text-red-400"})})})]})]}),(0,a.jsxs)("div",{className:"mt-3 space-y-2",children:[t.choices.map((e,n)=>(0,a.jsx)("div",{className:"flex items-center space-x-2 text-sm",children:(0,a.jsx)(T.I,{placeholder:"Choice ".concat(n+1),value:e,onChange:e=>{let a=[...t.choices];a[n]=e.target.value,l({...t,choices:a})},iconRight:n>1&&(0,a.jsx)("button",{className:"flex",onClick:()=>{let e=[...t.choices];e.splice(n,1),l({...t,choices:e})},children:(0,a.jsx)(R.Z,{className:"h-5 w-5 text-red-500"})})})},n)),5!==t.choices.length&&(0,a.jsxs)("button",{className:"text-brand mt-2 flex items-center space-x-2 text-sm",onClick:()=>{let e=[...t.choices];e.push(""),l({...t,choices:e})},children:[(0,a.jsx)(A.Z,{className:"h-4 w-4"}),(0,a.jsx)("span",{children:"Add another option"})]})]})]})};var P=l(20240),Z=l(72154),I=l(89814),L=l(59090);let F=()=>{let e=(0,f.l)(e=>e.showSpaceEditor),t=(0,f.l)(e=>e.setShowSpaceEditor),l=(0,Z.Z)(P.T.Spaces);return l?(0,a.jsx)(S.u,{placement:"top",content:"Space",children:(0,a.jsx)(L.E.button,{whileTap:{scale:.9},type:"button",onClick:()=>{t(!e)},"aria-label":"Space",children:(0,a.jsx)(I.Z,{className:"text-brand h-5 w-5"})})}):null};var V=l(50185),z=l(73935);class B extends u.TextNode{static getType(){return"mention"}static clone(e){return new B(e.__mention,e.__text,e.__key)}static importJSON(e){let t=q(e.mentionName);return t.setTextContent(e.text),t.setFormat(e.format),t.setDetail(e.detail),t.setMode(e.mode),t.setStyle(e.style),t}exportJSON(){return{...super.exportJSON(),mentionName:this.__mention,type:"mention",version:1}}createDOM(e){let t=super.createDOM(e);return t.style.cssText="",t.className="",t}exportDOM(){let e=document.createElement("span");return e.textContent=this.__text,{element:e}}static importDOM(){return{span:e=>e.hasAttribute("data-lexical-mention")?{conversion:U,priority:1}:null}}isTextEntity(){return!0}constructor(e,t,l){super(null!=t?t:"@".concat(e),l),this.__mention="@".concat(e)}}let q=e=>{let t=new B(e);return t.setMode("segmented").toggleDirectionless(),t},U=e=>{let{textContent:t}=e;if(null!==t){let l=q(t);return{node:l}}return null};var G=l(29451),W=l(7925),$=l(31586),H=l(92359),J=l(45706);let Y="\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%'\"~=<>_:;",X={NAME:"\\b[A-Z][^\\s"+Y+"]",PUNCTUATION:Y}.PUNCTUATION,K="[^@"+X+"\\s]",Q=RegExp("(^|\\s|\\()([@]((?:"+K+"(?:\\.[ |$]| |["+X+"]|)){0,75}))$"),ee=RegExp("(^|\\s|\\()([@]((?:"+K+"){0,50}))$"),et=(e,t)=>{let l=Q.exec(e);if(null===l&&(l=ee.exec(e)),null!==l){let a=l[1],n=l[3];if(n.length>=t)return{leadOffset:l.index+a.length,matchingString:n,replaceableString:l[2]}}return null},el=e=>{let t=et(e,1);return t};class ea extends V.MenuOption{constructor(e,t,l,a){super(t),this.id=e,this.name=t,this.handle=a,this.picture=l}}let en=e=>{let{isSelected:t,onClick:l,onMouseEnter:n,option:i}=e;return(0,a.jsx)("li",{tabIndex:-1,className:"cursor-pointer",ref:i.setRefElement,role:"option",onMouseEnter:n,onClick:l,"aria-selected":t,"aria-hidden":"true",children:(0,a.jsxs)("div",{className:(0,d.Z)({"bg-gray-200 dark:bg-gray-800":t},"m-1.5 flex items-center space-x-2 rounded-xl px-3 py-1 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"),children:[(0,a.jsx)("img",{className:"h-7 w-7 rounded-full",height:"32",width:"32",src:i.picture,alt:i.handle}),(0,a.jsxs)("div",{className:"flex flex-col truncate",children:[(0,a.jsx)("div",{className:"flex items-center space-x-1 text-sm",children:(0,a.jsx)("span",{children:i.name})}),(0,a.jsx)("span",{className:"text-xs",children:(0,G.Z)(i.handle)})]})]})},i.key)},ei=()=>{let[e,t]=(0,x.useState)(null),[l,n]=(0,x.useState)([]),[o]=(0,c.useLexicalComposerContext)(),[s]=(0,r.mpp)(),d=e=>{let t=null==e?void 0:e.picture;if(t&&t.hasOwnProperty("original")){var l;let a=e.picture;return null===(l=a.original)||void 0===l?void 0:l.url}if(t&&t.hasOwnProperty("uri")){let n=e.picture;return null==n?void 0:n.uri}return(0,W.Z)(null==e?void 0:e.ownedBy)};(0,w.rf)(()=>{e&&s({variables:{request:{type:r.qkC.Profile,query:e,limit:5}}}).then(e=>{let{data:t}=e,l=null==t?void 0:t.search,a=l&&l.hasOwnProperty("items")?null==l?void 0:l.items:[],i=a.map(e=>({id:null==e?void 0:e.id,name:(0,$.Z)(null==e?void 0:e.name),handle:null==e?void 0:e.handle,picture:d(e)}));n(i)})},[e]);let u=(0,V.useBasicTypeaheadTriggerMatch)("/",{minLength:0}),m=(0,x.useMemo)(()=>l.map(e=>{let{id:t,name:l,picture:a,handle:n}=e;return new ea(t,null!=l?l:n,(0,J.Z)((0,H.Z)(a),i.pA),n)}).slice(0,5),[l]),p=(0,x.useCallback)((e,t,l)=>{o.update(()=>{let a=q(e.handle);t&&t.replace(a),a.select().insertText(" "),l()})},[o]),h=(0,x.useCallback)(e=>{let t=el(e),l=u(e,o);return!l&&t?t:null},[u,o]);return(0,a.jsx)(V.LexicalTypeaheadMenuPlugin,{onQueryChange:t,onSelectOption:p,triggerFn:h,options:m,menuRenderFn:(e,t)=>{let{selectedIndex:n,selectOptionAndCleanUp:i,setHighlightedIndex:r}=t;return e.current&&l.length?z.createPortal((0,a.jsx)("div",{className:"bg-brand sticky z-40 mt-8 w-52 min-w-full rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900",children:(0,a.jsx)("ul",{className:"divide-y dark:divide-gray-700",children:m.map((e,t)=>(0,a.jsx)(en,{index:t,isSelected:n===t,onClick:()=>{r(t),i(e)},onMouseEnter:()=>{r(t)},option:e},e.key))})}),e.current):null}})};var er=l(32358);let eo=/((https?:\/\/(www\.)?)|(www\.))[\w#%+.:=@~-]{1,256}\.[\d()A-Za-z]{1,6}\b([\w#%&()+./:=?@~-]*)/,es=/(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))/,ec=[e=>{let t=eo.exec(e);if(null===t)return null;let l=t[0];return{index:t.index,length:l.length,text:l,url:l.startsWith("http")?l:"https://".concat(l)}},e=>{let t=es.exec(e);return t&&{index:t.index,length:t[0].length,text:t[0],url:"mailto:".concat(t[0])}}],ed=()=>(0,a.jsx)(er.AutoLinkPlugin,{matchers:ec});class eu extends V.MenuOption{constructor(e,t,l){super(e),this.title=e,this.emoji=t,this.keywords=l.keywords||[]}}let em=e=>{let{index:t,isSelected:l,onClick:n,onMouseEnter:i,option:r}=e,{key:o,title:s,emoji:c,setRefElement:u}=r;return(0,a.jsx)("li",{tabIndex:-1,className:(0,d.Z)({"dropdown-active":l},"m-2 cursor-pointer rounded-lg p-2 outline-none"),ref:u,role:"option",id:"typeahead-item-"+t,onMouseEnter:i,onClick:n,"aria-selected":l,"aria-hidden":"true",children:(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,a.jsx)("span",{className:"text-base",children:c}),(0,a.jsx)("span",{className:"text-sm capitalize",children:s.split("_").join(" ")})]})},o)},ep=()=>{let[e]=(0,c.useLexicalComposerContext)(),[t,l]=(0,x.useState)(null),[n,r]=(0,x.useState)([]),o=async()=>{let e=await fetch("".concat(i.Fv,"/emoji.json")),t=await e.json();r(t)};(0,w.qR)(()=>{o()});let s=(0,x.useMemo)(()=>null!==n?n.map(e=>{let{emoji:t,aliases:l,tags:a}=e;return new eu(l[0],t,{keywords:[...l,...a]})}):[],[n]),d=(0,V.useBasicTypeaheadTriggerMatch)(":",{minLength:0}),m=(0,x.useMemo)(()=>s.filter(e=>null!==t?(!!RegExp(t,"gi").exec(e.title)||null!==e.keywords)&&e.keywords.some(e=>RegExp(t,"gi").exec(e)):s).slice(0,5),[s,t]),p=(0,x.useCallback)((t,l,a)=>{e.update(()=>{let e=(0,u.$getSelection)();(0,u.$isRangeSelection)(e)&&null!==t&&(l&&l.remove(),e.insertNodes([(0,u.$createTextNode)(t.emoji)]),a())})},[e]);return(0,a.jsx)(V.LexicalTypeaheadMenuPlugin,{onQueryChange:l,onSelectOption:p,triggerFn:d,options:m,menuRenderFn:(e,t)=>{let{selectedIndex:l,selectOptionAndCleanUp:n,setHighlightedIndex:i}=t;return null===e.current||0===m.length?null:e.current&&m.length?z.createPortal((0,a.jsx)("ul",{className:"mt-7 w-52 rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900",children:m.map((e,t)=>(0,a.jsx)("div",{children:(0,a.jsx)(em,{index:t,isSelected:l===t,onClick:()=>{i(t),n(e)},onMouseEnter:()=>{i(t)},option:e})},e.key))}),e.current):null}})};class eh extends u.TextNode{static getType(){return"emoji"}static clone(e){return new eh(e.__className,e.__text,e.__key)}createDOM(e){let t=document.createElement("span"),l=super.createDOM(e);return t.className=this.__className,l.className="emoji-inner",t.appendChild(l),t}updateDOM(e,t,l){let a=t.firstChild;return null===a||(super.updateDOM(e,a,l),!1)}static importJSON(e){let t=ex(e.className,e.text);return t.setFormat(e.format),t.setDetail(e.detail),t.setMode(e.mode),t.setStyle(e.style),t}exportJSON(){return{...super.exportJSON(),className:this.getClassName(),type:"emoji"}}getClassName(){let e=this.getLatest();return e.__className}constructor(e,t,l){super(t,l),this.__className=e}}let ex=(e,t)=>new eh(e,t).setMode("token"),eg=new Map([[":)",["emoji happysmile","\uD83D\uDE42"]],[":(",["emoji sadsmile","\uD83D\uDE41"]],[";)",["emoji winksmile","\uD83D\uDE09"]],[":D",["emoji bigsmile","\uD83D\uDE03"]],[":P",["emoji tongue","\uD83D\uDE1B"]],[":O",["emoji shock","\uD83D\uDE2E"]],[":|",["emoji neutral","\uD83D\uDE10"]],[":*",["emoji kiss","\uD83D\uDE18"]],[":$",["emoji blush","\uD83D\uDE33"]],[":@",["emoji angry","\uD83D\uDE20"]],[":S",["emoji smirk","\uD83D\uDE0F"]],[":L",["emoji sealed","\uD83C\uDF38"]],["<3",["emoji heart","\uD83D\uDC9C"]]]),ev=e=>{let t=e.getTextContent();for(let l=0;l<t.length;l++){let a=eg.get(t[l])||eg.get(t.slice(l,l+2));if(void 0!==a){let n;let[i,r]=a;0===l?[n]=e.splitText(l+2):[,n]=e.splitText(l,l+2);let o=ex(i,r);return n.replace(o),o}}return null},ey=e=>{let t=e;for(;null!==t;){if(!t.isSimpleText())return;t=ev(t)}},eb=e=>{(0,w.rf)(()=>{if(!e.hasNodes([eh]))throw Error("EmojisPlugin: EmojiNode not registered on editor");return e.registerNodeTransform(u.TextNode,ey)},[e])},ef=()=>{let[e]=(0,c.useLexicalComposerContext)();return eb(e),null};var ew=l(76969);let ej=e=>{let{onPaste:t}=e,[l]=(0,c.useLexicalComposerContext)();return(0,w.rf)(()=>(0,ew.mergeRegister)(l.registerCommand(u.PASTE_COMMAND,e=>{if(e){let{dataTransfer:l,clipboardData:a}=e;if(null==a?void 0:a.getData("Text"))return!1;if(l&&l.files.length){let{files:n}=l;t&&t(n)}return!0}return!1},u.COMMAND_PRIORITY_NORMAL)),[l,t]),null},eN=()=>{let[e]=(0,c.useLexicalComposerContext)(),[t,l]=(0,x.useState)(e),[n,i]=(0,x.useState)(!1),[r,o]=(0,x.useState)(!1),[s,d]=(0,x.useState)(!1),m=(0,x.useCallback)(()=>{let e=(0,u.$getSelection)();(0,u.$isRangeSelection)(e)&&(i(e.hasFormat("bold")),o(e.hasFormat("italic")),d(e.hasFormat("code")))},[]);return(0,w.rf)(()=>e.registerCommand(u.SELECTION_CHANGE_COMMAND,(e,t)=>(m(),l(t),!1),u.COMMAND_PRIORITY_CRITICAL),[e,m]),(0,a.jsx)("div",{className:"divider flex items-center justify-between px-5 py-2 text-black",children:(0,a.jsxs)("div",{className:"toolbar-icons flex w-full space-x-1",children:[(0,a.jsx)("button",{className:n?"bg-brand-100":"",title:"Bold",onClick:()=>{t.dispatchCommand(u.FORMAT_TEXT_COMMAND,"bold")},children:(0,a.jsx)("i",{className:"toolbar-icon bold text-brand"})}),(0,a.jsx)("button",{className:r?"bg-brand-100":"",title:"Italic",onClick:()=>{t.dispatchCommand(u.FORMAT_TEXT_COMMAND,"italic")},children:(0,a.jsx)("i",{className:"toolbar-icon italic"})}),(0,a.jsx)("button",{className:s?"bg-brand-100":"",title:"Code",onClick:()=>{t.dispatchCommand(u.FORMAT_TEXT_COMMAND,"code")},children:(0,a.jsx)("i",{className:"toolbar-icon code"})})]})})};var eC=l(41741),eD=l(11600),e_=l(6898),eT=l(50627),eM=l(4506),eS=l(87632),ek=l(71954),eR=l(86146);let eA=[...s.TEXT_FORMAT_TRANSFORMERS],eE=()=>{let e=(0,f.l)(e=>e.setPublicationContent),t=(0,f.l)(e=>e.showPollEditor),l=(0,f.l)(e=>e.showSpaceEditor),n=(0,f.l)(e=>e.attachments),{handleUploadAttachments:i}=(0,eD.Z)(),[r]=(0,c.useLexicalComposerContext)(),o=async e=>{if(4===n.length||n.length+e.length>4)return g.Am.error("Please choose either 1 video or up to 4 photos.");e&&await i(e)};return(0,x.useEffect)(()=>r.registerCommand(u.INSERT_PARAGRAPH_COMMAND,()=>(r.dispatchCommand(u.INSERT_LINE_BREAK_COMMAND,!1),!0),u.COMMAND_PRIORITY_NORMAL),[r]),(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)(ep,{}),(0,a.jsx)(eN,{}),(0,a.jsx)(eR.RichTextPlugin,{contentEditable:(0,a.jsx)(e_.ContentEditable,{className:"my-4 block min-h-[65px] rounded-lg bg-white overflow-auto px-5"}),placeholder:(0,a.jsx)("div",{className:"pointer-events-none absolute top-[65px] bg-white whitespace-nowrap px-5 text-gray-400",children:l?"What do you want to talk about?":t?"Ask a question...":" New Post?"}),ErrorBoundary:()=>(0,a.jsx)("div",{children:eC.D.SomethingWentWrong})}),(0,a.jsx)(ek.OnChangePlugin,{onChange:t=>{t.read(()=>{let t=(0,s.$convertToMarkdownString)(eA);e(t)})}}),(0,a.jsx)(ef,{}),(0,a.jsx)(ed,{}),(0,a.jsx)(eM.HistoryPlugin,{}),(0,a.jsx)(eT.HashtagPlugin,{}),(0,a.jsx)(ei,{}),(0,a.jsx)(ej,{onPaste:o}),(0,a.jsx)(eS.MarkdownShortcutPlugin,{transformers:eA})]})};var eO=l(66252),eP=l(96806),eZ=l(70769),eI=l(52815),eL=l(52942),eF=l(10985),eV=l(2677),ez=l(48764).Buffer;let eB="2Km7bBvxqZOmfzYksdcepn58KBe",eq="8e8884f5ce9793101a44e58518f8e395";if(!eB||!eq)throw Error("Must define INFURA_PROJECT_ID and INFURA_SECRET in the .env to run this");let eU=(0,eV.Ue)({host:"ipfs.infura.io",port:5001,protocol:"https",headers:{authorization:"Basic ".concat(ez.from("".concat(eB,":").concat(eq),"utf-8").toString("base64"))}}),eG=async e=>{let t=await eU.add(JSON.stringify(e));return console.log("upload result ipfs",t),t};var eW=l(69111);let e$=async(e,t,l)=>{let a='<svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <style>\n      .content {\n        font: normal 14px sans-serif;\n        color: black;\n      }\n      .timestamp {\n        font: normal 13px sans-serif;\n        color: white;\n        opacity: 70%;\n      }\n      .username {\n        font: bold 15px sans-serif;\n        color: white;\n      }\n    </style>\n    <g clip-path="url(#clip0_1_2)">\n    <path d="M475 0H25C11.1929 0 0 11.1929 0 25V475C0 488.807 11.1929 500 25 500H475C488.807 500 500 488.807 500 475V25C500 11.1929 488.807 0 475 0Z" fill="white"/>\n    <foreignObject x="30" y="90" width="440" height="300">\n    <p class="content" xmlns="http://www.w3.org/1999/xhtml">'.concat((0,eW.encode)(e,{mode:"nonAsciiPrintable",level:"xml"}),'}</p>\n    </foreignObject>\n    <path d="M0 25C0 11.1929 11.1929 0 25 0H475C488.807 0 500 11.1929 500 25V78H0V25Z" fill="#ec1e25" fill-opacity="0.90"/>\n    <path d="M500.06 474.236C500.026 488.043 488.806 499.208 474.999 499.174L24.9999 498.062C11.193 498.027 0.0276556 486.807 0.0617778 473L0.192759 420L500.191 421.236L500.06 474.236Z" fill="#ec1e25" fill-opacity="0.90"/>\n    <foreignObject x="350" y="440" width="440" height="300">\n    <p class="timestamp" xmlns="http://www.w3.org/1999/xhtml">').concat(l,'</p>\n    </foreignObject>\n    <foreignObject x="30" y="15" width="440" height="300">\n    <p class="username" xmlns="http://www.w3.org/1999/xhtml">@').concat(t,'</p>\n    </foreignObject>\n    </g>\n    <defs>\n    <clipPath id="clip0_1_2">\n    <rect width="500" height="500" fill="white"/>\n    </clipPath>\n    </defs>\n</svg>\n'),n=new Blob([a],{type:"image/svg+xml"}),i=new File([n],"post.svg",{lastModified:new Date().getTime(),type:n.type}),r=await eG(i);return r||""},eH=()=>{var e;return(null==navigator?void 0:null===(e=navigator.languages)||void 0===e?void 0:e.length)?navigator.languages[0]:navigator.language};var eJ=l(64911),eY=l(66167),eX=l(33962),eK=l(23277),eQ=l(78780),e0=l(73435),e1=l(22292);let e5={namespace:"composer",theme:{text:{bold:"bold",italic:"italic",code:"text-sm bg-gray-300 rounded-lg px-[5px] py-[2px]"},link:"text-brand",hashtag:"text-brand"},nodes:[eK.CodeNode,B,eQ.HashtagNode,e0.AutoLinkNode,e0.LinkNode,eh],editorState:null,onError:e=>{console.error(e)}};var e2=l(84831),e4=l(51406),e8=l(92321),e9=l(22023);let e3=(e,t)=>{let{collectLimit:l,followerOnlyCollect:a,timeLimit:n,amount:i,referralFee:o,recipients:s}=e,c={collectLimit:l,followerOnly:a,endTimestamp:n?(0,e9.u4)(1):null},d={amount:i,referralFee:o};switch(e.type){case r.pYo.SimpleCollectModule:return{simpleCollectModule:{...c,...i&&{fee:{...d,recipient:null==t?void 0:t.ownedBy}}}};case r.pYo.MultirecipientFeeCollectModule:return{multirecipientFeeCollectModule:{...c,...d,recipients:s}};default:return{revertCollectModule:!0}}};var e6=l(37331),e7=l(6154);let te=()=>{let e=(0,y.qr)(e=>e.currentProfile),t=(0,f.l)(e=>e.pollConfig),l=(0,f.l)(e=>e.publicationContent),a=async()=>{try{let a=await (0,e7.Z)({url:"".concat(i.sf,"/createPoll"),method:"POST",data:{isMainnet:i.M8,title:"Poll by @".concat(null==e?void 0:e.handle),description:l,choices:t.choices,length:t.length}});return"".concat(l,"\n\n").concat(a.data.snapshotUrl)}catch(n){throw n}};return[a]},tt=()=>{let e=(0,w.Fx)("accessToken"),t=async()=>{try{let t=await (0,e7.Z)({url:"".concat(i.LW,"/createSpace"),method:"POST",data:{isMainnet:i.M8,accessToken:e}});return t.data.spaceId}catch(l){throw l}};return[t]};var tl=l(38564),ta=l(48974),tn=l(89169);let ti=p()(()=>l.e(5911).then(l.bind(l,35911)),{loadableGenerated:{webpack:()=>[35911]},loading:()=>(0,a.jsx)("div",{className:"shimmer mb-1 h-5 w-5 rounded-lg"})}),tr=p()(()=>l.e(6418).then(l.bind(l,46418)),{loadableGenerated:{webpack:()=>[46418]},loading:()=>(0,a.jsx)("div",{className:"shimmer mb-1 h-5 w-5 rounded-lg"})}),to=p()(()=>l.e(5514).then(l.bind(l,85514)),{loadableGenerated:{webpack:()=>[85514]},loading:()=>(0,a.jsx)("div",{className:"shimmer mb-1 h-5 w-5 rounded-lg"})}),ts=p()(()=>l.e(5266).then(l.bind(l,5266)),{loadableGenerated:{webpack:()=>[5266]},loading:()=>(0,a.jsx)("div",{className:"shimmer mb-1 h-5 w-5 rounded-lg"})}),tc=p()(()=>l.e(7039).then(l.bind(l,97039)),{loadableGenerated:{webpack:()=>[97039]},loading:()=>(0,a.jsx)("div",{className:"shimmer mb-1 h-5 w-5 rounded-lg"})}),td=p()(()=>Promise.all([l.e(3874),l.e(7994)]).then(l.bind(l,47994)),{loadableGenerated:{webpack:()=>[47994]},loading:()=>(0,a.jsx)("div",{className:"shimmer mb-1 h-5 w-5 rounded-lg"})}),tu=e=>{var t,l,m,p;let{publication:T,profile:M,onDetail:S}=e,{push:k}=(0,h.useRouter)(),{cache:R}=(0,eO.x)(),A=(0,y.qr)(e=>e.currentProfile),E=(0,eP.u)(e=>e.setShowNewPostModal),{userSigNonce:P,setUserSigNonce:Z}=(0,eZ.p)(e=>e),{publicationContent:L,setPublicationContent:V,quotedPublication:z,setQuotedPublication:B,audioPublication:q,attachments:U,setAttachments:G,addAttachments:W,isUploading:$,videoThumbnail:H,setVideoThumbnail:J,videoDurationInSeconds:Y,showPollEditor:X,setShowPollEditor:K,resetPollConfig:Q,showSpaceEditor:ee,setShowSpaceEditor:et,pollConfig:el}=(0,f.l)(e=>e),{txnQueue:ea,setTxnQueue:en}=(0,y.nN)(e=>e),{collectModule:ei,reset:er}=(0,b.S)(e=>e),{selectedReferenceModule:eo,onlyFollowers:es,degreesOfSeparation:ec}=(0,y.HB)(e=>e),{restricted:ed,followToView:eu,collectToView:em,superfluidToView:ep,reset:eh}=(0,eI.s)(e=>e),[ex,eg]=(0,x.useState)(!1),[ev,ey]=(0,x.useState)(""),[eb]=(0,c.useLexicalComposerContext)(),ef=(0,N.t_)(),{data:ew}=(0,eL.Z)(),[ej]=te(),[eN]=tt(),eD=Boolean(T),e_=i.cV.includes(null===(t=U[0])||void 0===t?void 0:t.original.mimeType),eT=i.Xe.includes(null===(l=U[0])||void 0===l?void 0:l.original.mimeType),eM=null==A?void 0:null===(m=A.dispatcher)||void 0===m?void 0:m.canUseRelay,eS=null==A?void 0:null===(p=A.dispatcher)||void 0===p?void 0:p.sponsor,ek=e=>{"RelayError"!==e&&(eg(!1),eb.update(()=>{(0,u.$getRoot)().clear()}),V(""),B(null),K(!1),Q(),et(!1),G([]),J({url:"",type:"",uploading:!1}),er(),eh(),eD||E(!1),ei.type,r._9N.DegreesOfSeparationReferenceModule,U.length,U.length>0&&U.map(e=>e.original.mimeType))},eR=e=>{eg(!1)};(0,w.rf)(()=>{ey("")},[q]),(0,w.qR)(()=>{eb.update(()=>{(0,s.$convertFromMarkdownString)(L)})});let eA=e=>{let{txHash:t,txId:l}=e;return{id:(0,j.Z)(),...eD&&{parent:T.id},type:eD?v.As.NewComment:v.As.NewPost,txHash:t,txId:l,content:L,attachments:U,title:q.title,cover:q.cover,author:q.author}},{signTypedDataAsync:eV}=(0,N.yw)({onError:eR}),{error:ez,write:eB}=(0,N.GG)({address:i.Nm,abi:e6.g,functionName:eD?"comment":"post",onSuccess:e=>{let{hash:t}=e;ek(),Z(P+1),en([eA({txHash:t}),...ea])},onError:e=>{eR(e),Z(P-1)}}),[eq]=(0,r.PFI)({onCompleted:e=>{if(ek(),(null==e?void 0:e.broadcastDataAvailability.__typename)==="RelayError")return g.ZP.error(eC.D.SomethingWentWrong);(null==e?void 0:e.broadcastDataAvailability.__typename)==="CreateDataAvailabilityPublicationResult"&&k("/post/".concat(null==e?void 0:e.broadcastDataAvailability.id))},onError:eR}),[eU]=(0,r.lAu)({onCompleted:e=>{let{broadcast:t}=e;ek(t.__typename),"RelayerResult"===t.__typename&&en([eA({txId:t.txId}),...ea])}}),[eG]=(0,r.XqK)({onCompleted:e=>{(null==e?void 0:e.publication)&&R.modify({fields:{publications(){R.writeQuery({data:{publication:null==e?void 0:e.publication},query:r.HfI})}}})}}),eW=async function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],{id:l,typedData:a}=e,n=await eV((0,eJ.Z)(a));if(t)return await eq({variables:{request:{id:l,signature:n}}});let{data:i}=await eU({variables:{request:{id:l,signature:n}}});if((null==i?void 0:i.broadcast.__typename)==="RelayError")return eB({args:[a.value]})},[eK]=(0,r.k9)({onCompleted:async e=>{let{createCommentTypedData:t}=e;return await eW(t)},onError:eR}),[eQ]=(0,r.uNF)({onCompleted:async e=>{let{createPostTypedData:t}=e;return await eW(t)},onError:eR}),[e0]=(0,r.DD2)({onCompleted:async e=>{let{createDataAvailabilityPostTypedData:t}=e;return await eW(t,!0)}}),[e1]=(0,r.ZSw)({onCompleted:async e=>{let{createDataAvailabilityCommentTypedData:t}=e;return await eW(t,!0)}}),[e5]=(0,r.PIL)({onCompleted:e=>{let{createCommentViaDispatcher:t}=e;ek(t.__typename),"RelayerResult"===t.__typename&&en([eA({txId:t.txId}),...ea])},onError:eR}),[e9]=(0,r.CXe)({onCompleted:e=>{let{createPostViaDispatcher:t}=e;ek(t.__typename),"RelayerResult"===t.__typename&&en([eA({txId:t.txId}),...ea])},onError:eR}),[e7]=(0,r.AgJ)({onCompleted:e=>{var t;if((null==e?void 0:null===(t=e.createDataAvailabilityPostViaDispatcher)||void 0===t?void 0:t.__typename)!=="RelayError"&&"CreateDataAvailabilityPublicationResult"===e.createDataAvailabilityPostViaDispatcher.__typename){ek();let{id:l}=e.createDataAvailabilityPostViaDispatcher;k("/post/".concat(l))}},onError:eR}),[tu]=(0,r.Hz4)({onCompleted:e=>{var t;if((null==e?void 0:null===(t=e.createDataAvailabilityCommentViaDispatcher)||void 0===t?void 0:t.__typename)!=="RelayError"&&"CreateDataAvailabilityPublicationResult"===e.createDataAvailabilityCommentViaDispatcher.__typename){ek();let{id:l}=e.createDataAvailabilityCommentViaDispatcher;eG({variables:{request:{publicationId:l}}})}},onError:eR}),tm=async e=>{var t,l;let a={request:e};if(eD){let{data:n}=await tu({variables:a});(null==n?void 0:null===(l=n.createDataAvailabilityCommentViaDispatcher)||void 0===l?void 0:l.__typename)==="RelayError"&&await e1({variables:a});return}let{data:i}=await e7({variables:a});(null==i?void 0:null===(t=i.createDataAvailabilityPostViaDispatcher)||void 0===t?void 0:t.__typename)==="RelayError"&&await e0({variables:a})},tp=async e=>{var t,l;let a={options:{overrideSigNonce:P},request:e};if(eD){let{data:n}=await e5({variables:{request:e}});return(null==n?void 0:null===(l=n.createCommentViaDispatcher)||void 0===l?void 0:l.__typename)==="RelayError"?await eK({variables:a}):void 0}let{data:i}=await e9({variables:{request:e}});if((null==i?void 0:null===(t=i.createPostViaDispatcher)||void 0===t?void 0:t.__typename)==="RelayError")return await eQ({variables:a})},th=()=>{var e;return U.length>0?e_?r.D2x.Audio:i.JF.includes(null===(e=U[0])||void 0===e?void 0:e.original.mimeType)?r.D2x.Image:eT?r.D2x.Video:r.D2x.TextOnly:r.D2x.TextOnly},tx=()=>{if(U.length>0&&(e_||eT)){var e;return null===(e=U[0])||void 0===e?void 0:e.original.url}return null},tg=()=>{var e;return e_?q.cover:eT?H.url:null===(e=U[0])||void 0===e?void 0:e.original.url},tv=()=>{var e;return e_?q.coverMimeType:null===(e=U[0])||void 0===e?void 0:e.original.mimeType},ty=()=>eT?"Video":eD?"Comment":"Post",tb=async e=>{if(!A||!ew)return g.ZP.error(eC.D.SignWallet);let t=await n.LensGatedSDK.create({provider:ef,signer:ew,env:i._s});await t.connect({address:A.ownedBy,env:i._s});let l={thisPublication:!0},a={profileId:A.id},r=await ew.getAddress(),{data:s}=await C.gr.query({query:o.aWf,variables:{id:!r.toString().toLowerCase()}});console.log("superfluidInflowsData",s,!r);let c=s.account.inflows.map(e=>e.sender.id),d={};if(em||eu||ep){let u=[];em&&u.push({collect:l}),eu&&u.push({follow:a}),d=1===u.length?u[0]:{and:{criteria:u}}}else em?d={collect:l}:eu&&(d={follow:a});ep&&(c.length>1?d={or:{criteria:c.map(e=>({eoa:{address:e}}))}}:1===c.length&&(d={eoa:{address:c[0]}})),console.log("accessCondition",d);let{contentURI:m}=await t.gated.encryptMetadata(e,A.id,d,async e=>await (0,eF.Z)(e));return m},tf=async e=>await (0,eF.Z)(e),tw=async()=>{if(!A)return g.ZP.error(eC.D.SignWallet);if(eD&&T.isDataAvailability&&!eS)return g.ZP.error("Momoka is currently in beta - during this time certain actions are not available to all profiles.");try{var e,t,l;if(eg(!0),e_){ey("");let a=e8.q.safeParse(q);if(!a.success){let n=a.error.issues[0];return ey(n.message)}}if(0===L.length&&0===U.length)return ey("".concat(eD?"Comment":"Post"," should not be empty!"));ey("");let o=null;U.length||ei.type===r.pYo.RevertCollectModule||(o=await e$(L,A.handle,new Date().toLocaleString()));let s=null;ee&&(s=await eN());let c=[{traitType:"type",displayType:r.kLb.String,value:null===(e=th())||void 0===e?void 0:e.toLowerCase()},...ee?[{traitType:"audioSpace",displayType:r.kLb.String,value:JSON.stringify({id:s,host:"0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3"})}]:[],...z?[{traitType:"quotedPublicationId",displayType:r.kLb.String,value:z.id}]:[],...e_?[{traitType:"author",displayType:r.kLb.String,value:q.author}]:[],...eT?[{traitType:"durationInSeconds",displayType:r.kLb.String,value:Y}]:[]],d=U.map(e=>({item:e.original.url,cover:tg(),type:e.original.mimeType,altTag:e.original.altTag})),u=L;X&&(u=await ej());let m={version:"2.0.0",metadata_id:(0,j.Z)(),content:u,external_url:"https://lenshareapp.xyz/u/".concat(null==A?void 0:A.id),image:d.length>0?tg():o,imageMimeType:d.length>0?tv():o?"image/svg+xml":null,name:e_?q.title:"".concat(ty()," by @").concat(null==A?void 0:A.handle),animation_url:tx(),mainContentFocus:th(),attributes:c,media:d,locale:eH(),appId:i.iC},p=ei.type===r.pYo.RevertCollectModule,h=!ed&&(eD?T.isDataAvailability&&p:p),x=null;console.log("restricted",ed),x=ed?await tb(m):await tf(m);let v={profileId:null==A?void 0:A.id,contentURI:"ar://".concat(x),...eD&&{publicationId:"Mirror"===T.__typename?null==T?void 0:null===(t=T.mirrorOf)||void 0===t?void 0:t.id:null==T?void 0:T.id},collectModule:e3(ei,A),referenceModule:eo===r._9N.FollowerOnlyReferenceModule?{followerOnlyReferenceModule:!!es}:{degreesOfSeparationReferenceModule:{commentsRestricted:!0,mirrorsRestricted:!0,degreesOfSeparation:ec}}},y={from:null==A?void 0:A.id,...eD&&{commentOn:"Mirror"===T.__typename?null==T?void 0:null===(l=T.mirrorOf)||void 0===l?void 0:l.id:null==T?void 0:T.id},contentURI:"ar://".concat(x)};if(eM){if(h&&eS)return await tm(y);return await tp(v)}if(eD)return await eK({variables:{options:{overrideSigNonce:P},request:v}});return await eQ({variables:{options:{overrideSigNonce:P},request:v}})}catch(b){eR(b)}},tj=e=>{let t={id:(0,j.Z)(),previewItem:e.images.original.url,original:{url:e.images.original.url,mimeType:"image/gif",altTag:e.title}};W([t])},tN=!!X&&(!el.choices.length||el.choices.some(e=>!e.length));return(0,a.jsxs)(_.Z,{className:(0,d.Z)({"!rounded-b-xl !rounded-t-none border-none":!eD},"pb-3"),children:[ez&&(0,a.jsx)(eY.B,{className:"!rounded-none",title:"Transaction failed!",error:ez}),(0,a.jsx)(eE,{}),ev&&(0,a.jsx)("div",{className:"mt-1 px-5 pb-3 text-sm font-bold text-red-500",children:ev}),X&&(0,a.jsx)(O,{}),z?(0,a.jsx)(e4.Z,{className:"m-5",zeroPadding:!0,children:(0,a.jsx)(tl.Z,{profile:M,publication:z,isNew:!0})}):null,(0,a.jsxs)("div",{className:"block items-center px-5 sm:flex",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,a.jsx)(ti,{}),(0,a.jsx)(tr,{setGifAttachment:e=>tj(e)}),!(null==T?void 0:T.isDataAvailability)&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(to,{}),(0,a.jsx)(ts,{}),(0,a.jsx)(tc,{})]}),(0,a.jsx)(td,{}),eD?null:(0,a.jsx)(F,{})]}),(0,a.jsx)("div",{className:"ml-auto pt-2 sm:pt-0",children:(0,a.jsx)(D.z,{disabled:ex||$||tN||H.uploading,icon:ex?(0,a.jsx)(eX.$,{size:"xs"}):eD?(0,a.jsx)(tn.Z,{className:"h-4 w-4"}):ee?(0,a.jsx)(I.Z,{className:"h-4 w-4"}):(0,a.jsx)(ta.Z,{className:"h-4 w-4"}),onClick:tw,children:eD?"Comment":ee?"Start Space":"Post"})})]}),(0,a.jsx)("div",{className:"px-5",children:(0,a.jsx)(e2.Z,{attachments:U,isNew:!0})})]})};var tm=(e=>{let t=t=>(0,a.jsx)(e1.LexicalComposer,{initialConfig:{...e5},children:(0,a.jsx)(e,{...t})});return t})(tu)},39059:function(e,t,l){"use strict";l.d(t,{cp:function(){return o},l0:function(){return s},w5:function(){return r}});var a=l(85893),n=l(56312),i=l(87536);let r=e=>{let{schema:t,...l}=e;return(0,i.cI)({...l,resolver:(0,n.F)(t)})},o=e=>{let{name:t}=e,{formState:{errors:l}}=(0,i.Gc)();if(!t)return null;let n=l[t];return n?(0,a.jsx)("div",{className:"mt-1 text-sm font-bold text-red-500",children:n.message}):null},s=e=>{let{form:t,onSubmit:l,children:n,className:r=""}=e;return(0,a.jsx)(i.RV,{...t,children:(0,a.jsx)("form",{onSubmit:t.handleSubmit(l),children:(0,a.jsx)("fieldset",{className:"flex flex-col ".concat(r),disabled:t.formState.isSubmitting,children:n})})})}},61286:function(e,t,l){"use strict";l.d(t,{I:function(){return d}});var a=l(85893),n=l(86010),i=l(5152),r=l.n(i),o=l(67294),s=l(39059);let c=r()(()=>Promise.all([l.e(2697),l.e(2252)]).then(l.bind(l,22252)),{loadableGenerated:{webpack:()=>[22252]}}),d=(0,o.forwardRef)(function(e,t){let{label:l,prefix:i,type:r="text",iconLeft:d,iconRight:u,error:m,className:p="",helper:h,...x}=e,g=(0,o.useId)(),v=["text-zinc-500 [&>*]:peer-focus:text-brand [&>*]:h-5",{"!text-red-500 [&>*]:peer-focus:!text-red-500":m}];return(0,a.jsxs)("label",{className:"w-full",htmlFor:g,children:[l&&(0,a.jsxs)("div",{className:"mb-1 flex items-center space-x-1.5",children:[(0,a.jsx)("div",{className:"font-medium text-gray-800 dark:text-gray-200",children:l}),(0,a.jsx)(c,{content:h})]}),(0,a.jsxs)("div",{className:"flex",children:[i&&(0,a.jsx)("span",{className:"lt-text-gray-500 inline-flex items-center rounded-l-xl border border-r-0 border-gray-300 bg-gray-100 px-3 dark:border-gray-700",children:i}),(0,a.jsxs)("div",{className:(0,n.Z)({"bg-gray-500/20 opacity-60":x.disabled},m?"!border-red-500":"focus-within:ring-1",i?"rounded-r-xl":"rounded-xl","focus-within:border-brand-500 focus-within:ring-brand-400 flex w-full items-center border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-100"),children:[(0,a.jsx)("input",{id:g,className:(0,n.Z)({"placeholder:text-red-500":m},i?"rounded-r-xl":"rounded-xl","peer w-full border-none bg-transparent outline-none focus:ring-0",p),type:r,ref:t,...x}),(0,a.jsx)("span",{tabIndex:-1,className:(0,n.Z)({"order-first pl-3":d},v),children:d}),(0,a.jsx)("span",{tabIndex:-1,className:(0,n.Z)({"order-last pr-3":u},v),children:u})]})]}),x.name&&(0,a.jsx)(s.cp,{name:x.name})]})})},10985:function(e,t,l){"use strict";var a=l(34625),n=l(6154),i=l(86501),r=l(41741);let o=async e=>{try{let t=await (0,n.Z)(a.wb,{method:"POST",headers:{"Content-Type":"application/json"},data:e}),{id:l}=null==t?void 0:t.data;return l}catch(o){throw console.error("Failed to upload to Arweave",o),i.ZP.error(r.D.SomethingWentWrong),Error(r.D.SomethingWentWrong)}};t.Z=o},52815:function(e,t,l){"use strict";l.d(t,{s:function(){return n}});var a=l(73445);let n=(0,a.ZP)((e,t)=>({restricted:!1,setRestricted:t=>e(()=>({restricted:t})),collectToView:!1,setCollectToView:t=>e(()=>({collectToView:t})),followToView:!1,setFollowToView:t=>e(()=>({followToView:t})),superfluidToView:!1,setSuperfluidToView:t=>e(()=>({superfluidToView:t})),hasConditions:()=>{let{followToView:e,collectToView:l,superfluidToView:a}=t();return e||l||a},reset:()=>e(()=>({restricted:!1,collectToView:!1,followToView:!1,superfluidToView:!1}))}))},20269:function(e,t,l){"use strict";l.d(t,{S:function(){return r}});var a=l(68980),n=l(73445);let i={type:a.pYo.RevertCollectModule,amount:null,referralFee:0,collectLimit:null,timeLimit:!1,recipients:[],followerOnlyCollect:!1},r=(0,n.Ue)(e=>({collectModule:i,setCollectModule:t=>e(()=>({collectModule:t})),reset:()=>e(()=>({collectModule:i}))}))},11600:function(e,t,l){"use strict";var a=l(48113),n=l(67294),i=l(86501),r=l(57632),o=l(62641);let s=()=>{let e=(0,a.l)(e=>e.addAttachments),t=(0,a.l)(e=>e.updateAttachments),l=(0,a.l)(e=>e.removeAttachments),s=(0,a.l)(e=>e.setIsUploading),c=(0,n.useCallback)(async a=>{s(!0);let n=Array.from(a),c=[],d=n.map(e=>{let t=(0,r.Z)();return c.push(t),{id:t,file:e,previewItem:URL.createObjectURL(e),original:{url:URL.createObjectURL(e),mimeType:e.type}}}),u=n.map(e=>{let t=e.type.includes("image"),l=e.type.includes("video"),a=e.type.includes("audio");return t&&e.size>5e7?(i.Am.error("Image size should be less than 50MB"),!1):l&&e.size>2e8?(i.Am.error("Video size should be less than 200MB"),!1):!a||!(e.size>1e8)||(i.Am.error("Audio size should be less than 100MB"),!1)});e(d);let m=[];try{if(u.includes(!1))return s(!1),l(c),[];let p=await (0,o.Z)(a);p&&(m=d.map((e,t)=>({...e,original:{url:p[t].original.url,mimeType:p[t].original.mimeType}})),t(m))}catch(h){console.error("Failed to upload attachments",h),l(c),i.Am.error("Something went wrong while uploading!")}return s(!1),m},[e,l,t,s]);return{handleUploadAttachments:c}};t.Z=s},63897:function(){}}]);