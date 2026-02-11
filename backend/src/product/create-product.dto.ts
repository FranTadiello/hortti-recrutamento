import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @Type(() => Number)
  @IsNumber()
  stock: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  volume?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

}
