# Dialog

A controller for native modal windows connected to **Photon**.

![Dialog](https://dev.maurice-conrad.eu/img/photon/dialog1.png)

To define a dialog's content use a `x-template` `<script>` tag in your applications `<head>`. The dialog can be required using a `src` attribute or instead with inner HTML.
You can define a special javascript controller for the dialog (because it will render in a custom webview) using the `data-js` attribute where you can refer to a javascript file.

## Template

```html
<head>
  ...
  <script type="text/x-template" id="dialog1">

    <h1>Dialog</h1>

    <button class="btn btn-system">Cancel</button>
    <button class="btn btn-system btn-active">Button</button>

  </script>
  ...
</head>
```

## API

Just call `Photon.Dialog()` with your *x-template* `<script>` element or a query selector to the element as first argument and options as second.

```javascript
// Options are just custom options for electron BrowserWindow (https://electronjs.org/docs/api/browser-window)
const options = {
  width: 600,
  height: 400,
  minHeight: 150,
  minWidth: 200
};

// Just use the element's query selector
Photon.Dialog("#dialog1", options);
// Or use the element instead
Photon.Dialog(xTemplateScriptElement, options);
```

### External Source

Just use the `src` attribute as you know from `<script>` tag.

```html
<script type="text/x-template" id="dialog1" src="myDialog1.html"></script>
```

### Custom Controller

Because the dialog will be rendered in a own window and therefore within a separate webview, you can load a javascript controller in the `<head>` of your dialog webview using the `data-js` attribute.


```html
<script type="text/x-template" id="dialog1" src="myDialog1.html" data-js="myDialogController.js"></script>
```

Please note that your `data-js` file is added to the `<head>` of your dialog's webview which means that the content is not loaded while executing the code. To make things working, you should listen to `load` event ;-)

There also exists a global `Photon` instance in your dialog's storage that is initialized automatically.

#### Important!

Adding an inline `<script>` to your *x-template* does not work because chromium executes javascript code only after loading and not when a `<script>` tag is added asynchronously. This is not good at all but it is the reason why I have implemented the `data-js` solution.
