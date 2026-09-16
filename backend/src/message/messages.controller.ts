import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { MessagesService } from './messages.service';
import { CreateMessageDto } from '../dto/request.dto'
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: CreateMessageDto,
    @Request() request: any,
  ) {
    return this.messagesService.create(
      body,
      request.user.id,
    );
  }
}