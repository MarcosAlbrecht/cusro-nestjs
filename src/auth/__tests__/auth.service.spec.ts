import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { ReturnUserDto } from '../../user/dtos/returnUser.dto';
import { UserService } from '../../user/user.service';
import { jwtMock } from '../__mocks__/auth.mock';
import { loginUserMock } from '../__mocks__/loging-user.mock';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            useValue: {
              findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            useValue: {
              sign: () => jwtMock,
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user if password and email valid', async () => {
    const user = await service.login(loginUserMock);
    expect(user).toEqual({
      accessToken: jwtMock,
      user: new ReturnUserDto(userEntityMock),
    });
  });
});
