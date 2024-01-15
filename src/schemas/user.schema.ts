import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Prop({ timestamps: true })
  createdAt: Date;

  @Prop({ timestamps: true })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(Users);
