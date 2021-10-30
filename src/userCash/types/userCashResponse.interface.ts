import { UserCashType } from './userCash.type';
// assign token in userCashEntity
export interface UserCashResponseInterface {
  user: UserCashType & { token: string };
}
