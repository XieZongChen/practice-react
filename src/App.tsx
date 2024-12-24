import Calendar from '@/components/calendar';
import dayjs from 'dayjs';

function App() {
  return (
    <Calendar
      value={dayjs('2024-7-11')}
    ></Calendar>
  );
}

export default App;
