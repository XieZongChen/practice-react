import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface LazyloadProps {
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
   * 内容包裹区域宽
   */
  width?: number | string;
  /**
   * 内容包裹区域高
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
    style = {},
    offset = 0,
    width,
    onContentVisible,
    placeholder,
    height,
    children,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const lazyLoadHandler = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    const { isIntersecting } = entry;
    // 当 isIntersecting 为 true 的时候，就是从不相交到相交，反之，是从相交到不相交
    if (isIntersecting) {
      setVisible(true);
      onContentVisible?.();

      // 触发后取消监听
      const node = containerRef.current;
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    }
  };
  const elementObserver = useRef<IntersectionObserver>();
  useEffect(() => {
    const options = {
      rootMargin: typeof offset === 'number' ? `${offset}px` : offset || '0px', // 设置提前触发距离
      threshold: 0, // 元素进入可视区域多少比例的时候触发，0 就是刚进入可视区域就触发
    };

    // 使用 IntersectionObserver 监听
    elementObserver.current = new IntersectionObserver(
      lazyLoadHandler,
      options
    );

    const node = containerRef.current;

    if (node instanceof HTMLElement) {
      elementObserver.current.observe(node);
    }
    return () => {
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    };
  }, []);

  const styles = { height, width, ...style };

  return (
    <div ref={containerRef} className={className} style={styles}>
      {visible ? children : placeholder}
    </div>
  );
};

export default Lazyload;
