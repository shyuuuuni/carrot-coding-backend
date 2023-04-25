import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Put,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { UpdateDataStructureDto } from 'src/domains/data-structure/dataStructure.dto';
import { DataStructureService } from 'src/domains/data-structure/dataStructure.service';
import { BadRequestExceptionFilter } from 'src/exception-filters/BadRequestExceptionFilter';

@Controller('data-structure')
export class DataStructureController {
  constructor(private readonly dataStructureService: DataStructureService) {}

  @Get('/list')
  async getDataStructureList(@Res() res: Response) {
    const list = await this.dataStructureService.getAll();

    return res.status(200).json(list);
  }

  @Put('/update')
  async updateOne(
    @Res() res: Response,
    @Body() updateDataStructureDto: UpdateDataStructureDto,
  ) {
    const { name, language } = updateDataStructureDto;
    const updatedDetail = await this.dataStructureService.updateOne(
      name,
      language,
    );

    return res.status(200).json(updatedDetail);
  }

  @Put('/update/all')
  async updateAll(@Res() res: Response) {
    const updatedDetails = await this.dataStructureService.updateAll();

    return res.status(200).json(updatedDetails);
  }

  @Get(':name')
  @UseFilters(BadRequestExceptionFilter)
  async getDetails(@Res() res: Response, @Param('name') name: string) {
    // replace all '+' to ' '
    const formattedName = name.replace(/\+/gi, ' ');

    try {
      const details = await this.dataStructureService.getOne(formattedName);

      return res.status(200).json(details);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
