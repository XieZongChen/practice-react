import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MutateObserver, {
  MutationObserverProps,
} from '@/components/MutateObserver';

const renderMutateObserver = (args: MutationObserverProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [className, setClassName] = useState('aaa');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setTimeout(() => setClassName('bbb'), 2000);
  }, []);

  const callback = function (mutationsList: MutationRecord[]) {
    alert('触发回调');
  };
  return (
    <MutateObserver {...args} onMutate={callback}>
      <div id='container'>
        <div className={className}>
          {className === 'aaa' ? (
            <div>aaa</div>
          ) : (
            <div>
              <p>bbb</p>
            </div>
          )}
        </div>
      </div>
    </MutateObserver>
  );
};

const meta = {
  title: 'components/MutateObserver',
  component: renderMutateObserver,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MutateObserver>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <></>,
  },
  render: renderMutateObserver,
};
