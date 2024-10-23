import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './items.schema';

@Injectable()
export class ItemRepository {
  constructor(@InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>) {}

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<Item | null> {
    return this.itemModel.findById(id).exec();
  }

  async create(item: Item): Promise<Item> {
    return this.itemModel.create(item);
  }

  async update(id: string, item: Item): Promise<Item | null> {
    return this.itemModel.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<Item | null> {
    return this.itemModel.findByIdAndDelete(id).exec();
  }
}