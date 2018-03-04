const electron = require('electron');

electron.app.on("ready", function() {
  const window = new electron.BrowserWindow({
    width: 1280,
    height: 720,
    titleBarStyle: "hidden",
    webPreferences: {
      experimentalFeatures: true
    }
  });
  window.loadURL("file://" + __dirname + "/index.html");

  window.openDevTools();
});
