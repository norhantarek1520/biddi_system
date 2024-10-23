import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateVendorProfileDto {
  @ApiProperty({ required: true })
  userId: Types.ObjectId;

  @ApiProperty()
  profileImgLink: string;

  @ApiProperty()
  storeHours: string;

  @ApiProperty()
  policies: string;

  @ApiProperty()
  contact: string;

  @ApiProperty()
  categoryId: Types.ObjectId;

  @ApiProperty()
  cuisine: string;

  @ApiProperty()
  specialties: string[];

  @ApiProperty()
  deliveryRadius: number;

  @ApiProperty()
  minimumOrderValue: number;

  @ApiProperty()
  deliveryFees: number;

  @ApiProperty()
  bio: string;

  @ApiProperty({ required: true, enum: ['Wholesalers', 'Businesses', 'Individuals', 'agency'] })
  type: string;

  @ApiProperty({ required: true })
  locations:Object;
}

export class UpdateVendorProfileDto {
  @ApiProperty()
  profileImgLink: string;

  @ApiProperty()
  storeHours: string;

  @ApiProperty()
  policies: string;

  @ApiProperty()
  contact: string;

  @ApiProperty()
  categoryId: Types.ObjectId;

  @ApiProperty()
  cuisine: string;

  @ApiProperty()
  specialties: string[];

  @ApiProperty()
  deliveryRadius: number;

  @ApiProperty()
  minimumOrderValue: number;

  @ApiProperty()
  deliveryFees: number;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  locations: {
    alias: string;
    details: string;
    city: string;
    postalCode: string;
  }[];
}