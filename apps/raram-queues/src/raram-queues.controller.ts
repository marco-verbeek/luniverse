import { Controller, Get } from '@nestjs/common';
import { RaramQueuesService } from './raram-queues.service';

@Controller()
export class RaramQueuesController {
  constructor(private readonly raramQueuesService: RaramQueuesService) {}

  @Get()
  getHello(): string {
    return this.raramQueuesService.getHello();
  }
}
