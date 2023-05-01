import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlgorithmDetail } from 'src/domains/algorithm/algorithm-detail.schema';

@Injectable()
export class AlgorithmRepository {
  constructor(
    @InjectModel(AlgorithmDetail.name)
    private algorithmDetailModel: Model<AlgorithmDetail>,
  ) {}
}
