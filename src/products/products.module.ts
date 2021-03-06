import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoryEntity } from '../category/category.entity';
import { OrdersEntity } from '../orders/orders.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ProductsEntity, CategoryEntity, OrdersEntity])],
	controllers: [ProductsController],
	providers: [ProductsService],
	exports: [ProductsService],
})
export class ProductsModule {}
