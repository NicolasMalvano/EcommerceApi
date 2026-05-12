import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDTO, userLoginDTO } from '../users/entities/dto/user.dto';
import { User } from '../users/entities/users.entity';
import {  ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 
  @HttpCode(200)
  @Post('signin')
  @ApiOperation({summary: 'Inicio de sesión del usuario'})
  @ApiResponse({
  status: 200,
  description: 'Inicio de sesión exitoso. Retorna el token JWT.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales incorrectas',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })
  @ApiBody({
    type: userLoginDTO,
    description: 'Datos necesarios para iniciar sesión'
  })


  async loginUser(@Body() userLogin: userLoginDTO):Promise<{}>{
    return await this.authService.signIn(userLogin.email, userLogin.password);
  }

  @HttpCode(201)
  @Post('signup')
  @ApiOperation({summary: 'Registro de un nuevo usuario'})
  @ApiResponse({
  status: 201,
  description: 'Usuario registrado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para el registro',
  })
  @ApiResponse({
    status: 409,
    description: 'El email ya está registrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })
  @ApiBody({
    type: registerUserDTO,
    description: 'Datos necesarios para crear un nuevo usuario'
  })
  async createUser(@Body() user: registerUserDTO): Promise<Partial<User>> {
      return await this.authService.signUp(user);
  }
  

}
