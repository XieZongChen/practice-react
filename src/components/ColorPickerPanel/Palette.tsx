import { useRef, type FC } from 'react';
import { Color } from './color';
import Handler from './Handler';
import Transform from './Transform';

const Palette: FC<{
  color: Color;
}> = ({ color }) => {
  const transformRef = useRef<HTMLDivElement>(null);

  return (
    <div className='color-picker-panel-palette'>
      <Transform ref={transformRef} offset={{ x: 50, y: 50 }}>
        <Handler color={color.toRgbString()} />
      </Transform>
      <div
        className='color-picker-panel-palette-main'
        style={{
          // color.toHsl().h 拿到并使用 color 的 hsl 值中的色相
          backgroundColor: `hsl(${color.toHsl().h},100%, 50%)`,
          // 用一个带横向和纵向的渐变作为蒙层，组成当前颜色色相的渐变效果
          backgroundImage:
            'linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))',
        }}
      />
    </div>
  );
};

export default Palette;
