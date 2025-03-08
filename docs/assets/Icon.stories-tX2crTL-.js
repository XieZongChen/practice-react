import{j as r}from"./jsx-runtime-Cl2eCCBe.js";import{r as w}from"./index-Cqyox1Tj.js";import{c as _}from"./index-D6sWmfN8.js";const b=e=>Array.isArray(e)&&e.length===2?e:[e||"1em",e||"1em"],d=w.forwardRef((e,s)=>{const{style:n,className:c,spin:i,size:p="1em",children:j,...z}=e,[N,R]=b(p),T=_("icon",{"icon-spin":i},c);return r.jsx("svg",{ref:s,className:T,style:n,width:N,height:R,fill:"currentColor",...z,children:j})});d.__docgenInfo={description:"",methods:[],displayName:"Icon",props:{className:{required:!1,tsType:{name:"string"},description:"类名"},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"样式"},size:{required:!1,tsType:{name:"union",raw:"string | string[]",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}]},description:"大小，可以传 `['10px', '10px']` 分别指定宽高，也可以传 `'10px'` 来同时指定宽高"},spin:{required:!1,tsType:{name:"boolean"},description:"是否旋转"}}};function q(e){const{content:s,iconProps:n={},viewBox:c="0 0 1024 1024"}=e;return w.forwardRef((i,p)=>r.jsx(d,{ref:p,viewBox:c,...n,...i,children:s}))}const A=q({content:r.jsx(r.Fragment,{children:r.jsx("path",{d:"M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"})})}),m=e=>r.jsx(A,{...e}),H={title:"components/Icon",component:d,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{spin:{control:"boolean"}},args:{}},t={args:{size:"30px"},render:m},o={args:{spin:!0},render:m},a={args:{style:{color:"blue",fontSize:"50px"}},render:m};var l,u,g;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    size: '30px'
  },
  render: renderIcon
}`,...(g=(u=t.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var f,x,h;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    spin: true
  },
  render: renderIcon
}`,...(h=(x=o.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var y,S,I;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    style: {
      color: 'blue',
      fontSize: '50px'
    }
  },
  render: renderIcon
}`,...(I=(S=a.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};const P=["Size","Spin","Style"];export{t as Size,o as Spin,a as Style,P as __namedExportsOrder,H as default};
