import { useRef, type FC } from 'react';
import { Color } from './color';
import Handler from './Handler';
import Transform from './Transform';
import useColorDrag from './useColorDrag';
import { calculateColor, calculateOffset } from './utils';

const Ribbon: FC<{
  color: Color;
  onChange?: (color: Color) => void;
}> = ({ color, onChange }) => {
  const transformRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [offset, dragStartHandle] = useColorDrag({
    containerRef,
    targetRef: transformRef,
    color,
    direction: 'x',
    onDragChange: (offsetValue) => {
      const newColor = calculateColor({
        offset: offsetValue,
        containerRef,
        targetRef: transformRef,
        color,
      });
      onChange?.(newColor);
    },
    calculate: () => {
      const _offset = calculateOffset(containerRef, transformRef, color);
      return { ..._offset, y: 0 };
    },
  });

  return (
    <div
      ref={containerRef}
      className='color-picker-panel-ribbon'
      onMouseDown={dragStartHandle}
    >
      <Transform ref={transformRef} offset={{ x: offset.x, y: offset.y }}>
        <Handler color={color.toRgbString()} />
      </Transform>
    </div>
  );
};

export default Ribbon;
