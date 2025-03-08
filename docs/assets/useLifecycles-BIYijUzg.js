import{j as n}from"./jsx-runtime-Cl2eCCBe.js";import{useMDXComponents as s}from"./index-BLKynSmM.js";import{ae as r}from"./index-DCnMP1Ew.js";import"./index-Cqyox1Tj.js";import"./iframe-Dl3VxQ1U.js";import"../sb-preview/runtime.js";import"./index-DdkF6LrP.js";import"./index-DGXSSr1l.js";import"./index-CHGET4sZ.js";import"./index-DrFu-skq.js";function t(o){const e={code:"code",h1:"h1",p:"p",pre:"pre",...s(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"hooks/useLifecycles"}),`
`,n.jsx(e.h1,{id:"uselifecycles",children:"useLifecycles"}),`
`,n.jsx(e.p,{children:"生命周期调用函数"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`const App = () => {
  useLifecycles({
    create: () => {
      console.log('CREATE')
    },
    mount: () => {
      console.log('MOUNTED')
    }, 
    unmount: () => {
      console.log('UNMOUNTED')
    } 
  });

  return <div></div>;
};
`})})]})}function f(o={}){const{wrapper:e}={...s(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(t,{...o})}):t(o)}export{f as default};
