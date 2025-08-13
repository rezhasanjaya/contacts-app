import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    
    new ValidationPipe({ whitelist: true }),
  );
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const frontendUrl = configService.get<string>('FRONTEND_URL', '');

  app.enableCors({
    origin:  '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  await app.listen(3000);
}
bootstrap();