class CircularSlider extends HTMLElement {
  constructor() {
    super();

    this.__angle = 0;

    this.addEventListener("mousedown", this.__handleMouseDown);
    window.addEventListener("mouseup", event => this.__handleMouseUp(event));
    window.addEventListener("mousemove", event => this.__handleMouseMove(event));

    const dot = document.createElement("div");
    dot.classList.add("dot");

    setTimeout(() => {
      this.appendChild(dot);
      this.attributeChangedCallback("value", undefined, this.getAttribute("value"));
    }, 0);

  }
  __handleMouseDown(event) {
    this.__mousedown = true;
    this.__handleMouseMove(event);
  }
  __handleMouseUp(event) {
    if (this.__mousedown) {
      this.dispatchEvent(new Event('change', {
        bubbles: true,
        cancelable: true
      }));
    }
    this.__mousedown = false;
  }
  __handleMouseMove(event) {
    if (this.__mousedown) {
      this.__angle = this.__getAngle();
      this.value = this.__angle;

      this.dispatchEvent(new Event('input', {
        bubbles: true,
        cancelable: true
      }));
    }
  }
  connectedCallback() {
    this.__initialized = true;
    //this.attributeChangedCallback("value", undefined, this.getAttribute("value"));
  }
  attributeChangedCallback(attribute, oldValue, newValue) {
    const attributeHandlers = {
      value: value => this.__setAngle(value)
    };
    if (attribute in attributeHandlers && this.__initialized) {
      attributeHandlers[attribute](newValue);
    }
  }
  get dot() {
    return this.getElementsByClassName("dot")[0];
  }
  __getAngle() {
    const boundings = this.getBoundingClientRect();
    const center = {
      x: boundings.left + boundings.width / 2,
      y: boundings.top + boundings.height / 2
    };
    const diff = {
      x: event.pageX - center.x,
      y: event.pageY - center.y
    };
    const tan = diff.x / diff.y;
    const angle = (diff.y >= 0 ? 200 : (diff.x >= 0 ? 0 : 400)) - Math.atan(tan) * (200 / Math.PI);

    return angle;
  }
  __render() {
    const deg = 360 / 400 * this.__angle;
    this.dot.style.transform = 'translate(0px, -140%) rotate(' + deg + 'deg)';
  }
  __setAngle(angle) {
    this.__angle = parseFloat(angle);
    this.__render();
  }
  set value(value) {
    this.__setAngle(value);
    this.setAttribute("value", value);
  }
  get value() {
    return this.__angle;
  }
}
CircularSlider.observedAttributes = ["value"];



customElements.define("circular-slider", CircularSlider);

module.exports = CircularSlider;
