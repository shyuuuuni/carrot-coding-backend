import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/databases/database.module';
import { DataStructureModule } from 'src/domains/data-structure/data-structure.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    DataStructureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
