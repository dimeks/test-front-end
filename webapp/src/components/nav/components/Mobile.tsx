import React from 'react'
import styled, { DefaultTheme, useTheme } from 'styled-components'
import { Link as LinkRouter } from 'react-router-dom'
import { Styled } from '@ui/types'
import { FaSearch } from 'react-icons/fa';
import { getProps } from '@ui/helpers'
import { Props } from '../Nav'
import logo from '@assets/images/logo.svg'
import Input from '@ui/components/input/Input'
import Profile from '@ui/components/profile/Profile'
import Color from 'color';
import { useOutsideClick, useSearch } from '@hooks'


export type LinkProps = {
    icon?: React.ReactNode
    to: string
    label: string
}


const styledKeys = [
    ''
];


type StyledProps = Styled<Props>

const NavMobile: React.FC<Props> = (props) => {

    const theme = useTheme()
    const [showSearch, setShowSearch] = React.useState<boolean>(false)
    const [showNavigation, setShowNavigation] = React.useState<boolean>(false)
    const { onSearch, onChangeValue, searchValue } = useSearch()
    const wrapperRef = React.useRef(null);

    useOutsideClick(wrapperRef, () => {
        setShowNavigation(false)
    });

    const { propsComponent, styles } = getProps<Props>({
        ...props
    }, styledKeys)


    return (
        <Container className="animate__animated animate__fadeIn animate__slower" ref={wrapperRef} {...styles} $showNavigation={showNavigation}>
            <Actions {...styles}>
                <Profile {...props.profile} onClick={(e: React.MouseEvent<HTMLElement>) => setShowNavigation(showNavigation ? false : true)} showDisplayName={false} maxWidth="280px" />

                <Logo to="/videos">
                    <img src={logo} />
                </Logo>

                <SearchButton $show={showSearch} onClick={(e: React.MouseEvent<HTMLElement>) => {
                    setShowSearch(showSearch ? false : true)
                }}>
                    <FaSearch color={Color(theme.colors.text).fade(0) as any} size={20} />
                </SearchButton>

                <Search $show={showSearch} onSubmit={(e: React.FormEvent) => {
                    onSearch(e)
                    setShowSearch(false)
                }}>
                    <Input
                        onChange={onChangeValue}
                        placeholder="Pesquisar"
                        rightIcon={<SearchButtonIcon type='submit'>
                            <FaSearch color={Color(theme.colors.text).fade(0.4) as any} size={20} />
                        </SearchButtonIcon>}
                        value={searchValue}
                    />
                </Search>

            </Actions>


            <NavContainer {...styles} $show={showNavigation}>
                <ul>
                    {props.links.map((link: LinkProps, index: number) => (
                        <li key={index.toString()}>
                            <Link to={link.to}>
                                {link.icon}
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </NavContainer>

        </Container>
    )
}


const Container = styled.footer<StyledProps & {
    $showNavigation: boolean
}> `
    background: ${p => p.theme.colors.primary};
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    transition: transform 400ms;
    transform: translateY(224px);
    z-index: 100;

    ${p => p.$showNavigation && `
        transform: translateY(0)
    `}
`

const Actions = styled.footer<StyledProps>`
    background: ${p => p.theme.colors.primary};
    width: 100%;
    box-sizing: border-box;
    height: 74px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
`

const Logo = styled(LinkRouter)`
    background: ${p => p.theme.colors.primary}; 
    position: relative;
    bottom: -40px;
    width: 200px;
    height: 200px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border-radius: 200px;
    padding-top: 30px;
 

    img {
        width: 55%;
    }
`

const Search = styled.form<{
    $show: boolean
}>` 
    width: 100%;
    position: absolute;
    padding: 0 15px;
    box-sizing: border-box;
    right: 0;
    transform: translateX(100%);
    transition: all 400ms;
    z-index: 2;
    input {
        box-shadow: ${p => Color(p.theme.colors.text).fade(0.8) as any} 0px 1px 3px 1px inset;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    ${p => p.$show && `
        transform: translateX(0);
    `}
    
`
const SearchButton = styled.button<{
    $show: boolean
}>` 
    width: 58px;
    height: 58px;
    flex: 0 0 58px;
    border-radius: 100px;
    box-shadow: ${p => Color(p.theme.colors.text).fade(0.75) as any} 0px 0px 10px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none; 
    background: ${p => p.theme.colors.white};
    z-index: 2;
    transition: all 400ms;

    :active {
        box-shadow: ${p => Color(p.theme.colors.text).fade(0.8) as any} 0px 1px 1px 1px inset;
        transform: scale(.9);
    }

    ${p => p.$show && `
     `}
`

const SearchOverlay = styled.div<{
    $show: boolean
}>`
    position: absolute;
    background: none;
    width: 100%;
    max-width: 380px;
    right: 15px;
    z-index: 3;
    height: 63px;
    border-radius: 100px;
    overflow: hidden;
    max-width: 0;
    
    ${p => p.$show && `
        max-width: 380px;
        z-index: 2;
        display: block;
    `}

    input {
        padding: 21px 22px;
        margin-left: 30px;
    }
`

const NavContainer = styled.nav<StyledProps & {
    $show: boolean
}>`
    width: 100%;
    flex: 1;
    z-index: 2;
    box-sizing: border-box;
    elevation: ${p => p.theme.elevation.lg};
    padding: ${p => p.theme.spacing.md};
    background: ${p => p.theme.colors.white};
    font-family: ${p => p.theme.typography.fontFamily};

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


const SearchButtonIcon = styled.button`
    background: none;
    cursor: pointer; 
    border: none;
    padding: 15px;
    display: flex;
    align-items: center;
`

export default NavMobile