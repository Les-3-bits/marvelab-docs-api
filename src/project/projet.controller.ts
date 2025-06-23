import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from '../dto/create-project.dto';

@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll() {
    return {
      success: true,
      data: this.projectService.findAll(),
      message: 'Projets récupérés avec succès',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const project = this.projectService.findOne(id);
    if (!project) {
      return {
        success: false,
        data: null,
        message: 'Projet non trouvé',
      };
    }
    return {
      success: true,
      data: project,
      message: 'Projet récupéré avec succès',
    };
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    const project = this.projectService.create(createProjectDto);
    return {
      success: true,
      data: project,
      message: 'Projet créé avec succès',
    };
  }

  // === Endpoints pour les Notes ===
  @Get(':id/notes')
  findNotes(@Param('id') id: string) {
    return {
      success: true,
      data: this.projectService.findNotesByProject(id),
      message: 'Notes récupérées avec succès',
    };
  }

  @Get(':id/notes/:noteId')
  findNote(@Param('id') id: string, @Param('noteId') noteId: string) {
    const note = this.projectService.findNoteById(id, noteId);
    return {
      success: !!note,
      data: note || null,
      message: note ? 'Note récupérée avec succès' : 'Note non trouvée',
    };
  }

  // === Endpoints pour les Interprétations ===
  @Get(':id/interpretations')
  findInterpretations(@Param('id') id: string) {
    return {
      success: true,
      data: this.projectService.findInterpretationsByProject(id),
      message: 'Interprétations récupérées avec succès',
    };
  }

  @Get(':id/interpretations/:interpId')
  findInterpretation(
    @Param('id') id: string,
    @Param('interpId') interpId: string,
  ) {
    const interpretation = this.projectService.findInterpretationById(
      id,
      interpId,
    );
    return {
      success: !!interpretation,
      data: interpretation || null,
      message: interpretation
        ? 'Interprétation récupérée avec succès'
        : 'Interprétation non trouvée',
    };
  }

  // === Endpoints pour les Ressources ===
  @Get(':id/resources')
  findResources(@Param('id') id: string) {
    return {
      success: true,
      data: this.projectService.findResourcesByProject(id),
      message: 'Ressources récupérées avec succès',
    };
  }

  @Get(':id/resources/:resourceId')
  findResource(
    @Param('id') id: string,
    @Param('resourceId') resourceId: string,
  ) {
    const resource = this.projectService.findResourceById(id, resourceId);
    return {
      success: !!resource,
      data: resource || null,
      message: resource
        ? 'Ressource récupérée avec succès'
        : 'Ressource non trouvée',
    };
  }

  // === Endpoints pour les Méthodologies ===
  @Get(':id/methodologies')
  findMethodologies(@Param('id') id: string) {
    return {
      success: true,
      data: this.projectService.findMethodologiesByProject(id),
      message: 'Méthodologies récupérées avec succès',
    };
  }

  // === Endpoints pour les Expériences ===
  @Get(':id/experiments')
  findExperiments(@Param('id') id: string) {
    return {
      success: true,
      data: this.projectService.findExperimentsByProject(id),
      message: 'Expériences récupérées avec succès',
    };
  }

  // === Endpoint de recherche ===
  @Get(':id/search')
  searchContent(@Param('id') id: string, @Query('q') query: string) {
    if (!query) {
      return {
        success: false,
        data: null,
        message: 'Paramètre de recherche manquant',
      };
    }

    const results = this.projectService.searchContent(id, query);
    return {
      success: true,
      data: results,
      message: `Résultats pour "${query}"`,
    };
  }
}
