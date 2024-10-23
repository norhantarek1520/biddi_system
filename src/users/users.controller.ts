import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {  UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }
  @Put(':id')
  async updateProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

}