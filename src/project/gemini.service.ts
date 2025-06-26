import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { GeminiGenerationRequest, GeminiGenerationResponse } from '../interfaces/gemini.interface';

@Injectable()
export class GeminiService {
  private readonly GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private readonly GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  async generateText(request: GeminiGenerationRequest): Promise<GeminiGenerationResponse> {
    if (!this.GEMINI_API_KEY) {
      throw new InternalServerErrorException('Gemini API key not configured');
    }
    // Construction du prompt final
    const fullPrompt = `${request.prompt}\n\nDonnées : ${JSON.stringify(request.data, null, 2)}`;
    try {
      const response = await axios.post(
        `${this.GEMINI_API_URL}?key=${this.GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: fullPrompt }] }],
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return { generatedText };
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la génération Gemini');
    }
  }
} 