var remote = require('remote')
var Menu = remote.require('menu')
var MenuItem = remote.require('menu-item')

var menu = new Menu()
menu.append(new MenuItem({
  label: 'Delete',
  click: function() {
    alert('Deleted')
  }
}))
menu.append(new MenuItem({
  label: 'More Info...',
  click: function() {
    alert('Here is more information')
  }
}))

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.js-context-menu').addEventListener('click', function (event) {
    // var BrowserWindow = require('remote').require('browser-window')
    //
    // var button = event.target
    // var windowPosition = BrowserWindow.getFocusedWindow().getPosition()
    //
    // var x = button.offsetLeft + windowPosition[0] + (button.offsetWidth / 2)
    // var y = button.offsetTop + windowPosition[1] + button.offsetHeight

    menu.popup(remote.getCurrentWindow());
  })
})
