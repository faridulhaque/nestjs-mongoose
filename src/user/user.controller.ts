import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class userController {
  constructor(private userService: UserService) {}

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
