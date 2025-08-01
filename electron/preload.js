const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  toggleFloating: () => ipcRenderer.invoke('toggle-floating'),
  minimizeToTray: () => ipcRenderer.invoke('minimize-to-tray'),
  setWidgetMode: (enabled) => ipcRenderer.invoke('set-widget-mode', enabled),
});