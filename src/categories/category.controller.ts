import { CategoryService } from './category.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createCategoryDto } from './dto/createCategory.dto';

@Controller('categories')
export class categoryController {
  constructor(private categoryService: CategoryService) {}
  @Post('/create')
  createCategories(@Body() createCategoryDto: createCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get('/all')
  getCategories() {
    return this.categoryService.getCategories();
  }
}
