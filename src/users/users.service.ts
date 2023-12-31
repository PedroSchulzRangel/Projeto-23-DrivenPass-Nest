import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

 async create(userDto: CreateUserDto) {
    const { email } = userDto;
    const user = await this.usersRepository.getUserByEmail(email);
    if (user) throw new ConflictException("this user is already registered.")

    return await this.usersRepository.create(userDto);
  }

async getUserByEmail(email: string){
  return await this.usersRepository.getUserByEmail(email);
}
}
