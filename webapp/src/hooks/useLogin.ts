import React from 'react'
import services from '@services'
import { auth } from '@helpers/localStorage'

type State = {
    email: string
    password: string
}

export default () => {
    const [error, setError] = React.useState<string>('')

    const login = async (state: State) => {
        try {
            const user = await services.users.login(state)
            auth.set({
                access_token: user.access_token
            })
        } catch (e) {
            setError('Dados incorretos. Verifique os campos e tente novamente.')
        }
    }


    return { login, error } as const
}