import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class LoginByCodeController {
	constructor() {}

	@Post('login')
	login() {
		return 'hi';
	}

	@Get('login')
	loginx() {
		return 'hi';
	}
}
