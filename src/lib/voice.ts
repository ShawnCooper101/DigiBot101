import { voiceManager } from '@/lib/voiceProviders';
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
  private recognition: any = null;
  private isInitialized = false;

  constructor() {
    this.initializeServices();
  }

  private initializeServices() {
    if (typeof window !== 'undefined') {
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
    if (!this.isInitialized) {
      console.warn('Voice service not initialized');
      return;
    }

    try {
      await voiceManager.speak(text, settings);
    } catch (error) {
      console.error('Voice synthesis error:', error);
      throw error;
    }
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
    if (this.recognition) {
      this.recognition.stop();
    }
    // Voice manager handles stopping speech synthesis
  }

  isSupported(): boolean {
    return this.isInitialized && voiceManager.getAvailableProviders().length > 0;
  }

  isSpeechSynthesisSupported(): boolean {
    return this.isInitialized && voiceManager.getAvailableProviders().length > 0;
  }

  isSpeechRecognitionSupported(): boolean {
    return this.isInitialized && !!this.recognition;
  }

  // New methods for premium voice management
  async getAvailableVoices() {
    return await voiceManager.getAllVoices();
  }

  getAvailableProviders() {
    return voiceManager.getAvailableProviders();
  }

  setVoiceProvider(providerId: string): boolean {
    return voiceManager.setProvider(providerId);
  }

  getCurrentProvider() {
    return voiceManager.getCurrentProvider();
  }
}

export const voiceService = new VoiceService();