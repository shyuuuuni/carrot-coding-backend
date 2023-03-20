import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataStructureController } from 'src/domains/data-structure/data-structure.controller';
import { DataStructureRepository } from 'src/domains/data-structure/data-structure.repository';
import {
  DataStructure,
  DataStructureSchema,
} from 'src/domains/data-structure/data-structure.schema';
import { DataStructureService } from 'src/domains/data-structure/data-structure.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DataStructure.name,
        schema: DataStructureSchema,
      },
    ]),
  ],
  controllers: [DataStructureController],
  providers: [DataStructureService, DataStructureRepository],
})
export class DataStructureModule {}
