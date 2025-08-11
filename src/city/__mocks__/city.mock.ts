import { stateEntityMock } from '../../state/__mocks__/state.mock';
import { CityEntity } from '../entities/city.entity';

export const cityEntityMock: CityEntity = {
  id: 321,
  name: 'cityNameMock',
  stateId: stateEntityMock.id,
  createdAt: new Date(),

  updatedAt: new Date(),
};
