import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroMovimentacao } from './entities/registro-movimentacao.entity';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';

@Injectable()
export class EstoquesService {
	constructor(
		@InjectRepository(RegistroMovimentacao)
		private readonly repo: Repository<RegistroMovimentacao>,
	) {}

	async create(createEstoqueDto: CreateEstoqueDto): Promise<RegistroMovimentacao> {
		const estoque = this.repo.create(createEstoqueDto);
		return this.repo.save(estoque);
	}

	async findAll(): Promise<RegistroMovimentacao[]> {
		return this.repo.find();
	}

	async findOne(id: number): Promise<RegistroMovimentacao> {
		const estoque = await this.repo.findOne({ where: { id } });
		if (!estoque) {
			throw new NotFoundException(`Registro de estoque com id ${id} não encontrado`);
		}
		return estoque;
	}

	async update(id: number, updateEstoqueDto: UpdateEstoqueDto): Promise<RegistroMovimentacao> {
		const estoque = await this.repo.preload({
			id,
			...updateEstoqueDto,
		});
		if (!estoque) {
			throw new NotFoundException(`Registro de estoque com id ${id} não encontrado`);
		}
		return this.repo.save(estoque);
	}

	async remove(id: number): Promise<void> {
		const estoque = await this.findOne(id);
		await this.repo.remove(estoque);
	}
}
