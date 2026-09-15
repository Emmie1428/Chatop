import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

import { UsersController } from './user/users.controller';
import { UsersService } from './user/users.service';

import { RentalsController } from './rental/rentals.controller';
import { RentalsService } from './rental/rentals.service';

import { MessagesController } from './message/messages.controller';
import { MessagesService } from './message/messages.service';

import { PrismaRepository } from './repository/prisma.repository';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
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
    })
  ],

  controllers: [
    AppController,
    AuthController,
    UsersController,
    RentalsController,
    MessagesController,
  ],

  providers: [
    AppService,
    PrismaService,
    PrismaRepository,
    AuthService,
    UsersService,
    RentalsService,
    MessagesService,
  ],
})
export class AppModule {}