import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subcategory, SubcategoryDocument } from './subcategories.schema';

@Injectable()
export class SubcategoriesRepository {
  
  constructor(@InjectModel(Subcategory.name) private readonly subcategoryModel: Model<SubcategoryDocument>) {}

  async findAll(): Promise<Subcategory[]> {
    return await this.subcategoryModel.find().exec();
  }

  async findOne(id: string): Promise<Subcategory | null> {
    return await this.subcategoryModel.findById(id).exec();
  }

  async create(Subcategory: Subcategory): Promise<Subcategory> {
    return await this.subcategoryModel.create(Subcategory);
  }

  async update(id: string, Subcategory: Subcategory): Promise<Subcategory | null> {
    return await this.subcategoryModel.findByIdAndUpdate(id, Subcategory, { new: true }).exec();
  }

  async remove(id: string): Promise<Subcategory | null> {
    return await this.subcategoryModel.findByIdAndDelete(id).exec();
  }
}