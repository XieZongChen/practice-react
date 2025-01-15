import React, { CSSProperties, useEffect, useState } from 'react';
import { getMaskStyle } from './getMaskStyle';
import './index.scss';

interface MaskProps {
  element: HTMLElement; // 目标元素
  container?: HTMLElement; // 遮罩层所在容器
  renderMaskContent?: (wrapper: React.ReactNode) => React.ReactNode; // 遮罩上的标示内容渲染函数
}

export const Mask: React.FC<MaskProps> = (props) => {
  const { element, renderMaskContent, container } = props;

  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    // 保证 container 后 mask 会重新计算
    const observer = new ResizeObserver(() => {
      const style = getMaskStyle(
        element,
        container || document.documentElement
      );

      setStyle(style);
    });
    observer.observe(container || document.documentElement);
    return () => {
      observer.disconnect();
    };
  }, [container, element]);

  useEffect(() => {
    if (!element) {
      return;
    }

    // 确保目标元素在可视区域
    element.scrollIntoView({
      block: 'center',
      inline: 'center',
    });

    const style = getMaskStyle(element, container || document.documentElement);

    setStyle(style);
  }, [element, container]);

  const getContent = () => {
    if (!renderMaskContent) {
      return null;
    }
    return renderMaskContent(
      // 将一个宽高为 100% 的 div 暴露出去，外部就可以用它来加 Popover 或者其他内容
      <div
        className={'mask-content'}
        style={{ width: '100%', height: '100%' }}
      />
    );
  };

  return (
    <div style={style} className='mask'>
      {getContent()}
    </div>
  );
};
