import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://faridulhaquemurshed:QOj2aDRBuDCYNCG3@cluster0.kr1r9yw.mongodb.net/assignment-2?retryWrites=true&w=majority',
    ),
    UserModule,
  ],
})
export class AppModule {}