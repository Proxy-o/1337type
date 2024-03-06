import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from './strategies/jwt.strategy';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.findUserByUsername(user.login);

    if (!userExists) {
      await this.usersService.createUser({
        login: user.login,
        avatar: user.image.link,
        email: user.email,
      });
    }

    return this.generateJwt({
      login: user.login,
      password: user.id,
    });
  }

  async findUserByUsername(login: string) {
    const user = await this.usersService.user({ login });

    if (!user) {
      return null;
    }

    return user;
  }

  generateJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  verify(token: string) {
    return this.jwtService.verify(token);
  }
}
