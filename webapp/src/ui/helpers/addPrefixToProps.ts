import { Styled } from '@ui/types'

export default function <T extends {}>(obj: T): Styled<T> {
    return Object.keys(obj).reduce((styles: any, prop: string) => {
        const _obj: any = obj
        styles[`$${prop}`] = _obj[prop]
        return styles
    }, {}) as Styled<T>
}