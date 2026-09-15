import { Injectable } from '@nestjs/common';

import { PrismaRepository } from '../repository/prisma.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: PrismaRepository) {}

  async findByEmail(email: string) {
    return this.repository.findUserByEmail(email);
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return this.repository.createUser(data);
  }

  async findById(id: number) {
    return this.repository.findUserById(id);
  }
}