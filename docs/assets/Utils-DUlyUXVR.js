import{j as n}from"./jsx-runtime-Cl2eCCBe.js";import{useMDXComponents as r}from"./index-BLKynSmM.js";import{ae as t}from"./index-DCnMP1Ew.js";import"./index-Cqyox1Tj.js";import"./iframe-Dl3VxQ1U.js";import"../sb-preview/runtime.js";import"./index-DdkF6LrP.js";import"./index-DGXSSr1l.js";import"./index-CHGET4sZ.js";import"./index-DrFu-skq.js";function o(i){const e={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...r(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(t,{title:"components/Space/Utils"}),`
`,n.jsx(e.h1,{id:"其他工具",children:"其他工具"}),`
`,n.jsx(e.h2,{id:"configprovider",children:"ConfigProvider"}),`
`,n.jsx(e.p,{children:"方便一次修改多个 space 的 size"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`function App() {
  return (
    <ConfigProvider space={{ size: 20 }}>
      <Space direction='horizontal'>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
      </Space>
      <Space direction='vertical'>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
      </Space>
    </ConfigProvider>
  );
}
`})})]})}function j(i={}){const{wrapper:e}={...r(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(o,{...i})}):o(i)}export{j as default};
