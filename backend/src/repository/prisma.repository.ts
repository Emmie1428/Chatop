import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  //Chercher un utilisateur avec son email//
  async findUserByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  //Créer un utilisateur//
  async createUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return this.prisma.users.create({
      data,
    });
  }
}