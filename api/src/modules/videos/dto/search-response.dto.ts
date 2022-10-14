import { VideoDto } from './video.dto'

export class SearchResponseDto {
    kind: string
    etag: string
    nextPageToken: string
    regionCode: string
    pageInfo: {
        totalResults: number
        resultsPerPage: number
    }
    items: VideoDto[]
}