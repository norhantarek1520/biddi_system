import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  itemTitle: string;

  @IsString()
  slug: string;

  @IsEnum(['product', 'service'])
  type: string;

  @IsOptional()
  serviceDuration: string;

  @IsOptional()
  appointmentSlots: string[];

  @IsOptional()
  brand: string;

  @IsString()
  model: string;

  @IsOptional()
  size: string;

  @IsOptional()
  weight: number;

  @IsEnum(['in stock', 'out of stock'])
  availability: string;

  @IsOptional()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  category_id: string;

  @IsString({ each: true })
  subcategories_id: string[];

  @IsString()
  vendor_id: string;

  @IsNumber()
  ratingsAverage: number;

  @IsOptional()
  cancellationPolicy: string;

  @IsOptional()
  imageCover: string;

  @IsString({ each: true })
  images: string[];

  @IsNumber()
  sold: number;

  @IsNumber()
  quantity: number;

  @IsString({ each: true })
  colors: string[];
}