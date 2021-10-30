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
  constructor(
    @InjectRepository(OrdersEntity) private readonly ordersRepository: Repository<OrdersEntity>,
    @InjectRepository(UserCashEntity) private readonly userRepository: Repository<UserCashEntity>,
  ) {}

  async getAllByQueryParam(currentUserId: number, query: any): Promise<OrdersResponseInterface> {
    const queryBuilder = getRepository(OrdersEntity)
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.author', 'author');

    queryBuilder.orderBy('orders.createdAt', 'DESC');

    const ordersCount = await queryBuilder.getCount();

    if (query.products) {
      queryBuilder.andWhere('orders.products LIKE :products', {
        products: `%${query.products}%`,
      });
    }

    if (query.author) {
      /*--------forFuture---------------------------------------------*/
      const author = await this.userRepository.findOne({
        id: query.author,
      });
      if (!author) return;
      /*-----------------------------------------------------*/
      if (author) {
        queryBuilder.andWhere('orders.authorId = :id', {
          id: author.id,
        });
      }
    }

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const orders = await queryBuilder.getMany();
    return { orders, ordersCount };
  }

  async create(currentUser: UserCashEntity, createOrderDto: CreateOrderDto): Promise<OrdersEntity> {
    const order = new OrdersEntity();
    Object.assign(order, createOrderDto);

    order.num = Math.floor(Math.random() * 101);
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
