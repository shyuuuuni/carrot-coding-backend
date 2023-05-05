import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AlgorithmService } from 'src/domains/algorithm/algorithm.service';

import { Response } from 'express';
import {
  UpdateCodeDto,
  UpdateDescriptionDto,
} from 'src/domains/algorithm/algorithm.dto';

@Controller('/algorithms')
export class AlgorithmController {
  constructor(private readonly algorithmService: AlgorithmService) {}

  @Get('/infos')
  async getAlgorithmInfoList(@Res() res: Response) {
    const list = await this.algorithmService.getInfoAll();

    return res.status(200).json(list);
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

  async updateDescriptionAll(@Res() res: Response) {
    const updatedResults = await this.algorithmService.updateDescriptionAll();

    return res.status(200).json(updatedResults);
  }

  @Post('/update/code')
  async updateCode(@Res() res: Response, @Body() updateCodeDto: UpdateCodeDto) {
    const { name, language } = updateCodeDto;
    const updatedResult = await this.algorithmService.updateCodeOne(
      name,
      language,
    );

    return updatedResult;
  }
}
