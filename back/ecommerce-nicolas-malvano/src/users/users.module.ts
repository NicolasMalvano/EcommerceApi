import {Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { AuthGuard } from '../guards/Auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersRepository, AuthGuard],
  controllers: [UsersController],
})
export class UsersModule {}
