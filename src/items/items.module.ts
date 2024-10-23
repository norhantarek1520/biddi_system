import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemController } from './items.controller';
import { Item, ItemSchema } from './items.schema';
import { ItemService } from './items.service';
import { ItemRepository } from './items.repository';
import { Category, CategorySchema } from 'src/categories/categories.schema';
import { Subcategory, SubcategorySchema } from 'src/subcategories/subcategories.schema';
import { VendorProfile, VendorProfileSchema } from 'src/vendors-profile/vendors-profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]) ,
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: Subcategory.name, schema: SubcategorySchema }]),
    MongooseModule.forFeature([{ name: VendorProfile.name , schema :VendorProfileSchema }])
  
  ],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemsModule {}