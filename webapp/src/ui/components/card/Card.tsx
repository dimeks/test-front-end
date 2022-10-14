import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import { Link } from 'react-router-dom'
import { Styled, Colors, Sizes, FontSizeObject } from '@ui/types'
import { FaPlay } from 'react-icons/fa';
import { getProps } from '../../helpers'
import thumbnailPlaceholder from '@assets/images/thumbnail.png'

type Props = {
    as?: any
    color?: Colors
    bg?: Colors
    padding?: Sizes,
    fontSize?: Sizes,
    width?: string
    maxWidth?: string
    description?: string
    thumbnail?: string
    thumbnailLow?: string
    isVideo?: boolean
    isPlaceholder?: boolean
    to?: string
    elevation?: 'xs' | 'md' | 'lg'
    radius?: 'xs' | 'md' | 'lg'
    children?: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const styledKeys = [
    'to',
    'elevation',
    'description',
    'thumbnail',
    'radius',
    'padding',
    'color',
    'maxWidth',
    'fontSize',
    'isVideo',
    'isPlaceholder',
    'bg',
];


type StyledProps = Styled<Props>

const onClickDefault = (e: React.MouseEvent<HTMLElement>) => { }

const placeholderAnimate = 'animate__animated animate__flash animate__infinite animate__slower'

const Card: React.FC<Props> = (props) => {

    const [thumbnail, setThumbnail] = React.useState<string>(thumbnailPlaceholder)
    const thumbRef = React.createRef<any>()

    React.useEffect(() => {
        if (props.thumbnail && thumbRef) {
            const _img = thumbRef.current;
            const newImg = new Image;
            newImg.onload = function () {
                //@ts-ignore
                _img.src = this.src;
            }
            newImg.src = props.thumbnail;
        }
    }, [thumbRef])

    const { propsComponent, styles } = getProps<Props>({
        width: '100%',
        maxWidth: '340px',
        color: 'text',
        bg: 'white',
        radius: 'xs',
        elevation: 'xs',
        padding: 'md',
        fontSize: 'md',
        ...props
    }, styledKeys)

    const onClick = props.onClick || onClickDefault

    return (
        <CardStyle {...styles} {...propsComponent}>

            {
                props.thumbnail && <>
                    <figure style={{ margin: 0 }}>
                        {
                            props.to ? (
                                <Link to={props.to} onClick={onClick}>
                                    {props.isVideo && (
                                        <PlayIcon>
                                            <FaPlay size="40%" color="#FFF" />
                                        </PlayIcon>
                                    )}
                                    <Thumbnail ref={thumbRef} {...styles} src={thumbnail} className={props.isPlaceholder ? placeholderAnimate : ''} />
                                </Link>
                            ) : (
                                <Thumbnail ref={thumbRef} {...styles} src={thumbnail} className={props.isPlaceholder ? placeholderAnimate : ''} />
                            )
                        }
                    </figure>
                </>
            }

            {
                props.children ? (
                    <>{props.children}</>
                ) : (
                    <>
                        {
                            props.to ? (
                                <Body {...styles} as={props.thumbnail ? 'figcaption' : 'p'}>
                                    <Link to={props.to} onClick={onClick}>
                                        {
                                            props.isPlaceholder ? (<>
                                                <PlaceholderText $width="75%" $mb="5px" className={placeholderAnimate} />
                                                <PlaceholderText $width="80%" $mb="5px" className={placeholderAnimate} />
                                                <PlaceholderText $width="62%" className={placeholderAnimate} />
                                            </>) : (<>
                                                {props.description || props.children}
                                            </>)
                                        }
                                    </Link>
                                </Body>
                            ) : (
                                <Body {...styles} as={props.thumbnail ? 'figcaption' : 'p'}>
                                    {
                                        props.isPlaceholder ? (<>
                                            <PlaceholderText $width="75%" $mb="5px" className={placeholderAnimate} />
                                            <PlaceholderText $width="80%" $mb="5px" className={placeholderAnimate} />
                                            <PlaceholderText $width="62%" className={placeholderAnimate} />
                                        </>) : (<>
                                            {props.description || props.children}
                                        </>)
                                    }
                                </Body>
                            )
                        }
                    </>
                )
            }

        </CardStyle >
    )
}


const CardStyle = styled.div<StyledProps>`
    width: ${p => p.$width};
    max-width: ${p => p.$maxWidth};
    background: ${p => p.theme.colors[p.$bg]};
    color: ${p => p.theme.colors[p.$color]};
    border-radius: ${p => p.theme.radius[p.$radius]};
    box-shadow: ${p => p.theme.elevation[p.$elevation]};
    font-family: ${p => p.theme.typography.fontFamily};
    font-size: ${p => p.theme.fontSize[p.$fontSize]};
    padding: ${p => p.theme.spacing[p.$padding]};
    transition: all 300ms;

    a {
        color: ${p => p.theme.colors[p.$color]};
        display: block;
        text-decoration: none;
    }

    figure {
        a {
            display: flex;
            align-items: center;
            justify-content: center;

            span {
                transition: all 600ms;
                transform: translateY(10px);
                opacity: 0;
            }
        }
    }

    &:hover {
        ${p => p.$to && `
            box-shadow: ${p.theme.elevation.lg};
            scale: 1.05;
        `}

        figure a span {
            transform: translateY(0);
            opacity: 1;
        }
    }
`

const PlayIcon = styled.span`
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${p => p.theme.colors.secondary};
    position: absolute;
    z-index: 1
`

const Thumbnail = styled.img<StyledProps>`
    width: 100%;
    border-radius: ${p => p.theme.spacing[p.$padding]} ${p => p.theme.spacing[p.$padding]} 0 0;
    padding-bottom: 15px;
`

const Body = styled.p<StyledProps>`
    color: ${p => p.theme.colors[p.$color]};
    ${p => p.$description && `
        font-size: 1rem;
        line-height: 1.4rem;
        max-height: 6rem;
        overflow: hidden;
        display: block;
        -webkit-line-clamp: 4;
        display: box;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        white-space: normal;
    `}
`

const PlaceholderText = styled.span<{
    $height?: string
    $width?: string
    $mb?: string
}>`
    display: block;
    height: ${p => p.$height || '16px'};
    width: ${p => p.$width || '100%'};
    border-radius: ${p => p.theme.radius.md};
    background: ${p => Color('#000').fade(0.9) as any};
    margin-bottom: ${p => p.$mb || '0'};
`

export default Card