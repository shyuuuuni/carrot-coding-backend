import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';
import { DataStructureCreateDTO } from 'src/domains/data-structure/data-structure.dto';
import { DataStructure } from 'src/domains/data-structure/data-structure.schema';

@Injectable()
export class DataStructureRepository {
  constructor(
    @InjectModel(DataStructure.name)
    private dataStructureModel: Model<DataStructure>,
  ) {}

  async create(
    dataStructureCreateDTO: DataStructureCreateDTO,
  ): Promise<DataStructure> {
    const createdDataStructre = new this.dataStructureModel(
      dataStructureCreateDTO,
    );
    return createdDataStructre.save();
  }

  async findAll(): Promise<DataStructure[]> {
    return this.dataStructureModel.find().exec();
  }

  async removeById(id: number): Promise<boolean> {
    const removedDataStructure = this.dataStructureModel.findByIdAndRemove(id);

    if (!removedDataStructure) {
      return false;
    }
    removedDataStructure.exec();
    return true;
  }

  async removeAll(): Promise<DeleteResult> {
    const deleteResult = await this.dataStructureModel.deleteMany({});

    return deleteResult;
  }
}
