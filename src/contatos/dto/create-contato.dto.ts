import { IsString, IsNotEmpty, MaxLength, IsBoolean, IsOptional } from 'class-validator';

export class CreateContatoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nome: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  valor?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  tipo_contato?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  codigo_pais?: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}