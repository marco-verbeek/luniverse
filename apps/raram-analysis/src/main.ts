import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { AnalysisModule } from './analysis.module';

async function bootstrap() {
  const app = await NestFactory.create(AnalysisModule, {
    bufferLogs: true,
    cors: true,
  });

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('PORT'));
}

bootstrap();
