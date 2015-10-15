var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  var mainWindow = new BrowserWindow({
    width: 600,
    height: 300,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Quit App
  // OS X specific (Cmd+Q should quit the App)
  app.on('before-quit', () => {
    mainWindow.forceClose = true;
    console.log('App QUIT');
  });

  // Open App window
  // OS X specific (Clicking the dock icon opens the App)
  app.on('activate', () => {
    mainWindow.show();
    console.log('App OPENED');
  });

  // Close App window
  // OS X specific (Cmd+W should close the window, but not the App)
  mainWindow.on('close', (e) => {
    if (mainWindow.forceClose) return;
    e.preventDefault();
    mainWindow.hide();
    console.log('App CLOSED');
  });

  return mainWindow;
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});
