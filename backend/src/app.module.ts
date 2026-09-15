import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

import { UsersService } from './user/users.service';
import { UsersController } from './user/users.controller';

import { PrismaRepository } from './repository/prisma.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],

  controllers: [
    AppController,
    AuthController,
    UsersController,
  ],

  providers: [
    AppService,
    PrismaService,
    PrismaRepository,
    AuthService,
    UsersService,
  ],
})
export class AppModule {}