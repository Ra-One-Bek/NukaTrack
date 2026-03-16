import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    const hash = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      passwordHash: hash,
    });

    return user;
  }

  async me(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
    };
    }

  async login(data: any) {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const valid = await bcrypt.compare(data.password, user.passwordHash);

    if (!valid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const token = await this.jwtService.signAsync({
      userId: user.id,
      email: user.email,
    });

    return {
      access_token: token,
    };
  }
}