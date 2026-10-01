interface LanguageModelSession {
  prompt(input: string): Promise<string>;
  promptStreaming(input: string): ReadableStream<string>;
  destroy(): void;
}

interface LanguageModelCreateOptions {
  systemPrompt?: string;
  temperature?: number;
  topK?: number;
}

interface LanguageModelCapabilities {
  available: 'readily' | 'after-download' | 'no';
  defaultTemperature?: number;
  defaultTopK?: number;
  maxTopK?: number;
}

interface LanguageModel {
  capabilities(): Promise<LanguageModelCapabilities>;
  create(options?: LanguageModelCreateOptions): Promise<LanguageModelSession>;
}

interface ChromeAi {
  languageModel: LanguageModel;
}

interface Window {
  ai?: ChromeAi;
}
