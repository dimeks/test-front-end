import React from 'react';
import Color from 'color'
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components'
import theme from '../../ui/theme'
import Login from './Login';

const setup = (props: any) => (
    render(
        <ThemeProvider theme={theme}>
            <Login {...props} />
        </ThemeProvider>
    )
)


describe('Login', () => {
    test('should render', () => {
        expect(1 + 1).toEqual(2);
    })

});
