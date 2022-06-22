import { Injectable } from '@nestjs/common';
import { UserCashEntity } from '../userCash/userCash.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CategoryResponseInterface } from './types/categoryResponse.interface';
import { CategoryEntity } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CategoriesResponseInterface } from './types/categoriesResponse.interface';

@Injectable()
export class CategoryService {
	constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) {}

	async getAllByQueryParam(currentUserId: number, query: any): Promise<CategoriesResponseInterface> {
		const queryBuilder = getRepository(CategoryEntity).createQueryBuilder('category');

		queryBuilder.orderBy('category.createdAt', 'DESC');
		const categories = await queryBuilder.getMany();
		return { categories };
	}

	buildCategoryResponse(category: CategoryEntity): CategoryResponseInterface {
		return { category };
	}

	async create(currentUser: UserCashEntity, createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
		const category = new CategoryEntity();
		Object.assign(category, createCategoryDto);
		category.guid = this.getGUID();
		return await this.categoryRepository.save(category);
	}

	private getGUID(): string {
		return ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
	}
}
