import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders/orders.service';
import { ProductsService } from './products/products.service';
import { CategoryService } from './category/category.service';

@Controller()
export class AppController {
	constructor(
		private readonly ordersService: OrdersService,
		private readonly productsService: ProductsService,
		private readonly categoryService: CategoryService,
	) {}

	@Get('test')
	test() {
		console.log('test');
		return null;
	}

	@Get('initial-state')
	async getInitialState() {
		const orders = await this.ordersService.getAllByQueryParam(null, {});
		const products = await this.productsService.getAllByQueryParam(null, {});
		const categories = await this.categoryService.getAllByQueryParam(null, {});

		return { orders, products, categories };
	}
}
