import { Controller, Get, Param } from '@nestjs/common';
import { BranchService } from './branch.service';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get(':isbn')
  search(@Param('isbn') isbn: string) {
    return this.branchService.searchByIsbn(isbn);
  }
}
