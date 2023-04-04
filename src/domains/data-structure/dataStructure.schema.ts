import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  DataStructureDetails,
  DataStructureDetailsState,
  DataStructureName,
  ProgrammingLanguage,
} from 'src/types/types';

@Schema({ timestamps: true })
export class DataStructure {
  @Prop()
  id: number;

  @Prop()
  state: DataStructureDetailsState;

  @Prop()
  name: DataStructureName;

  @Prop()
  language: ProgrammingLanguage;

  @Prop({ type: Object })
  details: DataStructureDetails;
}
export type DataStructureDocument = HydratedDocument<DataStructure>;
export const DataStructureSchema = SchemaFactory.createForClass(DataStructure);

@Schema({ timestamps: true })
export class DataStructureList {
  @Prop()
  id: number;

  @Prop()
  type: 'data-structure' | 'programming-language';

  @Prop()
  name: string;
}
export type DataStructureListDocument = HydratedDocument<DataStructureList>;
export const DataStructureListSchema =
  SchemaFactory.createForClass(DataStructureList);
