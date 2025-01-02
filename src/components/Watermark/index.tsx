import { useRef, PropsWithChildren, CSSProperties, FC, useCallback, useEffect } from 'react';
import useWatermark from './useWatermark';

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

  const getContainer = useCallback(() => {
    return props.getContainer ? props.getContainer() : containerRef.current!;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current, props?.getContainer]);

  const { generateWatermark } = useWatermark({
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
    getContainer,
  });

  useEffect(() => {
    generateWatermark({
      zIndex,
      width,
      height,
      rotate,
      image,
      content,
      fontStyle,
      gap,
      offset,
      getContainer,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    // 避免每次都变，对象参数（fontSize）、数组参数（gap、offset）用 JSON.stringify 序列化后再放到 deps 数组里
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(props.fontStyle),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(props.gap),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(props.offset),
    getContainer,
  ]);

  return props.children ? (
    <div className={className} style={style} ref={containerRef}>
      {props.children}
    </div>
  ) : null;
};

export default Watermark;
