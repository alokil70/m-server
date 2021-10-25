import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './orders.entity';
import { UserCashEntity } from '../userCash/userCash.entity';
import { ProductsEntity } from '../products/products.entity';

@Module({
	imports: [TypeOrmModule.forFeature([OrdersEntity, UserCashEntity, ProductsEntity])],
	controllers: [OrdersController],
	providers: [OrdersService],
})
export class OrdersModule {}
