import { VoiceSettings } from '@/types';

// Voice provider interface for multiple TTS services
export interface VoiceProvider {
  id: string;
  name: string;
  isAvailable(): boolean;
  speak(text: string, settings: VoiceSettings): Promise<void>;
  getAvailableVoices(): Promise<Voice[]>;
}

export interface Voice {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'neutral';
  language: string;
  accent?: string;
  style?: string;
  provider: string;
  isPremium: boolean;
}

// Web Speech API Provider (Free tier)
export class WebSpeechProvider implements VoiceProvider {
  id = 'web-speech';
  name = 'Web Speech API';
  private synthesis: SpeechSynthesis | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
    }
  }

  isAvailable(): boolean {
    return !!this.synthesis;
  }

  async speak(text: string, settings: VoiceSettings): Promise<void> {
    if (!this.synthesis) throw new Error('Web Speech not available');

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = settings.pitch;
      utterance.rate = settings.rate;

      const voices = this.synthesis!.getVoices();
      if (voices.length > 0) {
        const preferredVoice = voices.find(voice => 
          voice.name.toLowerCase().includes(settings.voice || 'default')
        );
        if (preferredVoice) utterance.voice = preferredVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);
      this.synthesis!.speak(utterance);
    });
  }

  async getAvailableVoices(): Promise<Voice[]> {
    if (!this.synthesis) return [];
    
    const voices = this.synthesis.getVoices();
    return voices.map((voice, index) => ({
      id: `web-${index}`,
      name: voice.name,
      gender: voice.name.toLowerCase().includes('female') ? 'female' : 'male',
      language: voice.lang,
      provider: this.id,
      isPremium: false
    }));
  }
}

// ElevenLabs Provider (Premium tier)
export class ElevenLabsProvider implements VoiceProvider {
  id = 'elevenlabs';
  name = 'ElevenLabs';
  private apiKey: string | null = null;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || null;
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  async speak(text: string, settings: VoiceSettings): Promise<void> {
    if (!this.apiKey) throw new Error('ElevenLabs API key required');

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${settings.voiceId || 'default'}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: settings.style || 0.0,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) throw new Error('ElevenLabs API error');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      return new Promise((resolve, reject) => {
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        audio.onerror = reject;
        audio.play();
      });
    } catch (error) {
      console.error('ElevenLabs error:', error);
      throw error;
    }
  }

  async getAvailableVoices(): Promise<Voice[]> {
    if (!this.apiKey) return [];

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: { 'xi-api-key': this.apiKey }
      });

      if (!response.ok) return [];

      const data = await response.json();
      return data.voices.map((voice: any) => ({
        id: voice.voice_id,
        name: voice.name,
        gender: voice.labels?.gender || 'neutral',
        language: 'en-US',
        accent: voice.labels?.accent,
        style: voice.labels?.description,
        provider: this.id,
        isPremium: true
      }));
    } catch {
      return [];
    }
  }
}

// Azure Speech Provider (Premium tier)
export class AzureSpeechProvider implements VoiceProvider {
  id = 'azure-speech';
  name = 'Azure Speech Services';
  private subscriptionKey: string | null = null;
  private region: string;

  constructor(subscriptionKey?: string, region = 'eastus') {
    this.subscriptionKey = subscriptionKey || process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY || null;
    this.region = region;
  }

  isAvailable(): boolean {
    return !!this.subscriptionKey;
  }

  async speak(text: string, settings: VoiceSettings): Promise<void> {
    if (!this.subscriptionKey) throw new Error('Azure Speech key required');

    const ssml = `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
        <voice name="${settings.voiceId || 'en-US-JennyNeural'}">
          <prosody rate="${settings.rate * 100}%" pitch="${settings.pitch > 1 ? '+' : ''}${(settings.pitch - 1) * 50}%">
            ${text}
          </prosody>
        </voice>
      </speak>
    `;

    try {
      const response = await fetch(`https://${this.region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.subscriptionKey,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3'
        },
        body: ssml
      });

      if (!response.ok) throw new Error('Azure Speech API error');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      return new Promise((resolve, reject) => {
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        audio.onerror = reject;
        audio.play();
      });
    } catch (error) {
      console.error('Azure Speech error:', error);
      throw error;
    }
  }

  async getAvailableVoices(): Promise<Voice[]> {
    // Pre-defined Azure Neural voices for demo
    return [
      { id: 'en-US-JennyNeural', name: 'Jenny (Professional)', gender: 'female', language: 'en-US', style: 'Professional', provider: this.id, isPremium: true },
      { id: 'en-US-AriaNeural', name: 'Aria (Friendly)', gender: 'female', language: 'en-US', style: 'Friendly', provider: this.id, isPremium: true },
      { id: 'en-US-DavisNeural', name: 'Davis (Authoritative)', gender: 'male', language: 'en-US', style: 'Authoritative', provider: this.id, isPremium: true },
      { id: 'en-US-JasonNeural', name: 'Jason (Analytical)', gender: 'male', language: 'en-US', style: 'Analytical', provider: this.id, isPremium: true },
      { id: 'en-US-SaraNeural', name: 'Sara (Energetic)', gender: 'female', language: 'en-US', style: 'Energetic', provider: this.id, isPremium: true },
      { id: 'en-US-TonyNeural', name: 'Tony (Confident)', gender: 'male', language: 'en-US', style: 'Confident', provider: this.id, isPremium: true }
    ];
  }
}

// Voice Manager - handles multiple providers
export class VoiceManager {
  private providers: VoiceProvider[] = [];
  private currentProvider: VoiceProvider;
  private fallbackProvider: VoiceProvider;

  constructor() {
    // Initialize providers
    this.fallbackProvider = new WebSpeechProvider();
    this.providers = [
      new ElevenLabsProvider(),
      new AzureSpeechProvider(),
      this.fallbackProvider
    ];

    // Use first available premium provider, fallback to web speech
    this.currentProvider = this.providers.find(p => p.isAvailable() && p.id !== 'web-speech') || this.fallbackProvider;
  }

  async speak(text: string, settings: VoiceSettings): Promise<void> {
    try {
      await this.currentProvider.speak(text, settings);
    } catch (error) {
      console.warn(`${this.currentProvider.name} failed, falling back to ${this.fallbackProvider.name}`);
      await this.fallbackProvider.speak(text, settings);
    }
  }

  async getAllVoices(): Promise<Voice[]> {
    const allVoices: Voice[] = [];
    
    for (const provider of this.providers) {
      if (provider.isAvailable()) {
        try {
          const voices = await provider.getAvailableVoices();
          allVoices.push(...voices);
        } catch (error) {
          console.warn(`Failed to get voices from ${provider.name}:`, error);
        }
      }
    }

    return allVoices;
  }

  getAvailableProviders(): VoiceProvider[] {
    return this.providers.filter(p => p.isAvailable());
  }

  setProvider(providerId: string): boolean {
    const provider = this.providers.find(p => p.id === providerId && p.isAvailable());
    if (provider) {
      this.currentProvider = provider;
      return true;
    }
    return false;
  }

  getCurrentProvider(): VoiceProvider {
    return this.currentProvider;
  }
}

export const voiceManager = new VoiceManager();