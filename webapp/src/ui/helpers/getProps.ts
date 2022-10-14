import { Styled } from '@ui/types'

export default function <T extends {}>(obj: T, styleKeys: string[]): {
    propsComponent: T,
    styles: Styled<T>
} {
    return Object.keys(obj).reduce((styles: any, prop: string) => {
        const _obj: any = obj

        if (styleKeys.includes(prop)) {
            styles.styles[`$${prop}`] = _obj[prop]
        } else {
            styles.propsComponent[prop] = _obj[prop]
        }

        return styles
    }, {
        propsComponent: {},
        styles: {}
    })
}
