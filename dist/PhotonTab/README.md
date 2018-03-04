# Tab Group

The *Tab Group* component is completely redesigned as a much cleaner implementation.

The component is independent but should be used after the *toolbar top* because this is the way the UI is designed.

![Example](https://dev.maurice-conrad.eu/img/photon/tab1.png)

![Activate Tab](https://dev.maurice-conrad.eu/img/photon/tab2.gif)

![Move Tab](https://dev.maurice-conrad.eu/img/photon/tab1.gif)



## Context

```html
...
<tool-bar type="header">
  <!--Header toolbar-->
</tool-bar>
<!--Tab group here-->
<tab-group>
  ...
  <!--Tab group should be here-->
  ...
</tab-group>
...
```

## Layout

```html
<tab-group>

  ...

  <tab-item>
    <button action="close"></button>
    Tab Name
  </tab-item>

  ...

</tab-group>
```

This shall be self-explaining. The `<button action="close"></button>` is optional but of course, if it does not exist, there will be no close button.

### tab-group

The `<tab-group>` element does not need any specific attributes. It is recommended to listen for events on the *tab-group*. More about events you will see in [API](#api)

### tab-item

#### Fixed

To fix a tab item, just set its `type` to `fixed`.

```html
...
<tab-item type="fixed">
  Fixed Tab
</tab-item>
...
```

#### Special Adding Tab

A tab item can also have an `action` which is recommended for the tab on the right side. This tab would be used to add tabs using the UI.

```html
...
<tab-item action="add"></tab-item>
...
```

### Example

```html
<tab-group>
  <tab-item type="fixed" class="active">
    Fixed Tab
  </tab-item>
  <tab-item>
    <button action="close"></button>
    Tab 2
  </tab-item>
  <tab-item>
    <button action="close"></button>
    Tab 3
  </tab-item>
  <tab-item type="fixed" action="add"></tab-item>
</tab-group>
```

## API

### Methods

#### Add Tab

To add a tab to a `<tab-group>` you should call the `addTab` method on the *tab group* element.

```javascript
const myNewTab = myTabGroup.addTab({
  position: "last", // "last" or "first"
  closeBtn: true, // Wether the tab can be closed using a button within it
  isActive: true, // Wether the tab item will be the active one
  animated: true, // Wether an animation will be shown when adding the tab item
  content: document.createTextNode("New Tab") // Node or string
});
// Log the new tab item
console.log(myNewTab);
```

#### Close Tab

To close a tab you can use the method `closeTab` on your `<tab-group>` or the method `close` on the `<tab-item>` instead.

##### closeTab

```javascript
myTabGroup.closeTab(myTabItem, {
  animated: true // Wether an animation will be shown when closing the tab item
});
```

##### close

```javascript
myTabItem.close({
  animated: true // Wether an animation will be shown when closing the tab item
});
```

#### Move Tab

To move a tab item you can use the method `moveTab` on your `<tab-group>` or the method `move` on the `<tab-item>` instead.

##### moveTab

```javascript
const index = 1;
// Moves 'myTabItem' to position 1 (2nd).
myTabGroup.moveTab(myTabItem, index);
```

##### move

```javascript
const index = 1;
// Moves 'myTabItem' to position 1 (2nd).
myTabItem.move(index);
```

#### Activate Tab

To activate a tab item you can use the method `activateTab` on your `<tab-group>` or the method `activate` on the `<tab-item>` tab element instead.

##### activateTab

```javascript
myTabGroup.activateTab(myTabItem);
```

##### activate

```javascript
myTabItem.activate();
```

### Events

All events that are connected to an existing `<tab-item>` are fired on the `<tab-item>` but they will bubble up to the `<tab-group>`. Only the event `tabAdd` will still be fired on the `<tab-group>` because it does not make sense to dire an event for a `<tab-item>` we actually do not know.

Therefore all events can be handled on the `<tab-group>` directly.

#### tabActivate

##### Global

```javascript
// Handle all tab activations for the whole group
myTabGroup.addEventListener("tabActivate", function(event) {
  console.log(event);
});
```

##### Local

```javascript
// Handle tab activations for a specific tab-item
myTabItem.addEventListener("tabActivate", function(event) {
  console.log(event);
});
```

#### tabClose

##### Global

```javascript
// Handle all tab closings for the whole group
myTabGroup.addEventListener("tabClose", function(event) {
  console.log(event);
});
```

##### Local

```javascript
// Handle tab closing for a specific tab-item
myTabItem.addEventListener("tabClose", function(event) {
  console.log(event);
});
```

#### tabAdd

##### Global

```javascript
// Handle all tab additions for the whole group
myTabGroup.addEventListener("tabAdd", function(event) {
  console.log(event);
});
```

#### tabMove

##### Global

```javascript
// Handle all tab movements for the whole group
myTabGroup.addEventListener("tabMove", function(event) {
  console.log(event);
});
```

##### Local

```javascript
// Handle tab movements for a specific tab-item
myTabItem.addEventListener("tabMove", function(event) {
  console.log(event);
});
```
