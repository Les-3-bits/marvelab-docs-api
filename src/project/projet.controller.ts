import { Controller, Get, Param } from '@nestjs/common';
import { ProjectService } from './project.service';

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
    return {
      success: true,
      data: { notes, interpretations, resources },
      message: 'Données du projet récupérées avec succès',
    };
  }
}

