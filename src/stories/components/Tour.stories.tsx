import type { Meta, StoryObj } from '@storybook/react';
import { Button, Flex } from 'antd';
import { Tour, TourProps } from '@/components/Tour';

const RenderTour = (args: Omit<TourProps, 'steps'>) => {
  return (
    <div>
      <Flex gap='small' wrap='wrap' id='btn-group1'>
        <Button type='primary'>Primary Button</Button>
        <Button>Default Button</Button>
        <Button type='dashed'>Dashed Button</Button>
        <Button type='text'>Text Button</Button>
        <Button type='link'>Link Button</Button>
      </Flex>

      <div style={{ height: '1000px' }}></div>

      <Flex wrap='wrap' gap='small'>
        <Button type='primary' danger>
          Primary
        </Button>
        <Button danger>Default</Button>
        <Button type='dashed' danger id='btn-group2'>
          Dashed
        </Button>
        <Button type='text' danger>
          Text
        </Button>
        <Button type='link' danger>
          Link
        </Button>
      </Flex>

      <div style={{ height: '500px' }}></div>

      <Flex wrap='wrap' gap='small'>
        <Button type='primary' ghost>
          Primary
        </Button>
        <Button ghost>Default</Button>
        <Button type='dashed' ghost>
          Dashed
        </Button>
        <Button type='primary' danger ghost id='btn-group3'>
          Danger
        </Button>
      </Flex>

      <Tour
        {...args}
        steps={[
          {
            selector: () => {
              return document.getElementById('btn-group1');
            },
            renderContent: () => {
              return 'test1';
            },
            placement: 'bottom',
          },
          {
            selector: () => {
              return document.getElementById('btn-group2');
            },
            renderContent: () => {
              return 'test2';
            },
            placement: 'bottom',
          },
          {
            selector: () => {
              return document.getElementById('btn-group3');
            },
            renderContent: () => {
              return 'test3';
            },
            placement: 'bottom',
          },
        ]}
      />
    </div>
  );
};

const meta = {
  title: 'components/Tour',
  component: RenderTour,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    step: {
      control: 'number',
    },
  },
  args: {
    step: 0,
  },
} satisfies Meta<typeof RenderTour>;

export default meta;

type Story = StoryObj<typeof meta>;

export const step: Story = {
  args: {
    step: 2,
  },
  render: RenderTour,
};
