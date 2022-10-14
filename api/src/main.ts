import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { ValidationExceptionFilter } from './exceptions/validation-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Pipes
  app.useGlobalPipes(new ValidationPipe());

  // Exceptions
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ValidationExceptionFilter());

  // Swagger
  const swaggerDocument = new DocumentBuilder()
    .setTitle('iCasei')
    .setDescription('iCasei API')
    .setVersion('1.0')
    // .addTag('iCasei')
    .addBearerAuth()
    .build()

  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(
      app,
      swaggerDocument,
      swaggerDocumentOptions
    ),
  );

  // Exec
  await app.listen(Number(process.env.PORT) || 3000);
}
bootstrap();
