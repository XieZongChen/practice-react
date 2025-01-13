import type { FC } from 'react';
import { Color } from './color';

const Palette: FC<{
  color: Color;
}> = ({ color }) => {
  return (
    <div className='color-picker-panel-palette'>
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
