import { useContext } from 'react';
import { ConfigContext } from './ConfigProvider';
import { MessageRef } from '.';

export function useMessage(): MessageRef {
  // 接收 ConfigProvider 透传的 message 操作方法
  const { messageRef } = useContext(ConfigContext);

  if (!messageRef) {
    // 如果没收到，说明外层没有包裹 ConfigProvider
    throw new Error('请在最外层添加 ConfigProvider 组件');
  }

  return messageRef.current!;
}
