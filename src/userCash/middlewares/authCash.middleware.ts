import { JWT_SECRET } from 'src/config';
import { ExpressRequest } from 'src/types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserCashService } from '../userCash.service';
import { UserEntity } from '../../user/user.entity';

@Injectable()
export class AuthCashMiddleware implements NestMiddleware {
	constructor(private readonly userCashService: UserCashService) {}

	async use(req: ExpressRequest, res: Response, next: NextFunction) {
		if (!req.headers.authorization) {
			req.user = null;
			next();
			return;
		}

		const token = req.headers.authorization.split(' ')[1];

		try {
			const decode = verify(token, JWT_SECRET);
			const user = await this.userCashService.findById(decode.id);
			req.user = user;
			next();
		} catch (err) {
			req.user = null;
			next();
		}
	}
}
