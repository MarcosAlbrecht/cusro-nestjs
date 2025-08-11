import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import { AddressService } from 'src/address/address.service';
import { AddressEntity } from 'src/address/entities/address.entity';
import { addressEntityMock } from '../__mocks__/auth.mock';

describe('AddressService', () => {
  let service: AddressService;
  let adrressRepository: Repository<AddressEntity>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    jwtService = module.get<JwtService>(JwtService);
    adrressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(adrressRepository).toBeDefined();
  });

  // it('should return address after create', async () => {
  //   const address = await service.createAdrress(
  //     createAddressEntityMock,
  //     userEntityMock.id,
  //   );
  //   expect(address).toEqual(addressEntityMock);
  // });

  // it('should return error if exception in userService', async () => {
  //   jest.spyOn(jwtService, '').mockRejectedValueOnce(new Error());

  //   expect(
  //     service.createAdrress(createAddressEntityMock, userEntityMock.id),
  //   ).rejects.toThrow();
  // });

  // it('should return error if exception in cityService', async () => {
  //   jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());

  //   expect(
  //     service.createAdrress(createAddressEntityMock, userEntityMock.id),
  //   ).rejects.toThrow();
  // });
});
