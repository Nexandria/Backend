import { IsString, IsNotEmpty, IsEnum, IsEmail, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export enum ItemType {
    BOOK = 'book',
    ITEM = 'item',
}

export class ItemDto {
  @IsEnum(ItemType)
  @IsNotEmpty()
  type!: ItemType;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  barCode!: string;

  @IsString()
  padreId!: string;

  @IsString()
  isbn!: string;

  @IsString()
  author!: string;
}

export class AddItemsDto {
  @IsString()
  @IsNotEmpty()
  branchId!: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items!: ItemDto[];
}

export class RemoveItemDto {
  @IsString()
  @IsNotEmpty()
  itemId!: string;
}

export class UpdateItemDto {
    
}

export class ListItemDto {
  @IsString()
  itemId!: string;

  @IsString()
  branchId!: string;
}