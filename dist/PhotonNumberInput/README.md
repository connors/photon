# Number Input

![Number Input](https://dev.maurice-conrad.eu/img/photon/numberinput.png)

This component is a static numeric input that does not provide a cursor as a classically input field would do. You can type in your digits and after a certain timeout your typed digits are interpreted as a number. A new typed digit starts a new number. You also can go up and down with arrows. If your `<number-input>` is part of a *group*, you can navigate from each to the next or previous one with arrow keys.

## Layout

```html
<number-input value="1"></number-input>
```

The `value` attribute represents the current value.

### Maxlength

To define the maximum amount of digits, use the `maxlength` attribute or property of your `<number-input>`.

```html
<number-input value="1" maxlength="4"></number-input>
```

### Minimum & Maximum

```html
<number-input value="1" maxlength="4" maximum="1200" minimum="25"></number-input>
```

If a minimum **and** a maximum value are defined both, a *key up* or *key down* will jump to the reverse one (minimum or maximum).

### Step

The step size of the steps that will be gone up and down when pressing *key up* or *key down* are represented by the attribute `step` of your `<number-input>`.

### Grouping

To make a group of `<number-input>`'s related to each other, just use them in a common parent element like a `<div>`.

```html
<div>
  <number-input maxlength="2" max="31" min="1" value="1"></number-input>
  <number-input maxlength="2" max="12" min="1" value="6"></number-input>
  <number-input maxlength="4" value="2018"></number-input>
</div>
```

## API

Every attribute is related to a property of your `<number-input>`.

```javascript
// Set value
myNumberInput.value = 100;

// Set maximum
myNumberInput.max = 300;

// Set minimum
myNumberInput.min = 25;

// Set step
myNumberInput.step = 5;
```

### Input Event

To recognize when a `<number-input>`'s value gets changed by user, listen to the `input` event on your element or globally. (Event is bubbling up).

```javascript
myNumberInput.addEventListener("input", function(event) {
  console.log(event);
});
```
