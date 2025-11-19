import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Uf } from '../../uf/entities/uf.entity';
import { Endereco } from '../../enderecos/entities/endereco.entity';

@Entity('municipio')
export class Municipio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ name: 'id_uf' })
  idUf: number;

  // REMOVIDO: bairro

  @Column({ default: true })
  ativo: boolean;

  @ManyToOne(() => Uf, (uf) => uf.municipios, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_uf' })
  uf: Uf;

  @OneToMany(() => Endereco, (endereco) => endereco.municipio, { cascade: false })
  enderecos?: Endereco[];
}

