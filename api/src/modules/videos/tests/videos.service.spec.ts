import { Response } from 'express';
import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from '../videos.service';
import { ConfigService } from '../../../config/config.service';
import { mockedConfigService } from '../../../utils/mocks/config.service';
import { HttpService } from '@nestjs/axios'
import { videoDetailEntity } from './mock'
import * as qs from 'qs'

describe('VideosService', () => {
  let service: VideosService;
  const youtubeBaseUrl = 'https://www.googleapis.com/youtube/v3/search'
  const youtubeVideoBaseUrl = 'https://www.googleapis.com/youtube/v3/videos'
  const configService = new ConfigService('test');


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              get: jest.fn((e) => {
                return Promise.resolve({
                  data: videoDetailEntity
                })
              })
            }
          },
        },
      ],
    }).compile();



    service = module.get<VideosService>(VideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('video', () => {
    it('should return video with item detail', async () => {
      const response = await service.video('videoId')
      expect(response).toHaveProperty('item')
    })
  })


  describe('getYoutubeSearchEndpoint', () => {
    it('should return youtube url', async () => {
      const query = {
        search: 'test'
      }
      const queryString = await service.getYoutubeSearchEndpoint(query)
      expect(queryString).toEqual(expect.stringContaining(youtubeBaseUrl));
    })

    it('should return youtube url with query params', async () => {
      const query = {
        search: 'test'
      }

      const expected = {
        key: configService.getYoutubeConfig().key,
        part: 'snippet',
        q: query.search,
        maxResults: "30"
      }

      const queryString = await service.getYoutubeSearchEndpoint(query)
      const response = qs.parse(queryString.split(youtubeBaseUrl)[1], { ignoreQueryPrefix: true })

      expect(response).toEqual(expect.objectContaining(expected));
    });

    it('should contain maxResults default on query string', async () => {
      const query = {
        search: 'test'
      }

      const expected = {
        maxResults: "30"
      }

      const queryString = await service.getYoutubeSearchEndpoint(query)
      const response = qs.parse(queryString.split(youtubeBaseUrl)[1], { ignoreQueryPrefix: true })

      expect(response).toEqual(expect.objectContaining(expected));
    });

    it('should add pageToken to query string', async () => {
      const query = {
        search: 'test',
        pageToken: 'videoId'
      }

      const expected = {
        pageToken: 'videoId'
      }

      let queryString = await service.getYoutubeSearchEndpoint(query)
      let response = qs.parse(queryString.split(youtubeBaseUrl)[1], { ignoreQueryPrefix: true })
      expect(response).toEqual(expect.objectContaining(expected));

      delete query.pageToken

      queryString = await service.getYoutubeSearchEndpoint(query)
      response = qs.parse(queryString.split(youtubeBaseUrl)[1], { ignoreQueryPrefix: true })
      expect(response).toEqual(expect.not.objectContaining(expected));

    });

    it('should add relatedToVideoId to query string', async () => {
      const query = {
        search: 'test',
        relatedToVideoId: 'videoId'
      }

      const expected = {
        relatedToVideoId: 'videoId'
      }

      let queryString = await service.getYoutubeSearchEndpoint(query)
      let response = qs.parse(queryString.split(youtubeBaseUrl)[1], { ignoreQueryPrefix: true })
      expect(response).toEqual(expect.objectContaining(expected));

      delete query.relatedToVideoId
      queryString = await service.getYoutubeSearchEndpoint(query)
      response = qs.parse(queryString.split(youtubeBaseUrl)[1], { ignoreQueryPrefix: true })
      expect(response).toEqual(expect.not.objectContaining(expected));

    });

  });


  describe('getYoutubeVideoEndpoint', () => {
    it('should return url of the video with query params', async () => {
      const videoId = 'test'

      const expected = {
        id: videoId,
        key: configService.getYoutubeConfig().key,
        part: 'snippet,statistics',
      }

      const queryString = await service.getYoutubeVideoEndpoint(videoId)
      const response = qs.parse(queryString.split(youtubeVideoBaseUrl)[1], { ignoreQueryPrefix: true })

      expect(response).toEqual(expect.objectContaining(expected));
    });

  });


});
