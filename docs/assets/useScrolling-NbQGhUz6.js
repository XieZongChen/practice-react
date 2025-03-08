import{j as e}from"./jsx-runtime-Cl2eCCBe.js";import{useMDXComponents as l}from"./index-BLKynSmM.js";import{ae as n}from"./index-DCnMP1Ew.js";import"./index-Cqyox1Tj.js";import"./iframe-Dl3VxQ1U.js";import"../sb-preview/runtime.js";import"./index-DdkF6LrP.js";import"./index-DGXSSr1l.js";import"./index-CHGET4sZ.js";import"./index-DrFu-skq.js";function i(t){const d={code:"code",h1:"h1",p:"p",pre:"pre",...l(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{title:"hooks/useScrolling"}),`
`,e.jsx(d.h1,{id:"usescrolling",children:"useScrolling"}),`
`,e.jsx(d.p,{children:"滚动检测"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-jsx",children:`const App = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrolling = useScrolling(scrollRef);

  return (
    <>
      {<div>{scrolling ? '滚动中..' : '没有滚动'}</div>}

      <div ref={scrollRef} style={{ height: '200px', overflow: 'auto' }}>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
        <div>test placeholder</div>
      </div>
    </>
  );
};
`})})]})}function x(t={}){const{wrapper:d}={...l(),...t.components};return d?e.jsx(d,{...t,children:e.jsx(i,{...t})}):i(t)}export{x as default};
