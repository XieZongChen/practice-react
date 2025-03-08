import{j as e}from"./jsx-runtime-Cl2eCCBe.js";import{useMDXComponents as i}from"./index-BLKynSmM.js";import{ae as r}from"./index-DCnMP1Ew.js";import"./index-Cqyox1Tj.js";import"./iframe-Dl3VxQ1U.js";import"../sb-preview/runtime.js";import"./index-DdkF6LrP.js";import"./index-DGXSSr1l.js";import"./index-CHGET4sZ.js";import"./index-DrFu-skq.js";function t(n){const o={code:"code",h1:"h1",p:"p",pre:"pre",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"hooks/useCookie"}),`
`,e.jsx(o.h1,{id:"usecookie",children:"useCookie"}),`
`,e.jsx(o.p,{children:"操作 cookie"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`const App = () => {
  const [value, updateCookie, deleteCookie] = useCookie('cookie-storage');

  useEffect(() => {
    () => {
      deleteCookie();
    };
  }, []);

  const updateCookieHandler = () => {
    updateCookie('666');
  };

  return (
    <div>
      <p>cookie 值: {value}</p>
      <button onClick={updateCookieHandler}>更新 Cookie</button>
      <br />
      <button onClick={deleteCookie}>删除 Cookie</button>
    </div>
  );
};
`})})]})}function x(n={}){const{wrapper:o}={...i(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(t,{...n})}):t(n)}export{x as default};
