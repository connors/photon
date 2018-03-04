const { getTransDur, hasParentSelector } = require('./../../helper');
const __prototypeExtensions = require('./../PrototypeExtensions');

class PhotonTabItem extends HTMLElement {
  constructor() {
    super();
    const self = this;

    // Mouse down hanlder for this item
    this.addEventListener("mousedown", PhotonTabItem.__handleMouseDown);

    //this.addEventListener("mousemove", PhotonTabItem.__handleMouseMove);
    // Global mouseup handling for this element (Mouseup outside of window)
    window.addEventListener("mouseup", (event) => {
      // If this item is the current one that's be dragged
      if (this.dragging) {
        PhotonTabItem.__handleMouseUp.apply(this, [event]);
      }
    });
    // Global mousemove handling for this element (Mousemove outside of window)
    window.addEventListener("mousemove", (event) => {
      // If this item is the current one that's be dragged
      if (this.dragging) {
        PhotonTabItem.__handleMouseMove.apply(this, [event]);
      }
    });

    this.addEventListener("click", (event) => {
      // Get target path to a button
      var btnTarget = hasParentSelector(event.target, "button");
      // If button exist, the click was on a button
      if (btnTarget) {
        var btnClose = btnTarget.last;
        this.actions[btnClose.getAttribute("action")](this);
      }
      if (this.isButton) {
        this.actions[this.action](this);
      }
    });
    this.actions = {
      close(item) {
        const group = self.parentNode;
        group.closeTab(item, {
          animated: true
        });
      },
      add(item) {
        const group = self.parentNode;
        group.addTab({
          animated: true,
          position: "last",
          closeBtn: true,
          isActive: true,
          content: "New Tab"
        });
      }
    };
  }

  attributeChangedCallback(attr, oldValue, newValue) {

  }
  move(index) {
    const group = this.parentNode;
    return group.moveTab(this, index);
  }
  close(options = {}) {
    const group = this.parentNode;
    return group.closeTab(this, options);
  }
  activate() {
    const group = this.parentNode;
    group.activateTab(this);
  }
  static __handleMouseDown(event) {
    // Get target path to a button
    var btnTarget = hasParentSelector(event.target, "button");
    const group = this.parentNode;
    for (let item of group.items) {
      item.__staticBoundings = item.getBoundingClientRect();
    }

    this.__dragStart = {
      x: event.pageX,
      y: event.pageY
    };
    if (!btnTarget) {
      if (this.dragability) {
        // Add a 'dragging' class to the item
        this.classList.add("dragging");
        // Add a 'in-drag' class to the tab group to determine this state
        group.classList.add("in-drag");
        // Activate this item
      }
      // Activate this item
      group.activateTab(this);
    }
  }
  static __handleMouseUp(event) {
    const group = this.parentNode;
    if (this.dragging) {
      // Dragging is over, remove "dragging" class from item but keep "in-drag" class on group in general because the animation after a succesfull drag is not finished and therefore, the current active tab needs special CSS rules
      this.classList.remove("dragging");
      this.style.removeProperty("transform");
      const pos = {
        x: event.pageX,
        y: event.pageY
      };
      var newPos = (function(x) {
        for (let i = 0; i < group.items.length; i++) {
          let item = group.items[i];
          // If current drag position is within the boundings of the tab item we ware looking for and this position can be achived because the item there is draggable
          if (item.__staticBoundings.left <= x && item.__staticBoundings.right > x && item.dragability) {
            // Seems to be exactly this new position
            return i;
          }
        }
        // Mouse pointer is outside of tab group (E.g. out of window)
        // Therefore, use the most left or morst right item that draggable (Excludes fixed items)
        return Math.abs(x - group.itemsDraggable[0].__staticBoundings.left) >= Math.abs(x - group.itemsDraggable.last.__staticBoundings.right) ? group.itemsDraggable.last.__nodePos : group.itemsDraggable[0].__nodePos;
      })(pos.x);
      // Calculate difference between old and new position
      var diffX = group.items[newPos].__staticBoundings.left - this.__staticBoundings.left;
      diffX += diffX >= 0 ? -2 : 2;
      // If the new position is different from the old one, move the item to it
      if (this.__nodePos != newPos) {
        this.style.transform = "translate(" + diffX + "px, 0px)";
      }
      // Wait for transition to be finished (Animating the dragged item to its target position)
      setTimeout(function(group, currItem) {
        // Move item in DOM context
        currItem.move(newPos);
        // Remove all tab item's 'transform' style property
        for (let item of group.items) {
          item.style.removeProperty("transform");
        }
        // Remove classes 'in-drag' because dragging process is completly over
        group.classList.remove("in-drag");
      }, getTransDur(this) * 1000, group, this);
    }
  }
  static __handleMouseMove(event) {
    const group = this.parentNode;
    if (this.dragging) {
      const pos = {
        x: event.pageX,
        y: event.pageY
      };
      var dragDiff = pos.x - this.__dragStart.x;
      this.style.transform = "translate(" + (dragDiff) + "px, 0px)";
      for (let i = 0; i < group.items.length; i++) {
        let item = group.items[i];
        let leftX = item.__staticBoundings.left;
        let rightX = item.__staticBoundings.right;
        // If current item is before the dragged one
        if (i < this.__nodePos) {
          if (pos.x < rightX && item.dragability) {
            item.style.transform = "translate(" + (this.__staticBoundings.width) + "px, 0px)";
          }
          else item.style.removeProperty("transform");
        }
        // If current item is after the dragged one
        if (i > this.__nodePos) {
          if (pos.x > leftX && item.dragability) {
            item.style.transform = "translate(" + (-this.__staticBoundings.width) + "px, 0px)";
          }
          else item.style.removeProperty("transform");
        }
      }
    }
  }
  get active() {
    return this.classList.contains("active");
  }
  get dragging() {
    return this.classList.contains("dragging");
  }
  get isButton() {
    return !!this.action;
  }
  get __nodePos() {
    return __prototypeExtensions.nodePos(this);
  }
  get action() {
    return this.getAttribute("action");
  }
  set action(value) {
    this.setAttribute("action", value);
  }
  get type() {
    return this.getAttribute("type");
  }
  set type(value) {
    this.setAttribute("type", value);
  }
  // Computed property that returns wether the item is draggable
  get dragability() {
    // Just check for a fixed type property
    return this.type != "fixed";
  }
}
PhotonTabItem.observedAttributes = ["action"];


module.exports = PhotonTabItem;
