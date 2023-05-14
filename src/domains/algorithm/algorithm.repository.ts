import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AlgorithmCode,
  AlgorithmDetail,
} from 'src/domains/algorithm/algorithm-detail.schema';

@Injectable()
export class AlgorithmRepository {
  constructor(
    @InjectModel(AlgorithmDetail.name)
    private algorithmDetailModel: Model<AlgorithmDetail>,
  ) {}

  async findAll() {
    const documents = await this.algorithmDetailModel.find().exec();

    return documents;
  }

  async findInfoAll() {
    const infosDocument = await this.algorithmDetailModel
      .find({ descriptionState: 'ok' }, 'name description')
      .exec();

    return infosDocument;
  }

  async findByName(name: string) {
    const descriptionDocument = await this.algorithmDetailModel.findOne({
      $or: [{ 'name.kr': name }, { 'name.en': name }],
    });

    return descriptionDocument;
  }

  async updateDescriptionById(id: Types.ObjectId, description: string) {
    const updatedDocument = await this.algorithmDetailModel
      .updateOne(
        { _id: id },
        { descriptionState: 'ok', descriptionReportCount: 0, description },
      )
      .exec();

    return updatedDocument;
  }

  async updateCodesById(id: Types.ObjectId, codes: AlgorithmCode[]) {
    const updatedDocument = await this.algorithmDetailModel
      .updateOne({ _id: id }, { codes })
      .exec();

    return updatedDocument;
  }

  async updateCodeById(id: Types.ObjectId, code: AlgorithmCode) {
    const targetDocument = await this.algorithmDetailModel
      .findOne({
        _id: id,
      })
      .exec();

    const updatedCodes = targetDocument.codes.map((documentCode) => {
      if (documentCode.language === code.language) {
        return code;
      }
      return documentCode;
    });

    const updatedDocument = await this.algorithmDetailModel.updateOne(
      { _id: id },
      { codes: updatedCodes },
    );

    return updatedDocument;
  }
}
