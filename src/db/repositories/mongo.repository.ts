import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  ApplyBasicCreateCasting,
  DeepPartial,
  QueryFilter,
  Require_id,
  PaginateOptions,
  PaginateModel,
} from 'mongoose';
import { Types, UpdateQuery, DeleteResult } from 'mongoose';

type CreateInput<T> = DeepPartial<ApplyBasicCreateCasting<Require_id<T>>>;
export abstract class MongoRepository<TDocument> {
  protected constructor(protected readonly model: PaginateModel<TDocument>) {}

  protected validateId(id: string) {
    if (!id || !Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
  }

  create(data: CreateInput<TDocument>) {
    return this.model.create(data);
  }

  findUnique(filter: QueryFilter<TDocument>) {
    return this.model.findOne(filter);
  }

  findById(id: string) {
    this.validateId(id);
    return this.model.findById(id).exec();
  }

  findByIdOrThrow(id: string) {
    this.validateId(id);
    return this.model
      .findById(id)
      .orFail(new NotFoundException(`${this.model.modelName} not found`))
      .exec();
  }

  findByIdWithRelationships(id: string, relationships: string[]) {
    this.validateId(id);
    return this.model
      .findById(id)
      .populate(relationships)
      .orFail(new NotFoundException(`${this.model.modelName} not found`))
      .exec();
  }

  list(filter?: QueryFilter<TDocument>, options?: PaginateOptions) {
    return this.model.paginate(this.model.find(filter), options);
  }

  count(filter: QueryFilter<TDocument>) {
    return this.model.countDocuments(filter).exec();
  }

  update(id: string, data: UpdateQuery<TDocument>) {
    this.validateId(id);
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  updateMany(filter: QueryFilter<TDocument>, update: UpdateQuery<TDocument>) {
    return this.model.updateMany(filter, update);
  }

  softDelete(id: string) {
    this.validateId(id);
    return this.model
      .findByIdAndUpdate(id, {
        deletedAt: new Date(),
      })
      .exec();
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }

  deleteMany(filter: QueryFilter<TDocument>): Promise<DeleteResult> {
    return this.model.deleteMany(filter);
  }
}
