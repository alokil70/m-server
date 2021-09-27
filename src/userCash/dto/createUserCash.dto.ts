import { IsNotEmpty } from 'class-validator';

export class CreateUserCashDto {
	@IsNotEmpty()
	readonly code: number;

	@IsNotEmpty()
	readonly password: string;
}
