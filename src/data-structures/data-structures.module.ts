import { Module } from '@nestjs/common';
import { DataStructuresController } from 'src/data-structures/data-structures.controller';
import { DataStructuresService } from 'src/data-structures/data-structures.service';

@Module({
  imports: [],
  controllers: [DataStructuresController],
  providers: [DataStructuresService],
})
export class DataStructuresModule {}
