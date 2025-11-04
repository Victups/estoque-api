import { IsNumber, IsOptional } from 'class-validator';

export class CreateProdutoFornecedorDto {
  @IsNumber()
  id_produto: number;

  @IsNumber()
  id_fornecedor: number;

  @IsNumber()
  @IsOptional()
  usuario_log_id?: number;
}