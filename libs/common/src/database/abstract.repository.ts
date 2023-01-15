import {
  FilterQuery,
  Model,
  QueryOptions,
  SaveOptions,
  Types,
  UpdateQuery,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  constructor(protected readonly model: Model<TDocument>) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    return this.model.findOne(
      filterQuery,
      { _id: 0 },
      { lean: { virtuals: true, autopopulate: true } },
    );
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    upsert = false,
  ) {
    return this.model.findOneAndUpdate(filterQuery, update, {
      lean: { virtuals: true, autopopulate: true },
      upsert,
      new: true,
      fields: { _id: 0 },
    });
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: { virtuals: true, autopopulate: true },
      upsert: true,
      new: true,
      fields: { _id: 0 },
    });
  }

  async find(filterQuery: FilterQuery<TDocument>, options: QueryOptions = {}) {
    return this.model.find(filterQuery, options.fields || { _id: 0 }, {
      lean: { virtuals: true, autopopulate: true },
      ...options,
    });
  }
}
