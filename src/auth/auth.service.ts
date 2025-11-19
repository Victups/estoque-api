import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<Usuario> {
    const usuario = await this.usuariosRepo.findOne({
      where: { email },
      relations: ['contato'],
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (!usuario.senha) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (!usuario.senha.startsWith('$2')) {
      if (usuario.senha !== senha) {
        throw new UnauthorizedException('Credenciais inválidas');
      }
      const hashed = await bcrypt.hash(
        senha,
        Number(process.env.BCRYPT_SALT_ROUNDS ?? 10),
      );
      await this.usuariosRepo.update({ id: usuario.id }, { senha: hashed });
      usuario.senha = hashed;
    } else {
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        throw new UnauthorizedException('Credenciais inválidas');
      }
    }

    return usuario;
  }

  async login({ email, senha }: LoginDto) {
    const usuario = await this.validateUser(email.toLowerCase(), senha);

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    };
  }

}