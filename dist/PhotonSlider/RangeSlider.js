const inputValueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");

const RangeSlider = {
  inputHandle(event) {
    const inputRange = event.target.closest("input[type='range']");
    if (inputRange) {
      RangeSlider.sliderVisualCalc(inputRange);
    }
  },
  sliderVisualCalc(slider) {
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const value = parseFloat(slider.value) || 0;


    slider.style.backgroundSize = (100 * ((value - min) / (max - min))) + "% 100%";

    if (slider.classList.contains("slider-vertical")) {
      slider.style.marginBottom = slider.getBoundingClientRect().width + "px";
    }

  },
  __inputValuePropertySetter(value) {
    inputValueDescriptor.set.apply(this, [value]);
    if (this.type === "range") {
      RangeSlider.sliderVisualCalc(this);
      return true;
    }
  }
};

Object.defineProperty(HTMLInputElement.prototype, "value", {
  get: inputValueDescriptor.get,
  set: RangeSlider.__inputValuePropertySetter
});

window.addEventListener("input", RangeSlider.inputHandle);

module.exports = RangeSlider;
