import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'user', 'vendor']  , default : "user"})
  role: string;

  @Prop({ type : Object  ,required : false})
  address: {
    addr1: String,
    addr2: String,
    city: String,
    country: String,
    zip: Number,
  }

  @Prop({ default: false })
  passwordChangedAt: Date;

  @Prop()
  passwordResetCode: string;

  @Prop()
  passwordResetExpires: Date;

  @Prop({ default: false })
  passwordResetVerified: Boolean;

  @Prop({ default: true })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);