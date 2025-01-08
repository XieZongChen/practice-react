import { CSSProperties, FC, ReactNode, useEffect } from 'react';
import useStore from './useStore';

export type Position = 'top' | 'bottom';

export interface MessageProps {
  style?: CSSProperties;
  className?: string | string[];
  content: ReactNode | string;
  duration?: number;
  id?: number;
  position?: Position;
}

export const MessageProvider: FC<{}> = (props) => {
  const { messageList, add, update, remove, clearAll } = useStore('top');

  useEffect(() => {
    setInterval(() => {
        add({
            content: Math.random().toString().slice(2, 8)
        })
    }, 2000);
}, []);

  return (
    <div>
      {messageList.top.map((item) => {
        return (
          <div
            style={{
              width: 100,
              lineHeight: '30px',
              border: '1px solid #000',
              margin: '20px',
            }}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};
