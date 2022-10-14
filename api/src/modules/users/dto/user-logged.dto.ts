import { ApiProperty } from '@nestjs/swagger';

export class UserLoggedDto {
    @ApiProperty()
    id: number;
}
