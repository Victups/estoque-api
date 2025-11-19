import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Uf } from './entities/uf.entity';

@Injectable()
export class UfService {
  constructor(
    @InjectRepository(Uf)
    private readonly repo: Repository<Uf>,
  ) {}

  async findAll(): Promise<Uf[]> {
    return this.repo.find({
      order: { sigla: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Uf> {
    const uf = await this.repo.findOne({ where: { id } });
    if (!uf) {
      throw new NotFoundException(`UF com id ${id} não encontrada`);
    }
    return uf;
  }
}

