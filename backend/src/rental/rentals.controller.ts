import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.rentalsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.rentalsService.findById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: CreateRentalDto,
    @Request() request: any,
  ) {
    return this.rentalsService.create(body, request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateRentalDto,
    @Request() request: any,
  ) {
    return this.rentalsService.update(
      Number(id),
      body,
      request.user.id,
    );
  }
}