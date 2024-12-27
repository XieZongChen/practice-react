import React from 'react';

export type SizeType = 'small' | 'middle' | 'large' | number | undefined;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 类名
   */
  className?: string;
  /**
   * 样式
   */
  style?: React.CSSProperties;
  /**
   * 间距
   */
  size?: SizeType | [SizeType, SizeType];
  /**
   * 排布方式
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 对齐方式
   */
  align?: 'start' | 'end' | 'center' | 'baseline';
  /**
   * 分隔符
   */
  split?: React.ReactNode;
  /**
   * 是否可换行
   */
  wrap?: boolean;
}

const Space: React.FC<SpaceProps> = (props) => {
  const { className, style, ...otherProps } = props;

  // 想要处理 children，必须用 React.Children 处理一下
  const childNodes = React.Children.toArray(props.children);
  const nodes = childNodes.map((child: any, i) => {
    const key = (child && child.key) || `space-item-${i}`;

    return (
      <div className='space-item' key={key}>
        {child}
      </div>
    );
  });

  return (
    <div className={className} style={style} {...otherProps}>
      {nodes}
    </div>
  );
};

export default Space;
