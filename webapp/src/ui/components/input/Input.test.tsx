import React from 'react';
import Color from 'color'
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components'
import { FaBeer } from 'react-icons/fa';
import theme from '../../theme'
import Input from './Input';

const setup = (props: any) => (
    render(
        <ThemeProvider theme={theme}>
            <Input
                label='Test'
                onChange={() => { }}
                value=""
                {...props}
            />
        </ThemeProvider>
    )
)

describe('[UI] Input', () => {
    test('should render label', () => {
        setup({ label: 'Test' });
        const input = screen.getByLabelText('Test');
        expect(input).toBeInTheDocument();
    })

    test('should render input with placeholder', () => {
        setup({ placeholder: 'Test' });
        const input = screen.getAllByPlaceholderText('Test')
        expect(input).toHaveLength(1)
    })

    test('should render input with default value', () => {
        setup({ value: 'Test' });
        const input = screen.getByLabelText('Test');
        expect(input).toHaveValue('Test')
    })

    test('should render left icon', () => {
        const { container } = setup({ leftIcon: <FaBeer /> });
        const svg = container.getElementsByTagName('svg')
        expect(svg).toHaveLength(1)
    })

    test('should render right icon', () => {
        const { container } = setup({ rightIcon: <FaBeer /> });
        const svg = container.getElementsByTagName('svg')
        expect(svg).toHaveLength(1)
    })

    test('should render error', () => {
        const { container } = setup({ error: 'Ops' });
        const error = container.querySelector('p')
        expect(error).toBeTruthy()
        expect(error).toHaveTextContent('Ops')
    })
});
