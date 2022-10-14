import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Card, Input, Button, theme } from '@ui'
import { FaEnvelope, FaLock, FaAngleRight } from 'react-icons/fa';
import { isEmail } from '@helpers/validate'

export type StateLogin = {
    email: string;
    password: string
}

type Errors = Partial<StateLogin>

export type Props = {
    onSubmit: (state: StateLogin) => void
    error?: string
}

const cssButtonAnimateError = 'animate__animated animate__shakeX'
const cssFormErrorClass = 'animate__animated'

const LoginComponent: React.FC<Props> = (props) => {
    const theme = useTheme()
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [formErrorClass, setFormErrorClass] = React.useState<string>('')
    const [buttonAnimateError, setButtonAnimateError] = React.useState<string>('')
    const [errors, setErrors] = React.useState<Errors>({})

    React.useEffect(() => {
        if (props.error) {
            setButtonAnimateError('')
            setFormErrorClass('')
            setTimeout(() => {
                setButtonAnimateError(cssButtonAnimateError)
                setFormErrorClass(cssFormErrorClass)
            }, 0)
        }
    }, [props])

    const validate = () => {
        let errors: Errors = {}

        if (!isEmail(email)
        ) {
            errors.email = 'E-mail inválido'
        }

        if (!password) {
            errors.password = 'Preencha sua senha'
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors)
            return false
        }

        return true
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setButtonAnimateError('')
        setFormErrorClass('')
        setErrors({})

        const isValid = validate()

        if (isValid) {
            props.onSubmit({ email, password })
        } else {
            setTimeout(() => {
                setButtonAnimateError(cssButtonAnimateError)
            }, 0)
        }
    }

    return (
        <Card radius="md" elevation='lg' maxWidth='300px'>
            <Form onSubmit={onSubmit}>
                <Box>
                    <Input
                        error={errors.email || ''}
                        label="E-mail"
                        leftIcon={<FaEnvelope color="#90CAF9" size={16} />}
                        onChangeValue={(value: string) => setEmail(value)}
                        placeholder="E-mail"
                        value={email}
                    />
                </Box>
                <Box>
                    <Input
                        error={errors.password || ''}
                        label="Senha"
                        type="password"
                        leftIcon={<FaLock color="#90CAF9" size={16} />}
                        onChangeValue={(value: string) => setPassword(value)}
                        placeholder="Senha"
                        isPassword={true}
                        value={password}
                    />
                </Box>

                <Box>
                    <FormError className={formErrorClass} $show={props.error !== ""}>{props.error}</FormError>
                </Box>

                <Box>
                    <Button
                        className={buttonAnimateError}
                        type="submit"
                        color="secondary"
                        label="Entrar"
                        size="md"
                        variant="outlined"
                        textAlign="between"
                        rightIcon={<FaAngleRight color={theme.colors.secondary} size={20} />}
                        fullWidth={true}
                    />
                </Box>

            </Form>
        </Card>
    )
}


export default LoginComponent


const Form = styled.form`
        
`

const Box = styled.div`
    display: block;
    margin: ${p => p.theme.spacing.lg} 0;
`

const FormError = styled.p<{
    $show: boolean
}>`
    display: block;
    margin: 0;
    color: ${p => p.theme.colors.danger};
    text-align: center;
    
    ${p => p.$show && `
        margin: ${p.theme.spacing.lg} 0;
        animation: flash;
        animation-duration: 1.5s;
    `}
`
