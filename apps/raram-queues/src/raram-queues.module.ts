import { Module } from '@nestjs/common';
import { RaramQueuesController } from './raram-queues.controller';
import { RaramQueuesService } from './raram-queues.service';

@Module({
  imports: [],
  controllers: [RaramQueuesController],
  providers: [RaramQueuesService],
})
export class RaramQueuesModule {}
