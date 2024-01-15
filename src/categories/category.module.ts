import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Categories, categorySchema } from 'src/schemas/category.schema';
import { CategoryService } from './category.service';
import { categoryController } from './category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Categories.name,
        schema: categorySchema,
      },
    ]),
  ],
  providers: [CategoryService],
  controllers: [categoryController],
})
export class CategoryModule {}
