import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/createCourse.dto';

@Controller('courses')
export class courseController {
  constructor(private courseService: CourseService) {}

  @Post('/create')
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @Get('/:courseId/reviews')
  getCourses(@Param() params: any) {
    return this.courseService.getReviews(params.courseId);
  }

  @Get('/filter')
  getFilteredCourses(@Query() queries: any) {
    return this.courseService.getFilteredCourses(queries);
  }
}
