import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
	@IsNotEmpty()
	readonly title: string;
	readonly creator?: string;
	readonly description?: string;
	@IsNotEmpty()
	readonly products: string[];
	readonly total: number;
	@IsNotEmpty()
	readonly opened: boolean;
	readonly payed: boolean;
	readonly commonShift: number;
	@IsNotEmpty()
	readonly guid: string;
}
