import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Reviews } from 'src/schemas/review.schema';
import { CreateReviewDto } from './dto/createReview.dto';
import { Users } from 'src/schemas/user.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Reviews.name) private reviewModel: Model<Reviews>,
    @InjectModel(Users.name) private userModel: Model<Users>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto) {
    const isValid = mongoose.Types.ObjectId.isValid(createReviewDto.createdBy);

    if (!isValid) {
      return {
        message: 'The userId is not valid',
        statusCode: 404,
        error: 'Invalid data',
      };
    }

    const userExists = this.userModel.findById(createReviewDto?.createdBy);
    if (!userExists) {
      return {
        message: 'The user does not exist',
        statusCode: 404,
        error: 'Invalid data',
      };
    }

    const newReview = await this.reviewModel.create(createReviewDto);
    const result = await newReview.save();
    return {
      data: result,
      message: 'Review added successfully',
      statusCode: 201,
    };
  }
}
