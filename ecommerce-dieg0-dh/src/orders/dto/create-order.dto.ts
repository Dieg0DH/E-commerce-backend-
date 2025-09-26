import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  products: string[];
}
