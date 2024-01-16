import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum CourseLevel {
  Advanced = 'Advanced',
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
}

export class CourseDetails {
  @IsString()
  @IsEnum(CourseLevel, { message: 'Invalid course level' })
  level: CourseLevel;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  instructor: string;

  @IsNotEmpty()
  @IsString()
  categoryId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  createdBy: Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsArray()
  tags: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => CourseDetails)
  details: CourseDetails;
}
