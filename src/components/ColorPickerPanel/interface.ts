import type { Color } from './color';

export interface HSL {
    h: number | string;
    s: number | string;
    l: number | string;
}

export interface RGB {
    r: number | string;
    g: number | string;
    b: number | string;
}

export interface HSLA extends HSL {
    a: number;
}

export interface RGBA extends RGB {
    a: number;
}

/**
 * 对外使用的 color 类型，多种形式方便用户使用
 */
export type ColorType =
    | string
    | number
    | RGB
    | RGBA
    | HSL
    | HSLA
    | Color;
