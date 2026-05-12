import { ApiProperty } from "@nestjs/swagger";
import { Products } from "../../products/entities/products.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'CATEGORIES'
})

export class Category{
    
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({description: 'uuid v4 generado por la Base de datos'})
    id!: string 

    @Column({
        unique: true,
        type: 'varchar',
        length: 50,
    })
    @ApiProperty({description: 'Debe ser un string de máximo 50 caracteres', example: 'Electrodomésticos'})
    name!: string; 

    //Una Categoría, puede contener muchos productos
    @OneToMany(() => Products, (product) => product.category)
    @JoinColumn()
    products!: Products[]
 
}