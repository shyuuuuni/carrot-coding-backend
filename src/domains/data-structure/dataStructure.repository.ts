import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DataStructureDetail } from 'src/domains/data-structure/dataStructureDetail.schema';

@Injectable()
export class DataStructureRepository {
  constructor(
    @InjectModel(DataStructureDetail.name)
    private dataStructureDetailModel: Model<DataStructureDetail>,
  ) {}

  async findAllByName(name: string) {
    const document = await this.dataStructureDetailModel
      .find({ $or: [{ 'name.kr': name }, { 'name.en': name }] })
      .exec();

    return document;
  }

  async findAll() {
    const document = await this.dataStructureDetailModel.find({}).exec();

    return document;
  }

  async findUnstableByNameAndLanguage(name: string, language: string) {
    const unstableDocument = await this.dataStructureDetailModel
      .findOne({
        $or: [{ 'name.kr': name }, { 'name.en': name }],
        language,
        state: {
          $ne: 'ok',
        },
      })
      .exec();

    return unstableDocument;
  }

  async findAllUnstable() {
    const unstableDocuments = await this.dataStructureDetailModel
      .find({
        state: {
          $ne: 'ok',
        },
      })
      .exec();

    return unstableDocuments;
  }

  async updateDetailById(
    id: Types.ObjectId,
    chatGptDetail: Pick<
      DataStructureDetail,
      'code' | 'complexity' | 'description'
    >,
  ) {
    const updatedDocument = await this.dataStructureDetailModel.updateOne(
      {
        _id: id,
      },
      {
        state: 'ok',
        reportedCount: 0,
        ...chatGptDetail,
      },
    );

    return updatedDocument.acknowledged;
  }
}
