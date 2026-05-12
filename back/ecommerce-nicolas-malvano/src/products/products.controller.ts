import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './products.service';
import { AuthGuard } from '../guards/Auth.guard';
import { Products } from './entities/products.entity';
import { Role } from '../decorators/roles.decorators';
import { Roles } from '../roles.enum';
import { RolesGuard } from '../guards/Role.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings.js';
import { CreateProductDTO, UpdateProductDTO } from './entities/dtos/products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}
  
  @HttpCode(200)
  @Get()
  @ApiOperation({summary: 'Obtener la lista de productos paginada'})
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Número de página, 1 por defecto'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Límite de productos por página, 5 por defecto'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros de paginación inválidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })
  async GetProducts(@Query('page') page?: string, @Query('limit') limit?: string): Promise<Products[]> {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum: 5;

    return this.productsService.getProducts(validPage, validLimit);
  }

  @HttpCode(200)
  @Get(':id')
  @ApiOperation({summary: 'Obtener un producto específico por ID'})
  @ApiParam({
      name:'id',
      type: UUID,
      description: 'ID del usuario formato UUID v4'
    })
    @ApiResponse({
      status: 200,
      description: 'Producto obtenido correctamente',
      type: Products,
    })  
    @ApiResponse({
      status: 400,
      description: 'ID inválido (UUID incorrecto)',
    })
    @ApiResponse({
      status: 404,
      description: 'Producto no encontrado',
    })
    @ApiResponse({
      status: 500,
      description: 'Error interno del servidor',
    })
  async getProductById(@Param('id', ParseUUIDPipe) id: string): Promise< Products>{
    return await this.productsService.getProductById(id);
  }

  @ApiBearerAuth()
  @Role(Roles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(201)
  @Post('seeder')
  @ApiOperation({summary: 'Creación de productos a través de Seed'})

  @ApiResponse({
  status: 201,
  description: 'Producto creado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para crear el producto',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })
  async createProduct(): Promise<string>{
    return await this.productsService.createProduct();
  }
 
  @ApiBearerAuth()
  @Role(Roles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  @Put(':id')
  @ApiOperation({summary: 'Actualizar datos de un producto en específico por ID'})
  @ApiParam({
    name:'id',
    type: UUID,
    description: 'ID del usuario formato UUID v4'
  })
  @ApiResponse({
  status: 200,
  description: 'Producto actualizado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o ID incorrecto',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado (requiere rol Admin)',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })
  async updateProduct
  (@Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProductDTO,
  ): Promise<string>{
      return await this.productsService.updateProduct(id, data);
  }

  @ApiBearerAuth()
  @Role(Roles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(201)
  @Post('new')
  @ApiOperation({summary: 'Crear nuevo producto por Body'})

  @ApiResponse({
  status: 201,
  description: 'Producto creado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para crear el producto',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })
  @ApiBody({
    type: CreateProductDTO,
    description: 'Datos necesarios para crear un nuevo producto'
  })
  async newProduct(@Body() data: CreateProductDTO ): Promise<string> {
    return this.productsService.newProduct(data);
  }


  @ApiBearerAuth()
  @Role(Roles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  @Delete(':id')
  @ApiOperation({summary: 'Eliminar un producto en específico por ID'})
  @ApiParam({
    name:'id',
    type: UUID,
    description: 'ID del usuario formato UUID v4'
  })
  @ApiResponse({
  status: 200,
  description: 'Producto eliminado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado (requiere rol Admin)',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<string | null>{
    return await this.productsService.deleteProduct(id)
  }
}
