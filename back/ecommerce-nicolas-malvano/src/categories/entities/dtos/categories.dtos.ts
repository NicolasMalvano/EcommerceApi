import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateCategoryDTO {

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    description: 'Debe ser un string de máximo 50 caracteres',
    example: 'Tecnología'
  })
  name: string;

}