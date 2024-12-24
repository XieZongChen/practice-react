import Calendar from '@/components/calendar';
import dayjs from 'dayjs';

function App() {
  return (
    <Calendar
      value={dayjs('2024-7-11')}
      dateInnerContent={(value) => {
        return (
          <div>
            <p style={{ background: 'yellowgreen', height: '30px' }}>
              {value.format('YYYY/MM/DD')}
            </p>
          </div>
        );
      }}
    ></Calendar>
  );
}

export default App;
