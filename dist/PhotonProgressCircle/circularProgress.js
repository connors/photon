const { setSVGAttributes } = require('./../../helper');


class ProgressCircle extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open'
    });

    const radius = ProgressCircle.__radius;

    const svg = document.createElementNS(ProgressCircle.__svgNameSpace, "svg");
    setSVGAttributes(svg, {
      style: 'width: 100%; height: 100%;',
      viewBox: -50 + " " + -50 + " " + (100) + " " + (100)
    });
    this.pathElement = document.createElementNS(ProgressCircle.__svgNameSpace, "path");
    setSVGAttributes(this.pathElement, {
      style: "fill: #555;"
    });
    svg.append(this.pathElement);

    const circleBorder = document.createElementNS(ProgressCircle.__svgNameSpace, "circle");
    setSVGAttributes(circleBorder, {
      style: "fill: none; stroke: #555; stroke-width: 5px;",
      cx: 0,
      cy: 0,
      r: radius
    });
    svg.append(circleBorder);


    shadow.appendChild(svg);
  }
  attributeChangedCallback(attribute, oldValue, newValue) {
    const attributeHandlers = {
      value: value => this.__visualCalc(value),
    };
    if (attribute in attributeHandlers) {
      attributeHandlers[attribute](newValue);
    }
  }
  get value() {
    return parseFloat(this.getAttribute("value"));
  }
  __visualCalc(value) {
    const progress = Math.PI * 2 * (value === 1 ? 0.99999999 : value);
    this.coords = {
      x: Math.sin(progress) * ProgressCircle.__radius,
      y: Math.cos(progress) * ProgressCircle.__radius
    };
  }
  set value(value) {
    this.__visualCalc(value);
    this.setAttribute("value", value);
  }
  set coords(coords) {
    const radius = ProgressCircle.__radius;
    this.path = "M 0,0 l 0," + -radius + " A " + radius + " " + radius + " 0 " + (coords.x < 0 & 1) + " 1 " + coords.x + "," + -coords.y;
  }
  set path(value) {
    this.pathElement.setAttributeNS(null, "d", value);
  }
}
ProgressCircle.observedAttributes = ["value"];
ProgressCircle.__svgNameSpace = "http://www.w3.org/2000/svg";
ProgressCircle.__radius = 50;




customElements.define("progress-circle", ProgressCircle);



module.exports = ProgressCircle;
