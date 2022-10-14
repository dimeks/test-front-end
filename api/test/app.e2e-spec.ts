import { Test, TestingModule } from '@nestjs/testing';
import { Body, INestApplication } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { AppModule } from './../src/app.module';
import { HttpExceptionFilter } from './../src/exceptions/http-exception.filter';
import { ValidationExceptionFilter } from './../src/exceptions/validation-exception.filter';
import { ValidationPipe } from './../src/pipes/validation.pipe';
import { ConfigService } from './../src/config/config.service';

const user = {
  id: 1,
  displayName: 'Augusto Oliveira',
  avatar: '	https://media-exp1.licdn.com/dms/image/C4D03AQEZtX…eta&t=1kCZRFKzBAaGZ6CXWAWJGAY91tD8ZJTOgR23AIRKJYY',
  email: 'teste@icasei.com.br',
  password: 'mecontrata',
}

const unauthorized = {
  "statusCode": 401,
  "path": "/users/login",
  "errors": [
    {
      "field": "server",
      "errors": [
        "Unauthorized"
      ]
    }
  ]
}

const invalidEmail = {
  "statusCode": 401,
  "path": "/users/login",
  "errors": [
    {
      "field": "server",
      "errors": [
        "E-mail não cadastrado"
      ]
    }
  ]
}

const invalidPassword = {
  "statusCode": 401,
  "path": "/users/login",
  "errors": [
    {
      "field": "server",
      "errors": [
        "Dados incorretos"
      ]
    }
  ]
}



describe('AppController (e2e)', () => {
  let app: INestApplication;
  let configService: any
  let access_token: string
  // let configService: ConfigService

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Pipes
    app.useGlobalPipes(new ValidationPipe());

    // Exceptions
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalFilters(new ValidationExceptionFilter());


    configService = new ConfigService('test');

    const { secret } = configService.getJWTConfig()
    access_token = jwt.sign({ id: user.id }, secret, { expiresIn: 60 * 60 });

    await app.init();

  });

  describe('/users', () => {
    describe('login', () => {
      it('Should return unauthorized if no receive the email property', () => {
        return request(app.getHttpServer())
          .post('/users/login')
          .send({
            password: user.password
          })
          .expect(HttpStatus.UNAUTHORIZED)
          .expect((response: request.Response) => {
            expect(response.body).toMatchObject(unauthorized)
          })
      });

      it('Should return unauthorized if no receive the password property', () => {
        return request(app.getHttpServer())
          .post('/users/login')
          .send({
            email: user.email
          })
          .expect(HttpStatus.UNAUTHORIZED)
          .expect((response: request.Response) => {
            expect(response.body).toMatchObject(unauthorized)
          })
      });

      it('Should return unauthorized if no receive the password and email property', () => {
        return request(app.getHttpServer())
          .post('/users/login')
          .send({})
          .expect(HttpStatus.UNAUTHORIZED)
          .expect((response: request.Response) => {
            expect(response.body).toMatchObject(unauthorized)
          })
      });

      it('Should return unauthorized if email is invalid', () => {
        return request(app.getHttpServer())
          .post('/users/login')
          .send({
            email: 'fake',
            password: user.password
          })
          .expect(HttpStatus.UNAUTHORIZED)
          .expect((response: request.Response) => {
            expect(response.body).toMatchObject(invalidEmail)
          })
      });

      it('Should return unauthorized if password is invalid', () => {
        return request(app.getHttpServer())
          .post('/users/login')
          .send({
            email: user.email,
            password: '123'
          })
          .expect(HttpStatus.UNAUTHORIZED)
          .expect((response: request.Response) => {
            expect(response.body).toMatchObject(invalidPassword)
          })
      });

      it('Should return login successfully', () => {
        return request(app.getHttpServer())
          .post('/users/login')
          .send({
            email: user.email,
            password: user.password
          })
          .expect(HttpStatus.CREATED)
          .expect((response: request.Response) => {
            const { secret } = configService.getJWTConfig()
            const { access_token }: { access_token: string } = response.body;
            const decoded = jwt.decode(access_token, secret)

            expect(decoded).toBeTruthy();
            expect(decoded).toMatchObject({
              id: user.id
            })
          })
      });
    })
  })

  describe('/videos', () => {
    it('/videos Should return unauthorized if not logged', () => {
      return request(app.getHttpServer())
        .get('/videos')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('/videos/:id Should return unauthorized if not logged', () => {
      return request(app.getHttpServer())
        .get('/videos/C8O7jSOhCEE')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('Should return a erro if no send search query', () => {
      return request(app.getHttpServer())
        .get('/videos')
        .query({})
        .set('Authorization', `bearer ${access_token}`)
        .expect(HttpStatus.BAD_REQUEST)
    });

    it('Should return a erro if maxResults is smaller of 0', () => {
      return request(app.getHttpServer())
        .get('/videos')
        .query({
          search: 'Músicas para casamento',
          maxResults: -1
        })
        .set('Authorization', `bearer ${access_token}`)
        .expect(HttpStatus.BAD_REQUEST)
    });

    it('Should return a erro if maxResults is upper of 50', () => {
      return request(app.getHttpServer())
        .get('/videos')
        .query({
          search: 'Músicas para casamento',
          maxResults: 51
        })
        .set('Authorization', `bearer ${access_token}`)
        .expect(HttpStatus.BAD_REQUEST)
    });

    it('Should return a list of videos', () => {
      return request(app.getHttpServer())
        .get('/videos')
        .query({
          search: 'Músicas para casamento'
        })
        .set('Authorization', `bearer ${access_token}`)
        .expect(HttpStatus.OK)
    });

    it('Should return a next video in pagination', async () => {
      const resp1 = await request(app.getHttpServer())
        .get('/videos')
        .query({
          search: 'Músicas para casamento',
          maxResults: 1
        })
        .set('Authorization', `bearer ${access_token}`)
        .expect(HttpStatus.OK)

      const resp2 = await request(app.getHttpServer())
        .get('/videos')
        .query({
          pageToken: resp1.body.nextPageToken,
          maxResults: 1
        })
        .set('Authorization', `bearer ${access_token}`)
        .expect(HttpStatus.OK)

      expect(resp1.body.nextPageToken).not.toEqual(resp2.body.nextPageToken)

    });

    it('Should return a video detail', () => {
      return request(app.getHttpServer())
        .get(`/videos/C8O7jSOhCEE`)
        .set('Authorization', `bearer ${access_token}`)
        .expect(HttpStatus.OK)
        .expect((response: request.Response) => {
          const { body } = response
          expect(body).toHaveProperty('item')
        })
    });

    it('Should return video not found', () => {
      return request(app.getHttpServer())
        .get(`/videos/fake_id_error`)
        .set('Authorization', `bearer ${access_token}`)
        .expect(HttpStatus.NOT_FOUND)
    });

  })

});
