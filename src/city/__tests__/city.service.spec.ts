import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CacheService } from '../../cache/cache.service';

import { cityEntityMock } from '../__mocks__/city.mock';
import { CityService } from '../city.service';
import { CityEntity } from '../entities/city.entity';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityEntityMock]),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([cityEntityMock]),
            findOne: jest.fn().mockResolvedValue(cityEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return findCityById', async () => {
    const city = await service.findCityById(cityEntityMock.id);
    expect(city).toEqual(cityEntityMock);
  });

  it('should return error findOne not found', async () => {
    jest.spyOn(cityRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.findCityById(cityEntityMock.id)).rejects.toThrow();
  });

  it('should return Cities in getAllCity', async () => {
    const city = await service.getAllCity();

    expect(city).toEqual([cityEntityMock]);
  });

  it('should return error getAllCity in exception', async () => {
    jest.spyOn(cityRepository, 'find').mockRejectedValueOnce(new Error());

    expect(service.getAllCity()).rejects.toThrow();
  });

  it('should return Cities in getAllCitiesByStateId', async () => {
    const city = await service.getAllCitiesByStateId(cityEntityMock.id);

    expect(city).toEqual([cityEntityMock]);
  });

  // it('should return error getAllCitiesByStateId in exception', async () => {
  //   jest.spyOn(cityRepository, 'find').mockRejectedValueOnce(new Error());

  //   expect(
  //     service.getAllCitiesByStateId(cityEntityMock.stateId),
  //   ).rejects.toThrow();
  // });
});
