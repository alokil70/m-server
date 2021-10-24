import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './orders.entity';

@Module({
	imports: [TypeOrmModule.forFeature([OrdersEntity])],
	controllers: [OrdersController],
	providers: [OrdersService],
})
export class OrdersModule {}
