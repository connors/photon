class ButtonGroup extends HTMLElement {
  constructor() {
    super();

    this.__typeHandler = {
      absolute: btn => this.__typeAbsoluteHandle(btn),
      relative: btn => this.__typeRelativeHandle(btn),
    };

    this.addEventListener("click", this.__handleClick);
  }
  activate(button) {
    let typeHandler = this.__typeHandler[this.type];
    typeHandler(button);
  }
  __handleClick(event) {
    const button = event.target.closest(".btn");
    if (button) {
      this.activate(button);

      button.dispatchEvent(new CustomEvent("activate", {
        bubbles: true,
        detail: {
          button: button
        }
      }));
    }
  }
  __typeAbsoluteHandle(button) {
    for (let button of this.buttons) {
      button.classList.remove("active");
    }
    button.classList.add("active");
  }
  __typeRelativeHandle(button) {
    if (button.classList.contains("active")) {
      button.classList.remove("active");
    }
    else {
      button.classList.add("active");
    }
  }
  attributeChangedCallback(attr, oldValue, newValue) {

  }
  get buttons() {
    return this.getElementsByClassName("btn");
  }
  get type() {
    return this.getAttribute("type") || "relative";
  }
  set type(value) {
    return this.setAttribute("type", value);
  }
}
ButtonGroup.observedAttributes = ["type"];


customElements.define("btn-group", ButtonGroup);


module.exports = ButtonGroup;
