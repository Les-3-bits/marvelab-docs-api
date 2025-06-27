import { Controller, Get, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id/data')
  getProjectData(@Param('id') id: string) {
    const project = this.projectService.findOne(id);
    if (!project) {
      return {
        success: false,
        data: null,
        message: 'Projet non trouvé',
      };
    }

    const { notes, interpretations, resources } = project;

    // Charger les méthodologies et expériences
    const methodologies = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'methodologies.json'), 'utf-8'));
    const experiments = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'experiments.json'), 'utf-8'));

    // Enrichir chaque interprétation
    const enrichedInterpretations = interpretations.map(interp => ({
      ...interp,
      methodology: interp.methodologyId ? methodologies.find(m => m.id === interp.methodologyId) : null,
      experiment: interp.experimentId ? experiments.find(e => e.id === interp.experimentId) : null,
    }));

    return {
      success: true,
      data: { notes, interpretations: enrichedInterpretations, resources },
      message: 'Données du projet récupérées avec succès',
    };
  }
}

