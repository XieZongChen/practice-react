import React, { useRef } from 'react';
import ColorPickerPanel from './components/ColorPickerPanel';
import { Mask } from './components/Tour/Mask';
import Popover from './components/Popover';

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Mask
        element={document.getElementById('test')!}
        renderMaskContent={(wrap) => (
          <Popover
            content={
              <div style={{ width: 300 }}>
                <p>hello</p>
                <button>下一步</button>
              </div>
            }
            open={true}
          >
            {wrap}
          </Popover>
        )}
      ></Mask>
      <div id='test' style={{ width: 'max-content' }}>
        test!
      </div>
    </div>
  );
}

export default App;
