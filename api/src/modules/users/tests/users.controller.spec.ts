import { userEntity } from './mock';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { ConfigService } from '../../../config/config.service';
import { mockedJwtService } from '../../../utils/mocks/jwt.service';
import { mockedConfigService } from '../../../utils/mocks/config.service';


describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: UsersService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn().mockResolvedValue({
              access_token: 'fake_token'
            }),
            getMe: jest.fn().mockResolvedValue(userEntity),
            findByIdOrNotFound: jest.fn().mockResolvedValue(userEntity),
            findByEmail: jest.fn().mockResolvedValue(userEntity),
          },
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('login()', () => {
    it('should return access_token on success login', async () => {
      const request = {
        id: 1
      };

      jest.spyOn(service, 'validateUser').mockResolvedValueOnce(request);
      const user = await controller.login({ user: request });

      expect(user).toMatchObject({
        access_token: 'fake_token',
      });
    });
  });


  describe('getMe()', () => {
    it('should return user data when logged', async () => {
      const request = {
        user: {
          id: 1
        }
      };

      const user = await controller.getMe(request);
      expect(user).toMatchObject(userEntity);
    });

  });

});
