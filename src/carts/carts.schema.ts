import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId ,Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }], required: true })
  cartItems: {
    item_id: Types.ObjectId;
    item_name: string;
    quantity: number;
    color: string;
    price: number;
  }[];

  @Prop({ type: Number, required: true, default: 0 })
  totalCartPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);