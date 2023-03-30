import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatGpt } from 'src/chat-gpt/chatGpt.schema';
import { ChatGptRequestType } from 'src/types/types';

@Injectable()
export class ChatGptRepository {
  constructor(
    @InjectModel(ChatGpt.name)
    private chatGptModel: Model<ChatGpt>,
  ) {}

  async getGenerationQuestion(requestType: ChatGptRequestType) {
    const generationQuestion = await this.chatGptModel
      .findOne({
        type: requestType,
      })
      .exec();

    if (!generationQuestion) {
      throw new Error(`Cannot find generation Question with ${requestType}`);
    }

    return generationQuestion;
  }
}
