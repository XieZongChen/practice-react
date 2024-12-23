function MonthCalendar() {
  const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  return (
    <div className='calendar-month'>
      <div className='calendar-month-week-list'>
        {weekList.map((week) => (
          <div className='calendar-month-week-list-item' key={week}>
            {week}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthCalendar;
