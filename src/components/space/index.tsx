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

  return <div className={className} style={style} {...otherProps}></div>;
};

export default Space;
