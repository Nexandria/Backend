import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateBranchDto, UpdateBranchDto, ListBranchDto, SetLibrarianDto } from './dto/inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('create')
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @Post('update')
  update(@Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(updateBranchDto);
  }

  @Get('list')
  list(@Body() listBranchDto: ListBranchDto) {
    return this.branchService.list(listBranchDto);
  }  

  @Post('create')
  setLibrarian(@Body() setLibrarianDto: SetLibrarianDto) {
    return this.branchService.setLibrarian(setLibrarianDto);
  }
}
