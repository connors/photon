const { hasParentSelector, getTransDur, parseCSSProperty } = require('./../../helper');

var electron = require('electron');
var mainWindow = electron.remote.getCurrentWindow();

mainWindow.on("scroll-touch-begin", function(event) {
  PhotonListItem.__gestureTouch = true;
});
mainWindow.on("scroll-touch-end", function(event) {
  PhotonListItem.__gestureTouch = false;
});

class PhotonListItem extends HTMLElement {
  constructor() {
    super();

    const self = this;

    this.addEventListener("wheel", this.__wheelHandler);

    this.__dragStart = null;

    this.addEventListener("mousedown", this.__mouseDownHandler);
    window.addEventListener("mouseup", event => this.__mouseUpHandler(event));
    window.addEventListener("mousemove", event => this.__mouseMoveHandler(event));

    this.addEventListener("mousemove", event => event.preventDefault());

    // Current scrolling difference
    this.currScroll = 0;
    // Wether scrolling has begon already
    // Used to determine wether a "wheel" event is the first time fired while a single gesture
    this.gesture = {
      direction: null,
      // Get the index of the direction
      get dirName() {
        return PhotonListItem.__directions.keyFromValue(this.direction);
      },
      get actionList() {
        // Return action-list element from action lists within this list item
        return self.actionLists[this.dirName];
      },
      // Return the type of gesture
      get type() {
        // If the gesture's direction and the touch direction are equal, the user is opening the swipe actions, otherwise closing
        return (this.direction === this.touch.direction || this.overscroll) ? "open" : "close";
      },
      // Return the theoretically candidate for being s smart action
      get smartCandidate() {
        return this.actionList.actions[this.direction < 0 ? 0 : (this.actionList.actions.length - 1)]
      },
      // Return wether smart action is streched (smartness)
      get smartAction() {
        return false;
        const totalActionsWidth = this.scrollDiff;
        const listItemTotalWidth = self.getBoundingClientRect().width;

        return totalActionsWidth >= listItemTotalWidth;
      },
      // Touch data
      touch: null,
      // Theoretically scroll of mousewheel that is performed in this gesture (Everything is interpreted 1:1)
      scroll: 0,
      // Real scroll that is used (Overscoll is not interpreted 1:1) and absoluted
      get scrollDiff() {
        const scrollAbs = Math.abs(this.scroll);
        return this.overscroll ? PhotonListItem.__overscrollCalc(this.actionList.innerWidth, this.overscroll) : scrollAbs;
      },
      // Theoretically overscroll (Overscoll is interpreted 1:1)
      get overscroll() {
        const overscroll = Math.abs(this.scroll) - this.actionList.innerWidth;
        return overscroll > 0 ? overscroll : 0;
      },
      // Real overscroll that is rendered (Not 1:1)
      get overscrollPx() {
        const overscrollPx = this.scrollDiff - this.actionList.innerWidth;
        return overscrollPx > 0 ? overscrollPx : 0;
      },
      speed: 0
    };

    mainWindow.on("scroll-touch-end", (event) => {
      if (this.gesture.direction && this.gesture.touch) {
        this.__touchEndHandler(event);
      }
    });
  }
  /*get actionLists() {
    const actionLists = Array.from(this.getElementsByTagName("action-list"));
    return [
      actionLists.filter(list => list.role === "left")[0],
      actionLists.filter(list => list.role === "right")[0]
    ];
  }*/
  get actionLists() {
    const actionLists = Array.from(this.getElementsByTagName("action-list"));
    return {
      left: actionLists.filter(list => list.role === "left")[0],
      right: actionLists.filter(list => list.role === "right")[0]
    };
  }
  get inner() {
    return this.getElementsByTagName("item-inner")[0];
  }
  __touchEndHandler(event) {
    const self = this;
    // User is not touching anymore, handle this case's CSS specifications without the class 'touching'
    this.classList.remove("touching");
    // Get gesture's type
    const type = this.gesture.type;
    // Get the last speed
    const speed = this.gesture.speed;
    // Calculate the transition duration that is relative to the speed
    {
      // General calulcation
      let transDur = 1.5 / speed;
      // Define minimum and maxiumum of duration
      let min = 0.2;
      let max = 0.6;
      // Apply minimum and maxiumum value to the transition duration
      transDur = transDur > min ? transDur : min;
      transDur = transDur < max ? transDur : max;
      // Set the duration as CSS property to action list, all actions and the list inner
      {
        this.gesture.actionList.style.transitionDuration = transDur + "s";
        for (let action of this.gesture.actionList.actions) {
          action.style.transitionDuration = transDur + "s";
        }
        this.inner.style.transitionDuration = transDur + "s";
      }
    }
    // Quit gesture (Call some resetting stuff)
    this.__quitGesture();
    // Handle a different type of action with a different handler
    const actionTypeHandlers = {
      open() {
        self.__openActions();
      },
      close() {
        self.__closeActions();
      }
    };
    // Handle type of interaction with its handler ("open" || "close")
    actionTypeHandlers[type]();
  }
  // Open wrapper for external openings
  open(direction) {
    // Try to close a possible open swipe
    try {
      this.close();
    }
    catch (e) {}
    // Set direction
    this.gesture.direction = direction;
    // Intitialize gesture
    this.__initGesture();
    // Open swipes internaly
    this.__openActions();
  }
  close() {
    // Try to close a possible open swipe
    try {
      this.__closeActions();
    }
    // There seems to be no open swipe
    catch (e) {
      throw new Error("No open swipe");
    }
  }
  __openActions() {
    // Set scroll position to the full width of current action list of current gesture (Multiplied with the direction's sign)
    this.gesture.scroll = this.gesture.actionList.innerWidth * Math.sign(this.gesture.direction);
    // Render the new scroll position
    this.__render();

    this.gesture.actionList.dispatchEvent(new CustomEvent("swipe", {
      bubbles: true,
      detail: {
        action: "open",
        swipe: this.gesture.actionList
      }
    }));
  }
  __closeActions() {
    const actionList = this.gesture.actionList;
    // Set scroll position
    this.gesture.scroll = 0;
    // Render the new scroll position
    this.__render();
    // Reset the gesture because we are in the normal situation now and both directions can be swiped to
    this.gesture.direction = null;

    actionList.dispatchEvent(new CustomEvent("swipe", {
      bubbles: true,
      detail: {
        action: "close",
        swipe: actionList
      }
    }));
  }
  __initGesture() {
    for (let action of this.gesture.actionList.actions) {
      // Freeze CSS properties to get original CSS values later (e.g. they become changed)
      action.__staticCSSProperties = Object.assign({}, window.getComputedStyle(action));
      // Freeze boundings to get original boundings when they are already changed later
      action.__staticBoundings = action.getBoundingClientRect();
    }
  }
  __quitGesture() {
    this.gesture.scroll = Math.abs(this.gesture.scroll) > this.gesture.actionList.innerWidth ? this.gesture.actionList.innerWidth : this.gesture.scroll;
    for (let action of this.gesture.actionList.actions) {
      action.style.removeProperty("width");
    }
  }
  __wheelHandler(event) {
    const self = this;

    const delta = event.deltaX;

    if (PhotonListItem.__gestureTouch) {
      this.scrollDelta(delta);
    }

  }
  scrollDelta(delta) {
    const direction = delta * Infinity;
    const swipeIsValid = !!this.actionLists[PhotonListItem.__directions.keyFromValue(direction)];
    // Determine wether the user is really touching now and swiping to this direction is abled
    // Swiping in this direction is abled if there exist a action list or, if not, a gesture is active which means we can scroll back
    if (true && (swipeIsValid || this.gesture.direction)) {
      this.classList.add("touching");
      if (!this.gesture.direction) {
        // First time fired while a single gesture
        this.gesture.direction = direction;
        this.__initGesture();
      }
      // Real touch begin event handling because global event does not refer to target, therefore the first wheel event fired while a touch is used
      if (!this.gesture.touch) {
        this.gesture.touch = {};
      }
      // Set current touch's direction
      this.gesture.touch.direction = delta * Infinity;

      this.gesture.speed = Math.abs(delta);

      // Add delta to scroll while the gesture's direction is not deceived
      // In such a case, if the direction would be turned, go to 0
      this.gesture.scroll += (this.gesture.scroll + delta) * Infinity === this.gesture.direction ? delta : 0 - this.gesture.scroll;
      // Render the new scroll position
      this.__render();
    }
  }
  __mouseDownHandler(event) {
    this.__dragStart = {
      x: event.pageX,
      y: event.pageY
    };
    this.classList.add("touching");
  }
  __mouseUpHandler(event) {
    this.__dragStart = null;
    this.__drag = null;
    this.classList.remove("touching");

    if (this.gesture.direction && this.gesture.touch) {
      this.__touchEndHandler(event);
    }
  }
  __mouseMoveHandler(event) {
    /*
      NOTE
      Please note that the mouse controller is a fallback for the normal wheel controller.
      Therefore the mouse position is interpreted as delta you know from wheel event. This is because the API is originally designed for such wheel events
    */

    if (this.__dragStart) {
      const currDrag = {
        x: -(event.pageX - this.__dragStart.x),
        y: -(event.pageY - this.__dragStart.y)
      };

      if (this.__drag) {
        const delta = currDrag.x - this.__drag.x;

        this.scrollDelta(delta);
      }

      this.__drag = currDrag;
    }
  }
  __render() {
    // Get the related action list to the gesture's direction
    const actionList = this.gesture.actionList;

    const scrollDiff = this.gesture.scrollDiff;

    // Global interaction with left & right swipes

    // Set each action's margin
    const marginBase = (actionList.innerWidth - scrollDiff) / actionList.actions.length;

    // Render bounce effect of overscroll
    if (this.gesture.overscroll) {
      // Calculate bounce
      let actionBounce = PhotonListItem.__calcActionBounce(this.gesture.overscrollPx / actionList.actions.length);
      // Add bounce to every action
      for (let action of this.gesture.actionList.actions) {
        // Add bounce to orignal width (stored in '__staticWidth' which stores the original width as CSS property)
        action.style.width = (parseCSSProperty(action.__staticCSSProperties["width"], "number") + actionBounce) + "px";
      }
    }
    // Handle each action
    for (let action of this.gesture.actionList.actions) {
      // Calculate the margin for current action
      let margin = marginBase * action.__nodePos;
      // Only use the margin if the inner width is smaller than total width
      margin = margin > 0 ? margin : 0;
      // Use margin as right margin for current action
      action.style.right = margin + "px";
    }

    // Set action list's width to scrolled area
    actionList.style.width = scrollDiff + "px";

    const specialDirectionHandle = {
      left: () => {},
      right: () => this.inner.style.marginLeft = -scrollDiff + "px"
    };
    // Call special swipe calculations for the current direction
    specialDirectionHandle[this.gesture.dirName]();


    // Handle smart action
    // Check wether there exist currently an action that should be used smartly
    if (this.gesture.smartAction) {
      this.gesture.smartCandidate.smart = true;
    }
    // No smart action
    else {
      this.gesture.smartCandidate.smart = false;
    }
  }
  static __overscrollCalc(max, overscroll) {
    return max + overscroll * 0.5;
  }
  static __calcActionBounce(bounce) {
    return bounce / 5;
  }
}
PhotonListItem.__gestureTouch = false;
PhotonListItem.__directions = {
  left: -Infinity,
  right: Infinity
};


module.exports = PhotonListItem;
