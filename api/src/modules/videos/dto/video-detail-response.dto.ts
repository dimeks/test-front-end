import { VideoDto } from './video.dto'

export class VideoDetailResponseDto {
    kind: string
    etag: string
    item: VideoDto
}