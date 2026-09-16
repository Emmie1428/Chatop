import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
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

    //Envoie un message au propriétaire d'une location//
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
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