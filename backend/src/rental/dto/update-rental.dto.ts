import { PartialType } from '@nestjs/swagger';
import { CreateRentalDto } from './create-rental.dto';

//PartialType rend les porpriétés optionnlles, donc on peut juste modifier le prix si voulu//
export class UpdateRentalDto extends PartialType(CreateRentalDto) {}