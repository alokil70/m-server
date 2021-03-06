import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExpressCashRequestInterface } from 'src/types/expressCashRequest.interface';

@Injectable()
export class AuthCashGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<ExpressCashRequestInterface>();

		if (request.user) {
			return true;
		}

		throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
	}
}
