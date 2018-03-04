const electron = require('electron');
const { getTemplate } = require('../../helper');

const path = require('path');

const photonPath = path.normalize(__dirname + "/../../");

module.exports = async function Dialog(e, options = {}) {
  var templateScript = e;
  if (typeof e === "string") {
    templateScript = document.querySelector(e);
  }

  const boundings = {
    width: 500,
    height: 350
  };

  const template = await getTemplate(templateScript);

  const mainWindow = electron.remote.getCurrentWindow();

  const photonWin = document.querySelector("ph-window");

  var dialog = templateScript.__dialogWindow;
  if (!dialog) {
    dialog = new electron.remote.BrowserWindow(Object.assign({
      parent: mainWindow,
      //frame: false,
      //hasShadow: false,
      //transparent: true,
      show: false,
      //width: boundings.width,
      //height: boundings.height,
      //resizable: false,
      //focusable: false,
      //alwaysOnTop: true,
      vibrancy: "popover",
      modal: true,
      //'use-content-size': true
    }, options));

    const sheetOffset = photonWin.content.getBoundingClientRect().top;
    dialog.setSheetOffset(sheetOffset);

    dialog.once("ready-to-show", function() {
      dialog.show();
      setModalPos(dialog, mainWindow, {
        x: 0,
        y: sheetOffset
      });
    });

    mainWindow.on("resize", function(event) {
      dialog.setSheetOffset(sheetOffset);
      setModalPos(dialog, mainWindow, {
        x: 0,
        y: sheetOffset
      });
    });

    dialog.loadURL("file://" + __dirname + "/templateModal.html");

    const jsScript = path.join(path.dirname(window.location.origin + window.location.pathname), templateScript.getAttribute("data-js") || "");

    dialog.webContents.on("did-finish-load", function() {
      dialog.webContents.executeJavaScript('document.querySelector(".modal-window").innerHTML = `' + template.replace(/`/g, "\\`") + '`;\n');
      if (templateScript.getAttribute("data-js")) {
        dialog.webContents.executeJavaScript('var script = document.createElement("script"); script.async = true; script.type = "text/javascript"; script.src = "' + jsScript + '"; document.head.append(script);');
      }
    });

    //dialog.webContents.openDevTools();

    window.dialog = dialog;

  }
}

function setModalPos(modal, main, offset = {}) {
  offset = {
    x: Math.round(main.getPosition()[0] + main.getSize()[0] / 2 - modal.getSize()[0] / 2),
    y: Math.round(main.getPosition()[1] + offset.y)
  };
  modal.setPosition(offset.x, offset.y);
}

function showModal(modal) {
  const size = modal.getSize();

  var start;
  var end = 500;
  function step(timestamp) {
    if (!start) {
      start = timestamp;
    }
    var progress = timestamp - start;
    if (progress < end) {
      requestAnimationFrame(step);
    }
    else {
      progress = end;
    }
    var height = Math.round(progress / end * size[1]);
    modal.setSize(size[0], height);
  }
  requestAnimationFrame(step);
}
