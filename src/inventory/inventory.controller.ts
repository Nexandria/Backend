import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AddItemsDto, ListItemDto, RemoveItemDto } from './dto/inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('add')
  create(@Body() addItemsDto: AddItemsDto) {
    return this.inventoryService.addItems(addItemsDto);
  }

  @Post('remove')
  remove(@Body() removeItemDto: RemoveItemDto) {
    return this.inventoryService.removeItem(removeItemDto);
  }

  @Get('list')
  list(@Body() listItemDto: ListItemDto) {
    return this.inventoryService.list(listItemDto);
  }
}
