// var remote = require('remote')
// var Menu = remote.require('menu')
// var MenuItem = remote.require('menu-item')
const {remote} = require('electron')
const {Menu,MenuItem} = remote

// Build our new menu
var menu = new Menu()
menu.append(new MenuItem({
  label: 'Delete',
  click: function() {
    // Trigger an alert when menu item is clicked
    alert('Deleted')
  }
}))
menu.append(new MenuItem({
  label: 'More Info...',
  click: function() {
    // Trigger an alert when menu item is clicked
    alert('Here is more information')
  }
}))

// Add the listener
document.addEventListener('DOMContentLoaded', function () {

  let filesContext = document.querySelectorAll('.file_arq');
  
  filesContext.forEach(function(el){
    el.addEventListener('click', function (event) {
      event.preventDefault()
      menu.popup(remote.getCurrentWindow());
    })
  })
})
