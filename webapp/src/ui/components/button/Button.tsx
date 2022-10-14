import React, { ButtonHTMLAttributes } from 'react'
import styled, { DefaultTheme, useTheme } from 'styled-components'
import { VariantButton, Colors, SizeButton, TextAlignButton, Styled } from '@ui/types'
import { size, outlined, contained, text } from './styles'
import { getProps } from '../../helpers'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
    as?: any
    to?: string
    type?: string
    label: string
    variant?: VariantButton
    size?: SizeButton
    color?: Colors
    leftIcon?: React.ReactElement
    rightIcon?: React.ReactElement
    textAlign?: TextAlignButton
    fullWidth?: boolean
    disabled?: boolean
    theme?: DefaultTheme
}

const styledKeys = [
    'color',
    'variant',
    'size',
    'leftIcon',
    'rightIcon',
    'textAlign',
    'fullWidth',
    'disabled'
];


type StyledProps = Styled<Props>

const Button: React.FC<Props> = (props) => {

    const { propsComponent, styles } = getProps<Props>({
        size: 'md',
        variant: 'outlined',
        color: 'primary',
        textAlign: 'center',
        fullWidth: false,
        ...props
    }, styledKeys)

    return (
        <ButtonStyle {...propsComponent} {...styles}>
            {props.leftIcon && props.leftIcon}
            <span>{props.label}</span>
            {props.rightIcon && props.rightIcon}
        </ButtonStyle>
    )
}


const ButtonStyle = styled.button<StyledProps>`
    font-family: ${p => p.theme.typography.fontFamily};
    border: none;
    border-radius: 100px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    transition: all 400ms;
    text-decoration: none;
    width: fit-content;

    :hover{
        transform: scale(1.04);
    }

    :active{
        transform: scale(0.9);
    }

    ${(p) => p.$size && size};
    ${(p) => p.$variant === 'text' && text};
    ${(p) => p.$variant === 'outlined' && outlined};
    ${(p) => p.$variant === 'contained' && contained};
    ${(p) => p.$fullWidth && `
        width: 100%;
    `};
    
    ${(p) => p.$textAlign === 'left' && `
        justify-content: flex-start;
    `};
    
    ${(p) => p.$textAlign === 'right' && `
        justify-content: flex-end;
    `};
    
    ${(p) => p.$textAlign === 'center' && `
        justify-content: center;
    `};
    
    ${(p) => p.$textAlign === 'between' && `
        justify-content: space-between;
    `};
    
    ${(p) => p.$textAlign === 'evenly' && `
        justify-content: space-evenly;
    `};

    ${(p) => p.$leftIcon && `
        svg {
            margin-right: ${p.theme.spacing[p.$size]};
        }
    `}

    ${(p) => p.$rightIcon && `
        svg {
            margin-left: ${p.theme.spacing[p.$size]};
        }
    `}

    ${(p) => p.$disabled && `
        opacity: .5;
        cursor: not-allowed;
    `}
`

export default Button