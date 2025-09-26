import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/enities/users.entity';
import { Orders } from './entities/order.entity';
import { Categories } from 'src/categories/entities/category.entity';
import { OrderDetails } from './entities/order.Details.entity';
import { Products } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Orders,
      Categories,
      OrderDetails,
      Products,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
