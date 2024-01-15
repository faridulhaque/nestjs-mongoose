import { CategoryService } from './category.service';
import { Controller, Post, Body } from '@nestjs/common/decorators';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createCategoryDto } from './dto/createCategory.dto';

@Controller('categories')
export class categoryController {
  constructor(private categoryService: CategoryService) {}
  @Post('/create')
  createUser(@Body() createCategoryDto: createCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }
}
