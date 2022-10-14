import { css } from 'styled-components'
import { Colors } from '../../../types'

type Props = {
    $color: Colors
}

export default css<Props>`
    ${(p) => p.$color && `
        background-color: ${p.theme.colors[p.$color]};
        color: ${p.theme.colors.white};
        font-weight: bold;
    `}

`