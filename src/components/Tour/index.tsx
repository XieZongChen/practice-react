import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
// todo: 这里先使用 antd 的组件，后续换成自己的组件
import { Button, Popover } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import { Mask } from './Mask'
import './index.scss';

export interface TourStepConfig {
    selector: () => HTMLElement | null;
  
    placement?: TooltipPlacement;
  
    renderContent?: (currentStep: number) => React.ReactNode;
  
    beforeForward?: (currentStep: number) => void;
  
    beforeBack?: (currentStep: number) => void;
}

  
export interface TourProps {
  step?: number;

  steps: TourStepConfig[];

  getContainer?: () => HTMLElement;

  onStepsEnd?: () => void;
}

export const Tour:FC<TourProps> = (props) => {
  const {
    step = 0,
    steps,
    onStepsEnd,
    getContainer
  } = props;

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
    await beforeBack?.(currentStep);
    setCurrentStep(currentStep - 1);
  };

  const forward = async () => {
    if (currentStep === steps.length - 1) {
      await onStepsEnd?.();
      return;
    }

    const { beforeForward } = getCurrentStep();
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
        {
          currentStep !== 0 && 
            <Button
                className={'back'}
                onClick={() => back()}>
                {'上一步'}
            </Button>
        }
        <Button
          className={'forward'}
          type={'primary'}
          onClick={() => forward()}>
          {currentStep === steps.length - 1 ? '我知道了' : '下一步'}
        </Button>
      </div>
    );

    return (
      <Popover
        content={<div>
            {content}
            {operation}
        </div>}
        open={true}
        placement={getCurrentStep()?.placement}>
        {wrapper}
      </Popover>
    );
  };

  const [, setRenderTick] = useState<number>(0);

  useEffect(() => {
    setRenderTick(1)    
  }, []);
  
  if(!currentSelectedElement) {
    return null;
  }

  const mask = <Mask
    container={currentContainerElement}
    element={currentSelectedElement}
    renderMaskContent={(wrapper) => renderPopover(wrapper)}
  />;

  return createPortal(mask, currentContainerElement);
}
