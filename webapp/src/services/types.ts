export type Login = {
    email: string
    password: string
}

export type User = {
    displayName: string;
    avatar: string;
    email: string
}

export type VideosQuery = {
    search: string
    pageToken?: string
    maxResults?: number
}

export type Video = {
    kind: string
    etag: string
    id: {
        kind: string,
        videoId: string
    }
    snippet: {
        publishedAt: Date
        channelId: string
        title: string
        description: string
        thumbnails: {
            default: {
                url: string
                width: number
                height: number
            },
            medium: {
                url: string
                width: number
                height: number
            },
            high: {
                url: string
                width: number
                height: number
            },
            standard?: {
                url: string
                width: number
                height: number
            },
            maxres?: {
                url: string
                width: number
                height: number
            }
        }
        tags: string[]
        categoryId: number
        channelTitle: string
        liveBroadcastContent: string
        publishTime: Date
        localized?: {
            title: string
            description: string
        }
    }
    statistics: {
        viewCount: number
        likeCount: number
        favoriteCount: number
        commentCount: number
    }
}


export type SearchResponse = {
    kind: string
    etag: string
    nextPageToken: string
    regionCode: string
    pageInfo: {
        totalResults: number
        resultsPerPage: number
    }
    items: Video[]
}

export type VideoResponse = {
    kind: string
    etag: string
    nextPageToken: string
    regionCode: string
    pageInfo: {
        totalResults: number
        resultsPerPage: number
    }
    item: Video
}