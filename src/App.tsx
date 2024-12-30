import Space from '@/components/Space';
import { ConfigProvider } from '@/components/Space/ConfigProvider';

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
