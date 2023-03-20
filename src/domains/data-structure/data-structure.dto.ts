import { IsString } from 'class-validator';

export class DataStructureCreateDTO {
  @IsString()
  name: string;
}
