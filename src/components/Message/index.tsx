import {
  CSSProperties,
  FC,
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import useStore from './useStore';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './index.scss';
import { createPortal } from 'react-dom';
import { useTimer } from './useTimer';

const MessageItem: FC<MessageProps> = (item) => {
  const { onMouseEnter, onMouseLeave } = useTimer({
    id: item.id!,
    duration: item.duration,
    remove: item.onClose!,
  });

  return (
    <div
      className='message-item'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {item.content}
    </div>
  );
};

export interface MessageRef {
  add: (messageProps: MessageProps) => number;
  remove: (id: number) => void;
  update: (id: number, messageProps: MessageProps) => void;
  clearAll: () => void;
}

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

// todo: message 组件需要参考 arco 或者 antd 进行优化 
export const MessageProvider = forwardRef<MessageRef, {}>((props, ref) => {
  const { messageList, add, update, remove, clearAll } = useStore('top');

  if ('current' in ref!) {
    ref.current = {
      add,
      update,
      remove,
      clearAll,
    };
  }
  /**
   * useImperativeHandle 并不是立刻修改 ref，而是会在之后的某个时间来修改
   * 所以会导致这里设置操作方法晚于 useMessage 取方法
   * 固上面直接修改 ref.current 的值
   */
  // useImperativeHandle(
  //   ref,
  //   () => {
  //     return {
  //       add,
  //       update,
  //       remove,
  //       clearAll,
  //     };
  //   },
  //   []
  // );

  const positions = Object.keys(messageList) as Position[];

  const messageWrapper = (
    <div className='message-wrapper'>
      {positions.map((direction) => {
        return (
          <div className={`message-wrapper-${direction}`} key={direction}>
            <TransitionGroup>
              {messageList[direction].map((item) => {
                return (
                  <CSSTransition
                    key={item.id}
                    timeout={1000}
                    classNames='message'
                  >
                    <MessageItem onClose={remove} {...item}></MessageItem>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
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
});

MessageProvider.displayName = 'MessageProvider';
