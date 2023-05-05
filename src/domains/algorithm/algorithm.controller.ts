import { Body, Controller, Get, Put, Res } from '@nestjs/common';
import { AlgorithmService } from 'src/domains/algorithm/algorithm.service';

import { Response } from 'express';
import { UpdateDescriptionDto } from 'src/domains/algorithm/algorithm.dto';

@Controller('/algorithms')
export class AlgorithmController {
  constructor(private readonly algorithmService: AlgorithmService) {}

  @Get('/infos')
  async getAlgorithmInfoList(@Res() res: Response) {
    const list = await this.algorithmService.getInfoAll();

    return res.status(200).json(list);
  }

  @Put('/update/description')
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
}
