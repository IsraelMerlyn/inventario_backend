import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    // Verificamos si el usuario existe. Si no, lanzamos el error
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // si el  'user' existe, así que no dará error en 'user.password_hash'
    const isMatch = await bcrypt.compare(pass, user.password_hash);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, username: user.email, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
