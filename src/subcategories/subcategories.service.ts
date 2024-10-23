import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';   

import { Subcategory, SubcategoryDocument } from './subcategories.schema';
// import { Category, CategoryDocument } from '../categories/categories.schema';
import { CreateSubcategoryDto, UpdateSubcategoryDto } from './subcategory.dto';
import slugify from 'slugify';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectModel(Subcategory.name) private readonly subcategoryModel: Model<SubcategoryDocument>,   

    //  private readonly categoryModel: Model<CategoryDocument>
  ) {}
  async findAll(): Promise<Subcategory[]> {
    return await this.subcategoryModel.find().exec();
  }
  async findOne(id: string): Promise<Subcategory | null> {
    return await this.subcategoryModel.findById(id).exec();
  }
  async create(createSubcategoryDto: CreateSubcategoryDto): Promise<Subcategory> {
   // const categoryId = new Types.ObjectId(createSubcategoryDto.categoryId);
    // // Ensure category exists
    // const category = await this.categoryModel.findById(categoryId);
    // if (!category) {
    //   throw new NotFoundException('Category not found');
    // }

    const subcategory = new Subcategory();
    subcategory.title = createSubcategoryDto.title;
    subcategory.description = createSubcategoryDto.description;
    subcategory.image_link = createSubcategoryDto.image_link;
    if (!subcategory.slug) {
      subcategory.slug = slugify(createSubcategoryDto.title, { lower: true });
    }
    subcategory.categoryId = new Types.ObjectId(createSubcategoryDto.categoryId);

    
    const createdSubcategory = new this.subcategoryModel(subcategory);
    return await createdSubcategory.save();
  }
  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto): Promise<Subcategory | null> {
    updateSubcategoryDto.slug = slugify(updateSubcategoryDto.title, { lower: true });
    updateSubcategoryDto.categoryId = new Types.ObjectId(updateSubcategoryDto.categoryId);

    return await this.subcategoryModel.findByIdAndUpdate(id, updateSubcategoryDto, { new: true }).exec();
  }
  async remove(id: string): Promise<Subcategory | null> {
    return await this.subcategoryModel.findByIdAndDelete(id).exec();
  }
}