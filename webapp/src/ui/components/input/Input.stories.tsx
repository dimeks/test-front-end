import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './Input';
import { FaSearch, FaRegEnvelope } from 'react-icons/fa';

export default {
  title: 'Input',
  component: Input,
  // argTypes: {},
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Label = Template.bind({});
Label.args = {
  label: 'Pesquisar',
  value: '',
  placeholder: 'Pesquisar',
  onChangeValue: () => { }
};

export const LabelWithValue = Template.bind({});
LabelWithValue.args = {
  label: 'Pesquisar',
  value: 'Pesquisar',
  placeholder: 'Pesquisar',
  onChangeValue: () => { }
};


export const IconLeft = Template.bind({});
IconLeft.args = {
  label: 'Pesquisar',
  value: '',
  placeholder: 'Pesquisar',
  leftIcon: <FaSearch size={20} color="#90CAF9" />,
  onChangeValue: () => { }
};


export const IconRight = Template.bind({});
IconRight.args = {
  label: 'Pesquisar',
  value: '',
  placeholder: 'Pesquisar',
  rightIcon: <FaSearch size={20} color="#90CAF9" />,
  onChangeValue: () => { }
};


export const InputError = Template.bind({});
InputError.args = {
  label: 'Pesquisar',
  value: '',
  placeholder: 'Pesquisar',
  leftIcon: <FaRegEnvelope size={20} color="#90CAF9" />,
  error: 'E-mail inválido',
  onChangeValue: () => { }
};


export const InputPassword = Template.bind({});
InputPassword.args = {
  label: 'Senha',
  value: 'senha',
  type: 'password',
  placeholder: 'Senha',
  isPassword: true,
  onChangeValue: () => { }
};