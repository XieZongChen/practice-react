import{j as e}from"./jsx-runtime-Cl2eCCBe.js";import{useMDXComponents as t}from"./index-BLKynSmM.js";import{ae as s}from"./index-DCnMP1Ew.js";import"./index-Cqyox1Tj.js";import"./iframe-Dl3VxQ1U.js";import"../sb-preview/runtime.js";import"./index-DdkF6LrP.js";import"./index-DGXSSr1l.js";import"./index-CHGET4sZ.js";import"./index-DrFu-skq.js";function o(r){const n={code:"code",h1:"h1",p:"p",pre:"pre",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"hooks/useHoverRef"}),`
`,e.jsx(n.h1,{id:"usehoverref",children:"useHoverRef"}),`
`,e.jsx(n.p,{children:"通过传入 ref 进行 js 模拟 hover 事件"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`function App() {
  const ref = useRef<HTMLDivElement>(null);
  const isHovering = useHoverRef(ref);
  return <div ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>;
}
`})})]})}function v(r={}){const{wrapper:n}={...t(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(o,{...r})}):o(r)}export{v as default};
