import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ChatGptRequestType } from 'src/types/types';

@Schema()
export class ChatGpt {
  @Prop()
  id: number;

  @Prop()
  type: ChatGptRequestType;

  @Prop()
  question: string;

  @Prop({ type: Object })
  parameters: {
    [key: string]: string;
  };
}

export type ChatGptDocument = HydratedDocument<ChatGpt>;
export const ChatGptSchema = SchemaFactory.createForClass(ChatGpt);
