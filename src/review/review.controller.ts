import { Controller, Post, Body } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/createReview.dto';

@Controller('reviews')
export class reviewController {
  constructor(private reviewService: ReviewService) {}
  @Post('/create')
  createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }
}
