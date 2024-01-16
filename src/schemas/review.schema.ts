import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Reviews extends Document {
  @Prop({ required: true })
  courseId: Types.ObjectId;

  @Prop({ required: true })
  createdBy: Types.ObjectId;

  @Prop({ required: true })
  review: string;
  @Prop({ required: true })
  rating: number;

  @Prop({ timestamps: true })
  createdAt: Date;

  @Prop({ timestamps: true })
  updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Reviews);
