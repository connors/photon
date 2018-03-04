class NavigationItem extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("click", event => this.__handleClick(event));
  }
  activate() {
    for (let item of this.group.items) {
      item.classList.remove("active");
    }
    this.classList.add("active");
  }
  get group() {
    return this.closest("nav-group");
  }
  __handleClick(event) {
    if (!this.classList.contains("active")) {
      this.activate();

      this.dispatchEvent(new CustomEvent("activate", {
        bubbles: true,
        detail: {

        }
      }));
    }
  }
}

module.exports = NavigationItem;
