import axios, { AxiosRequestConfig } from 'axios'
import { auth } from '@helpers/localStorage'
import { Login, User } from './types'

const path = '/users'

export async function login(body: Login) {
    try {
        const response = await axios.post(`${path}/login`, body)
        return response.data
    } catch (e) {
        throw 'Dados incorretos.'
    }
}

export async function me(): Promise<User> {
    try {
        const response = await axios.get(`${path}/me`, {
            useToken: true
        } as AxiosRequestConfig<{
            useToken: boolean
        }>)
        return response.data
    } catch (e) {
        throw 'Não autorizado'
    }
}

export function logout(): void {
    auth.set({
        access_token: ''
    })
}

export function isLogged(): boolean {
    return auth.get('access_token') ? true : false
}