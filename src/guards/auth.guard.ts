import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { authorization } = context.switchToHttp().getRequest().headers;

    if (!authorization) {
      throw new UnauthorizedException();
    }
    try {
      await this.jwtService.verifyAsync(authorization, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
