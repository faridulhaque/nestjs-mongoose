import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUser.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

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

  async loginUser(loginUserDto: LoginUserDto) {
    const existingUser = await this.userModel
      .findOne({
        email: loginUserDto.email,
      })
      .exec();
    if (!existingUser) {
      return {
        message: 'user does not exist',
        statusCode: 404,
        error: 'Invalid data',
      };
    }

    const isMatched = await bcrypt.compare(
      loginUserDto.password,
      existingUser?.password,
    );
    if (!isMatched) {
      return {
        message: 'Invalid password',
        statusCode: 404,
        error: 'Invalid data',
      };
    }

    const user = existingUser.toObject();
    delete user.password;

    return {
      statusCode: 200,
      message: 'Logged in successfully',
      data: user,
    };
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const existingUser = await this.userModel
      .findOne({
        email: changePasswordDto.email,
      })
      .exec();
    if (!existingUser) {
      return {
        message: 'user does not exist',
        statusCode: 404,
        error: 'Invalid data',
      };
    }

    const isMatched = await bcrypt.compare(
      changePasswordDto.currentPassword,
      existingUser?.password,
    );

    if (!isMatched) {
      return {
        message: 'Invalid password',
        statusCode: 404,
        error: 'Invalid data',
      };
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(changePasswordDto.newPassword, salt);
    const result = await this.userModel.updateOne(
      { email: changePasswordDto?.email },
      {
        $set: {
          password: passwordHash,
        },
      },
    );
    if (result.modifiedCount > 0) {
      return {
        data: null,
        statusCode: 200,
        message: 'Password updated successfully',
      };
    }
  }
}
