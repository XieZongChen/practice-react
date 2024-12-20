/**
 * 获取当月有多少天
 */
export const daysOfMonth = (year: number, month: number) => {
    /**
     * new Date(year, month, 0) 当 date 传 0 的时候，取到的是上个月的最后一天
     * 所以这里 month + 1 传入下个月，而 date 传 0，最终取到的是这个月天数
     */
    return new Date(year, month + 1, 0).getDate();
};

/**
 * 计算当前月的第一天是星期几
 */
export const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
};