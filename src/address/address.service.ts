import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityService } from '../city/city.service';
import { UserService } from '../user/user.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAdrress(
    createAdrressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(createAdrressDto.cityId);
    return this.addressRepository.save({
      ...createAdrressDto,
      userId,
    });
  }
  async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
    const addressess = await this.addressRepository.find({
      where: {
        userId,
      },
      relations: {
        city: {
          state: true,
        },
      },
    });
    if (!addressess || addressess.length == 0) {
      throw new NotFoundException(`Addresses not found for userId: ${userId}`);
    }
    return addressess;
  }
}
