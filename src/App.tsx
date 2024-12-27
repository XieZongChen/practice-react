import Space from './components/space';
import { ConfigProvider } from './components/space/ConfigProvider';

function App() {
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

export default App;
