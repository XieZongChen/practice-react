import { useState } from 'react';
import './index.css';

/**
 * 获取当月有多少天
 */
const daysOfMonth = (year: number, month: number) => {
  /**
   * new Date(year, month, 0) 当 date 传 0 的时候，取到的是上个月的最后一天
   * 所以这里 month + 1 传入下个月，而 date 传 0，最终取到的是这个月天数
   */
  return new Date(year, month + 1, 0).getDate();
};

/**
 * 计算当前月的第一天是星期几
 */
const firstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

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
