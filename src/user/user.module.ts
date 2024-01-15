import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Users, UserSchema } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { userController } from './user.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService],
  controllers: [userController],
})
export class UserModule {}
