import { Dayjs } from 'dayjs';
import { CalendarProps } from '.';

function getAllDays(date: Dayjs) {
  const startDate = date.startOf('month');
  const day = startDate.day();

  // 创建一个 6 * 7 个元素的数组，这个月第一天之前的用第一天的日期 -1、-2、-3 这样计算出来
  const daysInfo = new Array(6 * 7);

  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      // dayjs 的 subtract 方法就可以计算当前日期 -1、-2、-3 的日期
      date: startDate.subtract(day - i, 'day'),
      currentMonth: false, // 记录是否是当前月
    };
  }

  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, 'day');

    daysInfo[i] = {
      // 填充剩下的日期，从 startDate 开始 +1、+2、+3 计算日期
      date: startDate.add(i - day, 'day'),
      currentMonth: calcDate.month() === date.month(), // 记录是否是当前月
    };
  }

  return daysInfo;
}

function renderDays(days: Array<{ date: Dayjs; currentMonth: boolean }>) {
  const rows = [];
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      const item = days[i * 7 + j];
      row[j] = (
        <div className='calendar-month-body-cell'>{item.date.date()}</div>
      );
    }
    rows.push(row);
  }
  return rows.map((row) => (
    <div className='calendar-month-body-row'>{row}</div>
  ));
}

interface MonthCalendarProps extends CalendarProps {}

function MonthCalendar(props: MonthCalendarProps) {
  const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  const allDays = getAllDays(props.value);

  return (
    <div className='calendar-month'>
      <div className='calendar-month-week-list'>
        {weekList.map((week) => (
          <div className='calendar-month-week-list-item' key={week}>
            {week}
          </div>
        ))}
      </div>
      <div className='calendar-month-body'>{renderDays(allDays)}</div>
    </div>
  );
}

export default MonthCalendar;
