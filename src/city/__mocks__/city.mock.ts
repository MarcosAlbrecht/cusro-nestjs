import { stateEntityMock } from '../../state/__mocks__/state.mock';
import { CityEntity } from '../entities/city.entity';

export const cityEntityMock: CityEntity = {
  id: 321321,
  createdAt: new Date(),
  name: 'cityNameMock',
  stateId: stateEntityMock.id,
  updatedAt: new Date(),
};
