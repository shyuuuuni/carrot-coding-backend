import { Controller } from '@nestjs/common';
import { AlgorithmService } from 'src/domains/algorithm/algorithm.service';

@Controller()
export class AlgorithmController {
  constructor(private readonly algorithmService: AlgorithmService) {}
}
