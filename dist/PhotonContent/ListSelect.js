const __prototypeExtensions = require('../PrototypeExtensions');

class PhotonListSelect extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("dragstart", this.__handleDragStart);
    this.addEventListener("dragenter", this.__handleDragEnter);
    this.addEventListener("dragend", this.__handleDragEnd);
    this.addEventListener("drag", this.__handleDrag);
  }
  __handleDragStart(event) {
    if (event.target.parentNode === this) {
      this.drag = {
        target: event.target,
        lastTarget: event.target,
        get relPos() {
          const targetBoundings = this.target.getBoundingClientRect();
          return {
            x: this.position.x - targetBoundings.left,
            y: this.position.y - targetBoundings.top
          };
        },
        // Return the index (+ or -) addition for the new drag position relative to the drag target
        get insertIndexRel() {
          // Returns 1 or 0
          // 0 stants for "top" (The dragged index will be the original index of the drag target)
          // 1 stands for "bottom" (The dragged index will be the original index of the drag target + 1)
          // That's because we can calculate with these numbers in a very powerful way
          // 0 or 1 will be returned by converting the boolean result of the expression below to a number (0 = false, 1 = true) by using the bitwise operator &
          return (this.relPos.y - this.target.getBoundingClientRect().height / 2 > 0) & 1;
        },
      };
    }
  }
  __handleDragEnter(event) {
    if (event.target.parentNode === this) {
      const nextTarget = event.target.closest("list-select li");

      if (this.drag) {
        this.drag.lastTarget = this.drag.target;
        this.drag.target = nextTarget;
      }
    }
  }
  __handleDragEnd(event) {
    if (event.target.parentNode === this) {

      const targetClone = event.target.cloneNode(true);
      PhotonListSelect.removeGraphical(targetClone);

      const targetNodePos = __prototypeExtensions.nodePos(this.drag.target);

      // Get the reference element, the dragged element will be inserted before
      const insertRefElement = this.drag.target.parentNode.children[targetNodePos + this.drag.insertIndexRel];

      // If this reference element is undefined, it does not exist
      if (insertRefElement) {
        this.drag.target.parentNode.insertBefore(targetClone, insertRefElement);
      }
      // We are using appendChild to append it on the end
      else {
        this.drag.target.parentNode.appendChild(targetClone);
      }
      // Delete original node from DOM
      event.target.parentNode.removeChild(event.target);

      PhotonListSelect.removeGraphical(this.drag.target);


      this.drag = null;
    }
  }
  __handleDrag(event) {
    if (event.target.parentNode === this) {
      if (event.clientX && event.clientY) {
        this.drag.position = {
          x: event.clientX,
          y: event.clientY
        };
        // Reset graphical classes
        PhotonListSelect.removeGraphical(this.drag.lastTarget);
        PhotonListSelect.removeGraphical(this.drag.target);

        // 'insertIndexRel' is used to dtermine wether border top or border bottom should be drawn
        this.drag.target.classList.add(PhotonListSelect.__dragGraphicalCSSClasses[this.drag.insertIndexRel]);

      }
    }
  }
  static removeGraphical(target) {
    // Remove any possible graphical class from drag target
    for (let className of this.__dragGraphicalCSSClasses) {
      target.classList.remove(className);
    }
  }
}
// Static class references for drawing a border while dragging
PhotonListSelect.__dragGraphicalCSSClasses = ["drag-before", "drag-after"];

module.exports = PhotonListSelect;
