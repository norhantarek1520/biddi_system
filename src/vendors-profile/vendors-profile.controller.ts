import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BadRequestException, NotFoundException , HttpCode} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { VendorProfileService } from './vendors-profile.service';
import { CreateVendorProfileDto, UpdateVendorProfileDto } from './vendor-profile.dto';

@Controller('vendor-profile')
export class VendorProfileController {
  constructor(private readonly vendorProfileService: VendorProfileService) {}

  @Get()
  async findAll() {
    return await this.vendorProfileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    const result =await this.vendorProfileService.findOne(id);
    if (!result) {
      throw new NotFoundException('vendor not found');
    }
    return result;
     
  }

  @Post()
  async create(@Body() createVendorProfileDto: CreateVendorProfileDto) {
    return await this.vendorProfileService.create(createVendorProfileDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateVendorProfileDto: UpdateVendorProfileDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    return await this.vendorProfileService.update(id, updateVendorProfileDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid  ID');
    }
    const deletedVendor = await this.vendorProfileService.remove(id);
    if (deletedVendor) {
      return { message: 'vendor deleted successfully' };
    } else {
      throw new NotFoundException('vendor not found');
    }
  }

}