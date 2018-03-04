const __prototypeExtensions = require('./../PrototypeExtensions');

class PhotonSwipeAction extends HTMLElement {
  constructor() {
    super();
  }
  get __nodePos() {
    return __prototypeExtensions.nodePos(this);
  }
  set smart(value) {
    if (value) {
      this.classList.add("smart");
    }
    else {
      this.classList.remove("smart");
    }
  }
  get smart() {
    return this.classList.contains("smart");
  }
}


module.exports = PhotonSwipeAction;
