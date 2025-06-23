import { Injectable } from '@nestjs/common';
import {
  Project,
  Note,
  Interpretation,
  Resource,
  Methodology,
  Experiment,
} from '../interfaces/projet.interface';
import { CreateProjectDto } from '../dto/create-project.dto';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

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
        methodologies: [
          {
            id: 'method-1',
            title: 'Protocole de mesure du cortisol salivaire',
            description:
              'Méthode standardisée pour mesurer les niveaux de cortisol dans la salive avant et après exposition.',
            steps: [
              "Collecte d'échantillons salivaires à jeun",
              'Exposition contrôlée de 20 minutes',
              'Nouvelle collecte post-exposition',
              'Analyse en laboratoire par ELISA',
              'Analyse statistique des variations',
            ],
            relatedExperiments: ['exp-1'],
          },
        ],
        experiments: [
          {
            id: 'exp-1',
            title: 'Étude comparative parc vs milieu urbain',
            protocol:
              'Étude randomisée contrôlée avec deux groupes : exposition parc naturel vs marche en environnement urbain dense',
            parameters: {
              duration: '20 minutes',
              participants: 60,
              groups: 2,
              measurement: 'cortisol salivaire',
            },
            results:
              'Réduction significative de 15% du taux de cortisol dans le groupe parc (p<0.05)',
            relatedMethodology: 'method-1',
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

  private writeData(projects: Project[]): void {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(projects, null, 2));
    } catch (error) {
      console.error('Erreur écriture données:', error);
    }
  }

  // === CRUD Projects ===
  findAll(): Project[] {
    return this.readData();
  }

  findOne(id: string): Project | undefined {
    const projects = this.readData();
    return projects.find((project) => project.id === id);
  }

  create(createProjectDto: CreateProjectDto): Project {
    const projects = this.readData();
    const newProject: Project = {
      id: uuidv4(),
      ...createProjectDto,
      createdAt: new Date().toISOString(),
      notes: [],
      interpretations: [],
      resources: [],
      methodologies: [],
      experiments: [],
    };

    projects.push(newProject);
    this.writeData(projects);
    return newProject;
  }

  // === Gestion des Notes ===
  findNotesByProject(projectId: string): Note[] {
    const project = this.findOne(projectId);
    return project ? project.notes : [];
  }

  findNoteById(projectId: string, noteId: string): Note | undefined {
    const project = this.findOne(projectId);
    return project?.notes.find((note) => note.id === noteId);
  }

  // === Gestion des Interprétations ===
  findInterpretationsByProject(projectId: string): Interpretation[] {
    const project = this.findOne(projectId);
    return project ? project.interpretations : [];
  }

  findInterpretationById(
    projectId: string,
    interpretationId: string,
  ): Interpretation | undefined {
    const project = this.findOne(projectId);
    return project?.interpretations.find(
      (interp) => interp.id === interpretationId,
    );
  }

  // === Gestion des Ressources ===
  findResourcesByProject(projectId: string): Resource[] {
    const project = this.findOne(projectId);
    return project ? project.resources : [];
  }

  findResourceById(
    projectId: string,
    resourceId: string,
  ): Resource | undefined {
    const project = this.findOne(projectId);
    return project?.resources.find((resource) => resource.id === resourceId);
  }

  // === Gestion des Méthodologies ===
  findMethodologiesByProject(projectId: string): Methodology[] {
    const project = this.findOne(projectId);
    return project ? project.methodologies : [];
  }

  // === Gestion des Expériences ===
  findExperimentsByProject(projectId: string): Experiment[] {
    const project = this.findOne(projectId);
    return project ? project.experiments : [];
  }

  // === Recherche et filtres ===
  searchContent(projectId: string, query: string) {
    const project = this.findOne(projectId);
    if (!project) return null;

    const results = {
      notes: project.notes.filter(
        (note) =>
          note.content.toLowerCase().includes(query.toLowerCase()) ||
          note.title.toLowerCase().includes(query.toLowerCase()),
      ),
      interpretations: project.interpretations.filter(
        (interp) =>
          interp.content.toLowerCase().includes(query.toLowerCase()) ||
          interp.title.toLowerCase().includes(query.toLowerCase()),
      ),
      resources: project.resources.filter(
        (resource) =>
          resource.description.toLowerCase().includes(query.toLowerCase()) ||
          resource.title.toLowerCase().includes(query.toLowerCase()),
      ),
    };

    return results;
  }
}
