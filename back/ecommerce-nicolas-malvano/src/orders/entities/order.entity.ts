import { User } from "../../users/entities/users.entity";
import { Entity, JoinColumn, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm";
import { OrderDetails } from "./orderDetail.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'ORDERS'
})

export class Order{
    
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({description: 'uuid v4 generado por la Base de datos'})
    id: string 
    
    @Column({
        type: 'date',
    })
    @ApiProperty({description: 'Fecha con formato dd/mm/yyyy', example: '28/02/2026'})
    date: Date; 

    @ManyToOne(() => User, (user) => user.order)
    user: User

    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails
};