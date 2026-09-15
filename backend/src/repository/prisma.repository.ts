import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaRepository {
    constructor(private readonly prisma: PrismaService) {}

    //Chercher un utilisateur avec son email pour POST /auth/login //
    async findUserByEmail(email: string) {
        return this.prisma.users.findUnique({
            where: { email },
        });
    }

    //Créer un utilisateur pour POST /auth/register //
    async createUser(data: {
        name: string;
        email: string;
        password: string;
    }) {
        return this.prisma.users.create({
        data,
        });
    }

    //Cherche un utilisateur par son id pour GET /iser/:id //
    async findUserById(id: number) {
        return this.prisma.users.findUnique({
            where: { id },
            select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true
            }, //select détermine les champs qu'il faut renvoyer, ne renvoie pas le mdp//
        });
    }

    //Cherche toutes les annonces pour GET /rentals //
    async findAllRentals() {
        return this.prisma.rentals.findMany({
            include: {
            users: {
                select: {
                id: true,
                name: true,
                },
            },
            },
        });
    }

    //cherche une annonce par son id pour GET /rentals/:id //
    async findRentalById(id: number) {
    return this.prisma.rentals.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

    //Crée une annonce de location pour POST /rentals//
    async createRental(data: {
        name: string;
        surface: number;
        price: number;
        picture?: string;
        description: string;
        owner_id: number;
    }) {
        return this.prisma.rentals.create({
            data,
        });
    }

    //Modifie une annonce de location pour PUT /rentals/:id //
    async updateRental(
        id: number,
        data: {
        name?: string;
        surface?: number;
        price?: number;
        picture?: string;
        description?: string;
        },
    ) {
        return this.prisma.rentals.update({
            where: { id },
            data,
        });
  }

    //Crée un message pour POST /messages//
    async createMessage(data: {
        rental_id: number;
        user_id: number;
        message: string;
    }) {
        return this.prisma.messages.create({
            data,
        });
    }
}