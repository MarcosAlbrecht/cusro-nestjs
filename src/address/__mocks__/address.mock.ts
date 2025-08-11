import { AddressEntity } from '../../address/entities/address.entity';
import { cityEntityMock } from '../../city/__mocks__/city.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';

export const addressEntityMock: AddressEntity = {
  id: 321321,
  createdAt: new Date(),
  cep: '65454654',
  complement: 'addressMockComplement',
  numberAddress: 32,
  userId: userEntityMock.id,
  cityId: cityEntityMock.id,
  updatedAt: new Date(),
};
