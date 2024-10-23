import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
export class CreateSubcategoryDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image_link: string;

  @ApiProperty()
  // categoryId: Types.ObjectId;
  categoryId: string;

  slug : string ;
}

export class UpdateSubcategoryDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image_link: string;

  @ApiProperty()
  categoryId: Types.ObjectId;

  slug : string ;
}