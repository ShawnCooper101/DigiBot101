export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  persona?: PersonaType;
}

export interface Persona {
  id: PersonaType;
  name: string;
  description: string;
  avatar: string;
  color: string;
  personality: string;
  voiceSettings: VoiceSettings;
}

export type PersonaType = 'ava' | 'matt';

export interface VoiceSettings {
  pitch: number;
  rate: number;
  voice?: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  currentPersona: PersonaType;
  isListening: boolean;
  isSpeaking: boolean;
}