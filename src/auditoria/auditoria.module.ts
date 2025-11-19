import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditoriaService } from './auditoria.service';
import { AuditoriaAlteracao } from './entities/auditoria-alteracao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditoriaAlteracao])],
  providers: [AuditoriaService],
  exports: [AuditoriaService],
})
export class AuditoriaModule {}

