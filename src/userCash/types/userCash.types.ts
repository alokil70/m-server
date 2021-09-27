import { UserCashEntity } from '../userCash.entity';
// delete password from userCashEntity
export type UserCashTypes = Omit<UserCashEntity, 'hashPassword'>;
