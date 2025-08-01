'use client';

import React from 'react';
import { Message } from '@/types';
import { getPersona } from '@/lib/personas';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const persona = message.persona ? getPersona(message.persona) : null;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`chat-bubble ${
          isUser ? 'user' : 'assistant'
        } animate-slide-up`}
      >
        {!isUser && persona && (
          <div className="flex items-center mb-2">
            <span className="text-lg mr-2">{persona.avatar}</span>
            <span className="font-semibold text-sm">{persona.name}</span>
          </div>
        )}
        <p className="text-sm leading-relaxed">{message.content}</p>
        <div className="text-xs opacity-70 mt-2">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}