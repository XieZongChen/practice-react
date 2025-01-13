import React, { forwardRef } from 'react';

export interface TransformOffset {
  x: number;
  y: number;
}

interface TransformProps {
  offset?: TransformOffset;
  children?: React.ReactNode;
}

/**
 * 用于给 children 做定位
 * 这样单独抽出组件，可以提高 children 的复用性
 */
const Transform = forwardRef<HTMLDivElement, TransformProps>((props, ref) => {
  const { children, offset } = props;
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: offset?.x ?? 0,
        top: offset?.y ?? 0,
        zIndex: 1,
      }}
    >
      {children}
    </div>
  );
});

export default Transform;
