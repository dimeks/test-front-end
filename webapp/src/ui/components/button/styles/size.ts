import { css } from 'styled-components'
import { Colors, SizeButton } from '../../../types'

type Props = {
    $color: Colors,
    $size: SizeButton
}

export default () => {
    return css<Props>`
    ${(p) => p.$size && p.$size === 'xs' && `
        padding: ${p.theme.spacing.xs} ${p.theme.spacing.md}; 
        font-size: ${p.theme.fontSize.xs};
    `}
        
    ${(p) => p.$size && p.$size === 'md' && `
        padding: ${p.theme.spacing.md} ${p.theme.spacing.xl}; 
        font-size: ${p.theme.fontSize.md};
    `}
        
    ${(p) => p.$size && p.$size === 'lg' && `
        padding: ${p.theme.spacing.lg} ${p.theme.spacing.xxl}; 
        font-size: ${p.theme.fontSize.xxl};
    `}
`
}