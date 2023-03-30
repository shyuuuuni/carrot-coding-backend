import { IsString } from 'class-validator';
import { DataStructureName, ProgrammingLanguage } from 'src/types/types';

export class DataStructureListDTO {
  @IsString()
  name: DataStructureName;

  @IsString()
  language: ProgrammingLanguage;
}
