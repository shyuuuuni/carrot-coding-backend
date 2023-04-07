import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGptModule } from 'src/chat-gpt/chatGpt.module';
import { DataStructureController } from 'src/domains/data-structure/dataStructure.controller';
import { DataStructureRepository } from 'src/domains/data-structure/dataStructure.repository';
import { DataStructureService } from 'src/domains/data-structure/dataStructure.service';
import {
  DataStructureDetail,
  DataStructureDetailSchema,
} from 'src/domains/data-structure/dataStructureDetail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DataStructureDetail.name,
        schema: DataStructureDetailSchema,
      },
    ]),
    ChatGptModule,
  ],
  controllers: [DataStructureController],
  providers: [DataStructureService, DataStructureRepository],
})
export class DataStructureModule {}
