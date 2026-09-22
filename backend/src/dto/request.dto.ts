import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsInt,
  Min,
  IsNumber,
  IsOptional,
} from 'class-validator';

import { Type } from 'class-transformer';

import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';


export class LoginDto {
  @ApiProperty({
    example: 'test@test.com',
    description: 'Adresse email de l’utilisateur',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Mot de passe de l’utilisateur',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}


export class RegisterDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nom de l’utilisateur',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@test.com',
    description: 'Adresse email de l’utilisateur',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Mot de passe de l’utilisateur',
  })
  @IsString()
  @MinLength(6)
  password: string;
}


export class CreateMessageDto {
  @ApiProperty({
    example: 1,
    description: 'Identifiant de la location',
  })
  @IsInt()
  @Min(1)
  rental_id: number;

  @ApiProperty({
    example: 1,
    description: 'Identifiant de l’utilisateur',
  })
  @IsInt()
  @Min(1)
  user_id: number;

  @ApiProperty({
    example: 'Bonjour, je suis intéressé par cette location.',
    description: 'Contenu du message',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}


export class CreateRentalDto {
  @ApiProperty({
    example: 'Appartement lumineux',
    description: 'Nom de la location',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 50,
    description: 'Surface de la location en m²',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  surface: number;

  @ApiProperty({
    example: 1200,
    description: 'Prix de la location',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'URL de l’image de la location',
  })
  @IsOptional()
  @IsString()
  picture?: string;

  @ApiProperty({
    example: 'Appartement situé au centre-ville.',
    description: 'Description de la location',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

//PartialType rend les porpriétés optionnlles, donc on peut juste modifier le prix si voulu//
export class UpdateRentalDto extends PartialType(CreateRentalDto) {}