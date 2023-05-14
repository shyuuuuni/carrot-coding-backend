import { Injectable, Logger } from '@nestjs/common';
import { ChatGptApiClient } from 'src/chat-gpt/chatGptApiClient';
import { AlgorithmCode } from 'src/domains/algorithm/algorithm-detail.schema';
import { AlgorithmRepository } from 'src/domains/algorithm/algorithm.repository';
import { chunkArray } from 'src/utils/array';

@Injectable()
export class AlgorithmService {
  // NestJS logger
  private readonly logger = new Logger(AlgorithmService.name);

  constructor(
    private readonly algorithmRepository: AlgorithmRepository,
    private readonly chatGptService: ChatGptApiClient,
  ) {}

  async get(name: string) {
    const document = await this.algorithmRepository.findByName(name);

    return document;
  }

  async getInfoAll() {
    const documents = await this.algorithmRepository.findInfoAll();

    return documents;
  }

  async updateDescriptionOne(name: string) {
    // 1. 대상 document 검색
    const targetDocument = await this.algorithmRepository.findByName(name);
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

  async updateDescriptionAll() {
    const targetDocuments = await this.algorithmRepository.findAll();
    if (targetDocuments.length === 0) {
      return [];
    }
    this.logger.log(`updateDescriptionAll(${targetDocuments.length})`);

    // 5개씩 나눠서 처리
    const chunks = chunkArray(targetDocuments, 5);
    const updateResults = [];

    const { question, parameters } = await this.chatGptService.getRequest(
      'algorithm',
      'description',
    );

    // 청크 단위로 요청
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const updatePromise = chunk.map((document) => {
        return this.chatGptService
          .getAnswer(question, {
            ...parameters,
            algorithm: document.name.en,
          })
          .then((description) => {
            return this.algorithmRepository.updateDescriptionById(
              document._id,
              description,
            );
          });
      });

      this.logger.log(`request chunks ${i + 1}/${chunks.length}`);
      const results = await Promise.allSettled(updatePromise);
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          updateResults.push(result.value);
        } else {
          this.logger.error(result.reason);
        }
      });
    }

    return updateResults;
  }

  async updateCodeOne(name: string, language: string) {
    // 1. 대상 document 검색
    const targetDocument = await this.algorithmRepository.findByName(name);
    if (!targetDocument) {
      return null;
    }
    this.logger.log(`updateCodeOne: (${name})`);

    // 2. ChatGPT로 code 생성
    const { question, parameters } = await this.chatGptService.getRequest(
      'algorithm',
      'code',
    );
    const answer = await this.chatGptService.getAnswer(question, {
      ...parameters,
      algorithm: name,
      'programming-language': language,
    });
    const code: { code: string; complexity: { [key: string]: string } } =
      JSON.parse(answer);

    // 3. DB 업데이트
    const updatedDocument = await this.algorithmRepository.updateCodeById(
      targetDocument._id,
      { ...code, language, codeReportCount: 0, codeState: 'ok' },
    );

    return updatedDocument;
  }

  async updateCodeAll() {
    const targetDocuments = await this.algorithmRepository.findAll();
    if (targetDocuments.length === 0) {
      return [];
    }
    this.logger.log(`updateCodeAll(${targetDocuments.length})`);

    // 5개씩 나눠서 처리
    const chunks = chunkArray(targetDocuments, 5);
    const updateResults = [];

    const { question, parameters } = await this.chatGptService.getRequest(
      'algorithm',
      'code',
    );

    // 청크 단위로 요청
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      // chunk에 포함된 document의 codes 속성을 업데이트하는 Promise 객체
      const updatePromise = chunk.map(async (document) => {
        const languages = document.codes.map(({ language }) => language);

        // codes에 포함된 language 별로 ChatGPT 답변을 업데이트
        const updateCodes: AlgorithmCode[] = await Promise.all(
          languages.map(async (language) => {
            const answer = await this.chatGptService.getAnswer(question, {
              ...parameters,
              algorithm: document.name.en,
              'programming-language': language,
            });
            const code: {
              code: string;
              complexity: { [key: string]: string };
            } = JSON.parse(answer);

            return {
              ...code,
              language,
              codeReportCount: 0,
              codeState: 'ok',
            };
          }),
        );

        // document의 codes를 일괄 업데이트
        const results = await this.algorithmRepository.updateCodesById(
          document._id,
          updateCodes,
        );

        return results;
      });

      this.logger.log(`request chunks ${i + 1}/${chunks.length}`);
      const results = await Promise.allSettled(updatePromise);
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          updateResults.push(result.value);
        } else {
          this.logger.error(result.reason);
        }
      });
    }

    return updateResults;
  }
}
