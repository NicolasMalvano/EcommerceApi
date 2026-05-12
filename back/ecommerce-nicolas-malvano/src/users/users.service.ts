import { Injectable } from '@nestjs/common';
import {UsersRepository} from './users.repository'
import { User } from './entities/users.entity';
import {  userUpdateDTO } from './entities/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers(page: number, limit:number): Promise<Omit<User, 'password' | 'isAdmin'>[]> {
    return await this.usersRepository.getUSers(page, limit);
  }

  async getUserById(id: string): Promise<Omit<User, 'password'| "isAdmin"> | string>{
    return await this.usersRepository.getUserById(id)
  }

  async updateUser(id: string, data: User):  Promise<Omit <userUpdateDTO , 'password'>>{
   
    return await this.usersRepository.updateUser(id, data);
    
  }

  async deleteUser(id: string): Promise<string | undefined>{
    return await this.usersRepository.deleteUser(id);
  }

} 
