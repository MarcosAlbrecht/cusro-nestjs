import { UserEntity } from 'src/user/interfaces/user.entity';

export class LoginPayload {
  id: number;
  type: number;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.type = user.typeUser;
  }
}
