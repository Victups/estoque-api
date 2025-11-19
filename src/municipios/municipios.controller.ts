import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MunicipiosService } from './municipios.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('municipios')
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) {}

  @Get()
  findAll() {
    return this.municipiosService.findAll();
  }

  @Get('uf/:ufId')
  findByUf(@Param('ufId') ufId: string) {
    return this.municipiosService.findByUf(+ufId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.municipiosService.findOne(+id);
  }
}

