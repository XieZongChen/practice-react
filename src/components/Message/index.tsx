import { CSSProperties, FC, ReactNode, useEffect, useMemo } from 'react';
import useStore from './useStore';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './index.scss';
import { createPortal } from 'react-dom';

export type Position = 'top' | 'bottom';

export interface MessageProps {
  style?: CSSProperties;
  className?: string | string[];
  content: ReactNode | string;
  duration?: number;
  onClose?: (...args: any) => void;
  id?: number;
  position?: Position;
}

export const MessageProvider: FC<{}> = (props) => {
  const { messageList, add, update, remove, clearAll } = useStore('top');

  useEffect(() => {
    setInterval(() => {
      add({
        content: Math.random().toString().slice(2, 8),
      });
    }, 2000);
  }, []);

  const positions = Object.keys(messageList) as Position[];

  const messageWrapper = (
    <div className='message-wrapper'>
      {positions.map((direction) => {
        return (
          <TransitionGroup
            className={`message-wrapper-${direction}`}
            key={direction}
          >
            {messageList[direction].map((item) => {
              return (
                <CSSTransition
                  key={item.id}
                  timeout={1000}
                  classNames='message'
                >
                  <div className='message-item'>{item.content}</div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        );
      })}
    </div>
  );

  // 在 useMemo 里创建 wrapper div，因为依赖数组为空，所以只会创建一次
  const el = useMemo(() => {
    const el = document.createElement('div');
    el.className = `wrapper`;

    document.body.appendChild(el);
    return el;
  }, []);

  // createPortal 把 messageWrapper 渲染到 wrapper 下面
  return createPortal(messageWrapper, el);
};
