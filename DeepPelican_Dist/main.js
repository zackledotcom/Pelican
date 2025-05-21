const { app, BrowserWindow } = require('electron');
const path = require('path');
const { fork } = require('child_process');

let win;
app.whenReady().then(() => {
  const backend = fork(path.join(__dirname, 'server.js'));

  win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#1e1e1e',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS re-create a window when dock icon is clicked and no windows are open
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
 require('electron');
const path = require('path');
const { fork } = require('child_process');

let win;
app.whenReady().then(() => {
  const backend = fork(path.join(__dirname, 'server.js'));

  win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#1e1e1e',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS re-create a window when dock icon is clicked and no windows are open
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
