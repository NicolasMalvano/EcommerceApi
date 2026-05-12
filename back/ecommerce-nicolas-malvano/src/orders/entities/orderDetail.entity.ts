import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Order } from "./order.entity";
import { Products } from "../../products/entities/products.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'ORDERDETAILS'
})

export class OrderDetails{

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({description: 'uuid v4 generado por la Base de datos'})
    id: string 

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    @ApiProperty({description: 'Precio con formato de dos decimales', example: '10.50'})
    price:number;

    @OneToOne(() => Order, (order) => order.orderDetails)
    @JoinColumn({name: 'order_id'})
    order: Order

    @ManyToMany(() => Products)
    @JoinTable({name: 'ORDERDETAILSPRODUCTS'})
    products: Products[]
}