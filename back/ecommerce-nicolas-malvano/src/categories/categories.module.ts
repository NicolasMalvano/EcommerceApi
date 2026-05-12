import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { categoriesRepository } from './categories.repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, categoriesRepository, ],
  exports: [CategoriesService]
})
export class CategoriesModule {}
