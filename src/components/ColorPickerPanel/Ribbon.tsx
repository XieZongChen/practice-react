import { useRef, type FC } from 'react';
import cs from 'classnames';
import { Color } from './color';
import Handler from './Handler';
import Transform from './Transform';
import useColorDrag from './useColorDrag';
import {
  calcHueColor,
  calcHueOffset,
  calcLightColor,
  calcLightOffset,
} from './utils';

const Ribbon: FC<{
  color: Color;
  type?: 'hue' | 'light'; // 色相模式 | 明度模式，默认色相
  onChange?: (color: Color) => void;
}> = ({ color, type = 'hue', onChange }) => {
  const transformRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [offset, dragStartHandle] = useColorDrag({
    containerRef,
    targetRef: transformRef,
    color,
    direction: 'x',
    onDragChange: (offsetValue) => {
      if (type === 'light') {
        const newColor = calcLightColor({
          offset: offsetValue,
          containerRef,
          targetRef: transformRef,
          color,
        });
        console.log('newColor', newColor);
        
        onChange?.(newColor);
        return;
      }

      const newColor = calcHueColor({
        offset: offsetValue,
        containerRef,
        targetRef: transformRef,
        color,
      });
      onChange?.(newColor);
    },
    calculate: () => {
      if (type === 'light') {
        const _offset = calcLightOffset(containerRef, transformRef, color);
        return { ..._offset, y: -1 };
      }
      const _offset = calcHueOffset(containerRef, transformRef, color);
      return { ..._offset, y: -1 };
    },
  });

  return (
    <div
      ref={containerRef}
      className={cs('color-picker-panel-ribbon', {
        'color-picker-panel-ribbon-bg': type === 'light',
      })}
      onMouseDown={dragStartHandle}
    >
      <Transform ref={transformRef} offset={{ x: offset.x, y: offset.y }}>
        <Handler color={color.toRgbString()} />
      </Transform>
      <div
        className={cs('color-picker-panel-ribbon-color', {
          'color-picker-panel-ribbon-color-hue': type === 'hue',
        })}
        style={
          type === 'light'
            ? {
                background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${color.toPercentageRgbString()})`,
              }
            : undefined
        }
      ></div>
    </div>
  );
};

export default Ribbon;
