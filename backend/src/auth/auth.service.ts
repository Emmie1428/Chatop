import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../user/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(body.email);

    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await this.usersService.createUser({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async login(body: LoginDto) {
    const user = await this.usersService.findByEmail(body.email);

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const passwordValid = await bcrypt.compare(
      body.password,
      user.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}