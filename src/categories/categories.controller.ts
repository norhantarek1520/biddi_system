import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BadRequestException, NotFoundException , HttpCode , InternalServerErrorException} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { CategoriesService } from './categories.service';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid category ID');
    }
    const findCategory = await this.categoriesService.findOne(id);
    if (!findCategory) {
      throw new NotFoundException('Category not found');
    }
    return findCategory;
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const createCategory = await this.categoriesService.create(createCategoryDto);
    if (createCategory == null) {
      throw new NotFoundException('Faild to Create the category');
    }
    return createCategory;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid category ID');
    } 
    try {
      const updatedCategory = await this.categoriesService.update(id, updateCategoryDto);
      if (!updatedCategory) {
        throw new NotFoundException('Category  not found');
      }
      return updatedCategory;
    } catch (error) {
      console.error('Error updating category:', error);
        throw new InternalServerErrorException('Failed to update category');
    }
  }
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid category ID');
    }
    const deletedCategory = await this.categoriesService.remove(id);
    if (deletedCategory) {
      return { message: 'Category deleted successfully' };
    } else {
      throw new NotFoundException('Category not found');
    }
  }

}