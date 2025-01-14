import type { Meta, StoryObj } from '@storybook/react';
import ColorPickerPanel, {
  ColorPickerPanelProps,
} from '@/components/ColorPickerPanel';
import { FC, useState } from 'react';

const RenderColorPickerPanel:FC = (args: ColorPickerPanelProps) => {
  const [color, setColor] = useState(args.defaultValue);
  return (
    <ColorPickerPanel {...args} value={color} onChange={(c) => setColor(c)} />
  );
};

const meta = {
  title: 'components/ColorPickerPanel',
  component: RenderColorPickerPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'color',
    },
    value: {
      control: 'color',
    },
  },
  args: {
    defaultValue: 'rgb(44 53 156)',
  },
} satisfies Meta<typeof ColorPickerPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Value: Story = {
  args: {
    value: '#2DA1C4',
  },
  render: ColorPickerPanel,
};
