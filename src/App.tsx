import React, { useRef } from 'react';
import { ConfigProvider } from './components/Space/ConfigProvider';
import { useMessage } from './components/Message/useMessage';

function Test() {
  const message = useMessage();

  return (
    <button
      onClick={() => {
        console.log('message', message)
        message?.add({
          content: '请求成功',
        });
      }}
    >
      成功
    </button>
  );
}

function App() {
  return (
    <ConfigProvider>
      <div>
        <Test></Test>
      </div>
    </ConfigProvider>
  );
}

export default App;
