import { UserType } from '../enum/user-type.enum';
import { UserEntity } from '../interfaces/user.entity';

export const userEntityMock: UserEntity = {
  cpf: '123543543',
  createdAt: new Date(),
  email: 'emailmock@gmail.com',
  id: 8377,
  name: 'nameMock',
  password: 'passwordLarge',
  phone: '45991196356',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
