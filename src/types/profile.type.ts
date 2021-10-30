import { UserCashType } from '../userCash/types/userCash.type';

export type ProfileType = Omit<UserCashType, 'code'>;
