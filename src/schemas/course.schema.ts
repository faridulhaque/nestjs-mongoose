import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Courses extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  instructor: string;
  @Prop({ required: true })
  categoryId: Types.ObjectId;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  createdBy: Types.ObjectId;
  @Prop([String])
  tags: string[];
  @Prop(
    raw({
      level: { type: String, enum: ['Beginner', 'Advanced', 'Intermediate'] },
      description: { type: String },
    }),
  )
  details: Record<string, any>;
}

export const CourseSchema = SchemaFactory.createForClass(Courses);
