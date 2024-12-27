import Space from './components/space';

function App() {
  return (
    <Space
      className='container'
      direction='horizontal'
      align='end'
      wrap={true}
      size={['large', 'small']}
    >
      <div className='box'></div>
      <div className='box'></div>
      <div className='box'></div>
    </Space>
  );
}

export default App;
