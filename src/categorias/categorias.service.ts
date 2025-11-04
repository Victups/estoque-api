import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriasRepository.create(createCategoriaDto);
    return this.categoriasRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriasRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoria com id ${id} não encontrada`);
    }
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.categoriasRepository.preload({
      id,
      ...updateCategoriaDto,
    });
    if (!categoria) {
      throw new NotFoundException(`Categoria com id ${id} não encontrada`);
    }
    return this.categoriasRepository.save(categoria);
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);
    await this.categoriasRepository.remove(categoria);
  }
}
