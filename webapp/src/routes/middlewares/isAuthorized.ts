import { isLogged } from '@services/users';
import { redirect } from "react-router-dom";

export function isAuthorized() {
    if (!isLogged()) {
        let query = ''
        if (!location.search.includes('redirect')) {
            query = `?redirect=${location.pathname}${location.search}`
        }
        throw redirect(`/${query}`)
    }
}