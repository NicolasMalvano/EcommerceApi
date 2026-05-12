import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { registerUserDTO } from '../users/entities/dto/user.dto';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Roles } from '../roles.enum';
import { User } from '../users/entities/users.entity';


@Injectable()
export class AuthService {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userData: registerUserDTO): Promise<Partial<User>>{
    const { confirmPassword, ...user } = userData;
    const dbUser = await this.usersRepository.getUserByEmail(user.email);
    if (dbUser) throw new BadRequestException('Email ya registrado');
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await this.usersRepository.createUser(user);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

  async signIn(email: string, password: string): Promise<{}>{
    const dbUser = await this.usersRepository.getUserByEmail(email);
    if(!dbUser) throw new NotFoundException('Email o passwords incorrectos');
    const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    if(!isPasswordValid) throw new BadRequestException('Email o passwords incorrectos');
    const userPayload = {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        roles: [dbUser.isAdmin ? Roles.Admin : Roles.User] 
    }
    const token = this.jwtService.sign(userPayload, {
      expiresIn: '1h'
      });
    
    return {success: 'Usuario Logueado', token, 
      user: {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        roles: [dbUser.isAdmin ? Roles.Admin : Roles.User]
      }}

  } 
}
