import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import Login, { StateLogin } from './Login';

export default {
  title: 'Login',
  component: Login,
  decorators: [withRouter],
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const LoginDefault = Template.bind({});
LoginDefault.args = {
  onSubmit: (state: StateLogin) => { }
};
