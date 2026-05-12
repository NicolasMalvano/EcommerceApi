import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/categories.entity';
import { allProducts } from '../utils/Archivo actividad 3';
import { CreateProductDTO, UpdateProductDTO } from './entities/dtos/products.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products) private dbProductsRepository: Repository<Products>,
    @InjectRepository(Category) private dbCategoriesRepository: Repository<Category>,
){}
    

  async getProducts(page: number, limit: number): Promise<Products[]> {
    const skip = (page - 1) * limit;

    const products = await this.dbProductsRepository.find({
      relations: {
        category: true,
      },
      skip: skip, //Salta registros anteriores
      take: limit,//Limita cantidad de registros devueltos

    });
    return products;
  }

  async getProductById(id: string): Promise<Products> {
    const productById = await this.dbProductsRepository.findOneBy({id});
    if(!productById) throw NotFoundException;
    return productById;
  }
  

  async createProduct(): Promise<string>{
    const categories =  await this.dbCategoriesRepository.find();
    console.log('Categorías en DB:', categories.map(c => c.name));
    console.log('Categorías en seed:', allProducts.map(p => p.category));
    await Promise.all(
      allProducts.map(async (element) => {
        const category = categories.find((category) => category.name === element.category);
       
        if(!category) throw new NotFoundException('Categoría no encontrada');
        
        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.brand = 'Sin Marca';
        product.category = category;
        product.imgUrl = 'https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png'

        await this.dbProductsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(['description', 'price', 'stock', 'brand'], ['name'])
        .execute()
      })
    );
    return 'Producto Agregado'
  }


  async newProduct(data: CreateProductDTO): Promise<string>{
    const category = await this.dbCategoriesRepository.findOne({
    where: { id: data.categoryId }
  });

  if (!category) {
    throw new Error('Categoría no encontrada');
  }

  const product = this.dbProductsRepository.create({
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock,
    imgUrl: data.imgUrl,
    brand: data.brand,
    category
  });

  await this.dbProductsRepository.save(product);

  return 'Nuevo producto creado correctamente'
  
  }

  async updateProduct(id: string, data: UpdateProductDTO ): Promise<string>{
    await this.dbProductsRepository.update(id, data);
    const updatedProduct = await this.dbProductsRepository.findOneBy({id});
    if(!updatedProduct) throw NotFoundException;
    return `Producto con id ${updatedProduct.id} actualizado`;
  }

  async deleteProduct(id: string): Promise<string | null>{
    const product = await this.dbProductsRepository.findOneBy({id});
    if(!product) return null;

    await this.dbProductsRepository.delete(id);
    return `Producto con id ${product.id} eliminado`
    
  }
}
