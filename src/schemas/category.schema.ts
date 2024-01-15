import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema()
export class Categories extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  createdBy: Types.ObjectId;

  @Prop({ timestamps: true })
  createdAt: Date;

  @Prop({ timestamps: true })
  updatedAt: Date;
}

export const categorySchema = SchemaFactory.createForClass(Categories);
