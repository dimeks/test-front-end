import React from 'react'
import styled from 'styled-components'
import { Link as LinkRouter } from 'react-router-dom'
import { Styled, DropdownLinks } from '@ui/types'
import Color from 'color'
import { getProps } from '../../helpers'


type Props = React.HTMLAttributes<HTMLButtonElement> & {
    show: boolean
    width?: string
    maxWidth?: string
    showDisplayName?: boolean
    links: Array<DropdownLinks>
}

const styledKeys = [
    'width',
    'maxWidth'
];


type StyledProps = Styled<Props>

const Dropdown: React.FC<Props> = (props) => {

    const { propsComponent, styles } = getProps<Props>({
        width: '100%',
        maxWidth: '170px',
        ...props
    }, styledKeys)


    return (
        <Container {...styles} $show={props.show}>
            <ul>
                {props.links.map((link: DropdownLinks, index: number) => (
                    <li key={index.toString()}>
                        <Link to={link.to}>
                            {link.icon}
                            <span>{link.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </Container>

    )
}


const Container = styled.nav<StyledProps & {
    $show: boolean
}>`
    width: ${p => p.$width};
    max-width: ${p => p.$maxWidth};
    elevation: ${p => p.theme.elevation.lg};
    padding: ${p => p.theme.spacing.md};
    border-radius:  0 0 ${p => p.theme.radius.md} ${p => p.theme.radius.md};
    background: ${p => p.theme.colors.white};
    position: absolute;
    top: 52px;
    left: 25px;
    font-family: ${p => p.theme.typography.fontFamily};
    opacity: 0;
    transform: translateY(-60px);
    transition: all 500ms;
    z-index: -1000;
    
    ${p => p.$show && `
        z-index: 1;
        transform: translateY(0);
        opacity: 1;
    `}


    ul {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        list-style: none;
    }    

    li {
        margin-top: 4px;
        padding-top: 4px;
        border-top: 1px solid ${p => Color(p.theme.colors.text).fade(0.9) as any};           
    }    
    
    li:first-child {
        border-top: none;
    }
`

const Link = styled(LinkRouter)`
    display: flex;
    padding: 10px 0;
    text-decoration: none;
    font-size: ${p => p.theme.fontSize.md};
    color: ${p => p.theme.colors.text};
    font-weight: normal;
    align-items: center;
    transition: all 400ms;

    :hover{
        color: ${p => p.theme.colors.secondary};
    }

    svg {
        margin-right: 15px;
    }
`


export default Dropdown