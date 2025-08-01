'use client';

import { useState, useCallback } from 'react';
import { ChatState, Message, PersonaType } from '@/types';
import { generateAIResponse } from '@/lib/ai';
import { voiceService } from '@/lib/voice';
import { getPersona } from '@/lib/personas';

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    currentPersona: 'ava',
    isListening: false,
    isSpeaking: false,
  });

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    return newMessage;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    addMessage({
      role: 'user',
      content: content.trim(),
    });

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Generate AI response
      const response = await generateAIResponse(
        content,
        state.currentPersona,
        state.messages
      );

      // Add AI response
      const aiMessage = addMessage({
        role: 'assistant',
        content: response,
        persona: state.currentPersona,
      });

      // Speak the response if voice is supported
      if (voiceService.isSpeechSynthesisSupported()) {
        setState(prev => ({ ...prev, isSpeaking: true }));
        const persona = getPersona(state.currentPersona);
        
        try {
          await voiceService.speak(response, persona.voiceSettings);
        } catch (error) {
          console.error('Speech synthesis error:', error);
        } finally {
          setState(prev => ({ ...prev, isSpeaking: false }));
        }
      }
    } catch (error) {
      console.error('Error generating response:', error);
      addMessage({
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        persona: state.currentPersona,
      });
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [state.currentPersona, state.messages, addMessage]);

  const startListening = useCallback(async () => {
    if (!voiceService.isSpeechRecognitionSupported()) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    setState(prev => ({ ...prev, isListening: true }));

    try {
      const transcript = await voiceService.listen();
      await sendMessage(transcript);
    } catch (error) {
      console.error('Speech recognition error:', error);
    } finally {
      setState(prev => ({ ...prev, isListening: false }));
    }
  }, [sendMessage]);

  const switchPersona = useCallback((persona: PersonaType) => {
    setState(prev => ({ ...prev, currentPersona: persona }));
    
    // Stop any ongoing speech
    voiceService.stop();
    setState(prev => ({ ...prev, isSpeaking: false, isListening: false }));
  }, []);

  const clearChat = useCallback(() => {
    setState(prev => ({
      ...prev,
      messages: [],
    }));
    voiceService.stop();
  }, []);

  return {
    ...state,
    sendMessage,
    startListening,
    switchPersona,
    clearChat,
  };
}