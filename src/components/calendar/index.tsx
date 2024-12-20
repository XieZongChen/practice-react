import { useState } from 'react';
import './index.css';
import { daysOfMonth, firstDayOfMonth } from './helper';

export function Calendar() {
  const [date, setDate] = useState(new Date());

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const renderDates = () => {
    const days = [];
    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    // 当月第一天之前的日期需要用 empty 填充，将一周补完即可
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className='empty'></div>);
    }

    // 将当月日期填入
    for (let i = 1; i <= daysCount; i++) {
      days.push(
        <div key={i} className='day'>
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className='calendar'>
      <div className='header'>
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()} 年 {date.getMonth() + 1} 月
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className='days'>
        <div className='day'>日</div>
        <div className='day'>一</div>
        <div className='day'>二</div>
        <div className='day'>三</div>
        <div className='day'>四</div>
        <div className='day'>五</div>
        <div className='day'>六</div>
        {renderDates()}
      </div>
    </div>
  );
}
