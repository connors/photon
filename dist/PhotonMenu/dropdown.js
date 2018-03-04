const { Menu } = require('electron').remote;

module.exports = function DropDown(target, template) {
  // Create menu from options template
  const menu = Menu.buildFromTemplate(template);
  // Get boundings of target
  const targetBounds = target.getBoundingClientRect();
  // Popup menu and set its position
  const res = menu.popup({
    x: Math.round(targetBounds.left),
    y: Math.round(targetBounds.top + targetBounds.height + 6),
    async: true
  });
  return menu;
}
