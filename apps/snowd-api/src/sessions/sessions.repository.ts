import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '@luni/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Session } from './schemas/session.schema';

@Injectable()
export class SessionsRepository extends AbstractRepository<Session> {
  constructor(@InjectModel(Session.name) sessionModel: Model<Session>) {
    super(sessionModel);
  }
}
