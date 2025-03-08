import{j as n}from"./jsx-runtime-Cl2eCCBe.js";import{useMDXComponents as c}from"./index-BLKynSmM.js";import{ae as r}from"./index-DCnMP1Ew.js";import"./index-Cqyox1Tj.js";import"./iframe-Dl3VxQ1U.js";import"../sb-preview/runtime.js";import"./index-DdkF6LrP.js";import"./index-DGXSSr1l.js";import"./index-CHGET4sZ.js";import"./index-DrFu-skq.js";function e(t){const o={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...c(),...t.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"components/Icon/Utils"}),`
`,n.jsx(o.h1,{id:"其他工具",children:"其他工具"}),`
`,n.jsx(o.h2,{id:"createicon",children:"createIcon"}),`
`,n.jsx(o.p,{children:"通过 svg 的图形 api 创建一个 Icon"}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-jsx",children:`export const IconAdd = createIcon({
  content: (
    <>
      <path d='M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z'></path>
    </>
  ),
});

function App() {
  // props 同 Icon 组件
  return <IconAdd spin></IconAdd>;
}
`})}),`
`,n.jsx(o.h2,{id:"createfronticonfont",children:"createFrontIconfont"}),`
`,n.jsxs(o.p,{children:["将 ",n.jsx(o.a,{href:"https://www.iconfont.cn/",rel:"nofollow",children:"iconfont"})," 图标库的链接转化为 Icon"]}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-jsx",children:`const IconFont = createFromIconfont(
  '//at.alicdn.com/t/c/font_4443338_a2wwqhorbk4.js'
);

function App() {
  // props 同 Icon 组件
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <IconFont type='icon-shouye-zhihui' size='40px'></IconFont>
      <IconFont type='icon-gerenzhongxin-zhihui' fill='blue' size='40px'></IconFont>
    </div>
  );
}
`})})]})}function j(t={}){const{wrapper:o}={...c(),...t.components};return o?n.jsx(o,{...t,children:n.jsx(e,{...t})}):e(t)}export{j as default};
