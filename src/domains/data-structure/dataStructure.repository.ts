import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DataStructure,
  DataStructureList,
} from 'src/domains/data-structure/dataStructure.schema';
import {
  DataStructureDetails,
  DataStructureName,
  ProgrammingLanguage,
} from 'src/types/types';

@Injectable()
export class DataStructureRepository {
  constructor(
    @InjectModel(DataStructure.name)
    private dataStructureModel: Model<DataStructure>,
    @InjectModel(DataStructureList.name)
    private dataStructureListModel: Model<DataStructureList>,
  ) {}

  async existsByName(name: DataStructureName): Promise<boolean> {
    const existsName = await this.dataStructureListModel
      .exists({ type: 'data-structure', name: name })
      .exec();

    return Boolean(existsName);
  }

  async existsByLanguage(language: ProgrammingLanguage): Promise<boolean> {
    const existsLanguage = await this.dataStructureListModel.exists({
      type: 'programming-language',
      name: language,
    });
    return Boolean(existsLanguage);
  }

  async createOrUpdateList(
    type: 'data-structure' | 'programming-language',
    name: DataStructureName | ProgrammingLanguage,
  ): Promise<boolean> {
    const updated = await this.dataStructureListModel
      .updateOne(
        { type, name },
        {
          $set: {
            type,
            name,
          },
        },
        { upsert: true },
      )
      .exec();
    return updated.acknowledged;
  }

  async findOneByNameAndLanguage(
    name: DataStructureName,
    language: ProgrammingLanguage,
  ) {
    const entity = await this.dataStructureModel
      .findOne({ name, language })
      .exec();
    return entity;
  }

  async saveDetails(
    name: string,
    language: ProgrammingLanguage,
    details: DataStructureDetails,
  ) {
    const entity = await this.dataStructureModel.findOneAndUpdate(
      { name, language },
      {
        name,
        language,
        details,
        state: 'ok',
      },
      { upsert: true, new: true },
    );
    return entity;
  }
}
