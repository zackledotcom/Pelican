
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { fork } = require('child_process');

let mainWindow;
let backendProcess;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#1e1e1e',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the index.html file
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Start the backend server
  startBackend();
}

function startBackend() {
  backendProcess = fork(path.join(__dirname, 'server.js'));
  
  backendProcess.on('message', (message) => {
    // Forward messages from backend to renderer
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('backend-message', message);
    }
  });
  
  backendProcess.on('exit', (code) => {
    console.log(`Backend process exited with code ${code}`);
    // Restart backend if it crashes
    if (code !== 0 && !app.isQuitting) {
      console.log('Restarting backend...');
      startBackend();
    }
  });
}

// Set up IPC handlers
ipcMain.on('to-backend', (event, data) => {
  if (backendProcess) {
    backendProcess.send(data);
  }
});

// Create window when Electron has finished initialization
app.whenReady().then(createWindow);

// Flag to track if app is quitting
app.isQuitting = false;

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  app.isQuitting = true;
  if (backendProcess) {
    backendProcess.kill();
  }
});

app.on('activate', () => {
  // On macOS re-create a window when dock icon is clicked and no windows are open
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
cMain } = require('electron');
const path = require('path');
const { fork } = require('child_process');

let mainWindow;
let backendProcess;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#1e1e1e',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the index.html file
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Start the backend server
  startBackend();
}

function startBackend() {
  backendProcess = fork(path.join(__dirname, 'server.js'));
  
  backendProcess.on('message', (message) => {
    // Forward messages from backend to renderer
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('backend-message', message);
    }
  });
  
  backendProcess.on('exit', (code) => {
    console.log(`Backend process exited with code ${code}`);
    // Restart backend if it crashes
    if (code !== 0 && !app.isQuitting) {
      console.log('Restarting backend...');
      startBackend();
    }
  });
}

// Set up IPC handlers
ipcMain.on('to-backend', (event, data) => {
  if (backendProcess) {
    backendProcess.send(data);
  }
});

// Create window when Electron has finished initialization
app.whenReady().then(createWindow);

// Flag to track if app is quitting
app.isQuitting = false;

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  app.isQuitting = true;
  if (backendProcess) {
    backendProcess.kill();
  }
});

app.on('activate', () => {
  // On macOS re-create a window when dock icon is clicked and no windows are open
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
