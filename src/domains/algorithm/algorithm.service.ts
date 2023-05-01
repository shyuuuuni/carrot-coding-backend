import { Injectable } from '@nestjs/common';
import { ChatGptRepository } from 'src/chat-gpt/chatGpt.repository';
import { ChatGptApiClient } from 'src/chat-gpt/chatGptApiClient';

@Injectable()
export class AlgorithmService {
  constructor(
    private readonly chatGptRepository: ChatGptRepository,
    private readonly chatGptApiClient: ChatGptApiClient,
  ) {}
}
