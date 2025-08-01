'use client';

import { useState, useEffect } from 'react';
import { voiceService } from '@/lib/voice';

interface Voice {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'neutral';
  language: string;
  provider: string;
  isPremium: boolean;
}

interface VoiceProvider {
  id: string;
  name: string;
  isAvailable(): boolean;
}

interface VoiceSelectionProps {
  selectedVoice?: string;
  onVoiceChange: (voiceId: string) => void;
  userTier?: 'free' | 'personal' | 'business' | 'enterprise';
}

export default function VoiceSelection({ selectedVoice, onVoiceChange, userTier = 'free' }: VoiceSelectionProps) {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [providers, setProviders] = useState<VoiceProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<string>('');

  useEffect(() => {
    loadVoicesAndProviders();
  }, []);

  const loadVoicesAndProviders = async () => {
    try {
      const [availableVoices, availableProviders] = await Promise.all([
        voiceService.getAvailableVoices(),
        Promise.resolve(voiceService.getAvailableProviders())
      ]);

      setVoices(availableVoices);
      setProviders(availableProviders);
      
      const currentProvider = voiceService.getCurrentProvider();
      setSelectedProvider(currentProvider.id);
    } catch (error) {
      console.error('Failed to load voices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderChange = (providerId: string) => {
    if (voiceService.setVoiceProvider(providerId)) {
      setSelectedProvider(providerId);
      loadVoicesAndProviders(); // Reload voices for new provider
    }
  };

  const getAvailableVoices = () => {
    return voices.filter(voice => {
      // Free tier only gets basic voices
      if (userTier === 'free') return !voice.isPremium;
      
      // Premium tiers get all voices
      return true;
    });
  };

  const groupedVoices = getAvailableVoices().reduce((groups, voice) => {
    const key = `${voice.provider}-${voice.gender}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(voice);
    return groups;
  }, {} as Record<string, Voice[]>);

  if (isLoading) {
    return (
      <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-white/20 rounded w-32 mb-2"></div>
          <div className="h-8 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Voice Selection</h3>
      
      {/* Provider Selection */}
      <div className="mb-4">
        <label className="block text-sm text-white/80 mb-2">Voice Provider</label>
        <select
          value={selectedProvider}
          onChange={(e) => handleProviderChange(e.target.value)}
          className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white"
        >
          {providers.map(provider => (
            <option key={provider.id} value={provider.id} className="bg-gray-800">
              {provider.name} {provider.id === 'web-speech' ? '(Free)' : '(Premium)'}
            </option>
          ))}
        </select>
      </div>

      {/* Voice Selection */}
      <div>
        <label className="block text-sm text-white/80 mb-2">
          Available Voices
          {userTier === 'free' && (
            <span className="ml-2 text-xs text-yellow-400">
              (Upgrade for premium voices)
            </span>
          )}
        </label>
        
        {Object.entries(groupedVoices).map(([groupKey, groupVoices]) => {
          const [provider, gender] = groupKey.split('-');
          const providerName = providers.find(p => p.id === provider)?.name || provider;
          
          return (
            <div key={groupKey} className="mb-3">
              <h4 className="text-sm font-medium text-white/70 mb-1">
                {providerName} - {gender.charAt(0).toUpperCase() + gender.slice(1)} Voices
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {groupVoices.map(voice => (
                  <button
                    key={voice.id}
                    onClick={() => onVoiceChange(voice.id)}
                    className={`p-2 rounded text-left text-sm transition-all ${
                      selectedVoice === voice.id
                        ? 'bg-blue-500/30 border-blue-400 border'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-medium text-white">{voice.name}</div>
                    {voice.isPremium && (
                      <span className="text-xs text-yellow-400">Premium</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {getAvailableVoices().length === 0 && (
        <div className="text-center py-4">
          <p className="text-white/60">No voices available</p>
          {userTier === 'free' && (
            <button className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
              Upgrade for Premium Voices
            </button>
          )}
        </div>
      )}
    </div>
  );
}