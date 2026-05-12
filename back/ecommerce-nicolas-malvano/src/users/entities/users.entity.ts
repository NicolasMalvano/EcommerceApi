import { ApiProperty } from "@nestjs/swagger";
import { Order } from "../../orders/entities/order.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'USERS'
})
export class User {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({description: 'uuid v4 generado por la Base de datos'})
    id: string 

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    @ApiProperty({description:'Debe ser un string de máximo 50 caracteres', example: 'TestUser01'})
    name: string; 

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true
    })
    @ApiProperty({description:'Debe ser un email válido de máximo 50 caracteres', example: 'TestUser01@mail.com'})
    email: string;

    @Column({
        type: 'varchar',
        length: 60,
        nullable: false,
    })
    @ApiProperty({description:'Debe ser un string de máximo 60 caracteres. Debe tener mínimo una mayúscula, un número, un símbolo y una minúscula', example: 'Testpassword01!'})
    password: string;

    @Column({
        type: 'int'
    })
    @ApiProperty({description:'Debe ser un número', example: '1234567890'})
    phone: number;

    @Column({
        type: 'varchar',
        length: 50
    })
    @ApiProperty({description:'Debe ser un string', example: 'Example Country'})
    country: string;

    @Column({
        type: 'varchar'
    })
    @ApiProperty({description:'Debe ser un string', example: 'Example Street'})
    address: string; 

    @Column({
        type: 'varchar',
        length: 50
    })
    @ApiProperty({description:'Debe ser un string', example: 'Example City'})
    city: string; 

    @Column({default: false})
    @ApiProperty({description:'Debe ser un booleano, viene en "false" por defecto', example: 'false'})
    isAdmin: boolean;

    @Column({default: true})
    @ApiProperty({description: 'Debe ser un booleano, viene en "true" por defecto', example: 'true'})
    isActive: boolean;

    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn({name: 'order_id'})
    order: Order[]

    @CreateDateColumn()
    @ApiProperty({description:'Fecha generada automáticamente al momento de la creación del User'})
    createdAt: Date;
}