# Drop Down Menu

![Dialog](https://dev.maurice-conrad.eu/img/photon/dropdown1.png)

The dropdown menu is just a controller that binds a native `Menu` from *Electron* to the bottom of a target.
Therefore have a look at the Electrons [Menu API](https://electronjs.org/docs/api/menu#menubuildfromtemplatetemplate).

## API

To open such a *drop down menu*, just use the static `DropDown` method of your `Photon` instance.

```javascript
// 'target' is just the <element> to which's bottom your menu should be positioned
// 'template' is just a normal electron template you already know

// Returns a electron menu class instance
const menu = Photon.DropDown(target, template);

// Log the menu normally
console.log(menu);
```

### Note

Because the drop down menu is just a normal electron menu, `DropDown` will return such a *menu class instance*. You are abled to use this class normally with all its methods and properties as you know from [Electron API](https://electronjs.org/docs/api/menu)

### Example

```javascript
const myButton = document.querySelector("button"); // Get your button here

const myDropDownMenu = Photon.DropDown(myButton, [
  {
    label: "Item 1",
    submenu: [
      {
        label: "Sub Item 1.1",
        click: function() {
          console.log("Clicked Sub Item 1.1");
        }
      }
    ]
  },
  {
    label: "Item 2",
    submenu: [
      {
        label: "Sub Item 2.1"
      }
    ]
  }
]);
```
