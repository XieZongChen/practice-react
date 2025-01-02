import { useEffect, useRef, useState } from 'react';
import { WatermarkProps } from '.';
import { merge } from 'lodash-es';

export type WatermarkOptions = Omit<
  WatermarkProps,
  'className' | 'style' | 'children'
>;

export function isNumber(obj: any): obj is number {
  return (
    Object.prototype.toString.call(obj) === '[object Number]' && obj === obj
  );
}

/**
 * 尝试将第一个参数转化为 number，如果无法转化为数字，则返回第二个参数兜底
 */
const toNumber = (value?: string | number, defaultValue?: number) => {
  if (value === undefined) {
    return defaultValue;
  }
  if (isNumber(value)) {
    return value;
  }
  const numberVal = parseFloat(value);
  return isNumber(numberVal) ? numberVal : defaultValue;
};

const defaultOptions = {
  rotate: -20,
  zIndex: 1,
  width: 100,
  gap: [100, 100],
  fontStyle: {
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.15)',
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
  },
  getContainer: () => document.body,
};

/**
 * 传入 options 与默认 options 做合并
 */
const getMergedOptions = (o: Partial<WatermarkOptions>) => {
  const options = o || {};

  const mergedOptions = {
    ...options,
    rotate: options.rotate || defaultOptions.rotate,
    zIndex: options.zIndex || defaultOptions.zIndex,
    fontStyle: { ...defaultOptions.fontStyle, ...options.fontStyle }, // 注意，fontStyle 是将默认和传入的直接合并，默认在前，确保可以被传入的覆盖
    width: toNumber(
      options.width,
      options.image ? defaultOptions.width : undefined
    ), // 如果是图片类型但没有传入 width 就用默认 width，否则为 undefined，因为文字宽度是动态算的
    height: toNumber(options.height, undefined)!,
    getContainer: options.getContainer!,
    gap: [
      toNumber(options.gap?.[0], defaultOptions.gap[0]),
      toNumber(options.gap?.[1] || options.gap?.[0], defaultOptions.gap[1]),
    ],
  } as Required<WatermarkOptions>; // Required 将 WatermarkOptions 的可选变为必选，因为合并后能确定每项都会有值

  const mergedOffsetX = toNumber(mergedOptions.offset?.[0], 0)!;
  const mergedOffsetY = toNumber(
    mergedOptions.offset?.[1] || mergedOptions.offset?.[0],
    0
  )!;
  mergedOptions.offset = [mergedOffsetX, mergedOffsetY];

  return mergedOptions;
};

/**
 * 绘制水印方法
 */
const getCanvasData = async (
  options: Required<WatermarkOptions>
): Promise<{ width: number; height: number; base64Url: string }> => {};

export default function useWatermark(params: WatermarkOptions) {
  const [options, setOptions] = useState(params || {});

  const mergedOptions = getMergedOptions(options);
  const watermarkDiv = useRef<HTMLDivElement>(); // 水印 Dom
  const container = mergedOptions.getContainer();
  const { zIndex, gap } = mergedOptions;

  function drawWatermark() {
    if (!container) {
      return;
    }

    getCanvasData(mergedOptions).then(({ base64Url, width, height }) => {
      // 注意 background-size 是 gap + width、gap + height 算出的
      const wmStyle = `
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        pointer-events: none;
        z-index:${zIndex};
        background-position: 0 0;
        background-size:${gap[0] + width}px ${gap[1] + height}px;
        background-repeat: repeat;
        background-image:url(${base64Url})`;

      if (!watermarkDiv.current) {
        const div = document.createElement('div');
        watermarkDiv.current = div;
        container.append(div);
        container.style.position = 'relative';
      }

      watermarkDiv.current?.setAttribute('style', wmStyle.trim());
    });
  }

  useEffect(() => {
    drawWatermark();
  }, [options]);

  return {
    generateWatermark: (newOptions: Partial<WatermarkOptions>) => {
      setOptions(merge({}, options, newOptions));
    },
    destroy: () => {},
  };
}
