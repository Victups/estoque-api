import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnidadeMedida } from './entities/unidade-medida.entity';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';

@Injectable()
export class UnidadesService {
  constructor(
    @InjectRepository(UnidadeMedida)
    private readonly repo: Repository<UnidadeMedida>,
  ) {}

  async create(createUnidadeDto: CreateUnidadeDto): Promise<UnidadeMedida> {
    const unidade = this.repo.create(createUnidadeDto);
    return this.repo.save(unidade);
  }

  async findAll(): Promise<UnidadeMedida[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<UnidadeMedida> {
    const unidade = await this.repo.findOne({ where: { id } });
    if (!unidade) {
      throw new NotFoundException(`Unidade de medida com id ${id} não encontrada`);
    }
    return unidade;
  }

  async update(id: number, updateUnidadeDto: UpdateUnidadeDto): Promise<UnidadeMedida> {
    const unidade = await this.repo.preload({
      id,
      ...updateUnidadeDto,
    });
    if (!unidade) {
      throw new NotFoundException(`Unidade de medida com id ${id} não encontrada`);
    }
    return this.repo.save(unidade);
  }

  async remove(id: number): Promise<void> {
    const unidade = await this.findOne(id);
    await this.repo.remove(unidade);
  }
}