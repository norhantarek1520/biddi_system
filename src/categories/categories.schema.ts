import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })

export class Category {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  image_link: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

