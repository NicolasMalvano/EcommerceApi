import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import {userUpdateDTO } from './entities/dto/user.dto';


@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private dbUserRepository: Repository<User>){}


  async getUSers(page: number, limit: number): Promise<Omit<User, 'password' | 'isAdmin'>[]> {
    const skip = (page - 1) * limit;
    const allUsers = await this.dbUserRepository.find({
      skip: skip,
      take: limit,
      where:{
        isActive: true
      } 
    })
    return allUsers.map(({password, isAdmin, ...userNoPassword}) => userNoPassword);
    
  }

  async getUserById(id: string): Promise<Omit<User, 'password' | 'isAdmin'>> {
  const userById = await this.dbUserRepository.findOne({
    where: { id },
    relations: {
      order: true,
    }
  });

  if (!userById) throw new NotFoundException;

  const { password, isAdmin, ...userNoPassword } = userById;

  return userNoPassword;
} 

  async getUserByEmail(email: string): Promise<User | null>{
    return await this.dbUserRepository.findOneBy({email});
  }


  async createUser(userData: Partial<User>): Promise<User>{
    const newUser = await this.dbUserRepository.save(userData);
    return newUser;
    
  }

  async updateUser(id:string, userData: User): Promise<Omit <userUpdateDTO , 'password'>>{
    const user = await this.dbUserRepository.findOneBy({id});
    if(!user) throw new NotFoundException;
    const updatedUser = this.dbUserRepository.merge(user, userData);
    const savedUser = await this.dbUserRepository.save(updatedUser);
    const { password, ...userNoPassword} = savedUser;
    return userNoPassword; 
  }

  async deleteUser(id: string): Promise<string>{
    const foundUser= await this.dbUserRepository.findOneBy({id});
    if(!foundUser) throw new NotFoundException;
    this.dbUserRepository.update(
      {id: foundUser.id},
      {isActive: false}
    );
    return `El usuario con id ${foundUser.id} fue dado de baja`
  }

}



