import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item {
    @Prop({ required: true, unique: true })
    itemTitle: string;
    
    @Prop({ required: true, unique: true })
    slug: string;
    
    @Prop({ required: false, type: String })
    cancellationPolicy: string;
    
    @Prop({ required: false })
    imageCover: string;
    
    @Prop({ required: false, type: [String] })
    images: string[];
    
    @Prop({ required: true, enum: ['in stock', 'out of stock'] })
    availability: string;
    
    @Prop({ required: false })
    description: string;
    
    @Prop({ required: true, type: Number, default: 0 })
    sold: number;
    
    @Prop({ required: true, type: Number, default: 0 })
    price: number;
    
    @Prop({ required: true, type: String })
    category_id: string;
    
    @Prop({ required: true, type: [String] })
    subcategories_id: string[];
    
    @Prop({ required: true, type: String })
    vendor_id: string;
    
    @Prop({ required: false, type: Number, default: 0 })
    ratingsAverage: number;
    
    @Prop({ required: true, enum: ['product', 'service'] })
    type: string;


    // Only for service type
    @Prop({ required: false, type: String, default: null })
    serviceDuration: string;
    
    @Prop({ required: false, type: Array, default: [] })
    appointmentSlots: string[];

    //// Only for product type
    @Prop({ required: false, type: String, default: null })
    brand: string;
    
    @Prop({ required: false, type: String, default: null })
    model: string;
    
    @Prop({ required: false, type: String, default: null })
    size: string;
    
    @Prop({ required: false, type: Number, default: 0 })
    weight: number;
    
    @Prop({ required: false, type: Number, default: 0 })
    quantity: number;
    
    @Prop({ required: false, type: [String], default: [] })
    colors: string[];

}

export const ItemSchema = SchemaFactory.createForClass(Item);