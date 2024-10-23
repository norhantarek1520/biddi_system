import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './items.schema';
import { Category, CategoryDocument } from 'src/categories/categories.schema';
import { Subcategory, SubcategoryDocument } from 'src/subcategories/subcategories.schema';
import { VendorProfile, VendorProfileDocument } from 'src/vendors-profile/vendors-profile.schema';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(Subcategory.name) private readonly subcategoryModel: Model<SubcategoryDocument>,
    @InjectModel(VendorProfile.name) private readonly vendorProfileModel: Model<VendorProfileDocument>,
  
  ) {}

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