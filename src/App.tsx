import { IconAdd } from './components/icon/icons/IconAdd';
import { IconEmail } from './components/icon/icons/IconEmail';

function App() {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <IconAdd size='40px'></IconAdd>
      <IconAdd spin></IconAdd>
      <IconEmail style={{ color: 'blue', fontSize: '50px' }}></IconEmail>
    </div>
  );
}

export default App;
