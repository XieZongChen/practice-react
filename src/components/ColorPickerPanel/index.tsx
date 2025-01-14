import { CSSProperties, useMemo, useState } from 'react';
import cs from 'classnames';
import { useControllableValue } from 'ahooks';
import { Color } from './color';
import { ColorType } from './interface';
import Palette from './Palette';
import Ribbon from './Ribbon';
import './index.scss';

export interface ColorPickerProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 样式
   */
  style?: CSSProperties;
  value?: ColorType;
  defaultValue?: ColorType;
  onChange?: (color: Color) => void;
}

function ColorPickerPanel(props: ColorPickerProps) {
  const { className, style, onChange } = props;

  const [colorValue, setColorValue] = useControllableValue<Color>(props);

  const colorTypeMerged = useMemo(() => {
    if (colorValue instanceof Color) {
      // 如果是 Color 类型，直接使用
      return colorValue;
    }
    // 不是 Color 类型则需要对齐类型
    return new Color(colorValue);
  }, [colorValue]);

  function handlePaletteColorChange(color: Color) {
    setColorValue(color);
    onChange?.(color);
  }

  function handleHueChange(color: Color) {
    setColorValue(color);
    onChange?.(color);
  }

  function handleLightChange(color: Color) {
    setColorValue(color);
    onChange?.(color);
  }

  const classNames = cs('color-picker-panel', className);

  return (
    <div className={classNames} style={style}>
      <Palette
        color={colorTypeMerged}
        onChange={handlePaletteColorChange}
      ></Palette>
      <div className='color-picker-panel-control'>
        <div className='color-picker-panel-control-wrapper'>
          <Ribbon
            color={colorTypeMerged}
            type='hue'
            onChange={handleHueChange}
          />
          <Ribbon
            color={colorTypeMerged}
            type='light'
            onChange={handleLightChange}
          />
        </div>
        <div
          className='color-picker-panel-preview'
          style={{
            background: colorTypeMerged.toRgbString(),
          }}
        ></div>
      </div>
    </div>
  );
}

export default ColorPickerPanel;
