class NavigationGroup extends HTMLElement {
  constructor() {
    super();

    //console.log(this);
  }
  get items() {
    return this.getElementsByTagName("nav-item");
  }
}

module.exports = NavigationGroup;
