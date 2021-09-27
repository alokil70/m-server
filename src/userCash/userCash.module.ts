import { Module } from '@nestjs/common';
import { UserCashController } from './userCash.controller';
import { UserCashService } from './userCash.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCashEntity } from './userCash.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserCashEntity])],
	controllers: [UserCashController],
	providers: [UserCashService],
})
export class UserCashModule {}
