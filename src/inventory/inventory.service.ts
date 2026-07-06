import { Injectable, NotFoundException } from '@nestjs/common';
import { AddItemsDto, UpdateItemDto, RemoveItemDto, ListItemDto } from './dto/inventory.dto';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async addItems(addItemDtos: AddItemsDto): Promise<{ message: string, addedItems: string[] }> {
    const result = await this.prisma.inventory.createMany({
      data: addItemDtos.items.map((item) => ({
        branchId: addItemDtos.branchId,
        type: item.type,
        title: item.title,
        author: item.author,
        barCode: item.barCode,
        padreId: item.padreId,
        isbn: item.isbn,
      }))
    })

    return result;
  }

  async removeItem(removeItemDto: RemoveItemDto): Promise<{ message: string }> {
    await this.prisma.inventory.delete({
      where: {
        id: removeItemDto.itemId
      }
    });

    return { message: 'Item eliminado correctamente' };
  }

  async list(listItemDto: ListItemDto): Promise<any[]> {
    if (listItemDto.itemId) {
      return await this.prisma.inventory.findMany({
        where: {
          itemId: listItemDto.itemId
        }
      });
    }
    
    return await this.prisma.inventory.findMany();
  }
}
