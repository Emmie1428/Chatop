import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async register(body: { name: string; email: string; password: string }) {
    return {
      message: 'register OK',
      user: body,
    };
  }

  async login(body: { email: string; password: string }) {
    return {
      message: 'login OK',
      credentials: body,
    };
  }
}