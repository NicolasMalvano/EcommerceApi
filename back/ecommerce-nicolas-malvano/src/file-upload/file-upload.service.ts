import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.reposiroty';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../products/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>
  ){}
  async uploadFile(productId: string, file: Express.Multer.File): Promise<Products>{

    const foundProduct = await this.productsRepository.findOneBy({id: productId});
    if(!foundProduct) throw new NotFoundException(`Producto con id: ${productId} no encontrado`)

    const response = await this.fileUploadRepository.uploadImage(file);

    foundProduct.imgUrl = response.secure_url;
    await this.productsRepository.save(foundProduct);
    
    const updatedProduct = await this.productsRepository.findOneBy({id: productId});
    if(!updatedProduct) throw NotFoundException;
    return updatedProduct;
  }

}
