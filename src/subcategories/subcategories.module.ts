import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesController } from './subcategories.controller';
import { SubcategorySchema, Subcategory } from './subcategories.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SubcategoriesRepository } from './subcategories.repository';

import { CategoriesModule } from 'src/categories/categories.module';


@Module({ 
  imports: [
    MongooseModule.forFeature([{ name: Subcategory.name, schema: SubcategorySchema }]),
    CategoriesModule 
  ],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService ,SubcategoriesRepository],
})
export class SubcategoriesModule {}