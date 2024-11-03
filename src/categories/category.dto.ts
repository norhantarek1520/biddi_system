import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image_link?: string;

  slug? : string ;
}

export class UpdateCategoryDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image_link ?: string;

  slug?: string ;
}