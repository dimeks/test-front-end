import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './modules/users/users.module';
import { VideosModule } from './modules/videos/videos.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { JwtAuthGuard } from './modules/users/guard/jwt-auth.guard';

const configService = new ConfigService(process.env.NODE_ENV || 'production');

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ConfigModule,
    UsersModule,
    VideosModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
