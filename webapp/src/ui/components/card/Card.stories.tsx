import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import Card from './Card';

export default {
  title: 'Card',
  component: Card,
  decorators: [withRouter],

  // argTypes: {},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

const defaultProps: any = {
  width: '100%',
  maxWidth: '340px',
  color: 'text',
  bg: 'white',
  radius: 'xs',
  elevation: 'xs',
  padding: 'md',
  fontSize: 'md',
}


export const CardVideo = Template.bind({});
CardVideo.args = {
  ...defaultProps,
  thumbnail: 'https://i.ytimg.com/vi/nUTuWZoba54/hqdefault.jpg',
  thumbnailLow: 'https://i.ytimg.com/vi/nUTuWZoba54/default.jpg',
  description: 'Descubra quais são as recordações personalizadas do iCasei. Recurso possibilita que os casais tenham o site de casamento para sempre.',
  to: '/',
  isVideo: true
};

CardVideo.story = {
  parameters: {
    reactRouter: {
      routePath: '/users/:userId',
      routeParams: { userId: '42' },
      searchParams: { tab: 'activityLog' },
      routeState: { fromPage: 'homePage' },
    }
  }
};



export const CardDefault = Template.bind({});
CardDefault.args = {
  ...defaultProps,
  children: <strong>Descubra quais são as recordações personalizadas do iCasei. Recurso possibilita que os casais tenham o site de casamento para sempre.</strong>
};

export const CardDescription = Template.bind({});
CardDescription.args = {
  ...defaultProps,
  description: 'Descubra quais são as recordações personalizadas do iCasei. Recurso possibilita que os casais tenham o site de casamento para sempre.',
};

export const CardLink = Template.bind({});
CardLink.args = {
  ...defaultProps,
  description: 'Descubra quais são as recordações personalizadas do iCasei. Recurso possibilita que os casais tenham o site de casamento para sempre.',
  to: '/'
};

export const CardWithImage = Template.bind({});
CardWithImage.args = {
  ...defaultProps,
  thumbnail: 'https://i.ytimg.com/vi/nUTuWZoba54/hqdefault.jpg',
  thumbnailLow: 'https://i.ytimg.com/vi/nUTuWZoba54/default.jpg',
  description: 'Descubra quais são as recordações personalizadas do iCasei. Recurso possibilita que os casais tenham o site de casamento para sempre.',
  to: '/'
};


CardWithImage.story = {
  parameters: {
    reactRouter: {
      routePath: '/users/:userId',
      routeParams: { userId: '42' },
      searchParams: { tab: 'activityLog' },
      routeState: { fromPage: 'homePage' },
    }
  }
};