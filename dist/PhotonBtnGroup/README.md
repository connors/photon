# Button Group



## Default
![Button Group Default](https://dev.maurice-conrad.eu/img/photon/buttongroupdefault.png)

```html
<btn-group>
  <button class="btn btn-default active">Components</button>
  <button class="btn btn-default">Frames & Panes</button>
  <button class="btn btn-default">Table</button>
  <button class="btn btn-default">Messages</button>
</btn-group>
```

As you can see, the *button* with the class `active` is the currently active one.

## Segmented Control

![ButtonGroup Segmented](https://dev.maurice-conrad.eu/img/photon/buttongroupdesegmented.png)

```html
<btn-group>
  <button class="btn btn-segment active">Segment A</button>
  <button class="btn btn-segment">Segment B</button>
  <button class="btn btn-segment">Segment C</button>
</btn-group>
```

As you can see, the *button* with the class `active` is the currently active one.

### Type

The `type` attribute specifies wether the *buttons* can be activated an deactivated relative to each other. This means, `type` = `absolute` means that the currently active *button* will be deactivated when activating one of the other ones. If `type` = `relative` (default value), every *button* can be activated & deactivated seperatly.

#### Relative

```html
<btn-group type="relative">
  <button class="btn btn-segment active">Segment A</button>
  <button class="btn btn-segment">Segment B</button>
  <button class="btn btn-segment">Segment C</button>
</btn-group>
```

#### Absolute

```html
<btn-group type="absolute">
  <button class="btn btn-segment active">Segment A</button>
  <button class="btn btn-segment">Segment B</button>
  <button class="btn btn-segment">Segment C</button>
</btn-group>
```

## API

To recognize when a *button* is activated, listen to the `activate` event that fires on the currently activated *button*. But
