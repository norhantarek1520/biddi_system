import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type SubcategoryDocument = Subcategory & Document;

@Schema({ timestamps: true })

export class Subcategory {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  image_link: string;

  // Reference to the parent category ID
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);

