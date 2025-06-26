import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import {
  GeminiGenerationRequest,
  GeminiGenerationResponse,
} from '../interfaces/gemini.interface';
import { ProjectService } from './project.service'; // Assure-toi du chemin exact

@Injectable()
export class GeminiService {
  private readonly GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private readonly GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  constructor(private readonly projectService: ProjectService) {}

  async generateText(
    request: GeminiGenerationRequest & { projectId: string }, // ajoute projectId ici
  ): Promise<GeminiGenerationResponse> {
    if (!this.GEMINI_API_KEY) {
      throw new InternalServerErrorException('Gemini API key not configured');
    }

    // Récupérer le projet via son ID
    const project = this.projectService.findOne(request.projectId);
    if (!project) {
      throw new InternalServerErrorException(
        `Projet avec l'id ${request.projectId} introuvable`,
      );
    }

    // Construire le prompt avec notes + interprétations
    const notes = project.notes ?? [];
    const interpretations = project.interpretations ?? [];
    const ressources = project.resources ?? [];

    const fullPrompt = `
      ${request.prompt}
      
      Voici les notes disponibles :
      ${JSON.stringify(notes, null, 2)}
        
      Voici les interprétations disponibles :
      ${JSON.stringify(interpretations, null, 2)}
      
      Voici les ressources disponibles :
      ${JSON.stringify(ressources, null, 2)}
    `;

    try {
      const response = await axios.post(
        `${this.GEMINI_API_URL}?key=${this.GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: fullPrompt }] }],
        },
        { headers: { 'Content-Type': 'application/json' } },
      );
      const generatedText =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return { generatedText };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de la génération Gemini',
      );
    }
  }
}
