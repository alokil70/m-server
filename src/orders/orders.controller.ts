import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { User } from '../user/decorators/user.decorator';
import { AuthCashGuard } from '../userCash/guards/authCash.guard';
import { UserCashEntity } from '../userCash/userCash.entity';
import { OrdersEntity } from './orders.entity';

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	@UseGuards(AuthCashGuard)
	async create(
		@User() currentUser: UserCashEntity,
		@Body('order') createOrderDto: CreateOrderDto,
	): Promise<OrdersEntity> {
		return await this.ordersService.create(currentUser, createOrderDto);
	}

	@Get()
	@UseGuards(AuthCashGuard)
	async getAll(): Promise<OrdersEntity> {
		return await this.ordersService.getAll();
	}
}
