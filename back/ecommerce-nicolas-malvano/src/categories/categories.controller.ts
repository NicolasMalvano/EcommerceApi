import { Controller, Get, Post, Body, UseGuards, HttpCode, Query, ParseUUIDPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '../guards/Auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCategoryDTO } from './entities/dtos/categories.dtos';
import { RolesGuard } from '../guards/Role.guard';
import { Role } from '../decorators/roles.decorators';
import { Roles } from '../roles.enum'
import { Category } from './entities/categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @Role(Roles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(201)
  @Get('seeder')
  @ApiOperation({summary: 'Creación y carga de categorías basada en productos'})
  @ApiResponse({
  status: 200,
  description: 'Categorías creadas y cargadas correctamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })
  async createCategory(): Promise<string> {
    return await this.categoriesService.createCategory();
  }


  @ApiBearerAuth()
  @Role(Roles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(201)
  @Post('new')
  @ApiOperation({summary: 'Creación de una nueva categoría'})
  @ApiResponse({
  status: 200,
  description: 'Categorías creadas y cargadas correctamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })
  @ApiBody({
    type: CreateCategoryDTO,
    description: 'Datos necesarios para crear una nueva categoría'
  })
  async newCategory(@Body() data: CreateCategoryDTO): Promise <string> {
    return await this.categoriesService.newCategory(data);
  }

  @ApiBearerAuth()
  @Role(Roles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  @Get()
  @ApiOperation({summary: 'Obtener la lista de categorías'})
  @ApiResponse({
  status: 200,
  description: 'Lista de categorías obtenida correctamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })

  async getCategories(): Promise<Category[]> {
    return await this.categoriesService.getCategories();
  }

}
