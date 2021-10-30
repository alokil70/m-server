import { Body, Controller, Get, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { UserCashService } from './userCash.service';
import { LoginUserCashDto } from './dto/loginUserCash.dto';
import { CreateUserCashDto } from './dto/createUserCash.dto';
import { UserCashEntity } from './userCash.entity';
import { UserCashResponseInterface } from './types/userCashResponse.interface';
import { BackendValidationPipe } from '../shared/pipes/backendValidation.pipe';
import { AuthCashGuard } from './guards/authCash.guard';
import { ExpressCashRequestInterface } from '../types/expressCashRequest.interface';

@Controller('cash')
export class UserCashController {
  constructor(private readonly userCashService: UserCashService) {}

  @Post('/reg')
  @UsePipes(new BackendValidationPipe())
  async createUser(@Body('user') createUserCashDto: CreateUserCashDto): Promise<UserCashEntity> {
    console.log('createUser', typeof createUserCashDto.password);
    return await this.userCashService.createUser(createUserCashDto);
  }

  @Post('/login')
  @UsePipes(new BackendValidationPipe())
  async login(@Body('user') loginUserCashDto: LoginUserCashDto): Promise<UserCashResponseInterface> {
    console.log('controller loginCash', loginUserCashDto);
    const user = await this.userCashService.login(loginUserCashDto);
    return this.userCashService.buildUserResponse(user);
  }

  @Get('/user')
  @UseGuards(AuthCashGuard)
  async getUser(@Req() request: ExpressCashRequestInterface): Promise<UserCashResponseInterface> {
    return this.userCashService.buildUserResponse(request.user);
  }
}
