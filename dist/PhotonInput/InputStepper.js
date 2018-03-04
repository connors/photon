class PhotonInputStepper extends HTMLElement {
  constructor() {
    super();
    /*
    const shadow = this.attachShadow({mode: 'open'});

    const addButton = document.createElement("button");
    const subButton = document.createElement("button");

    shadow.append(`
      <style>
        @import url( 'css/input-stepper.css' )
      </style>
    `);

    shadow.appendChild(addButton);
    shadow.appendChild(subButton);*/

    this.addEventListener("click", this.__handleClick);

  }
  get buttons() {
    const buttons = this.getElementsByTagName("button");
    return {
      add: buttons[0],
      sub: buttons[1]
    };
  }
  get for() {
    return document.querySelector(this.getAttribute("for"));
  }
  set for(value) {
    this.setAttribute("for", value);
  }
  get min() {
    return parseFloat(this.for.min) || PhotonInputStepper.__defaultMin;
  }
  get max() {
    return parseFloat(this.for.max) || PhotonInputStepper.__defaultMax;
  }
  get step() {
    return parseFloat(this.for.step) || PhotonInputStepper.__defaultStep;
  }
  get value() {
    return parseFloat(this.for.value);
  }
  __handleClick(event) {
    const button = event.target.closest("button");

    if (button === this.buttons.add) {
      this.add(this.step);
    }
    else if (button === this.buttons.sub) {
      this.add(-this.step);
    }
    this.for.dispatchEvent(new Event("input", {
      cancelable: true,
      bubbles: true
    }));
  }
  add(number) {
    var newValue = this.value + number;
    if (newValue > this.max) newValue = this.max;
    if (newValue < this.min) newValue = this.min;
    this.for.value = newValue;
  }
}
PhotonInputStepper.__defaultStep = 1;
PhotonInputStepper.__defaultMax = Infinity;
PhotonInputStepper.__defaultMin = -Infinity;

module.exports = PhotonInputStepper;
