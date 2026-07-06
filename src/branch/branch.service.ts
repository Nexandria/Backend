import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto, UpdateBranchDto, ListBranchDto, SetLibrarianDto } from './dto/branch.dto';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BranchService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBranchDto: CreateBranchDto): Promise<{ message: string }> {
    await this.prisma.branch.create({
      data: {
        name: createBranchDto.name,
        code: createBranchDto.code,
        locationX: createBranchDto.location.x,
        locationY: createBranchDto.location.y,
      },  
    });

    return { message: 'Biblioteca creada correctamente' };
  }

  async update(updateBranchDto: UpdateBranchDto): Promise<{ message: string }> {
    const branch = await this.prisma.branch.findUnique({
      where: {
        id: updateBranchDto.id,
      }
    });

    if (!branch) {
      throw new NotFoundException('Biblioteca no encontrada');
    }

    await this.prisma.branch.update({
      where: {
        id: updateBranchDto.id,
      },
      data: {
        name: updateBranchDto.name,
        code: updateBranchDto.code,
        locationX: updateBranchDto.location.x,
        locationY: updateBranchDto.location.y,
      },
    });

    return { message: 'Biblioteca actualizada correctamente' };
  }

  async list(listBranchDto: ListBranchDto): Promise<void> {
    if (listBranchDto.code) {
        return await this.prisma.branch.findMany({
            where: {
                code: listBranchDto.code,
            },
        });
    }

    return await this.prisma.branch.findMany();
  }

  async setLibrarian(setLibrarianDto: SetLibrarianDto): Promise<{ message: string }> {
    const branch = await this.prisma.branch.findUnique({
      where: {
        id: setLibrarianDto.branchId,
      },
    });

    if (!branch) {
      throw new NotFoundException('Biblioteca no encontrada');
    }

    await this.prisma.branch.update({
      where: {
        id: setLibrarianDto.branchId,
      },
      data: {
        librarianEmail: setLibrarianDto.librarianEmail,
      },
    });

    return { message: 'Bibliotecario asignado correctamente' };
  }
}
