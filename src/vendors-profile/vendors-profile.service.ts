import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { VendorProfile, VendorProfileDocument } from './vendors-profile.schema';
import { CreateVendorProfileDto, UpdateVendorProfileDto } from './vendor-profile.dto';
// import { UsersService } from '../users/users.service';

@Injectable()
export class VendorProfileService {
  constructor(
    @InjectModel(VendorProfile.name) private readonly vendorProfileModel: Model<VendorProfileDocument>
  ) {}

  async findAll(): Promise<VendorProfile[]> {
    return await this.vendorProfileModel.find().populate('userId locations').exec();
  }

  async findOne(id: string): Promise<VendorProfile | null> {
    return await this.vendorProfileModel.findById(id).populate('userId locations').exec();
  }

  async create(createVendorProfileDto: CreateVendorProfileDto): Promise<VendorProfile> {
    // make sure that the user exists
    const stringId = createVendorProfileDto.userId.toString();
    // const user = await this.usersService.findOne(stringId);
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }

    const vendorProfile = new VendorProfile();
    vendorProfile.userId = createVendorProfileDto.userId;
    vendorProfile.profileImgLink = createVendorProfileDto.profileImgLink;
    vendorProfile.storeHours = createVendorProfileDto.storeHours;
    vendorProfile.policies = createVendorProfileDto.policies;
    vendorProfile.contact = createVendorProfileDto.contact;
    vendorProfile.categoryId = createVendorProfileDto.categoryId;
    vendorProfile.cuisine = createVendorProfileDto.cuisine;
    vendorProfile.specialties = createVendorProfileDto.specialties;
    vendorProfile.deliveryRadius = createVendorProfileDto.deliveryRadius;
    vendorProfile.minimumOrderValue = createVendorProfileDto.minimumOrderValue;
    vendorProfile.deliveryFees = createVendorProfileDto.deliveryFees;
    vendorProfile.bio = createVendorProfileDto.bio;
    vendorProfile.type = createVendorProfileDto.type;
    // vendorProfile.locations = createVendorProfileDto.locations;

    return await this.vendorProfileModel.create(vendorProfile);
  }

  async update(id: string, updateVendorProfileDto: UpdateVendorProfileDto): Promise<VendorProfile | null> {
    const vendorProfile = await this.vendorProfileModel.findById(id).exec();
    if (!vendorProfile) {
      throw new NotFoundException(`Vendor profile with ID "${id}" not found`);
    }
    const updatedVendorProfile = { ...vendorProfile, ...updateVendorProfileDto };
    try {
      return await this.vendorProfileModel.findByIdAndUpdate(id, updatedVendorProfile, { new: true }).exec();
    } catch (error) {
      throw new Error(`Error updating vendor profile: ${error.message}`);
    }
  }

  async remove(id: string): Promise<VendorProfile | null> {
    return await this.vendorProfileModel.findByIdAndDelete(id).exec();
  }
}