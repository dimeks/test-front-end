import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';
import { ConfigService } from '../../../config/config.service';
import { mockedJwtService } from '../../../utils/mocks/jwt.service';
import { mockedConfigService } from '../../../utils/mocks/config.service';
import { userEntities, userEntity, userRepository } from './mock'

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        userRepository
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('validateUser() - Find user before login', () => {
    it('should return a valid user', async () => {

      const user = {
        ...userEntity,
        password: await bcrypt.hash(userEntity.password, 10) as string,
      };

      jest.spyOn(service, 'findByEmail').mockResolvedValueOnce(user);
      const response = await service.validateUser(userEntity.email, userEntity.password);

      expect(response).toMatchObject({
        id: user.id
      });
    });

    it('should return throw if email is invalid', async () => {
      jest.spyOn(service, 'findByEmail').mockResolvedValueOnce(null);
      try {
        await service.validateUser('emailnotfound@gmail.com', '132');
      } catch (e) {
        expect(e).toEqual('E-mail não cadastrado');
      }
    });

    it('should return throw if password is invalid', async () => {

      jest.spyOn(service, 'findByEmail').mockResolvedValueOnce({
        ...userEntity,
        password: await bcrypt.hash(userEntity.password, 10),
      });

      try {
        await service.validateUser(userEntity.email, 'invalid_password');
      } catch (e) {
        expect(e).toEqual('Dados incorretos');
      }
    });
  });

  describe('login()', () => {
    it('should return access_token on success login', async () => {
      const userData = {
        id: 1
      };

      const user = await service.login(userData);
      expect(user).toMatchObject({
        access_token: 'fake_token',
      });
    });
  });

  it('should return user HttpStatus.NOT_FOUND if user not found', async () => {
    jest.spyOn(service, 'findByIdOrNotFound').mockResolvedValueOnce(null);

    try {
      await service.findByIdOrNotFound(1);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toEqual(HttpStatus.NOT_FOUND);
    }
  });
});
