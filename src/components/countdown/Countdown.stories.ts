import type { Meta, StoryObj } from '@storybook/react';

import Countdown from './Countdown';

const meta = {
  title: 'Components/Countdown',
  component: Countdown,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'twitter',
      values: [
        { name: 'twitter', value: '#00aced' },
        { name: 'facebook', value: '#3b5998' },
      ],
    },
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
    isPaused: false,
    disableMouseEvents: false
  },
};

export const AutostartMouseEventsDisabled: Story = {
  args: {
    timer: 10,
    isPaused: false,
    disableMouseEvents: true
  },
};



