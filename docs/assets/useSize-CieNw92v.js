import{j as e}from"./jsx-runtime-Cl2eCCBe.js";import{useMDXComponents as o}from"./index-BLKynSmM.js";import{ae as r}from"./index-DCnMP1Ew.js";import"./index-Cqyox1Tj.js";import"./iframe-Dl3VxQ1U.js";import"../sb-preview/runtime.js";import"./index-DdkF6LrP.js";import"./index-DGXSSr1l.js";import"./index-CHGET4sZ.js";import"./index-DrFu-skq.js";function i(t){const n={code:"code",h1:"h1",p:"p",pre:"pre",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"hooks/useSize"}),`
`,e.jsx(n.h1,{id:"usesize",children:"useSize"}),`
`,e.jsx(n.p,{children:"获取 dom 的尺寸，在窗口大小改变的时候会实时返回新的尺寸"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`function App() {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  return (
    <div ref={ref}>
      <p>改变窗口大小试试</p>
      <p>
        width: {size?.width}px, height: {size?.height}px
      </p>
    </div>
  );
}
`})})]})}function f(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{f as default};
