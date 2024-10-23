import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req, Res } from '@nestjs/common';
import { CartService } from './carts.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Add item to cart
  @Post()
  @ApiOperation({ summary: 'Add an item to the user\'s cart' })
  @ApiResponse({ status: 201, description: 'Cart created or item added successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  async addToCart(
    @Body() { itemId, quantity = 1, color , userId }: { itemId: string; quantity?: number; color?: string  , userId :string},
  ): Promise<any> {
    return this.cartService.addToCart(userId, itemId, quantity, color);
  }

  // Get user's cart
  @Get(':userId')
  @ApiOperation({ summary: 'Get a user\'s cart' })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  async getCart(@Param('userId') userId: string): Promise<any> {
    return this.cartService.getCart(userId);
  }

  // // Remove item from cart
  // @Delete(':userId/items/:itemId')
  // @ApiOperation({ summary: 'Remove an item from the cart' })
  // @ApiResponse({ status: 200, description: 'Cart item removed successfully' })
  // @ApiResponse({ status: 404, description: 'Cart or item not found' })
  // async removeSpecificCartItem(@Param('userId') userId: string, @Param('itemId') itemId: string): Promise<any> {
  //   return this.cartService.removeSpecificCartItem(userId, itemId);
  // }

  // Clear user's cart
  @Delete(':userId')
  @ApiOperation({ summary: 'Clear the user\'s cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared successfully' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  async clearCart(@Param('userId') userId: string): Promise<any> {
    return this.cartService.clearCart(userId);
  }
}