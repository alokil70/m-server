import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthCashGuard } from '../userCash/guards/authCash.guard';
import { User } from '../user/decorators/user.decorator';
import { ProductsResponseInterface } from './types/productsResponse.interface';
import { UserCashEntity } from '../userCash/userCash.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductResponseInterface } from './types/productResponse.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(AuthCashGuard)
  async getAllByQueryParam(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ProductsResponseInterface> {
    return await this.productsService.getAllByQueryParam(currentUserId, query);
  }

  @Post()
  @UseGuards(AuthCashGuard)
  async create(
    @User() currentUser: UserCashEntity,
    @Body('product') createProductDto: CreateProductDto,
  ): Promise<ProductResponseInterface> {
    const product = await this.productsService.create(currentUser, createProductDto);
    return this.productsService.buildOrdersResponse(product);
  }
}
