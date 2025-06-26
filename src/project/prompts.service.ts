import { Injectable } from '@nestjs/common';
import { ScientificPrompt } from '../interfaces/prompts.interface';

@Injectable()
export class PromptsService {
  private readonly prompts: ScientificPrompt[] = [
    {
      id: 'intro-1',
      title: 'Introduction scientifique',
      description: 'Générer une introduction pour une publication scientifique basée sur le projet et ses notes.',
      template: `Rédige une introduction scientifique pour ce projet en t'appuyant sur les notes et la problématique.`,
    },
    {
      id: 'conclu-1',
      title: 'Conclusion structurée',
      description: 'Générer une conclusion structurée à partir des résultats et interprétations.',
      template: `Rédige une conclusion structurée à partir des résultats et des interprétations du projet.`,
    },
    {
      id: 'meth-1',
      title: 'Explication de méthodologie',
      description: 'Expliquer la méthodologie utilisée dans cette étude.',
      template: `Explique la méthodologie utilisée dans cette étude de façon claire et concise.`,
    },
  ];

  findAll(): ScientificPrompt[] {
    return this.prompts;
  }

  findOne(id: string): ScientificPrompt | undefined {
    return this.prompts.find((prompt) => prompt.id === id);
  }
} 