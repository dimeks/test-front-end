import { css } from 'styled-components'
import { Colors } from '../../../types'

type Props = {
    $color: Colors
}

export default css<Props>`
    ${(p) => p.$color && `
        background: none;
        color: ${p.theme.colors[p.$color]};
        font-weight: bold;
        box-shadow: ${p.theme.colors[p.$color]} 0px 0px 0px 2px inset;
    `}

`