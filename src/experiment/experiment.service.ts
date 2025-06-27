import { Injectable } from '@nestjs/common';
import { Experiment } from '../interfaces/experiment.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ExperimentService {
  private readonly dataPath = path.join(__dirname, '../../data/experiments.json');

  findAll(): Experiment[] {
    const data = fs.readFileSync(this.dataPath, 'utf-8');
    return JSON.parse(data);
  }

  findOne(id: number): Experiment | undefined {
    return this.findAll().find(e => e.id === id);
  }
} 