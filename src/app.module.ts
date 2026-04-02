import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import { InventoryItem } from './inventory/entities/inventory-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Cambia por tus datos
      password: 'TuPass123!',
      database: 'inventario',
      entities: [InventoryItem],
      synchronize: true, // Auto-crea las tablas (solo para desarrollo) [cite: 25]
    }),
    InventoryModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
