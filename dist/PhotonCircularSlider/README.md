# Circular Slider

![Circular Slider](https://dev.maurice-conrad.eu/img/photon/circularslider1.png)

## Layout

```html
<circular-slider value="250"></circular-slider>
```

## API

### Important

The `value` of your `<circular-slider>` is measured in **grads**. They reach from `0` - `400`.

### Get Value

Just *get* the `value` property of your `<circular-slider>` element.

```javascript
// Get value
const val = myCircularSlider.value;
// Log it
console.log(val);
```

### Set Value

Just *set* the `value` property of your `<circular-slider>` element.

```javascript
// Set value to 200 (half of 400)
myCircularSlider.value = 200;
// Look at your circular slider!
```

### Input Event

To recognize user input on the `<circular-slider>`, just listen to the `input` event.

```javascript
// Listen to the 'input' event
myCircularSlider.addEventListener("input", function() {
  // Log new value
  console.log("New Value:", this.value);
});
```
