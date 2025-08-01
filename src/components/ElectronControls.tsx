'use client';

import React, { useState, useEffect } from 'react';

interface ElectronControlsProps {
  isFloating?: boolean;
  onToggleFloating?: () => void;
}

declare global {
  interface Window {
    electronAPI?: {
      toggleFloating: () => Promise<boolean>;
      minimizeToTray: () => Promise<void>;
      setWidgetMode: (enabled: boolean) => Promise<void>;
    };
  }
}

export function ElectronControls({ isFloating: initialFloating }: ElectronControlsProps) {
  const [isElectron, setIsElectron] = useState(false);
  const [isFloating, setIsFloating] = useState<boolean>(initialFloating || true);
  const [isWidgetMode, setIsWidgetMode] = useState<boolean>(true);

  useEffect(() => {
    // Check if running in Electron
    setIsElectron(typeof window !== 'undefined' && !!window.electronAPI);
  }, []);

  const handleToggleFloating = async () => {
    if (window.electronAPI) {
      const newFloatingState = await window.electronAPI.toggleFloating();
      setIsFloating(newFloatingState);
    }
  };

  const handleMinimize = async () => {
    if (window.electronAPI) {
      await window.electronAPI.minimizeToTray();
    }
  };

  const handleToggleWidgetMode = async () => {
    if (window.electronAPI) {
      const newWidgetMode = !isWidgetMode;
      await window.electronAPI.setWidgetMode(newWidgetMode);
      setIsWidgetMode(newWidgetMode);
    }
  };

  if (!isElectron) {
    return null; // Don't render controls if not in Electron
  }

  return (
    <div className="flex items-center justify-between p-2 bg-black/20 rounded-t-xl">
      <div className="flex items-center space-x-2">
        <div className="text-white text-sm font-semibold">DigiBot101</div>
        <div className={`w-2 h-2 rounded-full ${isFloating ? 'bg-green-400' : 'bg-gray-400'}`}></div>
      </div>
      
      <div className="flex items-center space-x-1">
        <button
          onClick={handleToggleWidgetMode}
          className="p-1 hover:bg-white/10 rounded text-white/70 hover:text-white transition-colors"
          title={isWidgetMode ? "Expand window" : "Widget mode"}
        >
          {isWidgetMode ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
        
        <button
          onClick={handleToggleFloating}
          className="p-1 hover:bg-white/10 rounded text-white/70 hover:text-white transition-colors"
          title={isFloating ? "Disable always on top" : "Enable always on top"}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
        
        <button
          onClick={handleMinimize}
          className="p-1 hover:bg-white/10 rounded text-white/70 hover:text-white transition-colors"
          title="Minimize to tray"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}