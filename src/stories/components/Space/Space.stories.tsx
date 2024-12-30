import type { Meta, StoryObj } from '@storybook/react';
import Space, { SpaceProps } from '@/components/Space';

const demoBoxStyle = {
  width: '100px',
  height: '100px',
  background: 'pink',
  border: '1px solid #000',
};

const renderSpace = (args: SpaceProps) => {
  return (
    <Space {...args}>
      <div style={demoBoxStyle}></div>
      <div style={demoBoxStyle}></div>
      <div style={demoBoxStyle}></div>
    </Space>
  );
};

const meta = {
  title: 'components/Space',
  component: Space,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Space>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Size: Story = {
  args: {
    size: [20, 30],
  },
  render: renderSpace,
};

export const Direction: Story = {
  args: {
    direction: 'vertical',
  },
  render: renderSpace,
};

export const Align: Story = {
  args: {
    align: 'end',
  },
  render: renderSpace,
};

export const Split: Story = {
  args: {
    split: '|',
  },
  render: renderSpace,
};
