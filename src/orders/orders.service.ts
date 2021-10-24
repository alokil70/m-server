import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersEntity } from './orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCashEntity } from '../userCash/userCash.entity';

@Injectable()
export class OrdersService {
	constructor(@InjectRepository(OrdersEntity) private readonly ordersRepository: Repository<OrdersEntity>) {}
	async create(currentUser: UserCashEntity, createOrderDto: CreateOrderDto): Promise<OrdersEntity> {
		const order = new OrdersEntity();
		Object.assign(order, createOrderDto);

		order.author = currentUser;
		return await this.ordersRepository.save(order);
	}

	async getAll(): Promise<OrdersEntity[]> {
		return await this.ordersRepository.find();
	}
}
