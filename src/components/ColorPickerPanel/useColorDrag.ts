import { useEffect, useRef, useState } from 'react';
import { TransformOffset } from './Transform';

// 兼容原生和 react 的鼠标事件类型
type EventType =
    | MouseEvent
    | React.MouseEvent<Element, MouseEvent>

type EventHandle = (e: EventType) => void;

interface useColorDragProps {
    offset?: TransformOffset;
    containerRef: React.RefObject<HTMLDivElement>; // 容器 ref，也就是 Palette 或者 Slider 的 ref
    targetRef: React.RefObject<HTMLDivElement>; // 目标 ref，也就是 Handler 的 ref
    direction?: 'x' | 'y'; // 拖动轴向，如果传 x，则只支持 x 轴拖动；如果传 y，则同时支持 x 和 y 轴拖动。此参数为了同时适配在 Palette 和 Slider 上的拖动
    onDragChange?: (offset: TransformOffset) => void;
}

function useColorDrag(
    props: useColorDragProps,
): [TransformOffset, EventHandle] {
    const {
        offset,
        targetRef,
        containerRef,
        direction,
        onDragChange,
    } = props;

    const [offsetValue, setOffsetValue] = useState(offset || { x: 0, y: 0 }); // 保存相对坐标
    const dragRef = useRef({
        flag: false // 是否在拖动中
    });

    useEffect(() => {
        // 清空之前的事件监听，防止内存溢出
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragStop);
    }, []);

    const updateOffset: EventHandle = e => {
        // 对齐获取滚动位移距离
        const scrollXOffset = document.documentElement.scrollLeft || document.body.scrollLeft;
        const scrollYOffset = document.documentElement.scrollTop || document.body.scrollTop;

        const pageX = e.pageX - scrollXOffset; // e.pageX 为组件距离页面左边的距离，减去 scrollXOffset 即为距离可视区域左边的距离
        const pageY = e.pageY - scrollYOffset; // e.pageY 为组件距离页面顶部的距离，减去 scrollYOffset 即为距离可视区域顶部的距离

        const {
            x: rectX,
            y: rectY,
            width,
            height
        } = containerRef.current!.getBoundingClientRect(); // 目标的几何信息

        /**
         * 容器在可视区域内的最大轴向长度
         */
        const containerXMax = Math.min(pageX - rectX, width)
        const containerYMax = Math.min(pageY - rectY, height)

        const {
            width: targetWidth,
            height: targetHeight
        } = targetRef.current!.getBoundingClientRect();  // Handler 的几何信息

        // Handler 的半径，理论上 centerOffsetX = centerOffsetY，但是为了以防万一以及代码上的对称美观，所以依然算出两个轴向的
        const centerOffsetX = targetWidth / 2;
        const centerOffsetY = targetHeight / 2;

        // Handler 在目标上的拖动不能超过目标范围，所以使用 Math.max 将其限制在 0 到可视区域最大轴向之间
        const offsetX = Math.max(0, containerXMax) - centerOffsetX;
        const offsetY = Math.max(0, containerYMax) - centerOffsetY;

        const calcOffset = {
            x: offsetX,
            y: direction === 'x' ? offsetValue.y : offsetY, // 适配 direction 参数，如果只在 x 轴上拖动，y 轴是保持不动的
        };

        setOffsetValue(calcOffset);
        onDragChange?.(calcOffset);
    };

    const onDragStop: EventHandle = e => {
        // 拖拽结束后删除绑定的鼠标监听事件
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragStop);
        // 更新拖拽状态
        dragRef.current.flag = false;
    };

    const onDragMove: EventHandle = e => {
        e.preventDefault();
        // 更新坐标
        updateOffset(e);
    };

    const onDragStart: EventHandle = e => {
        // 拖拽开始时绑定鼠标监听事件
        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragStop);
        // 更新拖拽状态
        dragRef.current.flag = true;
    };

    return [offsetValue, onDragStart];
}

export default useColorDrag;
