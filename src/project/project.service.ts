import { Injectable } from '@nestjs/common';
import {
  Project,
} from '../interfaces/projet.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProjectService {
  private readonly dataPath = path.join(process.cwd(), 'data', 'projects.json');

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Créer le dossier data s'il n'existe pas
    const dataDir = path.dirname(this.dataPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Créer le fichier avec des données d'exemple s'il n'existe pas
    if (!fs.existsSync(this.dataPath)) {
      const initialData = this.getInitialData();
      fs.writeFileSync(this.dataPath, JSON.stringify(initialData, null, 2));
    }
  }

  private getInitialData(): Project[] {
    return [
      {
        id: '1',
        title: 'Étude sur les Espaces Verts et le Bien-être',
        description:
          "Recherche sur l'impact des espaces verts sur la santé mentale et cognitive",
        author: 'Dr. Marie Dubois',
        createdAt: '2024-01-15T10:00:00Z',
        notes: [
          {
            id: 'note-1',
            title: 'Bénéfices cognitifs des espaces verts',
            content:
              "Plusieurs études ont montré qu'une exposition régulière aux espaces verts est associée à une réduction du stress et à une amélioration des fonctions cognitives chez les adultes.",
            createdAt: '2024-01-15T10:30:00Z',
            tags: ['espaces-verts', 'cognition', 'stress'],
          },
          {
            id: 'note-2',
            title: 'Expérience cortisol et marche en parc',
            content:
              'Dans une expérience contrôlée, les participants ayant marché 20 minutes dans un parc ont présenté une baisse de 15 % du taux de cortisol, comparé à ceux ayant marché en milieu urbain.',
            createdAt: '2024-01-16T09:15:00Z',
            tags: ['cortisol', 'expérience', 'parc', 'marche'],
          },
        ],
        interpretations: [
          {
            id: 'interp-1',
            title: 'Intégration urbaine des espaces naturels',
            content:
              "Le lien constant entre l'exposition à la nature et les bénéfices cognitifs suggère que l'intégration d'environnements naturels dans l'aménagement urbain pourrait avoir des effets positifs à long terme sur la santé publique.",
            relatedNotes: ['note-1', 'note-2'],
            createdAt: '2024-01-17T14:20:00Z',
            confidence: 'high',
          },
          {
            id: 'interp-2',
            title: 'Effets physiologiques immédiats',
            content:
              "La diminution mesurable du cortisol implique qu'une exposition même de courte durée à la nature peut avoir des effets physiologiques immédiats, ce qui soutient l'utilisation d'interventions basées sur la nature dans la gestion du stress.",
            relatedNotes: ['note-2'],
            createdAt: '2024-01-17T15:45:00Z',
            confidence: 'high',
          },
        ],
        resources: [
          {
            id: 'res-1',
            title: 'Plan de travail laboratoire',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800',
            description:
              "Une image d'un plan de travail en laboratoire avec plusieurs boites de pétri.",
            metadata: {
              width: 800,
              height: 600,
              format: 'jpg',
            },
          },
          {
            id: 'res-2',
            title: 'Graphique analyse cortisol',
            type: 'graph',
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
            description:
              "Une image d'un graphique d'analyse montrant l'évolution du taux de cortisol.",
            metadata: {
              width: 800,
              height: 500,
              format: 'jpg',
            },
          },
        ],
      },
    ];
  }

  private readData(): Project[] {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Erreur lecture données:', error);
      return [];
    }
  }

  findOne(id: string): Project | undefined {
    const projects = this.readData();
    return projects.find((project) => project.id === id);
  }
}
