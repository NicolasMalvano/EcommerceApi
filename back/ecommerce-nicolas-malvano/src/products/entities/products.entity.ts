import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../../categories/entities/categories.entity";
import { OrderDetails } from "../../orders/entities/orderDetail.entity";
import { Column, Entity,  ManyToMany, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'PRODUCTS'
})
                        
export class Products{

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({description: 'uuid v4 generado por la Base de datos'})
    id!: string 

    @Column({
        unique:true,
        type: 'varchar',
        length: 50,
        nullable: false
    })
    @ApiProperty({description:'Debe ser un string de máximo 50 caracteres', example: 'ExampleProduct'})
    name!: string;

    @Column({ 
        type: 'varchar',
        nullable: false
        }
    )
    @ApiProperty({description:'Debe ser un string', example: 'Example Text'})
    description!: string; 

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    @ApiProperty({description: 'Precio con formato de dos decimales', example: '10.50'})
    price!:number;

    @Column({
        type: 'int',
        nullable: false,
    })
    @ApiProperty({description: 'Debe ser un número', example: '5'})
    stock!: number; 

    @Column({
        type: 'varchar',
        nullable: false,
        default: 'Sin imágen'
    })
    brand!: string

    @Column({
        type: 'varchar', 
        nullable: true 
    })
    @ApiProperty({description: 'Debe ser un string de tipo url el cual se guardará en Cloudinary'})
    imgUrl!:string;

    //Muchos Productos pueden estar en una sola categoría.
    @ManyToOne(() => Category, (category) => category.products)
    category!: Category

    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails!: OrderDetails[]
    
}
