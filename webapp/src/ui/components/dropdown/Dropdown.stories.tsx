import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FaSignOutAlt, FaRegUser, FaRegStar, FaHistory } from 'react-icons/fa';
import { withRouter } from 'storybook-addon-react-router-v6';
import Dropdown from './Dropdown';
import theme from '../../theme'

export default {
  title: 'Dropdown',
  component: Dropdown,
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
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

const links = [
  {
    icon: <FaRegStar color="#182C4C" size={16} />,
    label: 'Favoritos',
    to: '/videos'
  },
  {
    icon: <FaHistory color="#182C4C" size={16} />,
    label: 'Histórico',
    to: '/videos'
  },
  {
    icon: <FaRegUser color="#182C4C" size={16} />,
    label: 'Minha conta',
    to: '/videos'
  },
  {
    icon: <FaSignOutAlt color="#182C4C" size={16} />,
    label: 'Sair',
    to: '/logout'
  }
]



export const DropdownDefault = Template.bind({});
DropdownDefault.args = {
  width: '100%',
  maxWidth: '300px',
  show: true,
  links
};
