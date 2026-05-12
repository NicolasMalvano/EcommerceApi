import { Injectable, ParseUUIDPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/categories.entity";
import { Repository } from "typeorm";
import { allProducts } from "../utils/Archivo actividad 3";
import { CreateCategoryDTO } from "./entities/dtos/categories.dtos";

@Injectable()

export class categoriesRepository {
    constructor(@InjectRepository(Category)private dbCategoryRepository: Repository<Category>){}

    async getCategories(): Promise<Category[]>{
        return await this.dbCategoryRepository.find();
    }

    async createCategory(): Promise<string>{
        const insertPromises = allProducts.map((element) => {
            return this.dbCategoryRepository
            .createQueryBuilder()
            .insert()
            .into(Category)
            .values({name: element.category})
            .orIgnore()
            .execute()
        }
    );
    await Promise.all(insertPromises);
    return 'Categorías creadas'
    }

    async newCategory(data: CreateCategoryDTO): Promise<string>{
        const category = this.dbCategoryRepository.create({
            name: data.name,
        });

        await this.dbCategoryRepository.save(category);

        return 'Nueva categoría creada correctamente'
    }

   
}