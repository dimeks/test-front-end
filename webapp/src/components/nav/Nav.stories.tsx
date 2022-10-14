import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import Nav from './Nav';
import theme from '@ui/theme'
import { FaSearch } from 'react-icons/fa';

export default {
  title: 'Nav',
  component: Nav,
  decorators: [withRouter],

  // argTypes: {},
} as ComponentMeta<typeof Nav>;

const Template: ComponentStory<typeof Nav> = (args) => <Nav {...args} />;


const links = [
  {
    to: '/',
    label: 'Favoritos',
    icon: <FaSearch size={16} color={theme.colors.text} />
  },
  {
    to: '/',
    label: 'Histórico',
    icon: <FaSearch size={16} color={theme.colors.text} />
  },
  {
    to: '/',
    label: 'Minha conta',
    icon: <FaSearch size={16} color={theme.colors.text} />
  },
  {
    to: '/',
    label: 'Sair',
    icon: <FaSearch size={16} color={theme.colors.text} />
  }
]

export const NavDesktop = Template.bind({});
NavDesktop.args = {
  variant: "desktop",
  profile: {
    displayName: 'Augusto Oliveira',
    avatar: 'https://avatars.githubusercontent.com/u/17063429?v=4'
  },
  links
};


export const NavMobile = Template.bind({});
NavMobile.args = {
  variant: "mobile",
  profile: {
    displayName: 'Augusto Oliveira',
    avatar: 'https://avatars.githubusercontent.com/u/17063429?v=4'
  },
  links
};
