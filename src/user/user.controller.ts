import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserId } from 'src/decorators/user-id.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateUserDTO } from './dtos/createUser.dto';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllUser(@UserId() userId: number): Promise<ReturnUserDto[]> {
    console.log('user id: ', userId);
    return (await this.userService.getAllUser()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }
  @UseGuards(AuthGuard)
  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserByIdUsingRelations(userId),
    );
  }
}
