import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Consistent Naming Conventions (PascalCase for classes)
import { VendorProfileController } from './vendors-profile.controller';
import { VendorProfile, VendorProfileSchema } from './vendors-profile.schema';
import { VendorProfileService } from './vendors-profile.service';
import { VendorProfileRepository } from './vendors-profile.repository';

@Module({
  imports: [
    // Clear Schema Name for MongooseModule
    MongooseModule.forFeature([{ name: VendorProfile.name, schema: VendorProfileSchema }]),
  ],
  controllers: [VendorProfileController],
  providers: [VendorProfileRepository, VendorProfileService],
  exports: [VendorProfileService], // Optional for reusability
})
export class VendorProfileModule {}