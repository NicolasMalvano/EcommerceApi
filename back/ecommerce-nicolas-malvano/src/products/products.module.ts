import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Category } from '../categories/entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Category])],
  providers: [ProductService, ProductsRepository],
  controllers: [ProductsController],
  exports: [ProductService]
})
export class ProductsModule{}
