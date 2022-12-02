import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AnalysisModule } from './analysis.module';

async function bootstrap() {
  const app = await NestFactory.create(AnalysisModule);
  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(configService.get('PORT'));
}

bootstrap();
