import { useCallback, useEffect, useRef } from 'react';

/**
 * 获取 react 组件 mount 状态
 */
export default function useMountedState(): () => boolean {
    // 使用 useRef 而不是 useState 保存 mount 的值是因为修改 ref.current 并不会引起组件重新渲染
    const mountedRef = useRef<boolean>(false); // 通过 useRef 保存 mount 状态，默认未挂载
    const get = useCallback(() => mountedRef.current, []); // 返回的 get 函数要用 useCallback 包裹，这样用它作为其它 memo 组件参数的时候，就不会导致额外的渲染

    useEffect(() => {
        // useEffect 是在 dom 操作之后异步执行的，所以这时候就已经 mount 了
        // 在这里将 mountedRef 修改为 true
        mountedRef.current = true;

        return () => {
            // 组件销毁时要将记录状态还原
            mountedRef.current = false;
        };
    }, []);

    return get;
}
