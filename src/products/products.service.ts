import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './products.entity';
import { getRepository, Repository } from 'typeorm';
import { ProductsResponseInterface } from './types/productsResponse.interface';
import { CreateProductDto } from './dto/createProduct.dto';
import { UserCashEntity } from '../userCash/userCash.entity';
import { OrdersEntity } from '../orders/orders.entity';
import { ProductResponseInterface } from './types/productResponse.interface';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductsEntity) private readonly productsRepository: Repository<ProductsEntity>) {}

  async getAllByQueryParam(currentUserId: number, query: any): Promise<ProductsResponseInterface> {
    const queryBuilder = getRepository(ProductsEntity)
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.name', 'name');

    queryBuilder.orderBy('products.createdAt', 'DESC');

    // const productsCount = await queryBuilder.getCount();

    if (query.products) {
      queryBuilder.andWhere('orders.products LIKE :products', {
        products: `%${query.products}%`,
      });
    }

    if (query.author) {
      /*--------forFuture---------------------------------------------*/
      const author = null; /*await this.userRepository.findOne({
        id: query.author,
      });*/
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

    const products = await queryBuilder.getMany();
    return { products };
  }

  async create(currentUser: UserCashEntity, createProductDto: CreateProductDto): Promise<ProductsEntity> {
    const product = new ProductsEntity();
    Object.assign(product, createProductDto);

    product.guid = this.getGUID();
    product.creator = 'currentUser.code';
    console.log('create product', product);
    return await this.productsRepository.save(product);
  }

  buildOrdersResponse(products: ProductsEntity): ProductResponseInterface {
    return { products };
  }

  private getGUID(): string {
    return ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }
}
