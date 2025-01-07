import { useCallback, useEffect, useRef } from 'react';

const useTimeout = (fn: () => void, delay?: number) => {
    // useRef 保存回调函数，每次调用都会更新这个函数，避免闭包陷阱
    const fnRef = useRef<() => void>(fn);
    fnRef.current = fn;

    // 用 useRef 保存 timer 引用，方便 clear 函数里拿到它来 clearTimeout
    const timerRef = useRef<NodeJS.Timeout>();

    const clear = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, []);

    useEffect(() => {
        // setTimeout 执行从 fnRef.current 取的最新的函数
        timerRef.current = setTimeout(fnRef.current, delay);

        return clear;
    }, [delay]);

    return clear;
};

export default useTimeout;
