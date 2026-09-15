import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { RentalsService } from './rentals.service';
import { CreateRentalDto, UpdateRentalDto } from '../dto/request.dto'
import { JwtAuthGuard } from '../auth/jwt.guard';
import { diskStorage } from 'multer';

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
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

          cb(
            null,
            `${uniqueSuffix}-${file.originalname}`,
          );
        },
      }),
    }),
  )
  async create(
    @UploadedFile() picture: Express.Multer.File,
    @Body() body: CreateRentalDto,
    @Request() request: any,
  ) {
    return this.rentalsService.create(
      {
        ...body,
        picture: picture?.filename,
      },
      request.user.id,
    );
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