import type { Meta, StoryObj } from '@storybook/react';
import Lazyload, { LazyloadProps } from '@/components/Lazyload';
import picture from '@/stories/assets/picture.jpg';
import TestLazyload from './TestLazyload';

const renderLazyload = (args: Omit<LazyloadProps, 'children'>) => {
  return (
    <div>
      <p>打开开发者工具观察 dom 变化</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <Lazyload {...args}>
        <img src={picture} />
      </Lazyload>
      <Lazyload {...args}>
        <TestLazyload />
      </Lazyload>
    </div>
  );
};

const meta = {
  title: 'components/Lazyload',
  component: renderLazyload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: <div>loading...</div>,
  },
} satisfies Meta<typeof Lazyload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  args: {
    placeholder: <div>loading...</div>,
  },
  render: renderLazyload,
};
