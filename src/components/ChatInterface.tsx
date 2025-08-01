'use client';

import React, { useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { PersonaSelector } from './PersonaSelector';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { getPersona } from '@/lib/personas';

export function ChatInterface() {
  const {
    messages,
    isLoading,
    currentPersona,
    isListening,
    isSpeaking,
    sendMessage,
    startListening,
    switchPersona,
    clearChat,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentPersonaData = getPersona(currentPersona);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-white mb-2">DigiBot101</h1>
        <p className="text-white/80">Your AI Assistant for Personal & Business Management</p>
      </div>

      {/* Persona Selector */}
      <PersonaSelector 
        currentPersona={currentPersona} 
        onPersonaChange={switchPersona} 
      />

      {/* Chat Container */}
      <div className="flex-1 glass-effect rounded-xl p-6 mb-4 flex flex-col min-h-0">
        {/* Current Persona Indicator */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/20">
          <div className="flex items-center">
            <span className="text-2xl mr-3">{currentPersonaData.avatar}</span>
            <div>
              <h3 className="text-white font-semibold">{currentPersonaData.name}</h3>
              <p className="text-white/70 text-sm">{currentPersonaData.description}</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Clear Chat
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-1 min-h-0">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white/60">
                <div className="text-6xl mb-4">{currentPersonaData.avatar}</div>
                <p className="text-lg mb-2">Hi! I'm {currentPersonaData.name}</p>
                <p className="text-sm">{currentPersonaData.personality}</p>
                <p className="text-sm mt-4">Ask me anything or use voice input!</p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="chat-bubble assistant">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-500">{currentPersonaData.name} is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Voice Status */}
        {(isListening || isSpeaking) && (
          <div className="flex items-center justify-center py-2 text-white/80">
            <div className="flex items-center space-x-2">
              {isListening && (
                <>
                  <div className="voice-indicator"></div>
                  <span className="text-sm">Listening...</span>
                </>
              )}
              {isSpeaking && (
                <>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">{currentPersonaData.name} is speaking...</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSendMessage={sendMessage}
        onStartListening={startListening}
        isLoading={isLoading}
        isListening={isListening}
        isSpeaking={isSpeaking}
      />
    </div>
  );
}