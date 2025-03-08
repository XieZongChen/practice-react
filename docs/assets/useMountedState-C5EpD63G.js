import{j as t}from"./jsx-runtime-Cl2eCCBe.js";import{useMDXComponents as r}from"./index-BLKynSmM.js";import{ae as s}from"./index-DCnMP1Ew.js";import"./index-Cqyox1Tj.js";import"./iframe-Dl3VxQ1U.js";import"../sb-preview/runtime.js";import"./index-DdkF6LrP.js";import"./index-DGXSSr1l.js";import"./index-CHGET4sZ.js";import"./index-DrFu-skq.js";function o(n){const e={code:"code",h1:"h1",p:"p",pre:"pre",...r(),...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{title:"hooks/useMountedState"}),`
`,t.jsx(e.h1,{id:"usemountedstate",children:"useMountedState"}),`
`,t.jsx(e.p,{children:"获取 react 组件 mount 状态"}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-jsx",children:`const App = () => {
  const isMounted = useMountedState();

  return <div>{isMounted() ? 'mounted' : 'pending'}</div>;
};
`})})]})}function l(n={}){const{wrapper:e}={...r(),...n.components};return e?t.jsx(e,{...n,children:t.jsx(o,{...n})}):o(n)}export{l as default};
