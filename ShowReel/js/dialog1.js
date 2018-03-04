(() => {
  const electron = require('electron');

  const currWindow = electron.remote.getCurrentWindow();

  document.querySelector(".btn-system").addEventListener("click", function() {
    currWindow.close();
  });
})();
