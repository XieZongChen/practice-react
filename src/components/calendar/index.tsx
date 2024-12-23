import { Dayjs } from 'dayjs';
import MonthCalendar from './MonthCalendar';
import './index.scss';
import Header from './Header';

export interface CalendarProps {
  value: Dayjs;
}

function Calendar(props: CalendarProps) {
  return (
    <div className='calendar'>
      <Header />
      <MonthCalendar {...props} />
    </div>
  );
}

export default Calendar;
