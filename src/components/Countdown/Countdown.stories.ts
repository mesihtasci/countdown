import type { Meta, StoryObj } from '@storybook/react';

import Countdown  from './Countdown';

const meta = {
  title: 'Components/Countdown',
  component: Countdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    timer: {control: 'number'}
  },
} satisfies Meta<typeof Countdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Autostart: Story = {
  args: {
    timer: 10,
    isPaused: false
  },
};

export const IsPaused: Story = {
  args: {
    timer: 10,
    isPaused: true
  },
};



