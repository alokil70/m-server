import { JWT_SECRET } from 'src/config';
import { ExpressCashRequestInterface } from 'src/types/expressCashRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserCashService } from 'src/userCash/userCash.service';

@Injectable()
export class AuthCashMiddleware implements NestMiddleware {
	constructor(private readonly userCashService: UserCashService) {}

	async use(req: ExpressCashRequestInterface, res: Response, next: NextFunction) {
		console.log('AuthCashMiddleware');
		if (!req.headers.authorization) {
			req.user = null;
			next();
			return;
		}

		const token = req.headers.authorization.split(' ')[1];

		try {
			const decode = verify(token, JWT_SECRET);
			req.user = await this.userCashService.findById(decode.id);
			next();
		} catch (err) {
			req.user = null;
			next();
		}
	}
}
