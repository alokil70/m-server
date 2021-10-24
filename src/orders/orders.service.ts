import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersEntity } from './orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserCashEntity } from '../userCash/userCash.entity';
import { OrderResponseInterface } from './types/orderResponse.interface';
import { OrdersResponseInterface } from './types/ordersResponse.interface';

@Injectable()
export class OrdersService {
	constructor(@InjectRepository(OrdersEntity) private readonly ordersRepository: Repository<OrdersEntity>) {}

	async getAllByUserId(currentUserId: number, query: any): Promise<OrdersResponseInterface> {
		const queryBuilder = getRepository(OrdersEntity)
			.createQueryBuilder('orders')
			.leftJoinAndSelect('orders.author', 'author');
		const orders = await queryBuilder.getMany();
		const ordersCount = await queryBuilder.getCount();
		return { orders, ordersCount };
	}

	async create(currentUser: UserCashEntity, createOrderDto: CreateOrderDto): Promise<OrdersEntity> {
		const order = new OrdersEntity();
		Object.assign(order, createOrderDto);

		order.guid = this.getGUID();
		order.author = currentUser;
		return await this.ordersRepository.save(order);
	}

	buildOrdersResponse(orders: OrdersEntity): OrderResponseInterface {
		return { orders };
	}

	getGUID(): string {
		return ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
	}
}
