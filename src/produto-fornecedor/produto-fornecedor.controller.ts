import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutoFornecedorService } from './produto-fornecedor.service';
import { CreateProdutoFornecedorDto } from './dto/create-produto-fornecedor.dto';
import { UpdateProdutoFornecedorDto } from './dto/update-produto-fornecedor.dto';

@Controller('produto-fornecedor')
export class ProdutoFornecedorController {
  constructor(private readonly produtoFornecedorService: ProdutoFornecedorService) {}

  @Post()
  create(@Body() createProdutoFornecedorDto: CreateProdutoFornecedorDto) {
    return this.produtoFornecedorService.create(createProdutoFornecedorDto);
  }

  @Get()
  findAll() {
    return this.produtoFornecedorService.findAll();
  }

  @Get(':idProduto/:idFornecedor')
  findOne(
    @Param('idProduto') idProduto: string,
    @Param('idFornecedor') idFornecedor: string,
  ) {
    return this.produtoFornecedorService.findOne(+idProduto, +idFornecedor);
  }

  @Patch(':idProduto/:idFornecedor')
  update(
    @Param('idProduto') idProduto: string,
    @Param('idFornecedor') idFornecedor: string,
    @Body() updateProdutoFornecedorDto: UpdateProdutoFornecedorDto,
  ) {
    return this.produtoFornecedorService.update(+idProduto, +idFornecedor, updateProdutoFornecedorDto);
  }

  @Delete(':idProduto/:idFornecedor')
  remove(
    @Param('idProduto') idProduto: string,
    @Param('idFornecedor') idFornecedor: string,
  ) {
    return this.produtoFornecedorService.remove(+idProduto, +idFornecedor);
  }
}
