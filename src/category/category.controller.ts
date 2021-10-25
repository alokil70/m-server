import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { AuthCashGuard } from '../userCash/guards/authCash.guard';
import { User } from '../user/decorators/user.decorator';
import { OrdersResponseInterface } from '../orders/types/ordersResponse.interface';
import { UserCashEntity } from '../userCash/userCash.entity';
import { CreateOrderDto } from '../orders/dto/createOrder.dto';
import { OrderResponseInterface } from '../orders/types/orderResponse.interface';
import { CategoryService } from './category.service';


@Controller('category')
export class CategoryController{
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(AuthCashGuard)
  async getAllByQueryParam(@User('id') currentUserId: number, @Query() query: any): Promise<OrdersResponseInterface> {
    return await this.categoryService.getAllByQueryParam(currentUserId, query);
  }

  @Post()
  @UseGuards(AuthCashGuard)
  async create(
    @User() currentUser: UserCashEntity,
    @Body('orders') createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseInterface> {
    const orders = await this.categoryService.create(currentUser, createOrderDto);
    return this.categoryService.buildOrdersResponse(orders);
  }}
