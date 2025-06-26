export interface GeminiGenerationRequest {
  prompt: string;
  data: Record<string, any>;
}

export interface GeminiGenerationResponse {
  generatedText: string;
} 