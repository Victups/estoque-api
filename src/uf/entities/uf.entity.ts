import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Municipio } from '../../municipios/entities/municipio.entity';

@Entity('uf')
export class Uf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 2, unique: true })
  sigla: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ default: true })
  ativo: boolean;

  @OneToMany(() => Municipio, (municipio) => municipio.uf, { cascade: false })
  municipios?: Municipio[];
}

