import { ApiProperty } from '@nestjs/swagger';
import { Min, Max, ValidateIf, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchQueryDto {

    @ApiProperty({
        example: "Músicas para casamento",
        description: 'Campo para pesquisar vídeos'
    })
    @IsString()
    @IsNotEmpty({
        message: 'Não é possível realizar a busca sem o termo de pesquisa.'
    })
    @ValidateIf((object) => object.pageToken === undefined)
    search: string

    @ApiProperty({
        description: 'Pesquisar vídeos relacionados. Envie o id do vídeo fornecido em: response.items[].videoId'
    })
    @IsString()
    @IsOptional()
    relatedToVideoId?: string

    @ApiProperty({
        example: 30,
        description: 'Defina a quantidade de vídeos retornados. Valor permitido entre 0 e 50'
    })
    @Min(0)
    @Max(50)
    @Transform(({ value }) => Number(value))
    @IsOptional()
    maxResults?: number

    @ApiProperty({
        description: 'Paginar resultados. Envie o nextPageToken/prevPageToken fornecido em: response[nextPageToken/prevPageToken]'
    })
    @IsOptional()
    pageToken?: string
}