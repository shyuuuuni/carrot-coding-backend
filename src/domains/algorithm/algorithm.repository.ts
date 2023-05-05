import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AlgorithmDetail } from 'src/domains/algorithm/algorithm-detail.schema';

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

  async findDescriptionByName(name: string) {
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
}
