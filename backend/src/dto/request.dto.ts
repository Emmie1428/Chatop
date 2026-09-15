import { IsEmail, IsNotEmpty, IsString, MinLength, IsInt, Min, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class CreateMessageDto {
  @IsInt()
  @Min(1)
  rental_id: number;

  @IsInt()
  @Min(1)
  user_id: number;

  @IsString()
  @IsNotEmpty()
  message: string;
}

export class CreateRentalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  surface: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

//PartialType rend les porpriétés optionnlles, donc on peut juste modifier le prix si voulu//
export class UpdateRentalDto extends PartialType(CreateRentalDto) {}