import React from 'react'
import styled, { DefaultTheme } from 'styled-components'
import Color from 'color'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import { Colors, InputSize, TextAlignButton, Styled } from '@ui/types'
import { getProps } from '../../helpers'

type Props = React.HTMLAttributes<HTMLInputElement> & {
    label?: string
    value: string
    type?: string
    onChangeValue?: (value: string) => void
    // size?: InputSize
    color?: Colors
    leftIcon?: React.ReactElement
    rightIcon?: React.ReactElement
    fullWidth?: boolean
    disabled?: boolean
    error?: string;
    isPassword?: boolean;
    theme?: DefaultTheme
}

type StyledProps = Styled<Props>

const styledKeys = [
    'color',
    'leftIcon',
    'rightIcon',
    'fullWidth',
    'disabled',
    'isPassword',
    'onChangeValue',
    'error'
];

const InputComponent: React.FC<Props> = (props) => {
    const [type, setType] = React.useState<string>(props.type || 'text')
    const [showLabel, setShowLabel] = React.useState<boolean>(false)
    const { propsComponent, styles } = getProps<Props>({
        // size: 'md',
        color: 'primary',
        error: '',
        type,
        ...props
    }, styledKeys)

    React.useEffect(() => {
        if (props.value !== "") {
            setShowLabel(true)
        } else {
            setShowLabel(false)
        }
    }, [props.value])


    const onFocus = () => {
        if (props.value !== "") {
            setShowLabel(true)
        }
    }


    if (type) {
        propsComponent.type = type
    }


    return (
        <Container {...styles}>
            <LabelContainer>
                {props.leftIcon && <LeftIcon>{props.leftIcon}</LeftIcon>}
                <Label {...styles} $show={showLabel}>
                    <span>{props.label}</span>
                    <Input
                        {...propsComponent}
                        {...styles}
                        onFocus={onFocus}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (props.onChange) {
                                props.onChange(e)
                            }

                            if (props.onChangeValue) {
                                props.onChangeValue(e.target.value || '')
                            }
                        }}
                    />
                </Label>
                {!props.isPassword && props.rightIcon && <RightIcon>{props.rightIcon}</RightIcon>}
                {
                    props.isPassword && (<>
                        {
                            type === "password" ? (
                                <RightIcon>
                                    <Password onClick={(e: React.ChangeEvent<HTMLButtonElement>, nextType: string) => {
                                        e.preventDefault();
                                        setType('text')
                                    }}>
                                        <FaRegEye size={20} color={Color('#000000').fade(0.9) as any} />
                                    </Password>
                                </RightIcon>
                            ) : (
                                <RightIcon>
                                    <Password onClick={(e: React.ChangeEvent<HTMLButtonElement>, nextType: string) => {
                                        e.preventDefault();
                                        setType('password')
                                    }}>
                                        <FaRegEyeSlash size={20} color={Color('#000000').fade(0.9) as any} />
                                    </Password>
                                </RightIcon>
                            )
                        }
                    </>)
                }
            </LabelContainer>
            {props.error && <MessageError>{props.error}</MessageError>}
        </Container>
    )
}


const Container = styled.div<StyledProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    font-family: ${p => p.theme.typography.fontFamily};
`


const LabelContainer = styled.div`
    position: relative;
    width: 100%;
    box-sizing: border-box;
`

const Label = styled.label<StyledProps & {
    $show: boolean
}>`
    display: flex; 
    font-family: ${p => p.theme.typography.fontFamily};
    flex: 1;
    position: relative;

    span {

        transition: all 400ms;

        ${p => !p.$show && `
            z-index: -100;
            opacity: 0;
            transform: translateY(15px);
        `}

        position: absolute;
        font-size: ${p => p.theme.fontSize.xs};
        top: -8px; 
        display: block;
        z-index:1; 
        left: ${p => p.theme.spacing.xl}; 

        ${p => p.$leftIcon && `
            left: ${p.theme.spacing.xxl}; 
        `}

        ${p => (p.$rightIcon || p.$isPassword) && `
            left: ${p.theme.spacing.xxl}; 
        `}
        
        ::before {
            content: "";
            background: #fff;
            height: 4px;
            width: 100%;
            display: block;
            position: absolute;
            top: 50%;
            z-index: -1;
        }
    }

`

const Input = styled.input<StyledProps>`
    font-family: ${p => p.theme.typography.fontFamily};
    flex: 1;
    border: none;
    box-shadow: ${Color('#000000').fade(0.8) as any} 0px 0px 0px 1px inset;
    border-radius: 200px;
    padding: ${p => p.theme.spacing.md} ${p => p.theme.spacing.lg};
    font-size: ${p => p.theme.fontSize.md};
    outline: 0;   
    width: 100%;
        
    &:focus {
        transition: all 1s linear;
        box-shadow: ${p => Color(p.theme.colors.primary).fade(0.2) as any} 0px 0px 5px 1px;
    } 


    ${p => p.$error && `
        box-shadow: ${Color(p.theme.colors.danger).fade(0.2) as any} 0px 0px 5px 1px;
    `}


    ${p => p.$leftIcon && `
        padding-left: ${p.theme.spacing.xxl};
    `}

    ${p => (p.$rightIcon || p.$isPassword) && `
        padding-right: ${p.theme.spacing.xxl};
    `}
    
`


const Password = styled.div<any>`
    background: none;
    cursor: pointer;
`

const Icon = styled.div`
    position: absolute;
    height: 100%;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    top: 0
`

const LeftIcon = styled(Icon)`
    left: 0;
`

const RightIcon = styled(Icon)`
    right: 0;
`

const MessageError = styled.p`
    font-family: ${p => p.theme.typography.fontFamily};
    color: ${p => p.theme.colors.danger};
    margin: 6px 0 0 ${p => p.theme.spacing.xl};
    font-size: ${p => p.theme.fontSize.sm};
`


export default InputComponent