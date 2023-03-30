import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ChatGptRepository } from 'src/chat-gpt/chatGpt.repository';
import { ChatGptApiClient } from 'src/chat-gpt/chatGptApiClient';
import { DataStructureRepository } from 'src/domains/data-structure/dataStructure.repository';
import {
  DataStructureDetails,
  DataStructureName,
  ProgrammingLanguage,
} from 'src/types/types';

@Injectable()
export class DataStructureService {
  // NestJS logger
  private readonly logger = new Logger(ChatGptApiClient.name);

  constructor(
    private readonly dataStructureRepository: DataStructureRepository,
    private readonly chatGptRepository: ChatGptRepository,
    private readonly chatGptApiClient: ChatGptApiClient,
  ) {}

  async getDataStructureList() {
    const list = await this.dataStructureRepository.findDataStructureAll();

    return list;
  }

  async getLanguageList() {
    const list = await this.dataStructureRepository.findLanguageAll();

    return list;
  }

  async createOrGetDetails(
    name: DataStructureName,
    language: ProgrammingLanguage,
  ) {
    const existsName = await this.dataStructureRepository.existsByName(name),
      existsLanguage = await this.dataStructureRepository.existsByLanguage(
        language,
      );

    // Verify that the name and language are correct.
    if (!existsName || !existsLanguage) {
      this.logger.error(`Invalid params name: ${name}, language: ${language}`);
      throw new BadRequestException(
        `Invalid params name: ${name}, language: ${language}`,
      );
    }

    const entity = await this.dataStructureRepository.findOneByNameAndLanguage(
      name,
      language,
    );

    if (entity?.state === 'ok') {
      return entity?.details;
    }

    // If state is 'empty' or 'reported' then regenerate details.
    const details = await this.createDetails(name, language);
    this.dataStructureRepository.saveDetails(name, language, details);

    return details;
  }

  async createDetails(
    name: string,
    language: ProgrammingLanguage,
  ): Promise<DataStructureDetails> {
    const { question, parameters } =
      await this.chatGptRepository.getGenerationQuestion('data-structure');
    parameters['data-structure'] = name;
    parameters['programming-language'] = language;

    const generatedDetails = await this.chatGptApiClient.getAnswer(
      question,
      parameters,
    );
    return JSON.parse(generatedDetails);
  }

  async createList(
    type: 'data-structure' | 'programming-language',
    name: DataStructureName | ProgrammingLanguage,
  ) {
    const success = await this.dataStructureRepository.createOrUpdateList(
      type,
      name,
    );
    return success;
  }
}
