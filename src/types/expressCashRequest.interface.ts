import { Request } from 'express';
import { UserCashEntity } from 'src/userCash/userCash.entity';

export interface ExpressCashRequestInterface extends Request {
	user?: UserCashEntity;
}
