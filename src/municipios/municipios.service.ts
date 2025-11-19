import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipio } from './entities/municipio.entity';

@Injectable()
export class MunicipiosService {
  constructor(
    @InjectRepository(Municipio)
    private readonly repo: Repository<Municipio>,
  ) {}

  async findAll(): Promise<Municipio[]> {
    return this.repo.find({
      relations: ['uf'],
      order: { nome: 'ASC' },
    });
  }

  async findByUf(ufId: number): Promise<Municipio[]> {
    return this.repo.find({
      where: { idUf: ufId },
      relations: ['uf'],
      order: { nome: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Municipio> {
    const municipio = await this.repo.findOne({
      where: { id },
      relations: ['uf'],
    });

    if (!municipio) {
      throw new NotFoundException(`Município com id ${id} não encontrado`);
    }

    return municipio;
  }
}

