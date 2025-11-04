import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly repo: Repository<Auth>,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    const auth = this.repo.create(createAuthDto);
    return this.repo.save(auth);
  }

  async findAll(): Promise<Auth[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Auth> {
    const auth = await this.repo.findOne({ where: { id } });
    if (!auth) {
      throw new NotFoundException(`Auth with ID ${id} not found`);
    }
    return auth;
  }

  async update(id: number, updateAuthDto: UpdateAuthDto): Promise<Auth> {
    const auth = await this.repo.preload({
      id: id,
      ...updateAuthDto,
    });
    if (!auth) {
      throw new NotFoundException(`Auth with ID ${id} not found`);
    }
    return this.repo.save(auth);
  }

  async remove(id: number): Promise<void> {
    const auth = await this.findOne(id);
    await this.repo.remove(auth);
  }
}
