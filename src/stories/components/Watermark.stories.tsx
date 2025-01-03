import Watermark, { WatermarkProps } from '@/components/Watermark';
import type { Meta, StoryObj } from '@storybook/react';

const renderWatermark = (args: WatermarkProps) => {
  return (
    <Watermark {...args}>
      <div style={{ height: 800 }}>
        <p>测试文字：</p>
        <p>
          真理只有一个，而究竟谁发现了真理，不依靠主观的夸张，而依靠客观实践，只有千百万人民的革命实践，才是检验真理的尺度。
          ———— 毛泽东
        </p>
        <p>
          人们总是首先认识许多不同的事物的特殊的本质，然后才有可能进一步地进行概括工作，认识诸种事物的共同本质。
          ———— 毛泽东
        </p>
        <p>
          某些错误东西的存在是并不奇怪的，也是用不着害怕的，这可以使人们更好地学会同它作斗争。大风大浪也不可怕。人类社会就是从大风大浪中发展起来的。
          ———— 毛泽东
        </p>
        <p>
          社会主义制度的建立给我们开辟了一条创造理想境界的道路，而理想境界的实现还要靠我们的辛勤劳动。
          ———— 毛泽东
        </p>
        <p>
          马克思主义的『本本』是要学习的，但是必须同我国的实际情况相结合。我们需要『本本』，但是一定要纠正脱离实际的本本主义。
          ———— 毛泽东
        </p>
        <p>
          一切依照当时具体情况看来对于当时的全局和全时期有利益的、尤其是有决定意义的一局部和一时间，是应该捉住不放的，不然我们就变成自流主义，或放任主义。退却要有终点，就是这个道理。
          ———— 毛泽东
        </p>
        <p>
          社会的变化，主要地是由于社会内部矛盾的发展，即生产力和生产关系的矛盾，阶级之间的矛盾，新旧之间的矛盾，由于这些矛盾的发展，推动了社会的前进，推动了新旧社会的代谢。
          ———— 毛泽东
        </p>
      </div>
    </Watermark>
  );
};

const meta = {
  title: 'components/Watermark',
  component: renderWatermark,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    content: '核心机密',
  },
} satisfies Meta<typeof Watermark>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Content: Story = {
  args: {
    content: '核心机密',
  },
  render: renderWatermark,
};
