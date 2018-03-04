const Input = {
  InputStepper: require('./InputStepper'),
  InputSuffixPropertyDescriptor: require('./InputValuePrototype')
};


customElements.define("input-stepper", Input.InputStepper);


module.exports = Input;
