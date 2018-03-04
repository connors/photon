# Window

The `<ph-window>` element is the main element for each application.

```html
<ph-window>
  ...
</ph-window>
```

To make a macOS vibrancy effect appear, set the *vibrancy*'s type in the `data-vibrancy` attribute. The possible types depend on electron. The are listed on [Electron Browser Window](https://electronjs.org/docs/api/browser-window#class-browserwindow).

## Context

A `<ph-window>` itself does not look very interesting. To make the magic happen, you should combine it with `<window-content>` & `<tool-bar>`'s.

In this example, you see both `<tool-bar>`'s and `<window-content>`.

```html
<ph-window class="vibrancy">
  <tool-bar type="header">
    <h1 class="title">Toolbar Header</h1>
  </tool-bar>

  <window-content>
    ...
  </window-content>

  <tool-bar type="footer">
    <h1 class="title">Toolbar Footer</h1>
  </tool-bar>
</ph-window>
```

## Vibrancy

The `data-vibrancy` attribute makes your window supporting macOS vibrancy. This means that the `<window-content>` is basically transparent expect in the case you define your own background color. And some elements such as `<list-group>` are semi-transparent and look like you know from *macOS*.
