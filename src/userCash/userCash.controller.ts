import { Body, Controller, Get, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { UserCashService } from './userCash.service';
import { LoginUserCashDto } from './dto/loginUserCash.dto';
import { CreateUserCashDto } from './dto/createUserCash.dto';
import { UserCashEntity } from './userCash.entity';
import { UserCashResponseInterface } from './types/userCashResponse.interface';
import { BackendValidationPipe } from '../shared/pipes/backendValidation.pipe';
import { Request } from 'express';
import { AuthGuard } from '../user/guards/auth.guard';
import { AuthCashGuard } from './guards/authCash.guard';

@Controller('cash')
export class UserCashController {
	constructor(private readonly userCashService: UserCashService) {}

	@Post('/login')
	@UsePipes(new BackendValidationPipe())
	async login(@Body('user') loginUserCashDto: LoginUserCashDto): Promise<UserCashResponseInterface> {
		console.log('controller loginCash', loginUserCashDto);
		const user = await this.userCashService.login(loginUserCashDto);
		return this.userCashService.buildUserResponse(user);
	}

	@Post('/reg')
	@UsePipes(new BackendValidationPipe())
	async createUser(@Body('user') createUserCashDto: CreateUserCashDto): Promise<UserCashEntity> {
		console.log('createUser', typeof createUserCashDto.password);
		return await this.userCashService.createUser(createUserCashDto);
	}

	@Get('/user')
	@UseGuards(AuthCashGuard)
	async getUser(@Req() request: Request): Promise<UserCashResponseInterface> {
		console.log('req', request.headers);
		return 'jkjkjkjk' as any;
	}
}
