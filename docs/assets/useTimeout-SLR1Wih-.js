import{j as t}from"./jsx-runtime-Cl2eCCBe.js";import{useMDXComponents as s}from"./index-BLKynSmM.js";import{ae as r}from"./index-DCnMP1Ew.js";import"./index-Cqyox1Tj.js";import"./iframe-Dl3VxQ1U.js";import"../sb-preview/runtime.js";import"./index-DdkF6LrP.js";import"./index-DGXSSr1l.js";import"./index-CHGET4sZ.js";import"./index-DrFu-skq.js";function o(n){const e={code:"code",h1:"h1",p:"p",pre:"pre",...s(),...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(r,{title:"hooks/useTimeout"}),`
`,t.jsx(e.h1,{id:"usetimeout",children:"useTimeout"}),`
`,t.jsx(e.p,{children:"计时器"}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-jsx",children:`function App() {
  const [state, setState] = useState(1);
  
  useTimeout(() => {
    setState(state + 1);
  }, 3000);

  return <div>{state}</div>;
}
`})})]})}function l(n={}){const{wrapper:e}={...s(),...n.components};return e?t.jsx(e,{...n,children:t.jsx(o,{...n})}):o(n)}export{l as default};
