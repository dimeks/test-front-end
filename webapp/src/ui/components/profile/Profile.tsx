import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import { Styled, DropdownLinks } from '@ui/types'
import { FaAngleDown } from 'react-icons/fa';
import { getProps } from '../../helpers'
import Dropdown from '../dropdown/Dropdown'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
    avatar?: string
    displayName?: string
    width?: string
    maxWidth?: string
    showDisplayName?: boolean
    dropdown?: Array<DropdownLinks>
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const styledKeys = [
    'width',
    'maxWidth',
    'showDisplayName'
];


type StyledProps = Styled<Props>
import { useOutsideClick } from '../../../hooks'

const Profile: React.FC<Props> = (props) => {

    const [showDropdown, setShowDropdown] = React.useState<boolean>(false)
    const wrapperRef = React.useRef(null);

    useOutsideClick(wrapperRef, () => {
        setShowDropdown(false)
    });

    const { propsComponent, styles } = getProps<Props>({
        width: '100%',
        maxWidth: '200px',
        showDisplayName: true,
        ...props
    }, styledKeys)

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setShowDropdown(showDropdown ? false : true)
        if (props.onClick) {
            props.onClick(e)
        }
    }

    return (
        <Container ref={wrapperRef} $showDropdown={showDropdown}>

            <ButtonContainer {...propsComponent} {...styles} onClick={(e: React.MouseEvent<HTMLElement>) => onClick(e)}>
                {
                    props.showDisplayName && (
                        <>
                            <FaAngleDown size={20} color="#FFF" />
                            {props.displayName ? (
                                <DisplayName>{props.displayName}</DisplayName>
                            ) : (
                                <DisplayNamePlaceholder className="animate__animated animate__infinite animate__flash animate__slower" />
                            )}
                        </>
                    )
                }
                <Avatar {...styles} $src={props.avatar} />
            </ButtonContainer>
            {props.dropdown && (
                <Dropdown
                    style={{
                        zIndex: 1
                    }}
                    show={showDropdown}
                    links={props.dropdown}
                />
            )}
        </Container>

    )
}



const Container = styled.div<{
    $showDropdown: boolean
}>`
    position: relative;
    overflow: hidden; 

    ${p => p.$showDropdown && `
        overflow:initial;
    `}
`

const ButtonContainer = styled.button<StyledProps>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${Color("#FFF").fade(0.80) as any}};
    width: auto; 
    padding: 0;
    border: none;
    cursor: pointer;
    border-radius: 100px;
    transition: all 400ms;
    height: 52px;
    z-index: 2;

    ${p => p.$showDisplayName && `
        font-weight: bold;
        width: ${p.$width};
        max-width: ${p.$maxWidth};
        padding-left: 20px;
        border: 1px solid  ${Color(p.theme.colors.text).fade(0.6) as any};
    `}

    :hover {
        background: ${Color("#FFF").fade(0.6) as any}};
    }
`

const DisplayNamePlaceholder = styled.span`
    display: block;
    background: ${p => Color('#FFF').fade(0.5) as any};
    border-radius: ${p => p.theme.spacing.md};
    height: 20px;
    width: 100%;
    min-width: 160px;
    margin: 0 15px;
`

const DisplayName = styled.span`
    font-size: ${p => p.theme.fontSize.md};
    font-family: ${p => p.theme.typography.fontFamily};
    color: ${p => p.theme.colors.white};
    text-align: left;
    margin: 0 15px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: normal;
    max-height: 40px;
    flex: 1;
`

const Avatar = styled.div<{
    $src?: string
}>` 
    ${p => p.$src && `
        background-image: url(${p.$src});
    `}

    flex: 0 0 50px;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border: 1px solid #FFF;
`


export default Profile