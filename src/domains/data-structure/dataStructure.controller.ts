import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { DataStructureListDTO } from 'src/domains/data-structure/dataStructure.dto';
import { DataStructureService } from 'src/domains/data-structure/dataStructure.service';
import { BadRequestExceptionFilter } from 'src/exception-filters/BadRequestExceptionFilter';
import { DataStructureName, ProgrammingLanguage } from 'src/types/types';

@Controller('data-structure')
export class DataStructureController {
  constructor(private readonly dataStructureService: DataStructureService) {}

  @Get('/list')
  async getDataStructureList(@Res() res: Response) {
    const list = await this.dataStructureService.getDataStructureList();

    return res.status(200).json(list);
  }

  @Get('language/list')
  async getLanguageList(@Res() res: Response) {
    const list = await this.dataStructureService.getLanguageList();

    return res.status(200).json(list);
  }

  @Get(':name/:language')
  @UseFilters(BadRequestExceptionFilter)
  async getDetails(
    @Res() res: Response,
    @Param('name') name: DataStructureName,
    @Param('language') language: ProgrammingLanguage,
  ) {
    const formattedName = name.replace('-', ' '),
      formattedLanguage = language.replace('-', ' ');

    try {
      const details = await this.dataStructureService.createOrGetDetails(
        formattedName,
        formattedLanguage,
      );

      return res.status(200).json(details);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Post('language')
  async createLanguageList(
    @Body() dataStructureListDTO: Pick<DataStructureListDTO, 'language'>,
  ) {
    const success = this.dataStructureService.createList(
      'programming-language',
      dataStructureListDTO.language,
    );

    return success;
  }

  @Post()
  async createDataStructureList(
    @Body() dataStructureListDTO: Pick<DataStructureListDTO, 'name'>,
  ) {
    const success = this.dataStructureService.createList(
      'data-structure',
      dataStructureListDTO.name,
    );

    return success;
  }
}
