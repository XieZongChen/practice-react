import { createFromIconfont } from './components/icon/createFrontIconfont';
import { IconAdd } from './components/icon/icons/IconAdd';
import { IconEmail } from './components/icon/icons/IconEmail';

const IconFont = createFromIconfont(
  '//at.alicdn.com/t/c/font_4443338_a2wwqhorbk4.js'
);

function App() {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <IconAdd size='40px'></IconAdd>
      <IconAdd spin></IconAdd>
      <IconEmail style={{ color: 'blue', fontSize: '50px' }}></IconEmail>
      <IconFont type='icon-shouye-zhihui' size='40px'></IconFont>
      <IconFont
        type='icon-gerenzhongxin-zhihui'
        fill='blue'
        size='40px'
      ></IconFont>
    </div>
  );
}

export default App;
