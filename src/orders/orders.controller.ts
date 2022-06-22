import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { User } from '../user/decorators/user.decorator';
import { AuthCashGuard } from '../userCash/guards/authCash.guard';
import { UserCashEntity } from '../userCash/userCash.entity';
import { OrderResponseInterface } from './types/orderResponse.interface';
import { OrdersResponseInterface } from './types/ordersResponse.interface';

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Get()
	@UseGuards(AuthCashGuard)
	async getAllByQueryParam(
		@User('id') currentUserId: number,
		@Query() query: any,
	): Promise<OrdersResponseInterface> {
		return await this.ordersService.getAllByQueryParam(currentUserId, query);
	}

	@Post()
	@UseGuards(AuthCashGuard)
	async create(
		@User() currentUser: UserCashEntity,
		@Body('orders') createOrderDto: CreateOrderDto,
	): Promise<OrderResponseInterface> {
		const orders = await this.ordersService.create(currentUser, createOrderDto);
		return this.ordersService.buildOrdersResponse(orders);
	}
}
