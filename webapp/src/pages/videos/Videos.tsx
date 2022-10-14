import React from 'react'
import { useNavigate } from 'react-router-dom';
import Nav from '@components/nav/Nav'
import links from '@components/nav/links'
import { useDisplay, useVideos } from '@hooks'
import services from '@services'
import { Sidepanel } from '@ui'
import { User } from '@services/types'
import Videos from '@components/videos/ListVideos'
import VideoDetail from '@components/videos/VideoDetail'
import Welcome from '@components/videos/Welcome'


const VideoPage = () => {
    const { display } = useDisplay()
    const [user, setUser] = React.useState<User | undefined>(undefined)
    const navigate = useNavigate();
    const {
        maxResults,
        videos,
        loadingVideos,
        video,
        loadingVideo
    } = useVideos({
        maxResults: 30
    })

    React.useEffect(() => {
        services.users.me().then((user: User) => setUser(user))
    }, [])

    return <>
        {
            display && (
                <Nav
                    links={links}
                    profile={user}
                    variant={display}
                />
            )
        }

        {
            videos.length == 0 && !loadingVideos ? (
                <Welcome />
            ) : (
                <Videos
                    maxResults={maxResults}
                    isLoading={loadingVideos}
                    items={videos}
                />
            )
        }

        <Sidepanel
            show={video || loadingVideo ? true : false}
            textBackButton="MAIS INSPIRAÇÕES"
            onClose={() => {
                if (window.history.state) {
                    navigate(-1);
                } else {
                    navigate('/videos', { replace: true });
                }
            }}
        >
            <VideoDetail video={video} />
        </Sidepanel>
    </>
}

export default VideoPage