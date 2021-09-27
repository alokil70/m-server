import { UserCashTypes } from './userCash.types';
// assign token in userCashEntity
export interface UserCashResponseInterface {
	user: UserCashTypes & { token: string };
}
