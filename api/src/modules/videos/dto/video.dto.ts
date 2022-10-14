export class VideoDto {
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