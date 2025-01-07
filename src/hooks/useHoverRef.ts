import { RefObject, useEffect, useState } from 'react';

export interface Options {
    onEnter?: () => void;
    onLeave?: () => void;
    onChange?: (isHovering: boolean) => void;
}

/**
 * js 模拟 hover 事件
 * - 采用传入 ref 然后使用 addEventListener 实现
 */
const useHoverRef = (ref: RefObject<HTMLElement>, options?: Options): boolean => {
    const { onEnter, onLeave, onChange } = options || {};

    const [isEnter, setIsEnter] = useState<boolean>(false);

    useEffect(() => {
        // 监听事件不用考虑事件被覆盖的情况
        ref.current?.addEventListener('mouseenter', () => {
            onEnter?.();
            setIsEnter(true);
            onChange?.(true);
        });

        ref.current?.addEventListener('mouseleave', () => {
            onLeave?.();
            setIsEnter(false);
            onChange?.(false);
        });
    }, [ref]);

    return isEnter;
};

export default useHoverRef
