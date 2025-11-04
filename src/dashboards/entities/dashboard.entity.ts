import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('dashboards')
export class Dashboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 500, nullable: true })
  description?: string;

  @Column({ nullable: true })
  ownerId?: number;

  @Column({ default: false })
  isPublic: boolean;

  @ManyToOne(() => Usuario, { nullable: true })
  owner?: Usuario;
}
