import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaRepository } from '../repository/prisma.repository';
import { CreateMessageDto } from '../dto/request.dto'

@Injectable()
export class MessagesService {
  constructor(private readonly repository: PrismaRepository) {}

  async create(data: CreateMessageDto, userId: number) {
    const rental = await this.repository.findRentalById(data.rental_id,);

    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    //Empêche d'envoyer un message à une user qui n,est pas le proprio de l'annonce//
    if (rental.owner_id !== data.user_id) {
      throw new ForbiddenException('Destinataire invalide');
    }

    await this.repository.createMessage({
      rental_id: data.rental_id,
      user_id: data.user_id,
      message: data.message,
    });

    return {
      message: 'Message sent!',
    };
  }
}