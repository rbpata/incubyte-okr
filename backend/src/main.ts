import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('OKR Management API')
    .setDescription(
      'Comprehensive API documentation for the OKR (Objectives and Key Results) management system. ' +
      'This API allows you to create, read, update, and delete objectives and their associated key results, ' +
      'as well as track progress and status.'
    )
    .setVersion('1.0')
    .addTag('Objectives', 'Endpoints for managing objectives')
    .addTag('Key Results', 'Endpoints for managing key results within objectives')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'OKR API Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
  });




  await app.listen(process.env.PORT ?? 3000);



}
bootstrap();
