import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('inventory')
@UseGuards(AuthGuard) // 🛡️ Protege todos los métodos de este controlador
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  // Endpoint para sincronización: GET /inventory [cite: 46]
  async findAll() {
    return await this.inventoryService.findAll();
  }

  @Patch(':id/quantity')
  // Endpoint para actualizar stock: PATCH /inventory/:id/quantity [cite: 33, 46]
  async updateQuantity(
    @Param('id', ParseIntPipe) id: number,
    @Body('quantity', ParseIntPipe) quantity: number,
  ) {
    return await this.inventoryService.updateQuantity(id, quantity);
  }
}
