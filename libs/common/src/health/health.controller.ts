import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HealthCheck,
  MongooseHealthIndicator,
  HealthIndicatorFunction,
} from '@nestjs/terminus';

@Controller('health')
class HealthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly healthCheckService: HealthCheckService,
    private readonly mongooseHealthIndicator: MongooseHealthIndicator,
  ) {}

  // Note: this endpoint is internal to the microservice.
  @Get()
  @HealthCheck()
  check() {
    const checklist: HealthIndicatorFunction[] = [];

    // Only add the Mongoose health check if microservice requires it.
    if (this.configService.get('MONGODB_URI')) {
      checklist.push(() => this.mongooseHealthIndicator.pingCheck('mongodb'));
    }

    return this.healthCheckService.check(checklist);
  }
}

export default HealthController;
