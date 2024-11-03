import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports : [CategoriesService, CategoriesRepository]
})
export class CategoriesModule {}