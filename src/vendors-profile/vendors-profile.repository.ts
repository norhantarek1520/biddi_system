import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VendorProfile, VendorProfileDocument } from './vendors-profile.schema';

@Injectable()
export class VendorProfileRepository {
  constructor(@InjectModel(VendorProfile.name) private readonly vendorProfileModel: Model<VendorProfileDocument>) {}

  async findAll(): Promise<VendorProfile[]> {
    return await this.vendorProfileModel.find().populate('userId locations').exec();
  }

  async findOne(id: string): Promise<VendorProfile | null> {
    return await this.vendorProfileModel.findById(id).populate('userId locations').exec();
  }

  async create(vendorProfile: VendorProfile): Promise<VendorProfile> {
    return await this.vendorProfileModel.create(vendorProfile);
  }

  async update(id: string, vendorProfile: VendorProfile): Promise<VendorProfile | null> {
    return await this.vendorProfileModel.findByIdAndUpdate(id, vendorProfile, { new: true }).exec();
  }

  async remove(id: string): Promise<VendorProfile | null> {
    return await this.vendorProfileModel.findByIdAndDelete(id).exec();
  }
}