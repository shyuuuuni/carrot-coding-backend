import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGptModule } from 'src/chat-gpt/chatGpt.module';
import { DataStructureController } from 'src/domains/data-structure/dataStructure.controller';
import { DataStructureRepository } from 'src/domains/data-structure/dataStructure.repository';
import {
  DataStructure,
  DataStructureList,
  DataStructureListSchema,
  DataStructureSchema,
} from 'src/domains/data-structure/dataStructure.schema';
import { DataStructureService } from 'src/domains/data-structure/dataStructure.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DataStructure.name,
        schema: DataStructureSchema,
      },
      {
        name: DataStructureList.name,
        schema: DataStructureListSchema,
      },
    ]),
    ChatGptModule,
  ],
  controllers: [DataStructureController],
  providers: [DataStructureService, DataStructureRepository],
})
export class DataStructureModule {}
