export type ScreenState = 'asking' | 'success';

export interface NoButtonStage {
  text: string;
  gifUrl: string;
  fallbacks?: string[];
  yesScale: number;
}
