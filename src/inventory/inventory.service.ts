import { Injectable, NotFoundException } from '@nestjs/common';
import { AddItemsDto, UpdateItemDto, RemoveItemDto, SearchItemDto } from './dto/inventory.dto';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async addItems(addItemDtos: AddItemsDto[]): Promise<{ message: string, addedItems: string[] }> {
    return 
  }

}
