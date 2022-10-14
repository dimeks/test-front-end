import { ApiProperty } from '@nestjs/swagger';

export class ApiExceptionDtoError {
  @ApiProperty()
  field: string;

  @ApiProperty()
  errors: string[];
}

export class ApiExceptionDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  path: string;

  errors: ApiExceptionDtoError[];
}
