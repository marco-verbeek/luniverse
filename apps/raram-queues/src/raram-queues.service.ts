import { Injectable } from '@nestjs/common';

@Injectable()
export class RaramQueuesService {
  getHello(): string {
    return 'Hello World!';
  }
}
