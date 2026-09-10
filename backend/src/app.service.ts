import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHello(): Promise<string> {
    const usersCount = await this.prisma.users.count();

    return `Connexion Prisma OK - NOMBRE d'utilisateurs : ${usersCount}`;
  }
}