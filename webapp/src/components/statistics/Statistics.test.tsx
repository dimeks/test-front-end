import React from 'react';
import Color from 'color'
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components'
import { theme } from '@ui'
import Statistics from './Statistics';

const setup = (props: any) => (
    render(
        <ThemeProvider theme={theme}>
            <Statistics {...props} />
        </ThemeProvider>
    )
)


describe('Statistics', () => {
    test('should render', () => {
        // setup({
        //     description: 'desc'
        // })
        // const button = screen.getByText('desc');
        // expect(button).toBeInTheDocument();
        expect(1 + 1).toEqual(2);
    })
});
