import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ITSM-ng')
    .setDescription('The ITSM-ng API description')
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customfavIcon: '/favicon.ico',
    customCss:
      '.swagger-ui .topbar-wrapper { content:url(/logo.png); height: 3rem }',
  });

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
