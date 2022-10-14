import React from 'react'
import qs from 'qs'
import { VideoResponse, Video, SearchResponse, VideosQuery } from '@services/types'
import services from '@services'

type Props = {
    maxResults: number
}

export default function useVideos({
    maxResults
}: Props) {
    const [searchValue, setSearchValue] = React.useState<string>('')
    const [nextPage, setNextPage] = React.useState<string>('')
    const [videos, setVideos] = React.useState<any>([])
    const [loadingMore, setLoadingMore] = React.useState<boolean>(false)
    const [loadingVideos, setLoadingVideos] = React.useState<boolean>(false)
    const [loadingVideo, setLoadingVideo] = React.useState<boolean>(false)
    const [video, setVideo] = React.useState<Video | null>(null)

    /**
     * Scroll end
     */
    React.useEffect(() => {
        const isBottom = (event: any): void => {
            const documentHeight = document.body.scrollHeight;
            const currentScroll = window.scrollY + window.innerHeight;
            const margin = 100;
            if (currentScroll + margin > documentHeight) {
                if (videos.length > 0 && !loadingMore) {
                    setLoadingMore(true)
                }
            }
        }
        window.addEventListener('scroll', isBottom)
        return () => {
            window.removeEventListener('scroll', isBottom)
        }
    }, [loadingMore, videos])

    /**
    * OnChangeQuery
    */
    React.useEffect(() => {
        const query: { search?: string, videoId?: string } = qs.parse(location.search, { ignoreQueryPrefix: true })

        if (!query.search && !query.videoId) {
            clear()
        }

        if (!query.videoId && query.hasOwnProperty('search') && query.search === '') {
            clear()
        }

        if (query.search && searchValue !== query.search) {
            setSearchValue(query.search)
        }

        if (query.videoId) {
            getVideo(query.videoId)
        } else {
            setVideo(null)
        }


    }, [location.search])



    /**
     * Get videos
     */
    React.useEffect(() => {
        window.scrollTo(0, 0)
        setVideos([])

        if (searchValue) {
            getVideos(searchValue)
        }

    }, [searchValue])


    /**
     * Load More
     */
    React.useEffect(() => {
        if (loadingMore) {
            getVideos(searchValue, true)
        }
    }, [loadingMore])


    /**
     * clear
     */
    const clear = () => {
        setSearchValue('')
        setVideos([])
        setNextPage('')
    }


    /**
     * Get videos
     */
    const getVideos = async (search: string, isLoadingMore: boolean = false) => {
        try {

            const query: VideosQuery = {
                search,
                maxResults
            }

            if (isLoadingMore) {
                query.pageToken = nextPage
            }

            setLoadingVideos(true)
            const response: SearchResponse = await services.videos.getAll(query)
            setNextPage(response.nextPageToken)

            if (isLoadingMore) {
                setVideos([...videos, ...response.items])
            } else {
                setVideos(response.items)
            }
        } catch (e) {
        } finally {
            setLoadingVideos(false)
            if (isLoadingMore) {
                setLoadingMore(false)
            }
        }

    }

    /**
     * Get video
     */
    const getVideo = async (videoId: string) => {
        try {
            setLoadingVideo(true)
            const response: VideoResponse = await services.videos.get(videoId)
            setVideo(response.item)
        } catch (e) {
        } finally {
            setLoadingVideo(false)
        }
    }


    return {
        maxResults,
        videos,
        loadingVideos,
        loadingMore,
        video,
        loadingVideo,
        getVideos
    } as const
}