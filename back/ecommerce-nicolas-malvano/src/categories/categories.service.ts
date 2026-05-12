import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { categoriesRepository } from './categories.repositories';
import { CreateCategoryDTO } from './entities/dtos/categories.dtos';
import { Category } from './entities/categories.entity';


@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: categoriesRepository){}
 
  async createCategory(): Promise<string>{
    return await this.categoriesRepository.createCategory();
  }

  async newCategory(data: CreateCategoryDTO): Promise<string>{
    return await this.categoriesRepository.newCategory(data);
  }

  async getCategories(): Promise<Category[]>{
    return await this.categoriesRepository.getCategories();
  }

}
