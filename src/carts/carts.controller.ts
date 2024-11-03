import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req, Res } from '@nestjs/common';
import { CartService } from './carts.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post()
  async addToCart(
    @Body() { itemId, quantity = 1, color , userId }: { itemId: string; quantity?: number; color?: string  , userId :string},
  ): Promise<any> {
    return this.cartService.addToCart(userId, itemId, quantity, color);
  }

  // Get user's cart
  @Get(':userId')
  async getCart(@Param('userId') userId: string): Promise<any> {
    return this.cartService.getCart(userId);
  }
  // Clear user's cart
  @Delete(':userId')
  async clearCart(@Param('userId') userId: string): Promise<any> {
    return this.cartService.clearCart(userId);
  }
}