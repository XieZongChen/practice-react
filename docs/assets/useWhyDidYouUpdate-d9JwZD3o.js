import{j as n}from"./jsx-runtime-Cl2eCCBe.js";import{useMDXComponents as r}from"./index-BLKynSmM.js";import{ae as s}from"./index-DCnMP1Ew.js";import"./index-Cqyox1Tj.js";import"./iframe-Dl3VxQ1U.js";import"../sb-preview/runtime.js";import"./index-DdkF6LrP.js";import"./index-DGXSSr1l.js";import"./index-CHGET4sZ.js";import"./index-DrFu-skq.js";function e(o){const t={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(s,{title:"hooks/useWhyDidYouUpdate"}),`
`,n.jsx(t.h1,{id:"usewhydidyouupdate",children:"useWhyDidYouUpdate"}),`
`,n.jsx(t.p,{children:"在控制台打印组件因何 props 改变而造成重新渲染"}),`
`,n.jsx(t.p,{children:n.jsx(t.strong,{children:"参数"})}),`
`,n.jsxs(t.ul,{children:[`
`,n.jsxs(t.li,{children:[n.jsx(t.code,{children:"componentName"})," 组件名称"]}),`
`,n.jsxs(t.li,{children:[n.jsx(t.code,{children:"props"})," 组件 props 和 state"]}),`
`]}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-jsx",children:`const Demo: React.FC<{ count: number }> = (props) => {
  const [randomNum, setRandomNum] = useState(Math.random());

  useWhyDidYouUpdate('Demo', { ...props, randomNum });

  return (
    <div>
      <div>
        <span>number: {props.count}</span>
      </div>
      <div>
        randomNum: {randomNum}
        <button onClick={() => setRandomNum(Math.random)}>
          设置随机 state
        </button>
      </div>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Demo count={count} />
      <div>
        <button onClick={() => setCount((prevCount) => prevCount - 1)}>
          减一
        </button>
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>
          加一
        </button>
      </div>
    </div>
  );
}
`})})]})}function j(o={}){const{wrapper:t}={...r(),...o.components};return t?n.jsx(t,{...o,children:n.jsx(e,{...o})}):e(o)}export{j as default};
