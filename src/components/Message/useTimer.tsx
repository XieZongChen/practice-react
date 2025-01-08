import { useEffect, useRef } from 'react';

export interface UseTimerProps {
  id: number;
  duration?: number;
  remove: (id: number) => void;
}

/**
 * 处理 message 的定时消失以及鼠标 hover 常驻的逻辑
 */
export function useTimer(props: UseTimerProps) {
  const { remove, id, duration = 2000 } = props;

  const timer = useRef<number | null>(null);

  const startTimer = () => {
    timer.current = window.setTimeout(() => {
      remove(id);
      removeTimer();
    }, duration);
  };

  const removeTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    // 组件挂载时正常定时消失
    startTimer();
    return () => removeTimer();
  }, []);

  const onMouseEnter = () => {
    // 当鼠标移入时，删除定时，保证常驻
    removeTimer();
  };

  const onMouseLeave = () => {
    // 鼠标移出时，重新开始定时消失
    startTimer();
  };

  return {
    onMouseEnter,
    onMouseLeave,
  };
}
