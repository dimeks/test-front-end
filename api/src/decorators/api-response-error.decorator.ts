import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiExceptionDto, ApiExceptionDtoError } from '../dto/ApiException.dto';

// TODO: Sem uso no momento, estou tentando padronizar os erros da api
export const ApiPaginatedResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiExceptionDto) },
          {
            properties: {
              evaluations: {
                type: 'array',
                // errors: { $ref: getSchemaPath(ApiExceptionDtoError) },
              },
            },
          },
        ],
      },
    }),
  );
};
