import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "../../../products/entities/products.entity";

export class createOrderDTO{
    
    @IsNotEmpty({message: 'ID de user obligatorio'})
    @IsUUID(4,  {message: 'Debe ser un UUID'})
    @ApiProperty({description: 'uuid v4 generado por la Base de datos', example: 'c447f3ee-ddda-4f1a-8d43-e61dd3679d3b'})
    userId: string;

    @IsArray({message: 'Debe ser un array de productos'})
    @ArrayMinSize(1, {message: 'Debe tener al menos un producto'})
    @ApiProperty({description:'Debe ser un array de productos', example: 
       [    
            {
            "id": "300ceb6d-e6bc-4bbc-8410-fb3b6be50488"
            },
            {
            "id": "1b2e8763-353c-40a3-a279-e7c3e1d706f4"
            }
        ]
    })
    products: Products[]
}