# Content Frame

![Lists](https://dev.maurice-conrad.eu/img/photon/contentframe2.png)

This a component for a framed list that may is editable.

## Basic Layout

```html
<content-frame style="height: 300px;">
  <!--Frame inner-->
  <frame-inner>
    ...
  </frame-inner>
  <!--Toolbar on bottom-->
  <div class="toolbar">
    <button class="btn btn-add"></button>
    <button class="btn btn-remove" disabled></button>
  </div>
</content-frame>
```


### List Select

To add an selectable (and possible editable) list into the inner of the frame, use the `<list-select>` element.

```html
<content-frame style="height: 300px;">
  <!--Frame inner-->
  <frame-inner>
    <list-select class="list-editable">
      <!--Draggable="true" means that the item can be dragged-->
      <li class="active" draggable="true">
        <details>
          <summary>Orange</summary>
          <list-select>
            <li draggable="true">Bloodorange</li>
            <li draggable="true">Orange</li>
          </list-select>
        </details>
      </li>
      <li draggable="true">
        <span>Banana</span>
      </li>
      <li draggable="true">
        <span>Grapefruit</span>
      </li>
    </list-select>
  </frame-inner>
  <!--Toolbar on bottom-->
  <div class="toolbar">
    <button class="btn btn-add"></button>
    <button class="btn btn-remove" disabled></button>
  </div>
</content-frame>
```

You can add infinity sub lists and each of them can be editable. Just set the item's `draggable` attribute to `true`.

### Main Border

![Main Border](https://dev.maurice-conrad.eu/img/photon/mainborder.png)

```html
...
<window-content class="theme-gray">

  <div class="main-border">
    ...
  </div>

</window-content>
...
```

Parent element should have the class `theme-gray` because this adds the lighweight gray background to the main border you know from *macOS*.

Of course, if you are using your **main border** within a pane, it is okay to set the pane's class to `theme-gray`.
