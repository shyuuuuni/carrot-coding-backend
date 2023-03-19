import { Injectable } from '@nestjs/common';
import { DataStructure } from 'src/data-structures/data-structures.entities';

@Injectable()
export class DataStructuresService {
  private readonly dataStructures: DataStructure[] = [
    {
      id: 1,
      name: '스택',
    },
  ];

  getAll(): DataStructure[] {
    return [...this.dataStructures];
  }

  getSerchAll(): DataStructure[] {
    return [...this.dataStructures];
  }
}
