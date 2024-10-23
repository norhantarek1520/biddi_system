import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VendorProfileDocument = VendorProfile & Document;

@Schema({ timestamps: true })
export class VendorProfile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop()
  profileImgLink: string;

  @Prop()
  storeHours: string;

  @Prop()
  policies: string;

  @Prop()
  contact: string;

  @Prop([{ type: Types.ObjectId, ref: 'Review' }])
  reviews: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  @Prop()
  cuisine: string;

  @Prop()
  specialties: string[];

  @Prop()
  deliveryRadius: number;

  @Prop()
  minimumOrderValue: number;

  @Prop()
  deliveryFees: number;

  @Prop()
  bio: string;

  @Prop({ required: true, enum: ['Wholesalers', 'Businesses', 'Individuals', 'agency'] })
  type: string;

  @Prop({ default: 0 })
  ratingsAverage: number;

  @Prop({type : Object , required : false})
  locations: {  
    alias: string,
    details: string,
    city: string,
    postalCode:string
}
}

export const VendorProfileSchema = SchemaFactory.createForClass(VendorProfile);