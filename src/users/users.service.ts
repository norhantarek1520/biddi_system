import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findOne(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      return null;
    }

    user.name = updateUserDto.name || user.name;
    user.phone = updateUserDto.phone || user.phone;
    user.role = updateUserDto.role || user.role;

    return await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

}