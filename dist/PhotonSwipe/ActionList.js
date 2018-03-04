class PhotonSwipeActionList extends HTMLElement {
  constructor() {
    super();
  }
  get actions() {
    return this.getElementsByTagName("swipe-action");
  }
  get innerWidth() {
    return Array.from(this.actions).map(action => action.__staticBoundings.width).reduce((acc, value) => acc + value);
  }
  get role() {
    return this.getAttribute("role");
  }
}

module.exports = PhotonSwipeActionList;
