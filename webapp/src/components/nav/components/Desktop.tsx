import React from 'react'
import styled, { DefaultTheme, useTheme } from 'styled-components'
import { Link } from 'react-router-dom'
import { Styled } from '@ui/types'
import { FaSearch } from 'react-icons/fa';
import { getProps } from '@ui/helpers'
import { Props } from '../Nav'
import logo from '@assets/images/logo.svg'
import Input from '@ui/components/input/Input'
import Profile from '@ui/components/profile/Profile'
import Color from 'color';
import { useSearch } from '@hooks'

const styledKeys = [
    ''
];


type StyledProps = Styled<Props>

const NavDesktop: React.FC<Props> = (props) => {
    const theme = useTheme()
    const { onSearch, onChangeValue, searchValue } = useSearch()

    const { propsComponent, styles } = getProps<Props>({
        ...props
    }, styledKeys)

    return (
        <Container {...styles} className="animate__animated animate__fadeInDown ">
            <Logo to="/videos">
                <img src={logo} />
            </Logo>
            <Search onSubmit={onSearch}>
                <Input
                    onChange={onChangeValue}
                    placeholder="Pesquisar"
                    rightIcon={<SearchButton type="submit"><FaSearch color={Color(theme.colors.text).fade(0.4) as any} size={20} /></SearchButton>}
                    value={searchValue}
                />
            </Search>
            {
                <Profile
                    {...props.profile}
                    showDisplayName={true}
                    maxWidth="280px"
                    dropdown={props.links}
                />
            }
        </Container>
    )
}


const Container = styled.header<StyledProps>`
    background: ${p => p.theme.colors.primary};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    height: 74px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    z-index: 100;
`
const Logo = styled(Link)`
    background: ${p => p.theme.colors.primary}; 
    position: relative;
    bottom: 40px;
    left: -15px;
    width: 200px;
    height: 200px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    border-radius: 200px;
    padding-bottom: 30px;

    img {
        width: 55%;
    }
`
const Search = styled.form` 
    width: 100%;
    max-width: 380px;

    input {
        box-shadow: ${p => Color(p.theme.colors.text).fade(0.8) as any} 0px 1px 3px 1px inset;
    }
`

const SearchButton = styled.button`
    background: none;
    cursor: pointer; 
    border: none;
    padding: 15px;
    display: flex;
    align-items: center;
`

export default NavDesktop