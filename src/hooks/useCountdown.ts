import dayjs from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';

// 日期传值与 dayjs 一样
export type TDate = dayjs.ConfigType;

/**
 * 传入参数
 */
export interface Options {
    leftTime?: number; // 剩余时间
    targetDate?: TDate; // 目标日期
    interval?: number; // 倒计时变化的时间间隔，默认 1s
    onEnd?: () => void; // 倒计时结束的回调
}

/**
 * 格式化后的日期
 */
export interface FormattedRes {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}

/**
 * 计算到目标时间的剩余时间
 * @param target 目标时间
 */
const calcLeft = (target?: TDate) => {
    if (!target) {
        return 0;
    }

    // 使用 dayjs 辅助计算当前日期到目标日期的差值
    const left = dayjs(target).valueOf() - Date.now();
    return left < 0 ? 0 : left;
};

/**
 * 将毫秒格式化为规定格式
 * @param milliseconds 
 * @returns FormattedRes
 */
const parseMs = (milliseconds: number): FormattedRes => {
    return {
        days: Math.floor(milliseconds / 86400000),
        hours: Math.floor(milliseconds / 3600000) % 24,
        minutes: Math.floor(milliseconds / 60000) % 60,
        seconds: Math.floor(milliseconds / 1000) % 60,
        milliseconds: Math.floor(milliseconds) % 1000,
    };
};

/**
 * 倒计时
 * @param options-leftTime 剩余时间
 * @param options-targetDate 目标日期
 * @param options-interval 倒计时变化的时间间隔，默认 1s
 * @param options-onEnd 倒计时结束的回调
 * @returns [`timeLeft` 剩余时间, `formattedRes` 格式化的剩余时间]
 */
const useCountdown = (options: Options = {}) => {
    const { leftTime, targetDate, interval = 1000, onEnd } = options || {};

    const memoLeftTime = useMemo<TDate>(() => {
        // 如果传入了 leftTime，则目标日期为 Date.now() + targetDate
        return leftTime && leftTime > 0 ? Date.now() + leftTime : undefined;
    }, [leftTime]);

    // leftTime 和 targetDate 只需要取一个
    const target = 'leftTime' in options ? memoLeftTime : targetDate;

    // 创建一个剩余时间 state
    const [timeLeft, setTimeLeft] = useState(() => calcLeft(target));

    // 为了避免闭包陷阱，onEnd 函数需要用 useRef 保存
    const onEndRef = useRef(onEnd);
    onEndRef.current = onEnd;

    useEffect(() => {
        if (!target) {
            setTimeLeft(0);
            return;
        }

        // 在初始渲染和每次定时器回调时都计算一次剩余时间
        setTimeLeft(calcLeft(target));

        const timer = setInterval(() => {
            const targetLeft = calcLeft(target);
            setTimeLeft(targetLeft);
            if (targetLeft === 0) {
                clearInterval(timer);
                onEndRef.current?.();
            }
        }, interval);

        return () => clearInterval(timer);
    }, [target, interval]);

    const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft]);

    return [timeLeft, formattedRes] as const;
};

export default useCountdown;
