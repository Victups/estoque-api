import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Deposito } from '../../depositos/entities/deposito.entity';
import { Municipio } from '../../municipios/entities/municipio.entity';

@Entity('enderecos')
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  logradouro: string;

  @Column({ length: 20, nullable: true })
  numero?: string;

  @Column({ length: 255, nullable: true })
  complemento?: string;

  @Column({ length: 150, nullable: true })  // NOVO
  bairro?: string;

  @Column({ name: 'id_municipio', nullable: true })
  idMunicipio?: number;

  @Column({ default: true })
  ativo: boolean;

  @OneToMany(() => Deposito, (d) => d.endereco, { cascade: false })
  depositos?: Deposito[];

  @ManyToOne(() => Municipio, (municipio) => municipio.enderecos, { nullable: true, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_municipio' })
  municipio?: Municipio;
}
