import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from './entities/marca.entity';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marca)
    private readonly repo: Repository<Marca>,
  ) {}

  async create(createMarcaDto: CreateMarcaDto): Promise<Marca> {
    const marca = this.repo.create(createMarcaDto);
    return this.repo.save(marca);
  }

  async findAll(): Promise<Marca[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Marca> {
    const marca = await this.repo.findOne({ where: { id } });
    if (!marca) {
      throw new NotFoundException(`Marca com id ${id} não encontrada`);
    }
    return marca;
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto): Promise<Marca> {
    const marca = await this.repo.preload({
      id,
      ...updateMarcaDto,
    });
    if (!marca) {
      throw new NotFoundException(`Marca com id ${id} não encontrada`);
    }
    return this.repo.save(marca);
  }

  async remove(id: number): Promise<void> {
    const marca = await this.findOne(id);
    await this.repo.remove(marca);
  }
}