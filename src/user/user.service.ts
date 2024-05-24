import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const saltOrRounds = 10;
    const passwordHash = await hash(createUserDTO.password, saltOrRounds);

    return this.userRepository.save({
      ...createUserDTO,
      password: passwordHash,
    });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
