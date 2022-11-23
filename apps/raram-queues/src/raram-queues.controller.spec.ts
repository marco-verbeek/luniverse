import { Test, TestingModule } from '@nestjs/testing';
import { RaramQueuesController } from './raram-queues.controller';
import { RaramQueuesService } from './raram-queues.service';

describe('RaramQueuesController', () => {
  let raramQueuesController: RaramQueuesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RaramQueuesController],
      providers: [RaramQueuesService],
    }).compile();

    raramQueuesController = app.get<RaramQueuesController>(RaramQueuesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(raramQueuesController.getHello()).toBe('Hello World!');
    });
  });
});
