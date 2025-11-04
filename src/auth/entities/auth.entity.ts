import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  active: boolean;
}
