import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from './entities/inventory-item.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem)
    private repo: Repository<InventoryItem>,
  ) {}

  // Para descargar todo el inventario (Sincronización manual/automática)
  findAll() {
    return this.repo.find();
  }

  // Para actualizar existencias desde la App
  async updateQuantity(id: number, quantity: number) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException('Producto no encontrado');

    item.quantity = quantity;
    return this.repo.save(item);
  }

  // Este te servirá para el SEEDER que hicimos antes
  async create(data: Partial<InventoryItem>) {
    const newItem = this.repo.create(data);
    return this.repo.save(newItem);
  }
}
