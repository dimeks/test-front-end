import { css } from 'styled-components'
import { Colors } from '../../../types'

type Props = {
    $color: Colors
}

export default css<Props>`
    ${(p) => p.$color && `
        background: none;
        border: none;
        color: ${p.theme.colors[p.$color]};
        font-weight: bold;
    `}

`