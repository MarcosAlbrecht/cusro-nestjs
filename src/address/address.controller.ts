import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { ReturnAddressDto } from './dtos/returnAddresses.dto';
import { AddressEntity } from './entities/address.entity';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('')
  @UsePipes(ValidationPipe)
  async createAdrress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAdrress(createAddressDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get('/user-logged')
  async findAddressByUserLogged(
    @UserId() userId: number,
  ): Promise<ReturnAddressDto[]> {
    return (await this.addressService.findAddressByUserId(userId)).map(
      (addrress) => new ReturnAddressDto(addrress),
    );
  }
}
