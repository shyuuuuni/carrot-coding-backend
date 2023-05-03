import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  ChatGptDomain,
  ChatGptRequestType,
  ChatGptType,
} from 'src/types/types';

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

// TODO: 기존 Data-structure -> ChatGptRequest로 마이그레이션
@Schema()
export class ChatGptRequest {
  @Prop()
  id: number;

  @Prop()
  domain: ChatGptDomain;

  @Prop()
  type: ChatGptType;

  @Prop()
  question: string;

  @Prop({ type: Object })
  parameters: {
    [key: string]: string;
  };
}

export type ChatGptRequestDocument = HydratedDocument<ChatGptRequest>;
export const ChatGptRequestSchema =
  SchemaFactory.createForClass(ChatGptRequest);
