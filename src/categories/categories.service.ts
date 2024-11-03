import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model ,Types} from 'mongoose';
import { Category, CategoryDocument } from './categories.schema';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import slugify from 'slugify';
@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) {}


  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }
  async findOne(id: string): Promise<Category | null> {
    return await this.categoryModel.findById(id).exec();
  }
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    category.title = createCategoryDto.title;   
    category.description = createCategoryDto.description;
    category.image_link   = createCategoryDto.image_link;
    if (!category.slug) {
      category.slug = slugify(createCategoryDto.title, { lower: true });
    }  
    const createdCategory = new this.categoryModel(category);
    return await createdCategory.save();
  }
  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
    updateCategoryDto.slug = slugify(updateCategoryDto.title, { lower: true });
    const objectId = new Types.ObjectId(id);
    return await this.categoryModel.findByIdAndUpdate(objectId, updateCategoryDto, { new: true }).exec();
  }
  async remove(id: string): Promise<Category | null> {
    return await this.categoryModel.findByIdAndDelete(id).exec();
  }
}