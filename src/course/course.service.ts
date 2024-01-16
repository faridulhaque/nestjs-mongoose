import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Courses } from 'src/schemas/course.schema';
import mongoose, { Model } from 'mongoose';
import { Categories } from 'src/schemas/category.schema';
import { Users } from 'src/schemas/user.schema';
import { CreateCourseDto } from './dto/createCourse.dto';
import { Reviews } from 'src/schemas/review.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Courses.name) private courseModel: Model<Courses>,
    @InjectModel(Categories.name) private categoryModel: Model<Categories>,
    @InjectModel(Users.name) private userModel: Model<Users>,
    @InjectModel(Reviews.name) private reviewModel: Model<Reviews>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto) {
    const isValid = mongoose.Types.ObjectId.isValid(
      createCourseDto.createdBy && createCourseDto.createdBy,
    );

    if (!isValid) {
      return {
        message: 'The Id are not valid',
        statusCode: 404,
        error: 'Invalid data',
      };
    }

    const categoryExists = this.categoryModel.findById(
      createCourseDto.categoryId,
    );
    if (!categoryExists) {
      return {
        message: 'category does not exist',
        statusCode: 401,
        error: 'Invalid data',
      };
    }

    const userExists = this.userModel.findById(createCourseDto.createdBy);
    if (!userExists) {
      return {
        message: 'The user does not exist',
        statusCode: 404,
        error: 'Invalid data',
      };
    }

    const newCourse = new this.courseModel(createCourseDto);
    const result = await newCourse.save();
    return {
      data: result,
      message: 'User created successfully',
      statusCode: 201,
    };
  }

  async getReviews(courseId: string) {
    try {
      const reviews = await this.reviewModel
        .findOne({ courseId: courseId })
        .populate({
          path: 'createdBy',
          model: 'Users',
          select: 'username email _id role',
        })
        .exec();

      if (!reviews) {
        return {
          statusCode: 404,
          message: 'Course not found',
        };
      }

      return {
        data: reviews,
        statusCode: 200,
        message: 'Reviews retrieved successfully',
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async getFilteredCourses(queries: any) {
    const {
      page: NPage,
      limit: NLimit,
      sortBy,
      sortOrder,
      minPrice,
      maxPrice,
      tags,
      level,
    } = queries;

    const query: any = {};

    const page = NPage ? parseInt(NPage) : 1;
    const limit = NLimit ? parseInt(NLimit) : 10;
    const skip = (page - 1) * limit;

    if (maxPrice && minPrice) {
      query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    } else if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    } else if (minPrice) {
      query.price = { $gte: Number(minPrice) };
    }

    if (level) {
      query['details.level'] = level;
    }

    if (tags) {
      query.tags = { $elemMatch: { name: tags } };
    }

    const courses = await this.courseModel
      .find(query)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'createdBy',
        model: 'Users',
        select: 'username email _id role',
      })
      .select({
        _id: 1,
        title: 1,
        instructor: 1,
        categoryId: 1,
        price: 1,
        'tags.name': 1,
        'details.level': 1,
        'details.description': 1,
        createdBy: 1,
        createdAt: 1,
        updatedAt: 1,
      });

    const meta = {
      page,
      limit,
      total: courses?.length,
    };

    return { courses, meta };
  }
}
