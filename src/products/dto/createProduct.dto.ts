import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
	@IsNotEmpty()
	readonly name: string;
	readonly title?: string;
	readonly creator?: string;
	@IsNotEmpty()
	readonly description: string;
	@IsNotEmpty()
	readonly price: number;
	readonly total?: number;
	readonly opened?: boolean;
	readonly payed?: boolean;
	readonly image?: string;
	@IsNotEmpty()
	readonly guid: string;
}
