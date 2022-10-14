import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [VideosController],
  providers: [VideosService],
  exports: [VideosService],

})
export class VideosModule { }
