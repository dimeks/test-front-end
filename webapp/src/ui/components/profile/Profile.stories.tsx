import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import Profile from './Profile';
import theme from '../../theme'

export default {
  title: 'Profile',
  component: Profile,
  decorators: [withRouter],
  parameters: {
    backgrounds: {
      default: 'header',
      values: [
        { name: 'header', value: theme.colors.primary },
      ],
    },
  },
  // argTypes: {},
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = (args) => <Profile {...args} />;


export const ProfileWithName = Template.bind({});
ProfileWithName.args = {
  width: '100%',
  maxWidth: '300px',
  displayName: '',
  avatar: 'https://avatars.githubusercontent.com/u/17063429?v=4',
  showDisplayName: true,
};


export const ProfileDefault = Template.bind({});
ProfileDefault.args = {
  width: '100%',
  maxWidth: '300px',
  displayName: 'Augusto Oliveira',
  showDisplayName: false,
  avatar: 'https://avatars.githubusercontent.com/u/17063429?v=4'
};
