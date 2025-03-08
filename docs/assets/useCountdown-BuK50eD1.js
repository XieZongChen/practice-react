import{j as n}from"./jsx-runtime-Cl2eCCBe.js";import{useMDXComponents as t}from"./index-BLKynSmM.js";import{ae as r}from"./index-DCnMP1Ew.js";import"./index-Cqyox1Tj.js";import"./iframe-Dl3VxQ1U.js";import"../sb-preview/runtime.js";import"./index-DdkF6LrP.js";import"./index-DGXSSr1l.js";import"./index-CHGET4sZ.js";import"./index-DrFu-skq.js";function o(s){const e={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"hooks/useCountdown"}),`
`,n.jsx(e.h1,{id:"usecountdown",children:"useCountdown"}),`
`,n.jsx(e.p,{children:"倒计时"}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"参数"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"options-leftTime"})," 剩余时间"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"options-targetDate"})," 目标日期"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"options-interval"})," 倒计时变化的时间间隔，默认 1s"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"options-onEnd"})," 倒计时结束的回调"]}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"返回"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["[",n.jsx(e.code,{children:"timeLeft"})," 剩余时间, ",n.jsx(e.code,{children:"formattedRes"})," 格式化的剩余时间]"]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`function App() {
  const [countdown, formattedRes] = useCountDown({
    targetDate: \`\${new Date().getFullYear()}-12-31 23:59:59\`,
  });

  const { days, hours, minutes, seconds, milliseconds } = formattedRes;

  return (
    <p>
      距离今年年底还剩 {days} 天 {hours} 小时 {minutes} 分钟 {seconds} 秒{' '}
      {milliseconds} 毫秒
    </p>
  );
}
`})})]})}function a(s={}){const{wrapper:e}={...t(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(o,{...s})}):o(s)}export{a as default};
