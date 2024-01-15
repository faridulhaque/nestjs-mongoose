import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel
      .findOne({
        $or: [
          { username: createUserDto.username },
          { email: createUserDto.email },
        ],
      })
      .exec();
    if (existingUser) {
      return {
        message: 'username/email already in use',
        statusCode: 401,
        error: 'Duplicate information',
      };
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);
    const user = { ...createUserDto, password: passwordHash };

    const newUser = new this.userModel(user);
    const result = await newUser.save();

    // Delete the password field from the original result object
    delete result['_doc'].password;

    return {
      data: result,
      message: 'User created successfully',
      statusCode: 201,
    };
  }
}
