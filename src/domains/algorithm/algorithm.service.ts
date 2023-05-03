import { Injectable, Logger } from '@nestjs/common';
import { ChatGptApiClient } from 'src/chat-gpt/chatGptApiClient';
import { AlgorithmRepository } from 'src/domains/algorithm/algorithm.repository';

@Injectable()
export class AlgorithmService {
  // NestJS logger
  private readonly logger = new Logger(AlgorithmService.name);

  constructor(
    private readonly algorithmRepository: AlgorithmRepository,
    private readonly chatGptService: ChatGptApiClient,
  ) {}

  async getInfoAll() {
    const documents = await this.algorithmRepository.findInfoAll();

    return documents;
  }

  async updateDescriptionOne(name: string) {
    // 1. 대상 document 검색
    const targetDocument = await this.algorithmRepository.findDescriptionByName(
      name,
    );
    if (!targetDocument) {
      return null;
    }
    this.logger.log(`updateDescriptionOne: (${name})`);

    // 2. ChatGPT로 description 생성
    const { question, parameters } = await this.chatGptService.getRequest(
      'algorithm',
      'description',
    );

    const description = await this.chatGptService.getAnswer(question, {
      ...parameters,
      algorithm: name,
    });

    // 3. DB 업데이트
    const updatedDocument =
      await this.algorithmRepository.updateDescriptionById(
        targetDocument._id,
        description,
      );

    return updatedDocument;
  }
}
