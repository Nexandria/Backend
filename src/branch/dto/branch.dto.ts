import { IsString, IsNotEmpty, IsNumber, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @IsNumber()
  @IsNotEmpty()
  x!: number;

  @IsNumber()
  @IsNotEmpty()
  y!: number;
}

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsEmail()
  adminSed!: string;

  @ValidateNested()
  @Type(() => LocationDto)
  @IsNotEmpty()
  location!: LocationDto;
}

export class UpdateBranchDto extends CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  id!: string;
}

export class ListBranchDto {
  @IsString()
  code!: string;
}

export class SetLibrarianDto {
  @IsString()
  @IsNotEmpty()
  branchId!: string;
  
  @IsEmail()
  @IsNotEmpty()
  librarianEmail!: string;
}