import { createGlobalStyle } from "styled-components"
import Color from 'color'

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
    }

    body {
        background: ${p => p.theme.colors.bg};
        font-family: ${p => p.theme.typography.fontFamily};
        color: ${p => p.theme.colors.text};
        font-size: ${p => p.theme.fontSize.md};        
    }

    ::-webkit-scrollbar {
        width: 14px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${p => Color(p.theme.colors.bg).black(10) as any};
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: ${p => p.theme.colors.primary};
        border-radius: 100px
    }
`


export default GlobalStyle