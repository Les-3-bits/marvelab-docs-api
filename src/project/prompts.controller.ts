import { Controller, Get, Param } from '@nestjs/common';
import { PromptsService } from './prompts.service';

@Controller('api/prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Get()
  findAll() {
    return {
      success: true,
      data: this.promptsService.findAll(),
      message: 'Prompts récupérés avec succès',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const prompt = this.promptsService.findOne(id);
    return {
      success: !!prompt,
      data: prompt || null,
      message: prompt ? 'Prompt récupéré avec succès' : 'Prompt non trouvé',
    };
  }
} 