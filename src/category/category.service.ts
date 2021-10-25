import { Injectable } from '@nestjs/common';
import { UserCashEntity } from '../userCash/userCash.entity';
import { CreateOrderDto } from '../orders/dto/createOrder.dto';


@Injectable()
export class CategoryService{
  async getAllByQueryParam(currentUserId: number, query: any) {
    return undefined;
  }

  async create(currentUser: UserCashEntity, createOrderDto: CreateOrderDto) {

  }

  buildOrdersResponse(orders: void) {
    return undefined;
  }
}
