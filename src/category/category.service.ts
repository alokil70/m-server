import { Injectable } from '@nestjs/common';
import { UserCashEntity } from '../userCash/userCash.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CategoryResponseInterface } from './types/categoryResponse.interface';
import { CategoryEntity } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) {}
  async getAllByQueryParam(currentUserId: number, query: any) {
    return undefined;
  }

  async create(currentUser: UserCashEntity, createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    Object.assign(category, createCategoryDto);
    category.guid = '2222';
    console.log('category create', category);
    return await this.categoryRepository.save(category);
  }

  buildCategoryResponse(category: CategoryEntity): CategoryResponseInterface {
    return { category };
  }
}
