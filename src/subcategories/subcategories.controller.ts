import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BadRequestException, NotFoundException , HttpCode} from '@nestjs/common';
import { isValidObjectId  } from 'mongoose';
import { CreateSubcategoryDto, UpdateSubcategoryDto } from './subcategory.dto';
import { SubcategoriesService } from './subcategories.service';

@Controller('sub_category')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) { }

  @Get()
  async findAll() {
    return await this.subcategoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid subcategory  ID');
    }
    const findSubcategory = await this.subcategoriesService.findOne(id);
    if (!findSubcategory) {
      throw new NotFoundException('subcategory  not found');
    }
    return findSubcategory;
  }

  @Post()
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
   
    if (!isValidObjectId(createSubcategoryDto.categoryId)) {
      throw new BadRequestException('Invalid Category  ID');
    }
    const createSubcategory = await this.subcategoriesService.create(createSubcategoryDto);
    return createSubcategory;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid subcategory  ID');
    }
    if (!isValidObjectId(updateSubcategoryDto.categoryId)) {
      throw new BadRequestException('Invalid Category  ID');
    }
    const updatedSubcategory = await this.subcategoriesService.update(id, updateSubcategoryDto);
    if (!updatedSubcategory) {
      throw new NotFoundException('subcategory   not found');
    }
    return updatedSubcategory;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid category ID');
    }
    const deletedSubcategory = await this.subcategoriesService.remove(id);
    if (deletedSubcategory) {
      return { message: 'Category deleted successfully' };
    } else {
      throw new NotFoundException('Category not found');
    }
  }

}