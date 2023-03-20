import { Injectable } from '@nestjs/common';
import { DataStructureCreateDTO } from 'src/domains/data-structure/data-structure.dto';
import { DataStructureRepository } from 'src/domains/data-structure/data-structure.repository';
import { DataStructure } from 'src/domains/data-structure/data-structure.schema';

@Injectable()
export class DataStructureService {
  constructor(
    private readonly dataStructureRepository: DataStructureRepository,
  ) {}

  async create(
    dataStructureCreateDTO: DataStructureCreateDTO,
  ): Promise<DataStructure> {
    const createdDataStructure = await this.dataStructureRepository.create(
      dataStructureCreateDTO,
    );

    return createdDataStructure;
  }

  async remove(id: number): Promise<boolean> {
    const isSuccessed = await this.dataStructureRepository.removeById(id);

    return isSuccessed;
  }

  async removeAll(): Promise<number> {
    const { deletedCount } = await this.dataStructureRepository.removeAll();

    return deletedCount;
  }

  async findAll(): Promise<DataStructure[]> {
    const dataStructures = await this.dataStructureRepository.findAll();

    return dataStructures;
  }
}
