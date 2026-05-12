import { Controller, Get, Param, HttpCode, Post, Body, Put, Delete, Query, UseGuards, ParseUUIDPipe, BadRequestException, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/Auth.guard';
import { User } from './entities/users.entity';
import {userUpdateDTO } from './entities/dto/user.dto';
import { Role } from '../decorators/roles.decorators';
import { Roles } from '../roles.enum';
import { RolesGuard } from '../guards/Role.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users') 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Role(Roles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  @Get()
  @ApiOperation({summary: 'Obtener la lista de usuarios paginada'})
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
    description: 'Límite de usuarios por página, 5 por defecto'
  })
  
  @ApiResponse({
      status: 200,
      description: 'Lista de usuarios obtenida correctamente'
  })
  @ApiResponse({
      status: 400,
      description: 'No se encontraron usuarios para la página solicitada'
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado'
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado'
  })
  async getUsers(@Query('page') page?: string, @Query('limit') limit?: string,): Promise<Omit<User, 'password' | 'isAdmin'>[]> {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum: 5;
    
    return this.usersService.getUsers(validPage, validLimit);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @Get(':id')
  @ApiOperation({summary: 'Obtener un usuario en específico por su ID'})
  @ApiParam({
    name:'id',
    type: String,
    description: 'ID del usuario formato UUID v4'
  })
  @ApiResponse({
      status: 200,
      description: 'Usuario obtenido correctamente'
  })
  @ApiResponse({
      status: 400,
      description: 'No se pudo obtener al usuario'
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado'
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado'
  })
  @ApiResponse({
      status: 404,
      description: 'Usuario no encontrado'
  })
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<Omit<User, 'password'| 'isAdmin'> | string>{
    return await this.usersService.getUserById(id)  ;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Put(':id')
  @ApiOperation({summary: 'Actualizar datos de un usuario por ID'})
  
  @ApiParam({
    name:'id',
    type: String,
    description: 'ID del usuario formato UUID v4'
  })
  @ApiResponse({
      status: 200,
      description: 'Usuario actualizado Correctamente'
  })
  @ApiResponse({
      status: 400,
      description: 'No se pudo actualizar el usuario'
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado'
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado'
  })
  async updateUsers(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: User,): Promise<Omit <userUpdateDTO , 'password'>>{
      return await this.usersService.updateUser(id, data);
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Delete(':id')
  @ApiOperation({summary: 'Eliminar un usuario por ID'})
  @ApiParam({
    name:'id',
    type: String,
    description: 'ID del usuario formato UUID v4'
  })
    @ApiResponse({
      status: 200,
      description: 'Usuario eliminado correctamente'
  })
  @ApiResponse({
      status: 400,
      description: 'No se pudo eliminar el usuario'
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado'
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado'
  })
  async deleteUsers(@Param('id', ParseUUIDPipe) id: string): Promise<string | undefined>{
    return await this.usersService.deleteUser(id)
  }
  
  
}
