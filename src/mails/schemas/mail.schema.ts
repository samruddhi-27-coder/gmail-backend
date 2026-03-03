import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Mail extends Document {
  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  to: string;

  @Prop()
  subject?: string;

  @Prop()
  body?: string;

  @Prop({ default: 'inbox' })
  folder: string;

  @Prop({ default: false })
  isRead: boolean;
}

export const MailSchema = SchemaFactory.createForClass(Mail);