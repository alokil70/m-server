import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders/orders.service';

@Controller()
export class AppController {
	constructor(private readonly ordersService: OrdersService) {}

	@Get('initial-state')
	async getInitialState() {
		/*const currentPizzaProviderInformation = this.pizzasProvidersService
			.getCurrentProvider()
			.getPizzeriaInformation();*/
		console.log('initial');

		return await this.ordersService.getAllByQueryParam(null, {});
		/*pizzas: this.pizzasService.getNormalizedData(),
			pizzasCategories: this.pizzasCategoriesService.getNormalizedData(),
			users: this.usersService.getNormalizedData(),
			ingredients: this.ingredientsService.getNormalizedData(),
			pizzeria: currentPizzaProviderInformation,*/
	}
}
