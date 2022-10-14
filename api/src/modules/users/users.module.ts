import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

const configService = new ConfigService(process.env.NODE_ENV || 'production');


@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),

    PassportModule.register({ defaultStrategy: 'hash' }),

    JwtModule.register({
      secret: configService.getJWTConfig().secret,
      signOptions: { expiresIn: '60d' },
    }),

    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, JwtStrategy],
  exports: [UsersService, JwtModule],

})
export class UsersModule { }
