import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const rs: any = exception.getResponse();
    let responseErrors = [];

    if (typeof rs === 'string' || rs instanceof String) {
      responseErrors.push({
        field: 'server',
        errors: [rs],
      });
    } else {
      const errors = rs.message || undefined;
      if (errors) {
        if (typeof errors === 'string' || errors instanceof String) {
          responseErrors.push({
            field: 'server',
            errors: [errors],
          });
        } else {
          responseErrors = errors.reduce((acc: any, cur: any) => {
            acc.push({
              field: cur.property,
              errors: Object.values(cur.constraints),
            });
            return acc;
          }, []);
        }
      }
    }

    response.status(status).json({
      statusCode: status,
      path: request.url,
      errors: responseErrors,
    });
  }
}
