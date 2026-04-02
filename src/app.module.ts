// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module'; // Importa el módulo
import { InventoryModule } from './inventory/inventory.module'; // Importa el módulo
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity'; // Importa la entidad
import { InventoryItem } from './inventory/entities/inventory-item.entity'; // Importa la entidad

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'TuPass123!',
      database: 'inventario',
      entities: [User, InventoryItem], // Creamos las tablas del Usuario y del Inventario
      synchronize: true, //  crea las tablas automáticamente
    }),
    UsersModule,
    InventoryModule,
    AuthModule,
  ],
})
export class AppModule {}
