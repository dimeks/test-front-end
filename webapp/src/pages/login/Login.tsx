import React from 'react'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import Color from 'color'
import qs from 'qs'
import bg from '@assets/images/bg-lq.png'
import logo from '@assets/images/logo.svg'
import Login, { StateLogin } from '@components/login/Login'
import { useLogin } from '@hooks'

const LoginPage = () => {
    const [showLogin, setShowLogin] = React.useState<boolean>(false)
    const navigate = useNavigate();
    const { login, error } = useLogin()

    React.useLayoutEffect(() => {
        setTimeout(() => setShowLogin(true), 1500)
    }, [])

    const onSubmit = async (state: StateLogin) => {
        await login(state)
        let redirectTo = '/videos'
        if (location.search.includes('redirect')) {
            const query = qs.parse(location.search, { ignoreQueryPrefix: true })
            if (query.redirect !== '/videos') {
                redirectTo = query.redirect as string
            }
        }
        navigate(redirectTo)
    }

    return <Container $showLogin={showLogin}>
        <CircleContainer className="animate__animated">
            <Circle>
                <Logo src={logo} />
                <Description>
                    Nossa galeria de vídeos exclusiva, com músicas, decorações e cerimoniais completos para você alimentar ainda mais o <strong>seu sonho</strong>.
                </Description>
            </Circle>
        </CircleContainer>
        <LoginContainer className={showLogin ? "animate__animated" : ""} $show={showLogin}>
            <Login onSubmit={onSubmit} error={error} />
        </LoginContainer>
    </Container>
}

export default LoginPage


/**
 * Styles
 */
export const Container = styled.div<{
    $showLogin: boolean
}>`
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    background-image: url('${bg}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    overflow-y: hidden;

    ${p => p.$showLogin && `
        overflow-y: initial;
    `}

    @media (max-width: 900px) {
        flex-direction: column;
        align-items: center;
    }    
`

export const CircleContainer = styled.div`
    height: auto;
    width: 540px;
    top: -250px;
    overflow: hidden;    
    display: flex;
    align-items: end;
    justify-content: flex-start;
    flex-direction: column; 
    position: relative;
    animation: fadeInLeft;
    animation-duration: 1.5s;
     
    @media (max-width: 900px) {        
        justify-content: flex-end;
        top: 0;
        height: 360px;
        width: 640px;
        animation: fadeInDown;
        animation-duration: 1.5s;
     }

     @media (max-width: 480px) {
       height: 300px; 
    }
 
`

export const Circle = styled.div`
    flex: 0 0 740px;
    height: 740px;
    width: 740px;
    padding: 110px;
    box-sizing: border-box;
    background:${p => Color(p.theme.colors.primary).fade(0.2) as any};
    border-radius: 1000px;
    display: flex;
    align-items: end;
    justify-content: flex-end;
    flex-direction: column;
    
    @media (max-width: 900px) {
        align-items: center; 
        padding: 40px;
        text-align: center;
        height: 640px;
        width: 640px;
    }
 `


export const Logo = styled.img`
    width: 50%;
    display: flex;
    align-self: center;
    
    @media (max-width: 900px) {
       width: 40%;
    }

    @media (max-width: 480px) {
       width: 36%;
       margin-bottom: 20px;
    }
`

export const Description = styled.p`
    width: 340px; 
    color: ${p => p.theme.colors.white};
    line-height: ${p => p.theme.fontSize.xxl};
    font-size: ${p => p.theme.fontSize.lg};
    box-sizing: border-box;

    @media (max-width: 480px) {
        width: 300px; 
        line-height: ${p => p.theme.fontSize.xl};
        font-size: ${p => p.theme.fontSize.md};
    }
`

export const LoginContainer = styled.div<{
    $show: boolean
}>`
    width: 100%;
    max-width: 350px;
    display: flex;
    justify-content: center;
    margin: 240px 15px 15px 50px;
    box-sizing: border-box;    
    opacity: 0;
    height: fit-content;
    
    ${p => p.$show && `
        animation: fadeIn;
        animation-duration: 1.5s;
        opacity: 1;
    `}

    form {
        height: fit-content;
    }
    
    @media (max-width: 900px) {
        margin: 60px 15px;

        ${p => p.$show && `
            animation: fadeIn;
            animation-duration: 1.5s;
            opacity: 1;
        `}
      
     }
`

