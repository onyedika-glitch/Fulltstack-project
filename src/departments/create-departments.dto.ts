import { IsString, MinLength, ValidateNested, ArrayMinSize, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class SubDepartmentDto {
  @IsString()
  @MinLength(2)
  name: string;
}

export class CreateDepartmentDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SubDepartmentDto)
  subDepartments?: SubDepartmentDto[];
}
