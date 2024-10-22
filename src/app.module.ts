import { Module  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// ======================================= My modules =======================================
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { VendorsModule } from './vendors/vendors.module';
import { VendorsProfileModule } from './vendors.profile/vendors.profile.module';
import { ItemsModule } from './items/items.module';
import { UsersModule} from './users/users.module';
import { CartsModule} from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
//========================================== Connect Database ======================================
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'; // For MongoDB

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL), // connect database 

    CategoriesModule,SubcategoriesModule,VendorsModule,
    VendorsProfileModule,ItemsModule,UsersModule,
    CartsModule,OrdersModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
