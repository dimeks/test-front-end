import { css } from 'styled-components'
import { Colors, SizeButton } from '../../../types'

type Props = {
    $color: Colors,
    $size: SizeButton
    $leftIcon: React.ReactElement
    $rightIcon: React.ReactElement
}

export default () => {
    return css<Props>`
    ${(p) => p.$size && p.$size === 'xs' && `
        padding: ${p.theme.spacing.xs} ${p.theme.spacing.md}; 
        font-size: ${p.theme.fontSize.xs};

        ${p.$leftIcon && `
            padding-right: ${p.theme.spacing.md};
        `}

        ${p.$rightIcon && `
            padding-left: ${p.theme.spacing.md};
        `}
    `}
        
    ${(p) => p.$size && p.$size === 'md' && `
        padding: ${p.theme.spacing.md} ${p.theme.spacing.xl}; 
        font-size: ${p.theme.fontSize.md};

         ${p.$leftIcon && `
            padding-right: ${p.theme.spacing.lg};
        `}

        ${p.$rightIcon && `
            padding-left: ${p.theme.spacing.lg};
        `}
    `}
        
    ${(p) => p.$size && p.$size === 'lg' && `
        padding: ${p.theme.spacing.lg} ${p.theme.spacing.xxl}; 
        font-size: ${p.theme.fontSize.xxl};

        ${p.$leftIcon && `
            padding-right: ${p.theme.spacing.xxl};
        `}

        ${p.$rightIcon && `
            padding-left: ${p.theme.spacing.xxl};
        `}
    `}
`
}