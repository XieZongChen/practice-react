import React, { useRef } from 'react';
import Popover from './components/Popover';

function App() {
  const popoverContent = (
    <div>
      测试内容
      <button
        onClick={() => {
          alert(1);
        }}
      >
        测试组件
      </button>
    </div>
  );

  return (
    <Popover
      content={popoverContent}
      placement='bottom'
      trigger='click'
      style={{ margin: '200px' }}
    >
      <button>测试</button>
    </Popover>
  );
}

export default App;
