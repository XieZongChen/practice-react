import{j as s}from"./jsx-runtime-Cl2eCCBe.js";import{r as o}from"./index-Cqyox1Tj.js";import{r as g}from"./index-DdkF6LrP.js";import"./index-DGXSSr1l.js";function x(r){return typeof r=="string"?document.querySelector(r):typeof r=="object"&&r instanceof window.HTMLElement?r:document.body}const l=o.forwardRef((r,h)=>{const{attach:a=document.body,children:f}=r,t=o.useMemo(()=>{const e=document.createElement("div");return e.className="portal-wrapper",e},[]);return o.useEffect(()=>{var c;const e=x(a);return(c=e==null?void 0:e.appendChild)==null||c.call(e,t),()=>{var d;(d=e==null?void 0:e.removeChild)==null||d.call(e,t)}},[t,a]),o.useImperativeHandle(h,()=>t),g.createPortal(f,t)});l.__docgenInfo={description:"",methods:[],displayName:"Portal",props:{attach:{required:!1,tsType:{name:"union",raw:"HTMLElement | string",elements:[{name:"HTMLElement"},{name:"string"}]},description:"目标 dom 节点，可以传一个 HTMLElement 或选择器，默认为 body"},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"渲染节点"}}};const y={width:"100px",height:"100px",background:"pink",border:"1px solid #000",top:"0",position:"absolute"},u=r=>s.jsx(l,{...r,children:s.jsx("div",{style:y,children:"渲染节点"})}),P={title:"components/Portal",component:u,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{}},n={args:{attach:"html",children:s.jsx(s.Fragment,{})},render:u};var i,m,p;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    attach: 'html',
    children: <></>
  },
  render: renderPortal
}`,...(p=(m=n.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const R=["Attach"];export{n as Attach,R as __namedExportsOrder,P as default};
