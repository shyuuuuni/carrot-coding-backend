import { Injectable } from '@nestjs/common';
import { ChatGptRepository } from 'src/chat-gpt/chatGpt.repository';
import { ChatGptApiClient } from 'src/chat-gpt/chatGptApiClient';
import { AlgorithmRepository } from 'src/domains/algorithm/algorithm.repository';

@Injectable()
export class AlgorithmService {
  constructor(
    private readonly algorithmRepository: AlgorithmRepository,
    private readonly chatGptRepository: ChatGptRepository,
    private readonly chatGptApiClient: ChatGptApiClient,
  ) {}

  async getInfoAll() {
    const documents = await this.algorithmRepository.findInfoAll();

    return documents;
  }
}
