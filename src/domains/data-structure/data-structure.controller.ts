import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DataStructureCreateDTO } from 'src/domains/data-structure/data-structure.dto';
import { DataStructure } from 'src/domains/data-structure/data-structure.schema';
import { DataStructureService } from 'src/domains/data-structure/data-structure.service';

@Controller('data-structure')
export class DataStructureController {
  constructor(private readonly dataStructureService: DataStructureService) {}

  @Get()
  async getAll(): Promise<DataStructure[]> {
    const dataStructures = await this.dataStructureService.findAll();

    return dataStructures;
  }

  @Post()
  async createOne(
    @Body() dataStructureCreateDTO: DataStructureCreateDTO,
  ): Promise<DataStructure> {
    console.log(dataStructureCreateDTO);

    const createdDataStructure = await this.dataStructureService.create(
      dataStructureCreateDTO,
    );

    return createdDataStructure;
  }

  @Delete(':id')
  async removeOne(@Param() params): Promise<string> {
    const isSuccessed = await this.dataStructureService.remove(params.id);

    return `자료구조(id:${params.id}) 삭제가 ${
      isSuccessed ? '성공' : '실패'
    } 했습니다.`;
  }

  @Delete()
  async removeAll(): Promise<string> {
    const deletedCount = await this.dataStructureService.removeAll();

    return `자료구조 전체(${deletedCount}개) 삭제를 완료했습니다.`;
  }
}
