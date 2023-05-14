import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DataState = 'created' | 'ok';
export type AlgorithmCode = {
  code: string;
  language: string;
  complexity: { [key: string]: string };
  codeReportCount: number;
  codeState: DataState;
};

export type AlgorithmDetailDocument = AlgorithmDetail & Document;

@Schema({ timestamps: true })
export class AlgorithmDetail {
  @Prop({ type: Object })
  name: {
    kr: string;
    en: string;
  };

  @Prop()
  description: string;

  @Prop()
  descriptionReportCount: number;

  @Prop()
  descriptionState: DataState;

  @Prop()
  codes: AlgorithmCode[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const AlgorithmDetailSchema =
  SchemaFactory.createForClass(AlgorithmDetail);
