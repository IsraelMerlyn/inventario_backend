import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { InventoryService } from './inventory/inventory.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  try {
    const usersService = app.get(UsersService);
    const inventoryService = app.get(InventoryService);

    // Seeder de Usuario
    const adminEmail = 'admin@testinventory.local';
    const existingUser = await usersService.findOneByEmail(adminEmail);
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('Test1234*', 10);
      await usersService.create({
        name: 'Admin User',
        email: adminEmail,
        password_hash: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Usuario de prueba creado');
    }

    //  Seeder de Inventario
    const existingItems = await inventoryService.findAll();
    if (existingItems.length === 0) {
      const demoProducts = [
        {
          sku: 'LAP-001',
          name: 'Laptop Dell XPS',
          category: 'Electrónica',
          unit: 'PZ',
          quantity: 15,
        },
        {
          sku: 'MOU-002',
          name: 'Mouse Logitech',
          category: 'Accesorios',
          unit: 'PZ',
          quantity: 50,
        },
        {
          sku: 'MON-003',
          name: 'Monitor 27" LG',
          category: 'Electrónica',
          unit: 'PZ',
          quantity: 8,
        },
      ];
      for (const prod of demoProducts) {
        await inventoryService.create(prod);
      }
      console.log('📦 Productos de prueba insertados');
    }
  } catch (error) {
    console.error(
      '️ Error en el seeder, pero el servidor intentará arrancar:',
      error.message,
    );
  }

  await app.listen(3000);
  console.log('🚀 Servidor corriendo en http://localhost:3000');
}
bootstrap();
