import { IsString } from 'class-validator';

export class UpdateDescriptionDto {
  @IsString()
  name: string;
}

export class UpdateCodeDto {
  @IsString()
  name: string;

  @IsString()
  language: string;
}
