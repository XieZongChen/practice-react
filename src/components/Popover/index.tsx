import {
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  useInteractions,
  useFloating,
  useClick,
  useDismiss,
  offset,
  arrow,
  FloatingArrow,
  flip,
  useHover,
} from '@floating-ui/react';
import './index.scss';

type Alignment = 'start' | 'end';
type Side = 'top' | 'right' | 'bottom' | 'left';
type AlignedPlacement = `${Side}-${Alignment}`;

interface PopoverProps extends PropsWithChildren {
  content: ReactNode;
  trigger?: 'hover' | 'click';
  placement?: Side | AlignedPlacement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

export default function Popover(props: PopoverProps) {
  const {
    open,
    onOpenChange,
    content,
    children,
    trigger = 'hover',
    placement = 'bottom',
    className,
    style,
  } = props;

  const arrowRef = useRef(null);

  const [isOpen, setIsOpen] = useState(open);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    placement,
    middleware: [
      offset(10),
      arrow({
        element: arrowRef,
      }),
      flip(),
    ],
  });

  const hover = useHover(context, { enabled: trigger === 'hover' });
  const click = useClick(context, { enabled: trigger === 'click' });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
  ]);

  // 浮层渲染包装
  // todo: 后续可以增加 props 规定渲染位置
  const el = useMemo(() => {
    const el = document.createElement('div');
    el.className = `wrapper`;

    document.body.appendChild(el);
    return el;
  }, []);

  // 浮层节点
  const floating = isOpen && (
    <div
      className='popover-floating'
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps()}
    >
      {content}
      <FloatingArrow
        ref={arrowRef}
        context={context}
        fill='#fff'
        stroke='#000'
        strokeWidth={1}
      />
    </div>
  );

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        className={className}
        style={style}
      >
        {children}
      </span>
      {/* 将浮层渲染到指定 dom 上，避免外部样式影响 */}
      {createPortal(floating, el)}
    </>
  );
}
