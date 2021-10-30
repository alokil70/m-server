import { UserCashEntity } from '../userCash.entity';
// delete password from userCashEntity
export type UserCashType = Omit<UserCashEntity, 'hashPassword'>;
