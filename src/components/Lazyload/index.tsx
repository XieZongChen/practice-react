import { CSSProperties, FC, ReactNode, useRef, useState } from 'react';

interface LazyloadProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 样式
   */
  style?: CSSProperties;
  /**
   * 占位内容
   */
  placeholder?: ReactNode;
  /**
   * 距离可视区域多远提前触发加载
   */
  offset?: string | number;
  /**
   * 宽
   */
  width?: number | string;
  /**
   * 高
   */
  height?: string | number;
  /**
   * 进入可视区域的回调
   */
  onContentVisible?: () => void;
  children: ReactNode;
}

const Lazyload: FC<LazyloadProps> = (props) => {
  const {
    className = '',
    style,
    offset = 0,
    width,
    onContentVisible,
    placeholder,
    height,
    children,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const styles = { height, width, ...style };

  return (
    <div ref={containerRef} className={className} style={styles}>
      {visible ? children : placeholder}
    </div>
  );
};

export default Lazyload;
