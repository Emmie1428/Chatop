import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class CreateRentalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  surface: number;

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