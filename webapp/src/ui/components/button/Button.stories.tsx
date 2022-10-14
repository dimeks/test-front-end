import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';
import { FaBeer } from 'react-icons/fa';

export default {
  title: 'Button',
  component: Button,
  // argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Outlined = Template.bind({});
Outlined.args = {
  label: 'Outlined',
  color: 'primary',
  variant: 'outlined',
  size: 'md'
};

export const Contained = Template.bind({});
Contained.args = {
  label: 'Contained',
  color: 'primary',
  size: 'md',
  variant: 'contained',
};

export const Text = Template.bind({});
Text.args = {
  label: 'Text',
  color: 'text',
  size: 'md',
  variant: 'text',
};

export const LeftIcon = Template.bind({});
LeftIcon.args = {
  label: 'Outlined',
  color: 'primary',
  variant: 'outlined',
  size: 'md',
  leftIcon: <FaBeer color="#182C4C" size={16} />
};


export const RightIcon = Template.bind({});
RightIcon.args = {
  label: 'Outlined',
  color: 'primary',
  variant: 'outlined',
  size: 'md',
  rightIcon: <FaBeer color="#182C4C" size={16} />
};


