import {
  Controller,
  createParamDecorator,
  ExecutionContext,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const User = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    context.switchToHttp().getRequest().user,
);

@Controller('users')
export class UsersController {
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@User() user: unknown) {
    return user;
  }
}