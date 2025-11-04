import { IsString, IsNotEmpty, MaxLength, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateEnderecoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  logradouro: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  numero?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  complemento?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  cep: string;

  @IsNumber()
  @IsOptional()
  id_municipio?: number;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}