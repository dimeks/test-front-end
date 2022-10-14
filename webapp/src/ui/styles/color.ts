import { css } from 'styled-components'
import { ColorStyle } from '../types'

export default css<ColorStyle>`
    ${p => p.color && `color: ${p.theme.colors[p.color]};`}
    ${p => p.bg && `background-color: ${p.theme.colors[p.bg]};`}
`