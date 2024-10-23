import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './carts.schema';
import { Item, ItemDocument } from '../items/items.schema'; // Assuming Items are stored in a separate entity
import { User, UserDocument } from 'src/users/users.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,

  ) { }

  async addToCart(userId: string, itemId: string, quantity: number, color: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ user: userId });

    if (!cart) { // Create new cart if it doesn't exist
      const item = await this.itemModel.findById(itemId);
      if (!item) {
        throw new Error('Item not found');
      }

      const newCart = new this.cartModel({
        user: userId,
        cartItems: [
          {
            item_id: item._id,
            item_name: item.itemTitle, // Assuming you have an itemTitle property
            quantity,
            color,
            price: item.price,
          },
        ],
        totalCartPrice: item.price,
      });
      return newCart.save();
    }

    const itemIndex = cart.cartItems.findIndex(
      (cartItem) => cartItem.item_id.toString() === itemId && cartItem.color === color
    );

    if (itemIndex > -1) { // Update existing item quantity if found
      cart.cartItems[itemIndex].quantity += quantity;
    } else { // Add new item to cart items
      const item = await this.itemModel.findById(itemId);
      if (!item) {
        throw new Error('Item not found');
      }
      cart.cartItems.push({
        item_id: item.id,
        item_name: item.itemTitle,
        quantity,
        color,
        price: item.price,
      });
    }

    this.calculateTotalPrice(cart);
    return cart.save();
  }
  async removeSpecificCartItem(userId: string, itemId: string): Promise<Cart | null> {
    return this.cartModel.findOneAndUpdate(
      { user: userId, 'cartItems.item': itemId },
      { $pull: { cartItems: { item: itemId } } },
      { new: true },
    ).then((cart) => {
      if (cart) {
        this.calculateTotalPrice(cart);
        return cart.save();
      }
      return null;
    });
  }
  async getCart(userId: string): Promise<Cart | null> {
    return this.cartModel.findOne({ user: userId });
  }
  async clearCart(userId: string): Promise<Cart | null> {
    return this.cartModel.findOneAndDelete({ user: userId });
  }
  private calculateTotalPrice(cart: Cart) {
    cart.totalCartPrice = cart.cartItems.reduce((acc, cartItem) =>
      acc + cartItem.quantity * cartItem.price, 0);
  }
}