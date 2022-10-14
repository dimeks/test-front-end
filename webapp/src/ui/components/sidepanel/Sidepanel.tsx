import React from 'react'
import styled, { useTheme } from 'styled-components'
import { FaArrowLeft } from 'react-icons/fa';
import Color from 'color'
import { Styled } from '@ui/types'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
    show: boolean
    onClose: () => void
    textBackButton?: string
}

const styledKeys = [
    ''
];


type StyledProps = Styled<Props>

const Sidepanel: React.FC<Props> = (props) => {

    const refBody = React.createRef<any>()

    React.useEffect(() => {

        if (props.show) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'initial'
        }

        if (refBody) {
            refBody.current.scrollTo(0, 0)
        }

    }, [props.show])

    const theme = useTheme()

    return (
        <Container $show={props.show}>
            <Header>
                <Back onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault()
                    props.onClose()
                }}>
                    <FaArrowLeft color={theme.colors.text} size={24} />
                    <span>{props.textBackButton !== undefined ? props.textBackButton : 'VOLTAR'}</span>
                </Back>
            </Header>
            <Body ref={refBody}>
                {props.children}
            </Body>
        </Container>
    )
}



const Container = styled.div<{
    $show: boolean
}>`
    top: 0;
    left: 0;
    position: fixed;
    height: 100vh;
    width: 100%;
    box-sizing: border-box;    
    z-index: 10000;
    background: ${p => p.theme.colors.white};
    display: flex;
    flex-direction: column;
    transform: translateX(105%);
    transition: all 500ms;

    ${p => p.$show && `
        transform: translateX(0);
    `}
`


const Header = styled.header`
    box-shadow: 2px 2px 2px rgba(0,0,0,.15);
    padding: 15px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    background: ${p => p.theme.colors.white};
`

const Back = styled.button`
    display: flex;
    background: none;
    border: none;
    align-items: center;
    cursor: pointer;
    transition: all 400ms;

    span {
        margin-left: 10px;
    }

    svg {
        transition: all 400ms;
    }

    :hover {
        svg {
            transform: translateX(-6px);
        }
    }
`


const Body = styled.section`
    padding: 80px 15px;
    box-sizing: border-box;
    overflow: auto;
    flex: 1;
    z-index: 0;
`

export default Sidepanel