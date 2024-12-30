import type { Meta, StoryObj } from '@storybook/react';
import Portal, { PortalProps } from '@/components/Portal';

const demoBoxStyle: React.CSSProperties = {
  width: '100px',
  height: '100px',
  background: 'pink',
  border: '1px solid #000',
  top: '0',
  position: 'absolute',
};

const renderPortal = (args: PortalProps) => {
  return (
    <Portal {...args}>
      <div style={demoBoxStyle}>渲染节点</div>
    </Portal>
  );
};

const meta = {
  title: 'components/Portal',
  component: renderPortal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Portal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Attach: Story = {
  args: {
    attach: 'html',
    children: <></>,
  },
  render: renderPortal,
};
