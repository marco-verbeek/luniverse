import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '@luni/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Analysis } from './schemas/analysis.schema';

@Injectable()
export class AnalysisRepository extends AbstractRepository<Analysis> {
  constructor(@InjectModel(Analysis.name) analysisModel: Model<Analysis>) {
    super(analysisModel);
  }
}
