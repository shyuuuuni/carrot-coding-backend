import { Controller, Get, Res } from '@nestjs/common';
import { AlgorithmService } from 'src/domains/algorithm/algorithm.service';

import { Response } from 'express';

@Controller('/algorithms')
export class AlgorithmController {
  constructor(private readonly algorithmService: AlgorithmService) {}

  @Get('/infos')
  async getAlgorithmInfoList(@Res() res: Response) {
    const list = await this.algorithmService.getInfoAll();

    return res.status(200).json(list);
  }
}
