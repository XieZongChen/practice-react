import { CSSProperties, useState } from 'react';
import cs from 'classnames';
import { Color } from './color';
import { ColorType } from './interface';
import Palette from './Palette';
import './index.scss';

export interface ColorPickerProps {
  className?: string;
  style?: CSSProperties;
  value?: ColorType;
  onChange?: (color: Color) => void;
}

function ColorPickerPanel(props: ColorPickerProps) {
  const { className, style, value, onChange } = props;

  const [colorValue, setColorValue] = useState<Color>(() => {
    if (value instanceof Color) {
      // 如果是 Color 类型，直接使用
      return value;
    }
    // 不是 Color 类型则需要对齐类型
    return new Color(value);
  });

  function onPaletteColorChange(color: Color) {
    setColorValue(color);
    onChange?.(color);
  }

  const classNames = cs('color-picker', className);

  return (
    <div className={classNames} style={style}>
      <Palette color={colorValue} onChange={onPaletteColorChange}></Palette>
    </div>
  );
}

export default ColorPickerPanel;
