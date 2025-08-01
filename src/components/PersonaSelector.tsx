'use client';

import React from 'react';
import { PersonaType } from '@/types';
import { personas } from '@/lib/personas';

interface PersonaSelectorProps {
  currentPersona: PersonaType;
  onPersonaChange: (persona: PersonaType) => void;
}

export function PersonaSelector({ currentPersona, onPersonaChange }: PersonaSelectorProps) {
  return (
    <div className="flex gap-4 mb-6">
      {Object.values(personas).map((persona) => (
        <div
          key={persona.id}
          onClick={() => onPersonaChange(persona.id)}
          className={`persona-card flex-1 ${
            currentPersona === persona.id 
              ? 'ring-2 ring-white ring-opacity-50' 
              : 'opacity-80 hover:opacity-100'
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-2">{persona.avatar}</div>
            <h3 className="font-bold text-lg">{persona.name}</h3>
            <p className="text-sm opacity-90 mt-1">{persona.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}