(function() {
  const fs = require('fs');

  const componentsBasePath = "./components";

  const Photon = {};


  const components = {
    "Original": {
      path: "dist/PhotonOriginal",
      style: "photon-original.css"
    },
    Button: {
      path: "dist/PhotonButton",
      style: "button.css"
    },
    "Custom": {
      path: "dist/PhotonCustom",
      style: "custom.css"
    },
    "Window": {
      path: "dist/PhotonWindow",
      style: "window.css"
    },
    "WindowContent": {
      path: "dist/PhotonWindowContent"
    },
    "Toolbar": {
      path: "dist/PhotonToolbar",
      style: "toolbar.css"
    },
    "ButtonGroup": {
      path: "dist/PhotonBtnGroup",
      style: "segment.css"
    },
    "Tab": {
      path: "dist/PhotonTab",
      style: "tab.css"
    },
    "List": {
      path: "dist/PhotonSwipe",
      style: "swipe.css"
    },
    "Content": {
      path: "dist/PhotonContent",
      style: "content.css"
    },
    "Input": {
      path: "dist/PhotonInput",
      style: "input.css"
    },
    "ProgressCircle": {
      path: "dist/PhotonProgressCircle",
      style: "progress-circle.css"
    },
    "CircularSlider": {
      path: "dist/PhotonCircularSlider",
      style: "circular-slider.css"
    },
    "Slider": {
      path: "dist/PhotonSlider",
      style: "slider.css"
    },
    "Panes": {
      path: "dist/PhotonPanes",
      style: "panes.css"
    },
    "Messages": {
      path: "dist/PhotonMessages",
      style: "messages.css"
    },
    "NumberInput": {
      path: "dist/PhotonNumberInput",
      style: "number-input.css"
    },
    "Dialog": {
      path: "dist/PhotonDialog",
      style: "dialog.css"
    },
    "DropDown": {
      path: "dist/PhotonMenu",
      //style: "dropdown.css"
    },
    "PhotonNavigation": {
      path: "dist/PhotonNavigation",
      style: "navigation.css"
    }
  };

  const photonStyleSheetPath = __dirname + "/dist/photon.css";

  const photonStyle = document.createElement("style");
  document.head.append(photonStyle);


  // Loop trough compontents
  for (let componentName in components) {
    // If the key name relates to a real property
    if (components.hasOwnProperty(componentName)) {
      // Get the compontents full path
      let componentBaseDir = __dirname + "/" + components[componentName].path;
      // Require te compontent with CommonJS
      let component = require(componentBaseDir);
      // Set a back reference to Photon class to the component
      component.__self = Photon;
      // Set component as property of Photon class
      Object.defineProperty(Photon, componentName, {
        value: component,
        configurable: false,
        enumerable: true,
        writeable: false
      });
      // If the compontent has a related stylesheet
      if (components[componentName].style) {
        // Get the stylesheet's full path
        let styleSheetPath = componentBaseDir + "/" + components[componentName].style;
        // Append an @import statement to the styleheet of photon that refers to the components stylesheet
        photonStyle.append('@import "' + styleSheetPath + '";');
      }
    }
  }

  if (window) {
    window.Photon = Photon;
  }
  module.exports = Photon;

})();
