import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGptModule } from 'src/chat-gpt/chatGpt.module';
import {
  AlgorithmDetail,
  AlgorithmDetailSchema,
} from 'src/domains/algorithm/algorithm-detail.schema';
import { AlgorithmController } from 'src/domains/algorithm/algorithm.controller';
import { AlgorithmRepository } from 'src/domains/algorithm/algorithm.repository';
import { AlgorithmService } from 'src/domains/algorithm/algorithm.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AlgorithmDetail.name,
        schema: AlgorithmDetailSchema,
      },
    ]),
    ChatGptModule,
  ],
  controllers: [AlgorithmController],
  providers: [AlgorithmService, AlgorithmRepository],
})
export class DataStructureModule {}
