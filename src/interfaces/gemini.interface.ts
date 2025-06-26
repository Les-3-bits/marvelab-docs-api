export interface GeminiGenerationRequest {
  prompt: string;
  data: {
    notes?: any[];
    interpretations?: any[];
    resources?: any[];
  };
}

export interface GeminiGenerationResponse {
  generatedText: string;
}
