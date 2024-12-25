import type { Meta, StoryObj } from '@storybook/react';
import Calendar, { CalendarProps } from '@/components/calendar';
import dayjs from 'dayjs';

const meta = {
  title: '日历组件',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'date',
    },
    locale: {
      control: 'select',
      options: ['zh-CN', 'en-US'],
    },
  },
  args: {
    locale: 'zh-CN',
  },
} satisfies Meta<typeof Calendar>;

export default meta;

const renderCalendar = (args: CalendarProps) => {
  if (typeof args.value === 'number') {
    return <Calendar {...args} value={dayjs(new Date(args.value))} />;
  }

  return <Calendar {...args} />;
};

type Story = StoryObj<typeof meta>;

export const Value: Story = {
  args: {
    value: dayjs('2023-11-08'),
  },
  render: renderCalendar,
};

export const DateRender: Story = {
  args: {
    value: dayjs('2023-11-08'),
    dateRender(currentDate) {
      return <div>日期{currentDate.date()}</div>;
    },
  },
  render: renderCalendar,
};

export const DateInnerContent: Story = {
  args: {
    value: dayjs('2023-11-08'),
    dateInnerContent(currentDate) {
      return <div>日期{currentDate.date()}</div>;
    },
  },
  render: renderCalendar,
};

export const Locale: Story = {
  args: {
    value: dayjs('2023-11-08'),
    locale: 'en-US',
  },
  render: renderCalendar,
};
