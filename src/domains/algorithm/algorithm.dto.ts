import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAllDto {
  @IsOptional()
  @IsBoolean()
  unstableOnly = false;
}

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
