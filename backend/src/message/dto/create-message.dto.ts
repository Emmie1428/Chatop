import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

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