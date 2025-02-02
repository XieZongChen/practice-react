import { CSSProperties, ReactNode, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import cs from 'classnames';
import { useControllableValue } from 'ahooks';
import LocaleContext from './LocaleContext';
import Header from './Header';
import MonthCalendar from './MonthCalendar';
import './index.scss';

export interface CalendarProps {
  /**
   * 受控传值
   */
  value?: Dayjs;
  /**
   * 非受控传值
   */
  defaultValue?: Dayjs;
  /**
   * 样式
   */
  style?: CSSProperties;
  /**
   * 类名
   */
  className?: string | string[];
  /**
   * 国际化
   */
  locale?: string;
  /**
   * 自定义日期显示，会完全覆盖日期单元格
   */
  dateRender?: (currentDate: Dayjs) => ReactNode;
  /**
   * 自定义日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
   */
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  /**
   * 更改日期后的回调事件
   */
  onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {
  const { className, style, locale } = props;
  const mergedClassNames = cs('calendar', className);

  const [curValue, setCurValue] = useControllableValue<Dayjs>(props, {
    defaultValue: dayjs(),
  });
  function selectHandler(date: Dayjs) {
    changeDate(date);
  }

  const [curMonth, setCurMonth] = useState<Dayjs>(curValue);
  function prevMonthHandler() {
    setCurMonth(curMonth.subtract(1, 'month'));
  }
  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, 'month'));
  }
  function todayHandler() {
    const date = dayjs(Date.now());
    changeDate(date);
  }

  function changeDate(date: Dayjs) {
    // 注意：ahooks 的 useControllableValue 在 setCurValue 触发时，会自动调用 onChange，所以这里不用处理 onChange
    setCurValue(date);
    setCurMonth(date);
  }

  return (
    <LocaleContext.Provider value={{ locale: locale || navigator.language }}>
      <div className={mergedClassNames} style={style}>
        <Header
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
        />
        <MonthCalendar
          {...props}
          value={curValue}
          curMonth={curMonth}
          selectHandler={selectHandler}
        />
      </div>
    </LocaleContext.Provider>
  );
}

export default Calendar;
