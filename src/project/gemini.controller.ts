import { Controller, Post, Body } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiGenerationRequest } from '../interfaces/gemini.interface';

@Controller('api/gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generate')
  async generate(@Body() body: GeminiGenerationRequest) {
    const result = await this.geminiService.generateText(body);
    return {
      success: true,
      data: result,
      message: 'Texte généré avec succès par Gemini',
    };
  }
} 