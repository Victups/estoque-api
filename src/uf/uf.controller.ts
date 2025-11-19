import { Controller, Get, Param } from '@nestjs/common';
import { UfService } from './uf.service';

@Controller('uf')
export class UfController {
  constructor(private readonly ufService: UfService) {}

  @Get()
  findAll() {
    return this.ufService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ufService.findOne(+id);
  }
}

