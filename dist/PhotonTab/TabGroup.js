const { hasParentSelector, getTransDur } = require('./../../helper');

class PhotonTabGroup extends HTMLElement {
  constructor() {
    super();
    //this.addEventListener("");
  }
  get items() {
    return this.getElementsByTagName("tab-item");
  }
  get itemsDraggable() {
    return Array.from(this.items).filter(item => item.dragability);
  }
  get itemsEnableable() {
    return Array.from(this.items).filter(item => !item.isButton);
  }
  moveTab(item, index) {
    // If tab moves really and does not remain on its old position
    if (index != item.__nodePos) {
      var posBefore = item.__nodePos;
      this.insertBefore(item, this.items[index + (posBefore >= index ? 0 : 1)]);
      item.dispatchEvent(new CustomEvent("tabMove", {
        bubbles: true,
        detail: {
          tab: item,
          position: index
        }
      }));
    }
  }
  activateTab(item) {
    // If the tab is enableable (no button itself!) and not still active
    if (!item.isButton && !item.active) {
      for (let item of this.items) {
        item.classList.remove("active");
      }
      item.classList.add("active");
      item.dispatchEvent(new CustomEvent("tabActivate", {
        bubbles: true,
        detail: {
          tab: item
        }
      }));
      return true;
    }
    return false;
  }
  closeTab(item, options) {
    options = options.fillDefaults({
      animated: false
    });
    // If the tab that will be closed, is the active one
    if (item.active) {
      // Get the index of this tab in the list of possible enableable tabs
      let currItemIndexEnableable = this.itemsEnableable.indexOf(item);
      // Use the tab before or the tab behind this one as the next one
      let nextActiveItem = this.itemsEnableable[currItemIndexEnableable - 1] || this.itemsEnableable[currItemIndexEnableable + 1];
      // Activate this next tab
      this.activateTab(nextActiveItem);
    }
    if (options.animated) {
      item.classList.add("adding");
      item.style.width = item.__staticBoundings.width + "px";
      setTimeout(function() {
        item.style.removeProperty("width");
      }, 10);
      setTimeout(() => {
        this.removeChild(item);
      }, getTransDur(item) * 1000);
    }
    else {
      this.removeChild(item);
    }
    item.dispatchEvent(new CustomEvent("tabClose", {
      bubbles: true,
      detail: {
        tab: item,
        options: options
      }
    }));
  }
  addTab(options = {}) {
    options = options.fillDefaults({
      position: "last",
      closeBtn: true,
      isActive: true,
      animated: true,
      content: document.createTextNode("New Tab")
    });
    var newTab = document.createElement("tab-item");
    if (options.closeBtn) {
      var closeBtn = document.createElement("button");
      closeBtn.setAttribute("action", "close");
      newTab.appendChild(closeBtn);
    }
    newTab.appendChild(typeof options.content === "string" ? document.createTextNode(options.content) : options.content);
    if (this.itemsDraggable.length > 0) {
      var appendRefItem = options.position === "first" ? this.itemsDraggable[0] : this.items[this.itemsDraggable.last.__nodePos + 1];
    }
    else {
      var appendRefItem = this.items.last;
    }
    // Calculate new tab's width to perform transition
    //const newTabWidth = this.itemsDraggable[0].getBoundingClientRect().width * this.itemsDraggable.length / (this.itemsDraggable.length + 1);
    const newTabWidth = this.getTabWidth(this.itemsDraggable.length + 1);
    if (appendRefItem) {
      this.insertBefore(newTab, appendRefItem);
    }
    else {
      this.appendChild(newTab);
    }
    if (options.animated) {
      newTab.classList.add("adding");
      setTimeout(() => {
        if (this.itemsDraggable.length > 0) {
          newTab.style.width = newTabWidth + "px";
        }
      }, 10);
      setTimeout(function() {
        newTab.classList.remove("adding");
        newTab.style.removeProperty("width");
      }, this.itemsDraggable.length > 0 ? (getTransDur(newTab) * 1000) : 0);
    }
    this.dispatchEvent(new CustomEvent("tabAdd", {
      detail: {
        tab: newTab,
        options: options
      }
    }));
    if (options.isActive) this.activateTab(newTab);
  }
  get __activeDraggingItem() {
    for (let item of this.items) {
      if (item.classList.contains("dragging")) {
        return item
      }
    }
  }
  getTabWidth(count = 1) {
    const fixedWidth = Array.from(this.items).filter(item => !item.dragability).reduce((a, b) => a.getBoundingClientRect().width + b.getBoundingClientRect().width);

    const totalWidth = this.getBoundingClientRect().width;

    return (totalWidth - fixedWidth) / count;
  }
  static __handleMouseDown() {

  }
}

module.exports = PhotonTabGroup;
