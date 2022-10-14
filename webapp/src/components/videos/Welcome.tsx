import React from 'react'
import { FaSearch, FaAngleRight } from 'react-icons/fa';
import styled, { useTheme } from 'styled-components'
import { Link } from 'react-router-dom'
import { Input, Button } from '@ui'
import Color from 'color';
import { useSearch } from '@hooks'

type Props = {
}

const Welcome: React.FC<Props> = (props) => {
    const theme = useTheme()
    const { search, onSearch, onChangeValue, searchValue } = useSearch()

    return (
        <Container>
            <p>
                Inicie sua busca por inspirações ou dê uma olhada no que <strong>preparamos para você</strong>.
            </p>

            <Options>
                <form onSubmit={onSearch}>
                    <Input
                        onChange={onChangeValue}
                        placeholder="Pesquisar"
                        rightIcon={<SearchButton type="submit">
                            <FaSearch color={Color(theme.colors.text).fade(0.4) as any} size={20} />
                        </SearchButton>}
                        value={searchValue}
                    />
                </form>
                <Separator>OU</Separator>
                <Button
                    onClick={() => {
                        search("icasei dicas de casamento")
                    }}
                    color="secondary"
                    label="VEJA NOSSAS DICAS"
                    size="md"
                    variant="contained"
                    textAlign="between"
                    rightIcon={<FaAngleRight color="#FFF" size={20} />}
                    fullWidth={true}
                />
            </Options>
        </Container>
    )
}

export default Welcome


const Container = styled.div`
    width: 100%;
    max-width: 420px;
    display: flex;
    align-self: center;
    flex-direction: column;
    height: 90vh;
    align-center: center;
    justify-content: center;
    margin: auto;
    padding: 0 30px;
    box-sizing: border-box;

    p {
        line-height: ${p => p.theme.fontSize.xxl};
        font-size: ${p => p.theme.fontSize.lg};
        margin-bottom: 80px;
    }
 
`


const Options = styled.div`
    width: 100%;
    max-width: 300px;
    align-center: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-self: center;
`

const Separator = styled.h3`
    text-align: center;
    margin: 15px;
    font-size: ${p => p.theme.fontSize.sm};
`

const SearchButton = styled.button`
    background: none;
    cursor: pointer; 
    border: none;
    padding: 15px;
    display: flex;
    align-items: center;
`