import { useEffect, useRef } from 'react';

export type IProps = Record<string, any>;

/**
 * 在控制台打印组件因何 props 改变而造成重新渲染
 * @param componentName 组件名称
 * @param props 组件 props
 */
export default function useWhyDidYouUpdate(componentName: string, props: IProps) {
    // 用 useRef 保存 props 或者其他值
    const prevProps = useRef<IProps>({});

    useEffect(() => {
        // prevProps 有值说明是第二次渲染
        if (prevProps.current) {
            // 将之前和当前的 props 汇总起来，以防是 props 数量发生变化导致的重新渲染
            const allKeys = Object.keys({ ...prevProps.current, ...props });
            const changedProps: IProps = {};

            // 遍历所有 props 的 key
            allKeys.forEach((key) => {
                // 比较两次 props 中相同 key 的值，如果不相同，则记录到 changedProps 中
                if (!Object.is(prevProps.current[key], props[key])) {
                    changedProps[key] = {
                        from: prevProps.current[key],
                        to: props[key],
                    };
                }
            });

            if (Object.keys(changedProps).length) {
                // 当 changedProps 有值时，将其打印到控制台
                console.log('[why-did-you-update]', componentName, changedProps);
            }
        }

        // 将当前渲染的 props 更新到 prevProps
        prevProps.current = props;
    });
}
