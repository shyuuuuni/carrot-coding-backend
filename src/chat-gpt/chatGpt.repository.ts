import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatGpt, ChatGptRequest } from 'src/chat-gpt/chatGpt.schema';
import {
  ChatGptDomain,
  ChatGptRequestType,
  ChatGptType,
} from 'src/types/types';

@Injectable()
export class ChatGptRepository {
  constructor(
    @InjectModel(ChatGpt.name)
    private chatGptModel: Model<ChatGpt>,
    @InjectModel(ChatGptRequest.name)
    private chatGptRequestModel: Model<ChatGptRequest>,
  ) {}

  async findRequestOne(domain: ChatGptDomain, type: ChatGptType) {
    const document = await this.chatGptRequestModel
      .findOne({ domain, type })
      .exec();

    return document;
  }

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
