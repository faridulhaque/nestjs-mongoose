import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema, Courses } from 'src/schemas/course.schema';
import { CourseService } from './course.service';
import { courseController } from './course.controller';
import { Categories, categorySchema } from 'src/schemas/category.schema';
import { UserSchema, Users } from 'src/schemas/user.schema';
import { ReviewSchema, Reviews } from 'src/schemas/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Courses.name, schema: CourseSchema },
      { name: Categories.name, schema: categorySchema },
      { name: Users.name, schema: UserSchema },
      { name: Reviews.name, schema: ReviewSchema },
    ]),
  ],
  providers: [CourseService],
  controllers: [courseController],
})
export class CourseModule {}
