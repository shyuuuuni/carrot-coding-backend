import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGptRepository } from 'src/chat-gpt/chatGpt.repository';
import { ChatGpt, ChatGptSchema } from 'src/chat-gpt/chatGpt.schema';
import { ChatGptApiClient } from 'src/chat-gpt/chatGptApiClient';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ChatGpt.name,
        schema: ChatGptSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [ChatGptApiClient, ChatGptRepository],
  exports: [ChatGptApiClient, ChatGptRepository],
})
export class ChatGptModule {}
