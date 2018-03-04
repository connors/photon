# Panes

This component provides graphical panes and a JS controller for sizing them.

![Paned Layout](https://dev.maurice-conrad.eu/img/photon/paned1.png)

## Pane Group

```html
<div class="pane-group">
  <!--Panes here-->
</div>
```

## Pane

```html
<div class="pane-group">

  <div class="pane">...</div>
  <div class="pane">...</div>
  <div class="pane">...</div>

</div>
```

### Sidebar Pane

```html
<div class="pane-group">
  <!--Sidebar here-->
  <div class="pane-sm sidebar">...</div>
  <!--Main pane-->
  <div class="pane">...</div>
</div>
```

## Sizing

Every *pane* is sizeable.

### Min Width

To set a *pane*'s minimal width, just use the CSS property `min-width`.

```html
<div class="pane-group">

  <div class="pane" style="min-width: 250px;">...</div>
  <div class="pane">...</div>

</div>
```

### Max Width

To set a *pane*'s maximal width, just use the CSS property `max-width`.

```html
<div class="pane-group">

  <div class="pane" style="max-width: 500px;">...</div>
  <div class="pane">...</div>

</div>
```

## API

To recognize when a pane is used to be resized, just listen to the `resize` event on your pane or its parents. (Event is bubbling up).
