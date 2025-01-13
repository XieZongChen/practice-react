import { TransformOffset } from "./Transform";
import { Color } from "./color";

/**
 * 计算 Color 值
 * @param offset Handler 的位移
 * @param containerRef 容器 ref
 * @param targetRef Handler 的位移
 * @param color 移动前的 color 值
 * @returns Color
 */
export const calculateColor = (props: {
    offset: TransformOffset;
    containerRef: React.RefObject<HTMLDivElement>;
    targetRef: React.RefObject<HTMLDivElement>;
    color: Color;
}): Color => {
    const { offset, targetRef, containerRef, color } = props;

    const { width, height } = containerRef.current!.getBoundingClientRect();
    const {
        width: targetWidth,
        height: targetHeight
    } = targetRef.current!.getBoundingClientRect();

    const centerOffsetX = targetWidth / 2;
    const centerOffsetY = targetHeight / 2;

    // x/width 用 y/height 求出一个比例，根据比例设置 hsv 的值
    const saturation = (offset.x + centerOffsetX) / width;
    const lightness = 1 - (offset.y + centerOffsetY) / height;
    const hsv = color.toHsv();

    return new Color({
        h: hsv.h,
        s: saturation <= 0 ? 0 : saturation,
        v: lightness >= 1 ? 1 : lightness,
        a: hsv.a,
    });
}

/**
 * 使用颜色计算出当前颜色 Handler 的位置
 * @param containerRef 
 * @param targetRef 
 * @param color 
 * @returns 
 */
export const calculateOffset = (
    containerRef: React.RefObject<HTMLDivElement>,
    targetRef: React.RefObject<HTMLDivElement>,
    color: Color
): TransformOffset => {
    const { width, height } = containerRef.current!.getBoundingClientRect();
    const {
        width: targetWidth,
        height: targetHeight
    } = targetRef.current!.getBoundingClientRect();

    const centerOffsetX = targetWidth / 2;
    const centerOffsetY = targetHeight / 2;
    const hsv = color.toHsv();

    // 根据 hsv 里的 s 和 v 的百分比乘以 width、height，计算出 x、y，然后减去 Handler 宽高的一半
    return {
        x: hsv.s * width - centerOffsetX,
        y: (1 - hsv.v) * height - centerOffsetY,
    };
};

