import{j as e}from"./jsx-runtime-Cl2eCCBe.js";import{R as c}from"./index-Cqyox1Tj.js";import{c as M}from"./index-D6sWmfN8.js";const O=c.createContext({}),W={small:8,middle:16,large:24};function H(a){return typeof a=="string"?W[a]:a||0}const u=a=>{const{space:d}=c.useContext(O),{className:g,style:S,children:J,size:r=(d==null?void 0:d.size)||"small",direction:y="horizontal",align:v,split:f,wrap:P=!1,...D}=a,x=c.Children.toArray(a.children),E=x.map((n,z)=>{const I=n&&n.key||`space-item-${z}`;return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"space-item",children:n},I),z<x.length-1&&f&&e.jsx("span",{className:`${g}-split`,style:S,children:f})]})}),h=y==="horizontal"&&v===void 0?"center":v,G=M("space",`space-${y}`,{[`space-align-${h}`]:h},g),s={},[B,F]=c.useMemo(()=>(Array.isArray(r)?r:[r,r]).map(n=>H(n)),[r]);return s.columnGap=B,s.rowGap=F,P&&(s.flexWrap="wrap"),e.jsx("div",{className:G,style:{...s,...S},...D,children:E})};u.__docgenInfo={description:"",methods:[],displayName:"Space",props:{className:{required:!1,tsType:{name:"string"},description:"类名"},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"样式"},size:{required:!1,tsType:{name:"union",raw:"SizeType | [SizeType, SizeType]",elements:[{name:"union",raw:"'small' | 'middle' | 'large' | number | undefined",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'large'"},{name:"number"},{name:"undefined"}]},{name:"tuple",raw:"[SizeType, SizeType]",elements:[{name:"union",raw:"'small' | 'middle' | 'large' | number | undefined",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'large'"},{name:"number"},{name:"undefined"}]},{name:"union",raw:"'small' | 'middle' | 'large' | number | undefined",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'large'"},{name:"number"},{name:"undefined"}]}]}]},description:"间距"},direction:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:"排布方式"},align:{required:!1,tsType:{name:"union",raw:"'start' | 'end' | 'center' | 'baseline'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"},{name:"literal",value:"'center'"},{name:"literal",value:"'baseline'"}]},description:"对齐方式"},split:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"分隔符"},wrap:{required:!1,tsType:{name:"boolean"},description:"是否可换行"}}};const p={width:"100px",height:"100px",background:"pink",border:"1px solid #000"},m=a=>e.jsxs(u,{...a,children:[e.jsx("div",{style:p}),e.jsx("div",{style:p}),e.jsx("div",{style:p})]}),U={title:"components/Space",component:u,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},t={args:{size:[20,30]},render:m},l={args:{direction:"vertical"},render:m},i={args:{align:"end"},render:m},o={args:{split:"|"},render:m};var w,T,b;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    size: [20, 30]
  },
  render: renderSpace
}`,...(b=(T=t.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};var N,j,R;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    direction: 'vertical'
  },
  render: renderSpace
}`,...(R=(j=l.parameters)==null?void 0:j.docs)==null?void 0:R.source}}};var q,C,A;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    align: 'end'
  },
  render: renderSpace
}`,...(A=(C=i.parameters)==null?void 0:C.docs)==null?void 0:A.source}}};var k,_,$;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    split: '|'
  },
  render: renderSpace
}`,...($=(_=o.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};const V=["Size","Direction","Align","Split"];export{i as Align,l as Direction,t as Size,o as Split,V as __namedExportsOrder,U as default};
