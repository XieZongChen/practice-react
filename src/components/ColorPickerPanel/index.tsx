import { CSSProperties, useState } from 'react';
import cs from 'classnames';
import { Color } from './color';
import { ColorType } from './interface';
import Palette from './Palette';
import './index.scss';
import { useControllableValue } from 'ahooks';

export interface ColorPickerProps {
  className?: string;
  style?: CSSProperties;
  value?: ColorType;
  defaultValue?: ColorType;
  onChange?: (color: Color) => void;
}

function ColorPickerPanel(props: ColorPickerProps) {
  const { className, style, onChange } = props;

  const [colorValue, setColorValue] = useControllableValue<Color>(props);

  function onPaletteColorChange(color: Color) {
    setColorValue(color);
    onChange?.(color);
  }

  const classNames = cs('color-picker', className);

  return (
    <div className={classNames} style={style}>
      <Palette color={colorValue} onChange={onPaletteColorChange}></Palette>
      <div
        style={{ width: 20, height: 20, background: colorValue.toRgbString() }}
      ></div>
    </div>
  );
}

export default ColorPickerPanel;
