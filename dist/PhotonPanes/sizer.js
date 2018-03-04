const __prototypeExtensions = require('./../PrototypeExtensions');
const { parseCSSProperty } = require('./../../helper');

const PaneSizer = {
  toleranceDiff: 15,
  mouseDown(event) {
    const position = {
      x: event.pageX,
      y: event.pageY
    };
    const nextPaneBorder = this.getNextPaneBorder(position);
    if (nextPaneBorder && nextPaneBorder.positionRel < this.toleranceDiff) {
      this.drag = Object.assign({
        start: Object.assign({}, position),
        get diff() {
          return {
            x: this.curr.x - this.start.x,
            y: this.curr.y - this.start.y
          };
        },
        curr: Object.assign({}, position)
      }, nextPaneBorder);
      this.drag.pane.__staticStyle = Object.assign({}, window.getComputedStyle(this.drag.pane));
    }
  },
  mouseUp(event) {
    this.drag = null;
  },
  mouseMove(event) {
    const position = {
      x: event.pageX,
      y: event.pageY
    };
    const nextPaneBorder = this.getNextPaneBorder(position);
    if (nextPaneBorder && nextPaneBorder.positionRel < this.toleranceDiff) {
      const windowElement = nextPaneBorder.pane.closest("window-content");
      windowElement.classList.add("sizing-pane");
    }
    else {
      const windowContents = document.querySelectorAll("window-content");
      for (let content of windowContents) {
        content.classList.remove("sizing-pane");
      }
    }

    if (this.drag) {
      this.drag.curr = position;
      const originalWidth = parseCSSProperty(this.drag.pane.__staticStyle["width"], "number");
      const newWidth = originalWidth + this.drag.diff.x;
      this.drag.pane.style.width = newWidth + "px";
      this.drag.pane.style.flex = "none";

      const resizeEvent = new Event("resize", {
        bubbles: true,
        detail: {
          newWidth: newWidth
        }
      });
      this.drag.pane.dispatchEvent(resizeEvent);
    }
  },
  get panes() {
    const panes = [
      document.getElementsByClassName('pane-sm'),
      document.getElementsByClassName('pane')
    ];
    return Array.merge(panes.map(nodePaneList => Array.from(nodePaneList)));
  },
  getPanesBorders(pane) {
    const nodePos = __prototypeExtensions.nodePos(pane);
    return {
      left: pane.previousElementSibling ? pane.getBoundingClientRect().left : null,
      right: pane.nextElementSibling ? pane.getBoundingClientRect().right : null
    };
  },
  getAllBorders(position) {
    const candiates = this.panes.filter(function(pane) {
      let boundings = pane.getBoundingClientRect();
      return position.y >= boundings.top && position.y <= boundings.bottom;
    });
    return Array.merge(candiates.map((pane) => {
      return Object.values(this.getPanesBorders(pane)).filter(border => border).map(function(pos) {
        return {
          position: pos,
          positionRel: Math.abs(position.x - pos),
          pane: pane
        };
      });
    }));
  },
  getNextPaneBorder(position) {
    const borders = this.getAllBorders(position);

    const border = borders[borders.indexOfKey(Math.min.apply(Math, borders.map(borderRecord => borderRecord.positionRel)), "positionRel")];

    return border;

  }
};

window.addEventListener("mousedown", event => PaneSizer.mouseDown(event));
window.addEventListener("mouseup", event => PaneSizer.mouseUp(event));
window.addEventListener("mousemove", event => PaneSizer.mouseMove(event));

module.exports = PaneSizer;
