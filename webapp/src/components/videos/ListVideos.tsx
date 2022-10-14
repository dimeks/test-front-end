import React from 'react'
import styled from 'styled-components'
import { Video } from '@services/types'
import { Card } from '@ui'
import thumbnail from '@assets/images/video-lq.png'

type Props = {
    items: Array<Video>
    isLoading: boolean;
    maxResults: number;
}

const ListVideos: React.FC<Props> = (props) => {
    return <Container>
        {
            props.items.map((video: Video, index: number) => (
                <VideoItem
                    key={index.toString()}
                    bg="white"
                    color="text"
                    description={video.snippet.title}
                    elevation="xs"
                    fontSize="md"
                    isVideo
                    padding="md"
                    radius="xs"
                    thumbnail={video.snippet.thumbnails.high.url}
                    thumbnailLow={video.snippet.thumbnails.default.url}
                    to={`?videoId=${video.id.videoId}`}
                    width="100%"
                />
            ))
        }

        {
            props.isLoading && (
                <>
                    {
                        Array(props.maxResults).fill(0).map((placeholder: string, index: number) => (
                            <VideoItem
                                key={index.toString()}
                                bg="white"
                                color="text"
                                description={""}
                                elevation="xs"
                                fontSize="md"
                                isVideo
                                padding="md"
                                radius="xs"
                                thumbnail={thumbnail}
                                thumbnailLow={thumbnail}
                                width="100%"
                                isPlaceholder
                            />
                        ))
                    }
                </>
            )
        }
    </Container>
}

export default ListVideos

const Container = styled.div`
    padding-top: 100px;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    box-sizing: border-box;
    max-width: 1200px;
    display: flex;
    flex-wrap: wrap;
    align-self: center;
    margin: 0 auto;
    justify-content: space-evenly;

    @media (max-width: 900px) {
        padding-top: 0;
        padding-bottom: 100px;
    }
`

const VideoItem = styled(Card)`
    margin: 15px 5px;

    @media (max-width: 499px) {
        max-width: 100%;
        margin: 15px 0;
    }

    @media (min-width: 500px) and (max-width: 760px) {
        max-width: 165px
    }
    
    @media (min-width: 761px) and (max-width: 1200px) {
        max-width: 200px
    }

    @media (min-width: 1201px) {
        max-width: 270px
        margin: 15px 15px;
    }
`
