import React, { PropsWithChildren, forwardRef } from 'react';

type BaseIconProps = {
  /**
   * 类名
   */
  className?: string;
  /**
   * 样式
   */
  style?: React.CSSProperties;
  /**
   * 大小，可以传 `['10px', '10px']` 分别指定宽高，也可以传 `'10px'` 来同时指定宽高
   */
  size?: string | string[];
  /**
   * 是否旋转
   */
  spin?: boolean;
};

export type IconProps = BaseIconProps &
  // 因为本组件是对 svg 的封装，所以也接受所有 svg 的属性，透传给内部的 svg
  Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>;

export const getSize = (size: IconProps['size']) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[];
  }

  const width = (size as string) || '1em';
  const height = (size as string) || '1em';

  return [width, height];
};

export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>(
  (props, ref) => {
    const {
      style,
      className,
      spin,
      size = '1em', // size 默认 1em 则可以试外部通过调整 font-size 来改变 icon 大小
      children,
      ...rest
    } = props;

    const [width, height] = getSize(size);

    return (
      // currentColor 会默认使用继承的 color 的值
      <svg
        ref={ref}
        style={style}
        width={width}
        height={height}
        fill='currentColor'
        {...rest}
      >
        {children}
      </svg>
    );
  }
);
