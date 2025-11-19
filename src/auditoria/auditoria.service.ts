import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditoriaAlteracao, OperacaoAuditoria } from './entities/auditoria-alteracao.entity';

@Injectable()
export class AuditoriaService {
  constructor(
    @InjectRepository(AuditoriaAlteracao)
    private readonly repo: Repository<AuditoriaAlteracao>,
  ) {}

  /**
   * Registra uma operação de INSERT na auditoria
   */
  async registrarInsert(
    tabela: string,
    registroId: number,
    dadosDepois: any,
    usuarioId?: number,
  ): Promise<AuditoriaAlteracao> {
    const auditoria = this.repo.create({
      tabela,
      registroId,
      operacao: OperacaoAuditoria.INSERT,
      dadosDepois: this.sanitizeData(dadosDepois),
      usuarioId,
    });

    return this.repo.save(auditoria);
  }

  /**
   * Registra uma operação de UPDATE na auditoria
   */
  async registrarUpdate(
    tabela: string,
    registroId: number,
    dadosAntes: any,
    dadosDepois: any,
    usuarioId?: number,
  ): Promise<AuditoriaAlteracao> {
    const auditoria = this.repo.create({
      tabela,
      registroId,
      operacao: OperacaoAuditoria.UPDATE,
      dadosAntes: this.sanitizeData(dadosAntes),
      dadosDepois: this.sanitizeData(dadosDepois),
      usuarioId,
    });

    return this.repo.save(auditoria);
  }

  /**
   * Registra uma operação de DELETE na auditoria
   */
  async registrarDelete(
    tabela: string,
    registroId: number,
    dadosAntes: any,
    usuarioId?: number,
  ): Promise<AuditoriaAlteracao> {
    const auditoria = this.repo.create({
      tabela,
      registroId,
      operacao: OperacaoAuditoria.DELETE,
      dadosAntes: this.sanitizeData(dadosAntes),
      usuarioId,
    });

    return this.repo.save(auditoria);
  }

  /**
   * Busca histórico de auditoria de um registro específico
   */
  async buscarHistorico(
    tabela: string,
    registroId: number,
  ): Promise<AuditoriaAlteracao[]> {
    return this.repo.find({
      where: { tabela, registroId },
      order: { auditTimestamp: 'DESC' },
      relations: ['usuario'],
    });
  }

  /**
   * Busca histórico de auditoria de um usuário
   */
  async buscarHistoricoPorUsuario(
    usuarioId: number,
    limit: number = 100,
  ): Promise<AuditoriaAlteracao[]> {
    return this.repo.find({
      where: { usuarioId },
      order: { auditTimestamp: 'DESC' },
      take: limit,
      relations: ['usuario'],
    });
  }

  /**
   * Remove dados sensíveis e formata o objeto para JSON
   */
  private sanitizeData(data: any): any {
    if (!data) return null;

    // Remove campos sensíveis como senhas
    const sensitiveFields = ['senha', 'password', 'token', 'secret'];
    const sanitized = { ...data };

    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '***REDACTED***';
      }
    }

    // Remove relações circulares e formata para JSON
    return JSON.parse(JSON.stringify(sanitized));
  }
}

