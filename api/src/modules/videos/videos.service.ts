import { SearchResponseDto } from './dto/search-response.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { SearchQueryDto } from './dto/search-query.dto'
import { VideoDetailResponseDto } from './dto/video-detail-response.dto'
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import * as qs from 'qs'

type YoutubeQuery = Partial<SearchQueryDto> & {
  key: string,
  q: string,
  part: string
  type?: string
}

type YoutubeVideoQuery = {
  key: string,
  part: string
  id: string,
}

@Injectable()
export class VideosService {

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) { }

  async search(query: SearchQueryDto): Promise<AxiosResponse<SearchResponseDto>> {
    const url = this.getYoutubeSearchEndpoint(query)
    try {
      const response = await this.httpService.axiosRef.get(url);
      return response.data
    } catch (e) {
      throw e.response.data
    }
  }

  async video(videoId: string): Promise<AxiosResponse<VideoDetailResponseDto>> {
    const url = this.getYoutubeVideoEndpoint(videoId)
    try {
      const response = await this.httpService.axiosRef.get(url);
      const { data } = response

      if (!data.items || data.items.length == 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Vídeo ${videoId} não encontrado`,
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        data.item = data.items.length > 0 ? data.items[0] : null
        delete data.items
        return data
      }

    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Vídeo ${videoId} não encontrado`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  getYoutubeSearchEndpoint(query: SearchQueryDto): string {
    const youtubeQuery: YoutubeQuery = {
      key: this.configService.getYoutubeConfig().key,
      part: 'snippet',
      q: query.search,
      maxResults: query.maxResults !== undefined ? query.maxResults : 30
    }

    if (query.relatedToVideoId) {
      youtubeQuery.relatedToVideoId = query.relatedToVideoId
      youtubeQuery.type = 'video'
    }

    if (query.pageToken) {
      youtubeQuery.pageToken = query.pageToken
    }

    const queryString = qs.stringify(youtubeQuery, { addQueryPrefix: true })
    return `https://www.googleapis.com/youtube/v3/search${queryString}`
  }

  getYoutubeVideoEndpoint(videoId: string): string {
    const youtubeQuery: YoutubeVideoQuery = {
      key: this.configService.getYoutubeConfig().key,
      part: 'snippet,statistics',
      id: videoId
    }
    const queryString = qs.stringify(youtubeQuery, { addQueryPrefix: true })
    return `https://www.googleapis.com/youtube/v3/videos${queryString}`
  }

}