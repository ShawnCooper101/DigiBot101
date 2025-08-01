const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;
let isFloating = true;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    x: width - 420, // Position near right edge
    y: 50, // Position near top
    frame: false, // Remove window frame for floating effect
    alwaysOnTop: true, // Keep on top for floating widget
    resizable: true,
    transparent: true, // Enable transparency
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets', 'icon.png') // App icon
  });

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile('dist/index.html');
  }

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Make window draggable
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
}

// Handle toggle floating mode
ipcMain.handle('toggle-floating', () => {
  if (mainWindow) {
    isFloating = !isFloating;
    mainWindow.setAlwaysOnTop(isFloating);
    return isFloating;
  }
  return false;
});

// Handle minimize to system tray
ipcMain.handle('minimize-to-tray', () => {
  if (mainWindow) {
    mainWindow.hide();
  }
});

// Handle window resize for widget mode
ipcMain.handle('set-widget-mode', (event, enabled) => {
  if (mainWindow) {
    if (enabled) {
      mainWindow.setSize(320, 480);
      mainWindow.setAlwaysOnTop(true);
    } else {
      mainWindow.setSize(800, 600);
      mainWindow.setAlwaysOnTop(false);
    }
  }
});

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    console.log('Prevented new window to: ', navigationUrl);
  });
});