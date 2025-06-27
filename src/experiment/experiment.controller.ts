import { Controller, Get, Param } from '@nestjs/common';
import { ExperimentService } from './experiment.service';
import { Experiment } from '../interfaces/experiment.interface';
import { ApiOkResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Experiments')
@Controller('experiments')
export class ExperimentController {
  constructor(private readonly experimentService: ExperimentService) {}

  @Get()
  @ApiOkResponse({ description: 'Liste des expériences' })
  findAll(): Experiment[] {
    return this.experimentService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Détail d\'une expérience' })
  @ApiNotFoundResponse({ description: 'Expérience non trouvée' })
  findOne(@Param('id') id: string): Experiment | undefined {
    return this.experimentService.findOne(Number(id));
  }
} 