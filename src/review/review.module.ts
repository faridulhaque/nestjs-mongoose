import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Reviews, ReviewSchema } from 'src/schemas/review.schema';
import { ReviewService } from './review.service';
import { reviewController } from './review.controller';
import { Users, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Reviews.name,
        schema: ReviewSchema,
      },
      { name: Users.name, schema: UserSchema },
    ]),
  ],
  providers: [ReviewService],
  controllers: [reviewController],
})
export class ReviewModule {}
