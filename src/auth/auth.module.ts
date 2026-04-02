import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // 👈 Importa el módulo
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule, //importamos el módulo de usuarios
    JwtModule.register({
      global: true,
      secret: '[pruebaTecnica]', //Clave secreta
      signOptions: { expiresIn: '1d' }, // El token dura un día
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
