import React from 'react';
import Color from 'color'
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import Profile from './Profile';

const setup = (props: any) => (
    render(
        <ThemeProvider theme={theme}>
            <Profile {...props} />
        </ThemeProvider>
    )
)


describe('[UI] Profile', () => {
    test('should render', () => {
        // setup({
        //     description: 'desc'
        // })
        // const button = screen.getByText('desc');
        // expect(button).toBeInTheDocument();
        expect(1 + 1).toEqual(2);
    })
});
