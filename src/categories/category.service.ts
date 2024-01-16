import { createCategoryDto } from './dto/createCategory.dto';
import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'; // Import InjectModel
import { Categories } from 'src/schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Categories.name) private categoryModel: Model<Categories>, // Use @InjectModel
  ) {}

  async createCategory(createCategoryDto: createCategoryDto) {
    const isValid = mongoose.Types.ObjectId.isValid(
      createCategoryDto.createdBy,
    );

    if (!isValid) {
      return {
        message: 'The userId is not valid',
        statusCode: 404,
        error: 'Invalid data',
      };
    }

    const existingCategory = await this.categoryModel
      .findOne({
        name: createCategoryDto?.name,
      })
      .exec();
    if (existingCategory) {
      return {
        message: 'Category already in use',
        statusCode: 401,
        error: 'Duplicate information',
      };
    }

    const newCategory = new this.categoryModel(createCategoryDto);
    const result = await newCategory.save();

    return {
      data: result,
      message: 'Category created successfully',
      statusCode: 201,
    };
  }

  async getCategories() {
    const result = await this.categoryModel
      .find()
      .select({
        _id: 1,
        name: 1,
      })
      .populate({
        path: 'createdBy',
        model: 'Users',
        select: 'username email _id role',
      });
    return {
      data: result,
      statusCode: 200,
      message: 'Categories retrieved successfully',
    };
  }
}
