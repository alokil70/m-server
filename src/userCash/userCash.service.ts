import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCashEntity } from './userCash.entity';
import { Repository } from 'typeorm';
import { LoginUserCashDto } from './dto/loginUserCash.dto';
import { compare } from 'bcryptjs';
import { CreateUserCashDto } from './dto/createUserCash.dto';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { UserCashResponseInterface } from './types/userCashResponse.interface';

@Injectable()
export class UserCashService {
	constructor(@InjectRepository(UserCashEntity) private readonly userCashRepository: Repository<UserCashEntity>) {}

	async createUser(createUserCashDto: CreateUserCashDto): Promise<UserCashEntity> {
		const errorResponse = {
			errors: {},
		};

		const userByCode = await this.userCashRepository.findOne({
			code: createUserCashDto.code,
		});

		if (userByCode) {
			errorResponse.errors['code'] = 'has already been taken';
		}
		if (userByCode) {
			throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
		}

		const newUser = new UserCashEntity();
		Object.assign(newUser, createUserCashDto);
		const user = await this.userCashRepository.save(newUser);
		delete user.password;
		return user;
	}

	async login(loginUserCashDto: LoginUserCashDto): Promise<UserCashEntity> {
		const errorResponse = {
			errors: {
				'code or password': 'is invalid',
			},
		};
		const user = await this.userCashRepository.findOne(
			{ code: loginUserCashDto.code },
			{ select: ['id', 'code', 'password'] },
		);

		if (!user) {
			throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
		}

		const isPasswordCorrect = await compare(loginUserCashDto.password, user.password);

		if (!isPasswordCorrect) {
			throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
		}

		delete user.password;
		return user;
	}

	async findById(id: number): Promise<UserCashEntity> {
		return this.userCashRepository.findOne(id);
	}

	private generateJwt(user: UserCashEntity): string {
		return sign(
			{
				id: user.id,
				code: user.code,
			},
			JWT_SECRET,
		);
	}

	buildUserResponse(user: UserCashEntity): UserCashResponseInterface {
		return {
			user: {
				...user,
				token: this.generateJwt(user),
			},
		};
	}
}
