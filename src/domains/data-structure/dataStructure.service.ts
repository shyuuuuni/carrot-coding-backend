import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ChatGptRepository } from 'src/chat-gpt/chatGpt.repository';
import { ChatGptApiClient } from 'src/chat-gpt/chatGptApiClient';
import { DataStructureRepository } from 'src/domains/data-structure/dataStructure.repository';
import { chunkArray } from 'src/utils/array';

@Injectable()
export class DataStructureService {
  // NestJS logger
  private readonly logger = new Logger(ChatGptApiClient.name);

  constructor(
    private readonly dataStructureRepository: DataStructureRepository,
    private readonly chatGptRepository: ChatGptRepository,
    private readonly chatGptApiClient: ChatGptApiClient,
  ) {}

  async getOne(name: string) {
    const documents = await this.dataStructureRepository.findAllByName(name);

    // Verify that the name is correct.
    if (!documents || documents.length === 0) {
      this.logger.error(`Invalid params name: ${name}`);
      throw new BadRequestException(`Invalid params name: ${name}`);
    }

    return documents.map((document) => document.toJSON());
  }

  async getAll() {
    const map = new Map();
    const documentsWithDetails = await this.dataStructureRepository.findAll();

    // Group by data structure name
    documentsWithDetails.forEach((document) => {
      const key = document.name.en;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(document.toJSON());
    });

    return Object.fromEntries(map);
  }

  async updateOne(name: string, language: string) {
    const unstableDocument =
      await this.dataStructureRepository.findUnstableByNameAndLanguage(
        name,
        language,
      );

    if (!unstableDocument) {
      return null;
    }
    this.logger.log(`updateOne: (${name}, ${language})`);

    const chatGptDetail = await this.createChatGptDetail(name, language);
    const updatedDocument = await this.dataStructureRepository.updateDetailById(
      unstableDocument._id,
      chatGptDetail,
    );

    return updatedDocument;
  }

  async updateAll() {
    const unstableDocuments =
      await this.dataStructureRepository.findAllUnstable();

    if (unstableDocuments.length === 0) {
      return [];
    }
    this.logger.log(`updateAll(${unstableDocuments.length})`);

    // Split 10 docs per chunk
    const chunks = chunkArray(unstableDocuments, 10);
    const updatedDocuments = [];

    // Request updates on a chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const updatePromise = chunk.map((document) => {
        return this.createChatGptDetail(
          document.name.en,
          document.language,
        ).then((chatGptDetail) =>
          this.dataStructureRepository.updateDetailById(
            document._id,
            chatGptDetail,
          ),
        );
      });
      this.logger.log(`request chunks ${i + 1}/${chunks.length}`);

      const results = await Promise.allSettled(updatePromise);
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          updatedDocuments.push(result.value);
        } else {
          this.logger.error(result.reason);
        }
      });
    }

    return updatedDocuments;
  }

  async createChatGptDetail(name: string, language: string) {
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
}
