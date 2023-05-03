import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGptRepository } from 'src/chat-gpt/chatGpt.repository';
import {
  ChatGpt,
  ChatGptRequest,
  ChatGptRequestSchema,
  ChatGptSchema,
} from 'src/chat-gpt/chatGpt.schema';
import { ChatGptApiClient } from 'src/chat-gpt/chatGptApiClient';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ChatGpt.name,
        schema: ChatGptSchema,
      },
      {
        name: ChatGptRequest.name,
        schema: ChatGptRequestSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [ChatGptApiClient, ChatGptRepository],
  exports: [ChatGptApiClient, ChatGptRepository],
})
export class ChatGptModule {}
