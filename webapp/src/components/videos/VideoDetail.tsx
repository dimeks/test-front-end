import React from 'react'
import Color from 'color'
import styled from 'styled-components'
import { Video } from '@services/types'
import StatisticsComponent from '@components/statistics/Statistics';
const YTPlayer = require('yt-player')

type Props = {
    video: Video | null
}

let player: any = null

const VideoDetail: React.FC<Props> = (props) => {

    React.useLayoutEffect(() => {
        if (!player) {
            if (props.video) {
                player = new YTPlayer('#player', {
                    autoplay: true,
                    start: 0
                })

                if (player.videoId !== props.video?.id) {
                    player.load(props.video?.id)
                }

                player.on('unstarted', () => {
                    player.play()
                })

            }
        }

        if (player && !props.video) {
            player.stop()
            player.destroy()
            player = null
        }

    }, [props])

    return <Container>
        <Embed><div id="player"></div></Embed>
        {
            props.video && (
                <Body>
                    <Statistics {...props.video?.statistics} />
                    <Description>
                        <h3>{props.video?.snippet.title}</h3>
                        <p>{props.video?.snippet.description}</p>
                    </Description>
                </Body>
            )
        }
    </Container>
}

export default VideoDetail

const Container = styled.div`
    width: 100%;
    max-width: 1000px;     
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`

const Embed = styled.div`
    z-index:1;
    width: 100%;
    height: 600px;
    border-radius: 15px;
    background: ${p => Color('#000').fade(0.9) as any};

    iframe {
        border: none;
        border-radius: 15px;
        width: 100%;
        height: 100%;
    }
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
`

const Description = styled.div`
    flex: 1;
    margin-top: 30px;
    align-self: start;

    p {
        white-space: break-spaces;
    }
`

const Statistics = styled(StatisticsComponent)`
    z-index:0;
    top: -10px;
    position: relative;
    display: flex; 
    height: fit-content;
`



