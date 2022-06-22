import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthCashGuard } from '../userCash/guards/authCash.guard';
import { User } from '../user/decorators/user.decorator';
import { UserCashEntity } from '../userCash/userCash.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CategoriesResponseInterface } from './types/categoriesResponse.interface';
import { CategoryResponseInterface } from './types/categoryResponse.interface';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	@UseGuards(AuthCashGuard)
	async getAllByQueryParam(
		@User('id') currentUserId: number,
		@Query() query: any,
	): Promise<CategoriesResponseInterface> {
		return await this.categoryService.getAllByQueryParam(currentUserId, query);
	}

	@Post()
	@UseGuards(AuthCashGuard)
	async create(
		@User() currentUser: UserCashEntity,
		@Body('category') createCategoryDto: CreateCategoryDto,
	): Promise<CategoryResponseInterface> {
		const category = await this.categoryService.create(currentUser, createCategoryDto);
		return this.categoryService.buildCategoryResponse(category);
	}
}
