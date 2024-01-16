import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CategoryModule } from './categories/category.module';
import { CourseModule } from './course/course.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://faridulhaquemurshed:QOj2aDRBuDCYNCG3@cluster0.kr1r9yw.mongodb.net/assignment-2?retryWrites=true&w=majority',
    ),
    UserModule,
    CategoryModule,
    CourseModule,
    ReviewModule,
  ],
})
export class AppModule {}
