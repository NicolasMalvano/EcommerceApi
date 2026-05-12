import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, HttpCode  } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrderDTO } from './entities/dtos/orders.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/Auth.guard';
import { Order } from './entities/order.entity';
import { RolesGuard } from '../guards/Role.guard';
import { Role } from '../decorators/roles.decorators';
import { Roles } from '../roles.enum';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Role(Roles.Admin)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Lista de ordenes obtenida correctamente'
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado'
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso no autorizado'
  })
  @ApiOperation({summary: 'Obtener el listado de órdenes'})
  @Get()
  async getOrders(): Promise<Order[]>{
    return await this.ordersService.getOrders();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(201)
  @Post()
  @ApiOperation({summary: 'Crear una nueva orden'})
  @ApiResponse({
    status: 201,
    description: 'Orden creada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para crear la orden',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto o usuario no encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })
  @ApiBody({
    description: 'Datos necesarios para la creación de la orden',
    type: createOrderDTO
  })
  create(@Body() createOrderDto: createOrderDTO):Promise<Order[]>  {
    return this.ordersService.create(createOrderDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(200)
  @ApiOperation({summary: 'Obtener una orden en específico por ID'})
  @ApiResponse({
  status: 200,
  description: 'Orden obtenida correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido (UUID incorrecto)',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })
  findOneOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.ordersService.findOneOrder(id);
  }

  
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Role(Roles.Admin)
  @HttpCode(200)
  @ApiResponse({
  status: 200,
  description: 'Orden eliminada correctamente',
  })

  @ApiResponse({
    status: 400,
    description: 'Formato de id inválido'
  })

  @ApiResponse({
    status: 401,
    description: 'No autenticado'
  })

  @ApiResponse({
    status: 403,
    description: 'Acesso no autorizado'
  })

  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada'
  })

  @ApiParam({
    name: 'id',
    description: 'UUID de la orden',
  })

  @ApiOperation({summary: 'Eliminar una orden y detalle de orden asociada a través del id'})

  @Delete(':id')
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string){
      return await this.ordersService.deleteOrder(id);
  }

}
