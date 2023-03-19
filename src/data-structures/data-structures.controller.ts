import { Controller, Get } from '@nestjs/common';
import { DataStructuresService } from 'src/data-structures/data-structures.service';

@Controller('data-structures')
export class DataStructuresController {
  constructor(private readonly dataStructuresService: DataStructuresService) {}

  @Get('/list')
  getAll() {
    return this.dataStructuresService.getAll();
  }
}
