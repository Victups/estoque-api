import { IsNumber, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEstoqueDto {
  @IsNumber()
  @IsOptional()
  quantidade?: number;

  @IsNumber()
  @IsOptional()
  id_produto?: number;

  @IsNumber()
  @IsOptional()
  id_lote?: number;

  @IsNumber()
  @IsOptional()
  id_deposito?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataCriacao?: Date;
}