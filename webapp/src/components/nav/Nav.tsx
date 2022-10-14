import React from 'react'
import { Styled, DropdownLinks } from '@ui/types'
import { getProps } from '@ui/helpers'
import Desktop from './components/Desktop'
import Mobile from './components/Mobile'

export type Props = {
    variant: 'mobile' | 'desktop'
    links: Array<DropdownLinks>
    profile?: {
        displayName: string
        avatar: string
    }
}

const styledKeys = [
    'variant',
];


type StyledProps = Styled<Props>

const Nav: React.FC<Props> = (props) => {

    const { propsComponent, styles } = getProps<Props>({
        ...props
    }, styledKeys)

    return (
        <>
            {props.variant === 'mobile' ? (
                <Mobile {...propsComponent} />
            ) : (
                <Desktop {...propsComponent} />
            )}
        </>
    )
}


export default Nav