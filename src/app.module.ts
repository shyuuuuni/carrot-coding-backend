import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/databases/database.module';
import { AlgorithmModule } from 'src/domains/algorithm/algorithm.module';
import { DataStructureModule } from 'src/domains/data-structure/dataStructure.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    DataStructureModule,
    AlgorithmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
