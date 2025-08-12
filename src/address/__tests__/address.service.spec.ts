import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { cityEntityMock } from '../../city/__mocks__/city.mock';
import { CityService } from '../../city/city.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { UserService } from '../../user/user.service';
import { addressEntityMock } from '../__mocks__/address.mock';
import { createAddressEntityMock } from '../__mocks__/create-address.mock';
import { AddressService } from '../address.service';
import { AddressEntity } from '../entities/address.entity';

describe('AddressService', () => {
  let service: AddressService;
  let adrressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findCityById: jest.fn().mockResolvedValue(cityEntityMock),
          },
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressEntityMock),
            find: jest.fn().mockResolvedValue([addressEntityMock]),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    adrressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(adrressRepository).toBeDefined();
  });

  it('should return address after create', async () => {
    const address = await service.createAdrress(
      createAddressEntityMock,
      userEntityMock.id,
    );
    expect(address).toEqual(addressEntityMock);
  });

  it('should return error if exception in userService', async () => {
    jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());

    expect(
      service.createAdrress(createAddressEntityMock, userEntityMock.id),
    ).rejects.toThrow();
  });

  it('should return error if exception in cityService', async () => {
    jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());

    expect(
      service.createAdrress(createAddressEntityMock, userEntityMock.id),
    ).rejects.toThrow();
  });

  it('should return all addresses to user', async () => {
    const addressess = await service.findAddressByUserId(userEntityMock.id);
    expect(addressess).toEqual([addressEntityMock]);
  });

  it('should return not found if not address registered', async () => {
    jest.spyOn(adrressRepository, 'find').mockRejectedValueOnce(undefined);
    expect(service.findAddressByUserId(userEntityMock.id)).rejects.toThrow();
  });
});
