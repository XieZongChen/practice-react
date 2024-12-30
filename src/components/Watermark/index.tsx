import { useRef, PropsWithChildren, CSSProperties, FC } from 'react';

export interface WatermarkProps extends PropsWithChildren {
  /**
   * 样式
   */
  style?: CSSProperties;
  /**
   * 类名
   */
  className?: string;
  /**
   * 叠放层级
   */
  zIndex?: string | number;
  /**
   * 水印宽度
   */
  width?: number;
  /**
   * 水印高度
   */
  height?: number;
  /**
   * 绘制水印时的旋转角度
   */
  rotate?: number;
  /**
   * 图片水印
   */
  image?: string;
  /**
   * 文字水印
   */
  content?: string | string[];
  /**
   * 文字水印时的文字样式
   */
  fontStyle?: {
    color?: string;
    fontFamily?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
  };
  /**
   * 水印间隙
   */
  gap?: [number, number];
  /**
   * 水印相对于 container 容器的偏移量，也就是左上角的空白距离
   */
  offset?: [number, number];
  /**
   * 获取水印 dom
   */
  getContainer?: () => HTMLElement;
}

const Watermark: FC<WatermarkProps> = (props) => {
  const {
    className,
    style,
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  return props.children ? (
    <div className={className} style={style} ref={containerRef}>
      {props.children}
    </div>
  ) : null;
};

export default Watermark;
