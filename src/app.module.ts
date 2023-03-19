import { Module } from '@nestjs/common';
import { DataStructuresModule } from 'src/data-structures/data-structures.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DataStructuresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
