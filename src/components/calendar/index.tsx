import { CSSProperties, ReactNode, useState } from 'react';
import { Dayjs } from 'dayjs';
import cs from 'classnames';
import LocaleContext from './LocaleContext';
import Header from './Header';
import MonthCalendar from './MonthCalendar';
import './index.scss';

export interface CalendarProps {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化相关
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {
  const { className, style, locale, value, onChange } = props;
  const mergedClassNames = cs('calendar', className);

  const [curValue, setCurValue] = useState<Dayjs>(value);
  function selectHandler(date: Dayjs) {
    setCurValue(date);
    onChange?.(date);
  }

  return (
    <LocaleContext.Provider value={{ locale: locale || navigator.language }}>
      <div className={mergedClassNames} style={style}>
        <Header />
        <MonthCalendar
          {...props}
          value={curValue}
          selectHandler={selectHandler}
        />
      </div>
    </LocaleContext.Provider>
  );
}

export default Calendar;
