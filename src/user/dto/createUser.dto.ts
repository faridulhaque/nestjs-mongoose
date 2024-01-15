import { IsNotEmpty, IsString, IsEmail, IsIn, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;

  @IsNotEmpty()
  @IsIn(['user', 'admin'])
  role: 'user' | 'admin';
}
