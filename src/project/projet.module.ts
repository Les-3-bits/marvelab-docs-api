import { Module } from '@nestjs/common';
import { ProjectController } from './projet.controller';
import { ProjectService } from './project.service';
import { PromptsService } from './prompts.service';
import { PromptsController } from './prompts.controller';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';

@Module({
  controllers: [ProjectController, PromptsController, GeminiController],
  providers: [ProjectService, PromptsService, GeminiService],
  exports: [ProjectService],
})
export class ProjectModule {}
