import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders/orders.service';
import { ProductsService } from './products/products.service';
import { CategoryService } from './category/category.service';

@Controller()
export class AppController {
	constructor(private readonly ordersService: OrdersService, private readonly productsService: ProductsService, private readonly categoryService: CategoryService) {}

	@Get('initial-state')
	async getInitialState() {
		/*const currentPizzaProviderInformation = this.pizzasProvidersService
			.getCurrentProvider()
			.getPizzeriaInformation();*/
		const orders = await this.ordersService.getAllByQueryParam(null, {});
		const products = await this.productsService.getAllByQueryParam(null, {});
		const categories = await this.categoryService.getAllByQueryParam(null, {});

		return { orders, products, categories };
		/*pizzas: this.pizzasService.getNormalizedData(),
			pizzasCategories: this.pizzasCategoriesService.getNormalizedData(),
			users: this.usersService.getNormalizedData(),
			ingredients: this.ingredientsService.getNormalizedData(),
			pizzeria: currentPizzaProviderInformation,*/
	}
}
