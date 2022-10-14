import { DefaultTheme } from 'styled-components';


const theme: DefaultTheme = {
    typography: {
        fontFamily: "'Montserrat', sans-serif"
    },

    colors: {
        bg: '#F6F7FF',
        text: '#182C4C',
        white: '#FFF',
        primary: '#90CAF9',
        secondary: '#F99090',
        warning: '#FFC529',
        success: '#00BA88',
        danger: '#FE574C'
    },

    fontSize: {
        xxs: '9px',
        xs: '11px',
        sm: '14px',
        md: '16px',
        lg: '20px',
        xl: '24px',
        xxl: '32px'
    },

    radius: {
        xs: '6px',
        md: '12px',
        lg: '24px',
    },

    elevation: {
        xs: '0 1px 1px rgba(0,0,0,.15)',
        md: '0 1px 2px rgba(0,0,0,.15)',
        lg: '0 1px 10px rgba(0,0,0,.15)',
    },

    spacing: {
        xxs: '2px',
        xs: '5px',
        sm: '10px',
        md: '16px',
        lg: '22px',
        xl: '30px',
        xxl: '50px',
    },

}


export default theme            