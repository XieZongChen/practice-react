import { cloneElement, useState } from "react";

export type Element = ((state: boolean) => React.ReactElement) | React.ReactElement;

/**
 * js 模拟 hover 事件
 * - 采用传入 React Element 然后 cloneElement 实现
 */
const useHover = (element: Element): [React.ReactElement, boolean] => {
    const [state, setState] = useState(false); // 保存 hover 状态

    /**
     * 覆盖传入的 element 的 onMouseEnter、onMouseLeave 事件
     * - 注意，需要将 event 事件透传下去，以防用户有在 element 上绑定这两个事件
     */
    const onMouseEnter = (originalOnMouseEnter?: any) => (event: any) => {
        originalOnMouseEnter?.(event);
        setState(true);
    };
    const onMouseLeave = (originalOnMouseLeave?: any) => (event: any) => {
        originalOnMouseLeave?.(event);
        setState(false);
    };

    if (typeof element === 'function') {
        // merge element 不同形式传值
        element = element(state);
    }

    // 用 cloneElement 复制传入 element，给它添加 onMouseEnter、onMouseLeave 事件
    const el = cloneElement(element, {
        onMouseEnter: onMouseEnter(element.props.onMouseEnter),
        onMouseLeave: onMouseLeave(element.props.onMouseLeave),
    });

    return [el, state];
};

export default useHover;
