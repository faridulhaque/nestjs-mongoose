import { IsNotEmpty, IsString } from 'class-validator';

export class createCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
