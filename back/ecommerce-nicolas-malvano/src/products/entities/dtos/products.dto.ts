import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsNumber, IsInt, IsUrl, IsUUID, isString } from 'class-validator';

export class UpdateProductDTO {

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiPropertyOptional({ example: 'ExampleProduct' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Example Text' })
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 10.50 })
  price?: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({ example: 5 })
  stock?: number;

  @IsOptional()
  @IsUrl()
  @ApiPropertyOptional({
    example: 'https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png'
  })
  imgUrl?: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({ description: 'ID de la categoría' })
  categoryId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({example: 'Example brand'})
  brand?:string;

}

export class CreateProductDTO {

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Laptop' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Gaming laptop' })
  description: string;

  @IsNumber()
  @ApiProperty({ example: 1500 })
  price: number;

  @IsInt()
  @ApiProperty({ example: 10 })
  stock: number;

  @IsUrl()
  @ApiProperty({ example: 'https://blog.bestbuy.ca/wp-content/uploads/2018/04/11643005_1.jpg' })
  imgUrl: string;

  @IsUUID()
  @ApiProperty({ description: 'Id de la categoría' })
  categoryId: string;

  @IsString()
  @ApiProperty({example: 'Logitech'})
  brand: string;
}