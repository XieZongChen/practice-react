import { useEffect } from 'react';

const defaultOptions: MutationObserverInit = {
  subtree: true,
  childList: true,
  attributeFilter: ['style', 'class'],
};

export default function useMutateObserver(
  nodeOrList: HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) {
  useEffect(() => {
    if (!nodeOrList) {
      return;
    }

    let instance: MutationObserver;

    // 适配单节点多节点情况
    const nodeList = Array.isArray(nodeOrList) ? nodeOrList : [nodeOrList];

    if ('MutationObserver' in window) {
      instance = new MutationObserver(callback);

      nodeList.forEach((element) => {
        instance.observe(element, options);
      });
    }
    return () => {
      // 组件销毁时，takeRecords 删掉所有剩余通知
      instance?.takeRecords();
      // disconnect 停止接收新的通知
      instance?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, nodeOrList]);
}
