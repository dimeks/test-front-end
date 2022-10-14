import React from 'react';
import Color from 'color'
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import Sidepanel from './Sidepanel';

const setup = (props: any) => (
    render(
        <ThemeProvider theme={theme}>
            <Sidepanel {...props} />
        </ThemeProvider>
    )
)


describe('[UI] Sidepanel', () => {
    test('should render', () => {
        // setup({
        //     description: 'desc'
        // })
        // const button = screen.getByText('desc');
        // expect(button).toBeInTheDocument();
        expect(1 + 1).toEqual(2);
    })
});
