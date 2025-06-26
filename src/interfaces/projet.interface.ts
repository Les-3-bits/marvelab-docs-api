export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
}

export interface Interpretation {
  id: string;
  title: string;
  content: string;
  relatedNotes: string[];
  createdAt: string;
  confidence: 'low' | 'medium' | 'high';
}

export interface Resource {
  id: string;
  title: string;
  type: 'image' | 'graph' | 'document' | 'data';
  url: string;
  description: string;
  metadata?: {
    width?: number;
    height?: number;
    format?: string;
    size?: number;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  notes: Note[];
  interpretations: Interpretation[];
  resources: Resource[];
}