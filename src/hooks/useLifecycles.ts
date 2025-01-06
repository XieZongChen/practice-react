import { useEffect } from 'react';

interface UseLifecyclesParams {
    create?: () => void;
    mount?: () => void;
    unmount?: () => void;
}

/**
 * 生命周期调用函数
 */
const useLifecycles = ({ create, mount, unmount }: UseLifecyclesParams) => {
    create?.();
    useEffect(() => {
        mount?.();
        return () => {
            unmount?.();
        };
    }, []);
};

export default useLifecycles;
