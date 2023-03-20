import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class DataStructure {
  @Prop()
  id: number;

  @Prop()
  name: string;
}

export type DataStructureDocument = HydratedDocument<DataStructure>;
export const DataStructureSchema = SchemaFactory.createForClass(DataStructure);
