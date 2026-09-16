import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaRepository } from '../repository/prisma.repository';
import { CreateRentalDto, UpdateRentalDto } from '../dto/request.dto'

@Injectable()
export class RentalsService {
  constructor(private readonly repository: PrismaRepository) {}

  async findAll() {
    const rentals = await this.repository.findAllRentals();

    return {
      rentals: rentals.map((rental) => ({
        id: rental.id,
        name: rental.name,
        surface: Number(rental.surface),
        price: Number(rental.price),
        picture: rental.picture ? `http://localhost:3001/uploads/${rental.picture}` : '',
        description: rental.description,
        owner: {
          id: rental.users.id,
          name: rental.users.name,
        },
        created_at: rental.created_at,
        updated_at: rental.updated_at,
      })),
    };
  }

  async findById(id: number) {
    const rental = await this.repository.findRentalById(id);

    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    return {
      id: rental.id,
      name: rental.name,
      surface: Number(rental.surface),
      price: Number(rental.price),
      picture: rental.picture ? `http://localhost:3001/uploads/${rental.picture}` : '',
      description: rental.description,
      owner: {
        id: rental.users.id,
        name: rental.users.name,
      },
      created_at: rental.created_at,
      updated_at: rental.updated_at,
    };
  }

  async create(data: CreateRentalDto, userId: number) {
    await this.repository.createRental({
      ...data,
      owner_id: userId,
    });

    return {
      message: 'Rental created!',
    };
  }

  async update(
    id: number,
    data: UpdateRentalDto,
    userId: number,
  ) {
    const rental = await this.repository.findRentalById(id);

    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    //Empêche un user de modifier una annonce qui n'a pas été créée par lui//
    if (rental.owner_id !== userId) {
      throw new ForbiddenException(
        'Vous ne pouvez pas modifier cette location',
      );
    }

    await this.repository.updateRental(id, data);

    return {
      message: 'Rental updated!',
    };
  }
}