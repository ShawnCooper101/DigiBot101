'use client';

import React, { useState, useEffect } from 'react';
import { PersonaType } from '@/types';
import { personas } from '@/lib/personas';

interface PersonaSelectorProps {
  currentPersona: PersonaType;
  onPersonaChange: (persona: PersonaType) => void;
}

export function PersonaSelector({ currentPersona, onPersonaChange }: PersonaSelectorProps) {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    setIsElectron(typeof window !== 'undefined' && !!(window as any).electronAPI);
  }, []);

  return (
    <div className={`flex gap-${isElectron ? '2' : '4'} ${isElectron ? 'mb-2' : 'mb-6'}`}>
      {Object.values(personas).map((persona) => (
        <div
          key={persona.id}
          onClick={() => onPersonaChange(persona.id)}
          className={`persona-card flex-1 ${
            currentPersona === persona.id 
              ? 'ring-2 ring-white ring-opacity-50' 
              : 'opacity-80 hover:opacity-100'
          } ${isElectron ? 'p-3' : 'p-6'}`}
        >
          <div className="text-center">
            <div className={`mb-2 ${isElectron ? 'text-2xl' : 'text-4xl'}`}>
              {persona.avatar}
            </div>
            <h3 className={`font-bold ${isElectron ? 'text-sm' : 'text-lg'}`}>
              {persona.name}
            </h3>
            {!isElectron && (
              <p className="text-sm opacity-90 mt-1">{persona.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}