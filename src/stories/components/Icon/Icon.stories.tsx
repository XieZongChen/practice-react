import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconProps } from '@/components/icon';
import { IconAdd } from '@/components/icon/icons/IconAdd';

const renderIcon = (args: IconProps) => {
  return <IconAdd {...args} />;
};

const meta = {
  title: 'components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    spin: {
      control: 'boolean',
    },
  },
  args: {},
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Size: Story = {
  args: {
    size: '30px',
  },
  render: renderIcon,
};

export const Spin: Story = {
  args: {
    spin: true,
  },
  render: renderIcon,
};

export const Style: Story = {
  args: {
    style: { color: 'blue', fontSize: '50px' },
  },
  render: renderIcon,
};
