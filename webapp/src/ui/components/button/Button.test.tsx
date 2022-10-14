import React from 'react';
import Color from 'color'
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components'
import { FaBeer } from 'react-icons/fa';
import theme from '../../theme'
import Button from './Button';

describe('[UI] Button', () => {
    test('should render label', () => {
        render(
            <ThemeProvider theme={theme}>
                <Button label='Test' />
            </ThemeProvider>
        );
        const button = screen.getByText('Test');
        expect(button).toBeInTheDocument();
    })

    test('should render left icon', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Button label='Test' leftIcon={<FaBeer />} />
            </ThemeProvider>
        );

        const svg = container.getElementsByTagName('svg')
        expect(svg).toHaveLength(1)
    })

    test('should render right icon', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Button label='Test' rightIcon={<FaBeer />} />
            </ThemeProvider>
        );
        const svg = container.getElementsByTagName('svg')
        expect(svg).toHaveLength(1)
    })

    test('should render background color', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Button label='Test' color="primary" variant='contained' />
            </ThemeProvider>
        );
        const button = screen.getByText('Test');
        const color = Color(theme.colors.primary)
        expect(button).toHaveStyle({
            "background-color": color.rgb().string() + ';'
        })
    })

    test('should render background color NONE if variant is outlined', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Button label='Test' variant="outlined" color="primary" />
            </ThemeProvider>
        );
        const button = screen.getByText('Test');
        expect(button).toHaveStyle({
            "background-color": 'none;'
        })
    })

    test('should render font xs if the size button is xs', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Button label='Test' size="xs" />
            </ThemeProvider>
        );
        const button = screen.getByText('Test');
        expect(button).toHaveStyle({
            "font-size": theme.fontSize.xs + ';'
        })
    })

});
