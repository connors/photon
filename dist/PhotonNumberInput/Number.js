class NumberInput extends HTMLElement {
  constructor() {
    super();


    window.addEventListener("mousedown", (event) => {
      if (this != event.target) {
        this.focus = false;
      }
    });

    this.addEventListener("click", function(event) {
      this.focus = true;
    })

    window.addEventListener("keydown", event => {
      if (this.focus) {
        this.__handleKeyPress(event);
        NumberInput.__keyPressed = true;
      }
    });
    window.addEventListener("keyup", event => {
      NumberInput.__keyPressed = false;
    });
    // Cursor for handling input
    this.cursor = 0;

    this.__value = 0;
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    this.__setValue(newValue);
  }
  __handleKeyPress(event) {
    // Get method name of handler
    var handlerMethod = (function(keyCode) {
      // Loop trough records and check them for possibility to handle the current key code
      for (let record of NumberInput.__keyCodes) {
        // Match the key code with the code matcher of the current record
        const keyCodeMatch = keyCode.match(record.code);
        // If the match is valid, return this record as the valid handler
        if (keyCodeMatch) {
          return {
            name: record.name,
            // Use all variables from match result (regular expression groups) excepting the first one because this is always the text itself
            matchResult: Array.from(keyCodeMatch.slice(1))
          };
        }
      }
    })(event.code);
    // If there exist a handler for this kind of key code, use it
    if (handlerMethod) {
      // Call the handler by its name and send all match variables (e.g. match groups) as arguments to the handler
      this.keyHandlers[handlerMethod.name].apply(this, handlerMethod.matchResult);
      this.registerFillTimer();

      this.dispatchEvent(new Event("input", {
        bubbles: true,
        detail: {

        }
      }));
    }
  }
  fill() {
    // Get the amount of digits that will be filled up
    const fillCount = this.maxlength - this.digits.length;

    const newDigits = new Array(fillCount).fill(0).concat(this.digits);

    //this.value = newDigits.join("");
    this.__setValue(newDigits.join(""));
  }
  registerFillTimer() {
    // Get current time and store it to prevent old timers to be fired
    this.lastTimerTime = new Date().getTime();
    // Create new timeout for
    setTimeout((thisTimer) => {
      // If this timer is the last one
      if (this.lastTimerTime === thisTimer) {
        this.fill();
      }
    }, this.cursorTimeout, this.lastTimerTime);
  }
  get cursorTimeout() {
    return parseInt(this.getAttribute("data-cursortimeout")) || NumberInput.__defaultCursorTimeout;
  }
  get value() {
    return new Number(this.__value);
  }
  get textValue() {
    return new String(this.__value).padStart(this.maxlength, "\u00A0");
  }
  set value(value) {
    this.__setValue(value);

    this.setAttribute("value", this.value);
  }
  __setValue(value) {
    // If the value is too big
    if (value > this.max) {
      // Set value to minimum (if exists) or to maximum instead
      value = this.min + Infinity ? this.min : this.max;
    }
    if (value < this.min) {
      // Set value to maximum (if exists) or to minimum instead
      value = this.max - Infinity ? this.max : this.min;
    }
    this.__value = value;

    while (this.childNodes.length > 0) {
      this.removeChild(this.childNodes[0]);
    }

    const textNode = document.createTextNode(this.textValue);

    this.appendChild(textNode);
  }
  get digits() {
    return this.textValue.replace(/\s/g, "").split("").map(number => parseInt(number));
  }
  get maxlength() {
    return (new Number(this.getAttribute("maxlength")) + 0) || 1;
  }
  set maxlength(length) {
    this.setAttribute("maxlength", length);
  }
  get max() {
    return new Number(this.getAttribute("max") || NumberInput.__defaultMax);
  }
  set max(maximal) {
    this.setAttribute("max", maximal);
  }
  get min() {
    return new Number(this.getAttribute("min") || NumberInput.__defaultMin);
  }
  set min(minimum) {
    this.setAttribute("min", minimum);
  }
  get step() {
    return new Number(this.getAttribute("step") || NumberInput.__defaultStep);
  }
  set step(stepValue) {
    this.setAttribute("step", stepValue);
  }
  set focus(value) {
    if (value) {
      this.classList.add("focus");
    }
    else {
      this.classList.remove("focus");
    }
  }
  get focus() {
    return this.classList.contains("focus");
  }
}
NumberInput.observedAttributes = ["value"];
NumberInput.__defaultCursorTimeout = 1000;
NumberInput.__defaultMin = -Infinity;
NumberInput.__defaultMax = Infinity;
NumberInput.__defaultStep = 1;
// Address each important key to a specific handler method
NumberInput.__keyCodes = [
  {
    code: /Digit([0-9])/,
    name: "number"
  },
  {
    code: "ArrowUp",
    name: "add"
  },
  {
    code: "ArrowDown",
    name: "sub"
  },
  {
    code: "ArrowRight",
    name: "next"
  },
  {
    code: "ArrowLeft",
    name: "previous"
  }
];
NumberInput.__keyPressed = false;


NumberInput.prototype.keyHandlers = {
  number(number) {

    number = new Number(number);


    // If length of 4 is reached, clear value
    if (this.digits.length >= this.maxlength) {
      this.value = "";
    }

    this.value = this.digits.concat(number).join("");
  },
  add() {
    this.value += this.step;
  },
  sub() {
    this.value -= this.step;
  },
  next() {
    if (!NumberInput.__keyPressed && this.nextElementSibling instanceof NumberInput) {
      this.focus = false;
      this.nextElementSibling.focus = true;
    }
  },
  previous() {
    if (!NumberInput.__keyPressed && this.previousElementSibling instanceof NumberInput) {
      this.focus = false;
      this.previousElementSibling.focus = true;
    }
  }
};


customElements.define("number-input", NumberInput);

module.exports = NumberInput;
