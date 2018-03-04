# Input


## Simple Input Field


```html
<input type="text" value="Text">
```
![Input Field](https://dev.maurice-conrad.eu/img/photon/input1.png)
![Input Field Focused](https://dev.maurice-conrad.eu/img/photon/input2.png)

## Number Input with Steppers

```html
<!--Input type number-->
<input type="number" value="10" id="myInputWithStepper">
<!--Related stepper-->
<input-stepper for="#myInputWithStepper">
  <button></button>
  <button></button>
</input-stepper>
```

![Number Input with Stepper](https://dev.maurice-conrad.eu/img/photon/input3.png)

## API

Just listen on your `<input>` elements as you would do normally. You can use `value` property and `input` event as defined by **W3**.
