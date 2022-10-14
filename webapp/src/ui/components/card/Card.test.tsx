import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import Card from './Card';

const setup = (props: any) => (
    render(
        <ThemeProvider theme={theme}>
            <Card {...props} />
        </ThemeProvider>
    )
)


describe('[UI] Card', () => {
    test('should render a description', () => {
        setup({
            description: 'desc'
        })
        const button = screen.getByText('desc');
        expect(button).toBeInTheDocument();
    })

});
