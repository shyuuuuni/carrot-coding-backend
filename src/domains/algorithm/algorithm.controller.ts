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
import { AlgorithmService } from 'src/domains/algorithm/algorithm.service';

import { Response } from 'express';
import {
  UpdateAllDto,
  UpdateCodeDto,
  UpdateDescriptionDto,
} from 'src/domains/algorithm/algorithm.dto';
import { BadRequestExceptionFilter } from 'src/exception-filters/BadRequestExceptionFilter';

@Controller('/algorithms')
export class AlgorithmController {
  constructor(private readonly algorithmService: AlgorithmService) {}

  @Get()
  async getAlgorithmInfoList(@Res() res: Response) {
    const list = await this.algorithmService.getInfoAll();

    return res.status(200).json(list);
  }

  @Get('/:name')
  @UseFilters(BadRequestExceptionFilter)
  async getDetail(@Res() res: Response, @Param('name') name: string) {
    const formattedName = name.replace(/\+/gi, ' ');

    try {
      const detail = await this.algorithmService.get(formattedName);

      return res.status(200).json(detail);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Post('/update/description')
  async updateDescription(
    @Res() res: Response,
    @Body() updateDescriptionDto: UpdateDescriptionDto,
  ) {
    const { name } = updateDescriptionDto;
    const updatedResult = await this.algorithmService.updateDescriptionOne(
      name,
    );

    return res.status(200).json(updatedResult);
  }

  @Post('/update/description/all')
  async updateDescriptionAll(
    @Res() res: Response,
    @Body() updateAllDto: UpdateAllDto,
  ) {
    const { unstableOnly } = updateAllDto;
    const updatedResults = await this.algorithmService.updateDescriptionAll(
      unstableOnly,
    );

    return res.status(200).json(updatedResults);
  }

  @Post('/update/code')
  async updateCode(@Res() res: Response, @Body() updateCodeDto: UpdateCodeDto) {
    const { name, language } = updateCodeDto;
    const updatedResult = await this.algorithmService.updateCodeOne(
      name,
      language,
    );

    return res.status(200).json(updatedResult);
  }

  @Post('/update/code/all')
  async updateCodeAll(
    @Res() res: Response,
    @Body() updateAllDto: UpdateAllDto,
  ) {
    const { unstableOnly } = updateAllDto;
    const updatedResults = await this.algorithmService.updateCodeAll(
      unstableOnly,
    );

    return res.status(200).json(updatedResults);
  }
}
