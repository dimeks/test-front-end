import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VideoQueryDto {

    @ApiProperty({
        example: "C8O7jSOhCEE",
        description: 'Id do vídeo'
    })
    @IsString()
    @IsNotEmpty({
        message: 'O id do vídeo é obrigatório'
    })
    videoId: string

}