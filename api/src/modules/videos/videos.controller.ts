import { Controller, Get, Query, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AxiosResponse } from 'axios'

import { ApiExceptionDto } from '../../dto/ApiException.dto';
import { VideosService } from './videos.service'
import { SearchResponseDto } from './dto/search-response.dto'
import { VideoDetailResponseDto } from './dto/video-detail-response.dto'
import { SearchQueryDto } from './dto/search-query.dto'
import { VideoQueryDto } from './dto/video-query.dto'

@ApiTags('videos')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ type: ApiExceptionDto })
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) { }

  @ApiOkResponse({ type: SearchResponseDto })
  @Get()
  async search(@Query() query: SearchQueryDto): Promise<AxiosResponse<SearchResponseDto>> {
    return this.videosService.search(query);
  }

  @ApiOkResponse({ type: SearchResponseDto })
  @Get('/:videoId')
  async video(@Param() param: VideoQueryDto): Promise<AxiosResponse<VideoDetailResponseDto>> {
    return this.videosService.video(param.videoId);
  }

}
