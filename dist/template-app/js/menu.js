const remote = require('electron').remote
const {Menu} = remote
const {MenuItem} = remote

// Build our new menu
var menu = new Menu()
menu.append(new MenuItem({
    label: 'Delete',
    click: function () {
        // Trigger an alert when menu item is clicked
        alert('Deleted')
    }
}))
menu.append(new MenuItem({ type: 'separator' }));
menu.append(new MenuItem({
    label: 'More Info...',
    click: function () {
        // Trigger an alert when menu item is clicked
        alert('Here is more information')
    }
}))

// Add the listener
window.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    menu.popup(remote.getCurrentWindow());
}, false)
