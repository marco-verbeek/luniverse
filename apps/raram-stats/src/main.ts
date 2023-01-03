import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { RmqService, STATS_QUEUE } from '@luni/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { StatsModule } from './stats.module';

async function bootstrap() {
  const app = await NestFactory.create(StatsModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get<ConfigService>(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice<RmqOptions>(rmqService.getOptions(STATS_QUEUE, true));

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}

bootstrap();
