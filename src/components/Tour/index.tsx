import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
// todo: 这里先使用 antd 的组件，后续换成自己的组件
import { Button, Popover } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import { Mask } from './Mask';
import './index.scss';

export interface TourStepConfig {
  selector: () => HTMLElement | null; // 当前步在哪个元素
  placement?: TooltipPlacement; // 当前步内容渲染方位
  renderContent?: (currentStep: number) => React.ReactNode; // 当前步渲染内容
  beforeForward?: (currentStep: number) => void; // 上一步的回调
  beforeBack?: (currentStep: number) => void; // 下一步的回调
}

export interface TourProps {
  /**
   * 直接指定显示第几步
   */
  step?: number;
  /**
   * 每一步的配置
   */
  steps: TourStepConfig[];
  /**
   * 渲染容器指定函数，默认为 document
   */
  getContainer?: () => HTMLElement;
  /**
   * 所有步骤完成后的回调
   */
  onStepsEnd?: () => void;
}

export const Tour: FC<TourProps> = (props) => {
  const { step = 0, steps, onStepsEnd, getContainer } = props;

  const [currentStep, setCurrentStep] = useState<number>(0);

  const currentSelectedElement = steps[currentStep]?.selector();

  const currentContainerElement = getContainer?.() || document.documentElement;

  const getCurrentStep = () => {
    return steps[currentStep];
  };

  const back = async () => {
    if (currentStep === 0) {
      return;
    }

    const { beforeBack } = getCurrentStep();
    // 切换下一步前调用回调函数，需要做异步处理
    await beforeBack?.(currentStep);
    setCurrentStep(currentStep - 1);
  };

  const forward = async () => {
    if (currentStep === steps.length - 1) {
      await onStepsEnd?.();
      return;
    }

    const { beforeForward } = getCurrentStep();
    // 切换上一步前调用回调函数，需要做异步处理
    await beforeForward?.(currentStep);
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    setCurrentStep(step!);
  }, [step]);

  const renderPopover = (wrapper: React.ReactNode) => {
    const config = getCurrentStep();
    if (!config) {
      return wrapper;
    }

    const { renderContent } = config;
    const content = renderContent ? renderContent(currentStep) : null;

    const operation = (
      <div className={'tour-operation'}>
        {currentStep !== 0 && (
          <Button className={'back'} onClick={() => back()}>
            {'上一步'}
          </Button>
        )}
        <Button
          className={'forward'}
          type={'primary'}
          onClick={() => forward()}
        >
          {currentStep === steps.length - 1 ? '我知道了' : '下一步'}
        </Button>
      </div>
    );

    return (
      <Popover
        content={
          <div>
            {content}
            {operation}
          </div>
        }
        open={true}
        placement={getCurrentStep()?.placement}
      >
        {wrapper}
      </Popover>
    );
  };

  const [, setRenderTick] = useState<number>(0);

  useEffect(() => {
    /**
     * 在 dom 渲染完之后，触发重新渲染
     * 让元素渲染完成后再给其加上标示
     */
    setRenderTick(1);
  }, []);

  if (!currentSelectedElement) {
    // 第一次渲染的时候，元素是 null，触发重新渲染之后，就会渲染下面的 Mask 了
    return null;
  }

  const mask = (
    <Mask
      container={currentContainerElement}
      element={currentSelectedElement}
      renderMaskContent={(wrapper) => renderPopover(wrapper)}
    />
  );

  // 用 createPortal 把 mask 渲染到容器元素
  return createPortal(mask, currentContainerElement);
};
