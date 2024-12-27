import React from 'react';
import cs from 'classnames';
import './index.scss';

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

function getNumberSize(size: SizeType) {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}

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
  const {
    className,
    style,
    children,
    size = 'small',
    direction = 'horizontal',
    align,
    split,
    wrap = false,
    ...otherProps
  } = props;

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

  const mergedAlign =
    direction === 'horizontal' && align === undefined ? 'center' : align;
  const cn = cs(
    'space',
    `space-${direction}`,
    {
      [`space-align-${mergedAlign}`]: mergedAlign,
    },
    className
  );

  const otherStyles: React.CSSProperties = {};
  const [horizontalSize, verticalSize] = React.useMemo(
    () =>
      ((Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]).map(
        (item) => getNumberSize(item)
      ),
    [size]
  );
  otherStyles.columnGap = horizontalSize;
  otherStyles.rowGap = verticalSize;
  if (wrap) {
    otherStyles.flexWrap = 'wrap';
  }

  return (
    <div
      className={cn}
      style={{
        ...otherStyles,
        ...style,
      }}
      {...otherProps}
    >
      {nodes}
    </div>
  );
};

export default Space;
