import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import Sidepanel from './Sidepanel';
import theme from '../../theme'

export default {
  title: 'Sidepanel',
  component: Sidepanel,
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
} as ComponentMeta<typeof Sidepanel>;

const Template: ComponentStory<typeof Sidepanel> = (args) => <Sidepanel {...args} />;


export const SidepanelDefault = Template.bind({});
SidepanelDefault.args = {};
