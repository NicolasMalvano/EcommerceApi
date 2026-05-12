import { Injectable,  } from '@nestjs/common';
import {ProductsRepository} from './products.repository'
import { Products } from './entities/products.entity';
import { CreateProductDTO, UpdateProductDTO } from './entities/dtos/products.dto';


@Injectable()
export class ProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    const products = await this.productsRepository.getProducts(page, limit);
  
    return products
  }


  async getProductById(id: string): Promise<Products>{
    const productById = await this.productsRepository.getProductById(id);
    return productById;
  }

  async createProduct(): Promise<string>{
    return await this.productsRepository.createProduct();
  }

  async newProduct(data: CreateProductDTO): Promise<string>{
    return await this.productsRepository.newProduct(data)
  }

  async updateProduct(id: string, data: UpdateProductDTO): Promise<string>{
    return await this.productsRepository.updateProduct(id, data);
  }

  async deleteProduct(id: string): Promise<string | null>{
    return await this.productsRepository.deleteProduct(id);
  }
}
