import{j as e}from"./jsx-runtime-Cl2eCCBe.js";import{useMDXComponents as t}from"./index-BLKynSmM.js";import{ae as s}from"./index-DCnMP1Ew.js";import"./index-Cqyox1Tj.js";import"./iframe-Dl3VxQ1U.js";import"../sb-preview/runtime.js";import"./index-DdkF6LrP.js";import"./index-DGXSSr1l.js";import"./index-CHGET4sZ.js";import"./index-DrFu-skq.js";function r(o){const n={code:"code",h1:"h1",p:"p",pre:"pre",...t(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"hooks/useHover"}),`
`,e.jsx(n.h1,{id:"usehover",children:"useHover"}),`
`,e.jsx(n.p,{children:"通过传入 element 进行 js 模拟 hover 事件"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`const App = () => {
  const element = (hovered: boolean) => (
    <div>Hover me! {hovered && 'Thanks'}</div>
  );

  const [hoverable, hovered] = useHover(element);

  return (
    <div>
      {hoverable}
      <div>{hovered ? 'HOVERED' : ''}</div>
    </div>
  );
};
`})})]})}function x(o={}){const{wrapper:n}={...t(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(r,{...o})}):r(o)}export{x as default};
