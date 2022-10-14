import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import Statistics from './Statistics';

export default {
  title: 'Statistics',
  component: Statistics,
  decorators: [withRouter],

  // argTypes: {},
} as ComponentMeta<typeof Statistics>;

const Template: ComponentStory<typeof Statistics> = (args) => <Statistics {...args} />;


export const StatisticsDefault = Template.bind({});
StatisticsDefault.args = {
  viewCount: 465,
  likeCount: 132,
  favoriteCount: 111,
  commentCount: 21
};
