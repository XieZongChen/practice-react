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

/**
 * 计算文字相关尺寸
 */
const measureTextSize = (
  ctx: CanvasRenderingContext2D,
  content: string[],
  rotate: number
) => {
  let width = 0;
  let height = 0;
  const lineSize: Array<{ width: number; height: number }> = [];

  content.forEach((item) => {
    const {
      width: textWidth,
      fontBoundingBoxAscent, // baseline 到顶部的距离
      fontBoundingBoxDescent, // baseline 到底部的距离
    } = ctx.measureText(item); // ctx.measureText 是用来测量文字尺寸的

    // 行高计算
    const textHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;

    if (textWidth > width) {
      width = textWidth;
    }

    height += textHeight;
    lineSize.push({ height: textHeight, width: textWidth });
  });

  const angle = (rotate * Math.PI) / 180;

  return {
    originWidth: width,
    originHeight: height,
    // 输出的宽高要考虑旋转
    width: Math.ceil(
      Math.abs(Math.sin(angle) * height) + Math.abs(Math.cos(angle) * width)
    ),
    height: Math.ceil(
      Math.abs(Math.sin(angle) * width) + Math.abs(height * Math.cos(angle))
    ),
    lineSize,
  };
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
): Promise<{ width: number; height: number; base64Url: string }> => {
  const { rotate, image, content, fontStyle, gap } = options;

  // 创建绘图的 canvas 上下文
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // 因为不同屏幕的设备像素比不一样，也就是 1px 对应的物理像素不一样，所以要在单位后面乘以 devicePixelRatio
  const ratio = window.devicePixelRatio;

  /**
   * 统一修改 canvas 的宽高、缩放、旋转
   */
  const configCanvas = (size: { width: number; height: number }) => {
    // 宽高需要考虑 gap
    const canvasWidth = gap[0] + size.width;
    const canvasHeight = gap[1] + size.height;

    canvas.setAttribute('width', `${canvasWidth * ratio}px`);
    canvas.setAttribute('height', `${canvasHeight * ratio}px`);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    // 用 translate 移动中心点到宽高的一半的位置,再进行 scale、rotate
    ctx.translate((canvasWidth * ratio) / 2, (canvasHeight * ratio) / 2);
    // 设置 scale 放大 devicePixelRatio 倍，这样之后在 canvas 中绘制的尺寸就不用乘以设备像素比了
    ctx.scale(ratio, ratio);

    const RotateAngle = (rotate * Math.PI) / 180;
    ctx.rotate(RotateAngle);
  };

  const drawText = () => {
    const { fontSize, color, fontWeight, fontFamily } = fontStyle;
    const realFontSize = toNumber(fontSize, 0) || fontStyle.fontSize;

    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;

    // 如果没有传入 width、height 就自己计算一个
    const measureSize = measureTextSize(ctx, [...content], rotate);
    const width = options.width || measureSize.width;
    const height = options.height || measureSize.height;

    configCanvas({ width, height });

    ctx.fillStyle = color!;
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    ctx.textBaseline = 'top'; // 设置 textBaseline 为 top，顶部对齐

    // 依次绘制文字
    [...content].forEach((item, index) => {
      const { height: lineHeight, width: lineWidth } =
        measureSize.lineSize[index];

      const xStartPoint = -lineWidth / 2; // 在行宽的一半的地方开始绘制文字
      const yStartPoint =
        -(options.height || measureSize.originHeight) / 2 + lineHeight * index; // 行内每个文字的位置是行高的一半 * index

      ctx.fillText(
        item,
        xStartPoint,
        yStartPoint,
        options.width || measureSize.originWidth
      );
    });
    return Promise.resolve({ base64Url: canvas.toDataURL(), height, width });
  };

  function drawImage() {
    return new Promise<{ width: number; height: number; base64Url: string }>(
      (resolve) => {
        const img = new Image();
        // 安全相关设置
        img.crossOrigin = 'anonymous'; // 跨域的时候不携带 cookie
        img.referrerPolicy = 'no-referrer'; // 跨域的时候不携带 referer
        img.src = image;
        img.onload = () => {
          // onload 时，对于没有设置 width 或 height 的情况，根据图片宽高比算出一个值
          let { width, height } = options;
          if (!width || !height) {
            if (width) {
              height = (img.height / img.width) * +width;
            } else {
              width = (img.width / img.height) * +height;
            }
          }
          configCanvas({ width, height });
          // 在中心点绘制图片
          ctx.drawImage(img, -width / 2, -height / 2, width, height);
          return resolve({ base64Url: canvas.toDataURL(), width, height });
        };
        img.onerror = () => {
          // 图片加载失败时，绘制文本兜底
          return drawText();
        };
      }
    );
  }

  return image ? drawImage() : drawText();
};

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
      const offsetLeft = mergedOptions.offset[0] + 'px';
      const offsetTop = mergedOptions.offset[1] + 'px';

      // 注意 background-size 是 gap + width、gap + height 算出的
      const wmStyle = `
        width:calc(100% - ${offsetLeft});
        height:calc(100% - ${offsetTop});
        position:absolute;
        top:${offsetTop};
        left:${offsetLeft};
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
