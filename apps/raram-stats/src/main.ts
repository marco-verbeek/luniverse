import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { RmqService, STATS_QUEUE } from '@luni/common';

import { StatsModule } from './stats.module';

async function bootstrap() {
  const app = await NestFactory.create(StatsModule);

  const configService = app.get<ConfigService>(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice<RmqOptions>(rmqService.getOptions(STATS_QUEUE, true));
  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}

bootstrap();
