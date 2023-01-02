import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { QueuesModule } from './queues.module';

async function bootstrap() {
  const app = await NestFactory.create(QueuesModule);

  const configService = await app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}

bootstrap();
