export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
}

const Space: React.FC<SpaceProps> = (props) => {
  const { className, style, ...otherProps } = props;

  return <div className={className} style={style} {...otherProps}></div>;
};

export default Space;
