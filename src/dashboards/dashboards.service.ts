import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { Dashboard } from './entities/dashboard.entity';

@Injectable()
export class DashboardsService {
  constructor(
    @InjectRepository(Dashboard)
    private readonly repo: Repository<Dashboard>,
  ) {}
  async create(createDashboardDto: CreateDashboardDto): Promise<Dashboard> {
    const dashboard = this.repo.create(createDashboardDto);
    return this.repo.save(dashboard);
  }

  async findAll(): Promise<Dashboard[]> {
    return this.repo.find({
      relations: ['owner']
    });
  }

  async findOne(id: number): Promise<Dashboard> {
    const dashboard = await this.repo.findOne({ 
      where: { id },
      relations: ['owner']
    });
    if (!dashboard) {
      throw new NotFoundException(`Dashboard with ID ${id} not found`);
    }
    return dashboard;
  }

  async update(id: number, updateDashboardDto: UpdateDashboardDto): Promise<Dashboard> {
    const dashboard = await this.repo.preload({
      id: id,
      ...updateDashboardDto,
    });
    if (!dashboard) {
      throw new NotFoundException(`Dashboard with ID ${id} not found`);
    }
    return this.repo.save(dashboard);
  }

  async remove(id: number): Promise<void> {
    const dashboard = await this.findOne(id);
    await this.repo.remove(dashboard);
  }
}
