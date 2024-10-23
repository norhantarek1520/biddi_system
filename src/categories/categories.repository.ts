import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './categories.schema';

@Injectable()
export class CategoriesRepository {
  
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category | null> {
    return await this.categoryModel.findById(id).exec();
  }

  async create(category: Category): Promise<Category> {
    return await this.categoryModel.create(category);
  }

  async update(id: string, category: Category): Promise<Category | null> {
    return await this.categoryModel.findByIdAndUpdate(id, category, { new: true }).exec();
  }

  async remove(id: string): Promise<Category | null> {
    return await this.categoryModel.findByIdAndDelete(id).exec();
  }
}