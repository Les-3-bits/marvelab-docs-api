import { Injectable } from '@nestjs/common';
import { Methodology } from '../interfaces/methodology.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MethodologyService {
  private readonly dataPath = path.join(__dirname, '../../data/methodologies.json');

  findAll(): Methodology[] {
    const data = fs.readFileSync(this.dataPath, 'utf-8');
    return JSON.parse(data);
  }

  findOne(id: number): Methodology | undefined {
    return this.findAll().find(m => m.id === id);
  }
} 