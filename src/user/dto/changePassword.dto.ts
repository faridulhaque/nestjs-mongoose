import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  newPassword: string;
}
