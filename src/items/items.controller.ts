import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ItemService } from './items.service';
import { ItemDto } from './item.dto';
import { BadRequestException, NotFoundException , HttpCode , InternalServerErrorException} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    } 
    return this.itemService.findOne(id);
  }

  @Post()
  async create(@Body() ItemDto: ItemDto) {

    if (!isValidObjectId(ItemDto.vendor_id )) {
      throw new BadRequestException('Invalid Vendor ID');
    }  
    if (!isValidObjectId(ItemDto.category_id )) {
      throw new BadRequestException('Invalid category ID');
    } 
    if (!isValidObjectId(ItemDto.subcategories_id)) {
      throw new BadRequestException('Invalid subcategories ID');
    } 
    return this.itemService.create(ItemDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() ItemDto: ItemDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    if (!isValidObjectId(ItemDto.vendor_id )) {
      throw new BadRequestException('Invalid Vendor ID');
    }  
    if (!isValidObjectId(ItemDto.category_id )) {
      throw new BadRequestException('Invalid category ID');
    } 
    if (!isValidObjectId(ItemDto.subcategories_id)) {
      throw new BadRequestException('Invalid subcategories ID');
    } 
    
    return this.itemService.update(id, ItemDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    } 
    return this.itemService.delete(id);
  }
}