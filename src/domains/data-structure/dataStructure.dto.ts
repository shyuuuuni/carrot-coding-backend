import { IsString } from 'class-validator';

export class UpdateDataStructureDto {
  @IsString()
  name: string;

  @IsString()
  language: string;
}
