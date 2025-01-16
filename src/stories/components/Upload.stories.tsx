import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'antd';
import Upload, { UploadProps } from '@/components/Upload';

const RenderUpload = (args: UploadProps) => {
  return (
    <Upload {...args}>
      <Button>Test Upload</Button>
    </Upload>
  );
};

const meta = {
  title: 'components/Upload',
  component: RenderUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    action: {
      control: 'text',
    },
  },
  args: {
    action: 'https://www.baidu.com',
  },
} satisfies Meta<typeof RenderUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const drag: Story = {
  args: {
    drag: true,
  },
  render: RenderUpload,
};
