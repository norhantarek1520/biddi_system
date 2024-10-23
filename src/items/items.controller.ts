import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ItemService } from './items.service';
import { CreateItemDto } from './item.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createItemDto: CreateItemDto) {
    return this.itemService.update(id, createItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.itemService.delete(id);
  }
}