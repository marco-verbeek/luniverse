import { NestFactory } from '@nestjs/core';
import { RaramQueuesModule } from './raram-queues.module';

async function bootstrap() {
  const app = await NestFactory.create(RaramQueuesModule);
  await app.listen(3000);
}
bootstrap();
