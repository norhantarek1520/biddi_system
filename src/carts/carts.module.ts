import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './carts.service';
import { CartController } from './carts.controller';
import { Cart, CartSchema } from './carts.schema';
import { User, UserSchema } from 'src/users/users.schema';
import { Item, ItemSchema } from 'src/items/items.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Item.name , schema :ItemSchema }])
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartsModule {}