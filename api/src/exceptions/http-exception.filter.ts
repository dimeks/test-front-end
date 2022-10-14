import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const rs: any = exception.getResponse();
    let responseErrors = [];

    if (rs.errors && Object.getPrototypeOf(rs.errors) === Object.prototype) {
      for (const error of Object.keys(rs.errors)) {
        responseErrors.push({
          field: error,
          errors: rs.errors[error],
        });
      }
    } else if (rs.errors && Array.isArray(rs.errors)) {
      responseErrors.push({
        field: 'server',
        errors: rs,
      });
    } else if (typeof rs === 'string' || rs instanceof String) {
      responseErrors.push({
        field: 'server',
        errors: [rs],
      });
    } else if (rs.error && (typeof rs.error === 'string' || rs.error instanceof String)) {
      const e = rs.error || '';
      responseErrors.push({
        field: 'server',
        errors: [e],
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
          responseErrors.push({
            field: 'server',
            errors: ['Erro interno'],
          });
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
