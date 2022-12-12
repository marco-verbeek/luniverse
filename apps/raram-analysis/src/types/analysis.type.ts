import { Analysis } from '../schemas/analysis.schema';

export type AnalysisDTO = Omit<Analysis, '_id'>;
