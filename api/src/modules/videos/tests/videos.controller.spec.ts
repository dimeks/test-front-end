import { Test, TestingModule } from '@nestjs/testing';
import { VideosController } from '../videos.controller';
import { VideosService } from '../videos.service';
import { ConfigService } from '../../../config/config.service';
import { mockedConfigService } from '../../../utils/mocks/config.service';
import { videoEntities, videoEntity } from './mock';


describe('VideosController', () => {
  let controller: VideosController;
  let service: VideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: VideosService,
          useValue: {
            video: jest.fn().mockResolvedValue(videoEntity),
            search: jest.fn().mockResolvedValue(videoEntities),
            getYoutubeEndoint: jest.fn().mockResolvedValue(`fake`),
          },
        }
      ],
    }).compile();

    controller = module.get<VideosController>(VideosController);
    service = module.get<VideosService>(VideosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('search()', () => {
    it('should return a array of videos', async () => {
      const user = await controller.search({
        search: 'teste',
      });
      expect(user).toMatchObject(videoEntities);
      expect(typeof user).toEqual('object');
      expect(service.search).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      jest.spyOn(service, 'search').mockRejectedValueOnce(new Error())
      expect(controller.search({
        search: 'teste',
      })).rejects.toThrowError()
    });

  });

  describe('video()', () => {
    it('should return a array of videos', async () => {
      const user = await controller.video({
        videoId: 'teste',
      });
      expect(user).toMatchObject(videoEntity);
      expect(typeof user).toEqual('object');
      expect(service.video).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      jest.spyOn(service, 'video').mockRejectedValueOnce(new Error())
      expect(controller.video({
        videoId: 'teste',
      })).rejects.toThrowError()
    });

  });

});
