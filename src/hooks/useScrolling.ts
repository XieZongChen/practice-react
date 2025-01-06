import { RefObject, useEffect, useState } from 'react';

/**
 * 滚动检测
 * - 采用传入 ref 然后拿到 dom 执行 addEventListener 实现
 */
const useScrolling = (ref: RefObject<HTMLElement>): boolean => {
    const [scrolling, setScrolling] = useState<boolean>(false); // 记录滚动状态

    useEffect(() => {
        if (ref.current) {
            let scrollingTimer: NodeJS.Timeout;

            const handleScrollEnd = () => {
                setScrolling(false);
            };

            const handleScroll = () => {
                setScrolling(true);
                clearTimeout(scrollingTimer);

                /**
                 * 设定一个定时器，150ms 以后将滚动状态修改为 false
                 * - 只要不断滚动，就会一直重置定时器
                 */
                scrollingTimer = setTimeout(() => handleScrollEnd(), 150);
            };

            // 组件挂载后监听滚动事件
            ref.current?.addEventListener('scroll', handleScroll);

            return () => {
                if (ref.current) {
                    ref.current?.removeEventListener('scroll', handleScroll);
                }
            };
        }
        return () => { };
    }, [ref]);

    return scrolling;
};

export default useScrolling;
