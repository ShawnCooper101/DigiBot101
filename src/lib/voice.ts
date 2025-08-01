import { VoiceSettings } from '@/types';

// Extend the Window interface to include speech recognition types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

export class VoiceService {
  private synthesis: SpeechSynthesis | null = null;
  private recognition: any = null;
  private isInitialized = false;

  constructor() {
    this.initializeServices();
  }

  private initializeServices() {
    if (typeof window !== 'undefined') {
      // Initialize Speech Synthesis
      if ('speechSynthesis' in window) {
        this.synthesis = window.speechSynthesis;
      }

      // Initialize Speech Recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      }

      this.isInitialized = true;
    }
  }

  async speak(text: string, settings: VoiceSettings): Promise<void> {
    if (!this.synthesis || !this.isInitialized) {
      console.warn('Speech synthesis not available');
      return;
    }

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply voice settings
      utterance.pitch = settings.pitch;
      utterance.rate = settings.rate;
      
      // Try to find appropriate voice
      const voices = this.synthesis!.getVoices();
      if (voices.length > 0) {
        const preferredVoice = voices.find(voice => 
          voice.name.toLowerCase().includes(settings.voice || 'default') ||
          (settings.voice === 'female' && voice.name.toLowerCase().includes('female')) ||
          (settings.voice === 'male' && voice.name.toLowerCase().includes('male'))
        );
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        } else {
          // Fallback to first available voice
          utterance.voice = voices[0];
        }
      }

      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);

      this.synthesis!.speak(utterance);
    });
  }

  async listen(): Promise<string> {
    if (!this.recognition || !this.isInitialized) {
      throw new Error('Speech recognition not available');
    }

    return new Promise((resolve, reject) => {
      this.recognition!.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        resolve(result);
      };

      this.recognition!.onerror = (error: any) => {
        reject(error);
      };

      this.recognition!.onend = () => {
        // Handle case where no speech was detected
      };

      this.recognition!.start();
    });
  }

  stop() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  isSupported(): boolean {
    return this.isInitialized && (!!this.synthesis || !!this.recognition);
  }

  isSpeechSynthesisSupported(): boolean {
    return this.isInitialized && !!this.synthesis;
  }

  isSpeechRecognitionSupported(): boolean {
    return this.isInitialized && !!this.recognition;
  }
}

export const voiceService = new VoiceService();