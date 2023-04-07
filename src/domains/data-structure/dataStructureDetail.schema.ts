import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DataStructureDetailState = 'created' | 'reported' | 'ok';
export type DataStructureListDocument = DataStructureDetail & Document;

@Schema({ timestamps: true })
export class DataStructureDetail {
  @Prop({ type: Object })
  name: {
    kr: string;
    en: string;
  };

  @Prop()
  language: string;

  @Prop()
  state: DataStructureDetailState;

  @Prop()
  reportedCount: number;

  @Prop()
  code: string;

  @Prop({ type: Object })
  complexity: {
    [key: string]: string;
  };

  @Prop()
  description: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const DataStructureDetailSchema =
  SchemaFactory.createForClass(DataStructureDetail);
