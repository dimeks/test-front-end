import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';


export class LoginDto {
    @ApiProperty({
        example: "teste@icasei.com.br"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "mecontrata"
    })
    @IsNotEmpty({
        message: 'Senha incorreta',
    })
    password: string;
}
