import { forwardRef, useEffect, useMemo, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

/**
 * 获取 attach 参数
 * - 如果传入的是 string，就作为选择器来找到对应的 dom
 * - 如果是 HTMLElement，则直接作为挂载节点
 * - 否则，返回 document.body 兜底
 */
// eslint-disable-next-line react-refresh/only-export-components
export function getAttach(attach: PortalProps['attach']) {
  if (typeof attach === 'string') {
    return document.querySelector(attach);
  }
  if (typeof attach === 'object' && attach instanceof window.HTMLElement) {
    return attach;
  }

  return document.body;
}

export interface PortalProps {
  /**
   * 目标 dom 节点，可以传一个 HTMLElement 或选择器，默认为 body
   */
  attach?: HTMLElement | string;
  /**
   * 渲染节点
   */
  children: React.ReactNode;
}

const Portal = forwardRef((props: PortalProps, ref) => {
  const { attach = document.body, children } = props;

  /**
   * 容器节点
   */
  const container = useMemo(() => {
    const el = document.createElement('div');
    el.className = `portal-wrapper`;
    return el;
  }, []);

  useEffect(() => {
    // 组件渲染时将容器节点挂载在目标位置下
    const parentElement = getAttach(attach);
    parentElement?.appendChild?.(container);

    return () => {
      // 组件销毁时，删除容器节点
      parentElement?.removeChild?.(container);
    };
  }, [container, attach]);

  useImperativeHandle(ref, () => container);

  // 用 createPortal 把 children 渲染到容器节点下
  return createPortal(children, container);
});

export default Portal;
