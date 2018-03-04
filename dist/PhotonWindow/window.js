const electron = require('electron');


class PhotonWindow extends HTMLElement {
  constructor() {
    super();
    //console.log(this);
    this.addEventListener("blur", function(event) {
      //console.log("!!!");
    });


  }
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr in this.__attributeHandlers) {
      this.__attributeHandlers[attr](oldValue, newValue);
    }
  }
  get toolbars() {
    return this.getElementsByTagName("tool-bar");
  }
  get tabGroup() {
    return this.getElementsByTagName("tab-group")[0];
  }
  get content() {
    return this.getElementsByTagName("window-content")[0];
  }
}
PhotonWindow.observedAttributes = ["data-vibrancy"];
PhotonWindow.prototype.__attributeHandlers = {
  ["data-vibrancy"](oldValue, newValue) {
    const browserWindow = electron.remote.getCurrentWindow();
    browserWindow.setVibrancy(newValue);
  }
};

customElements.define("ph-window", PhotonWindow);
