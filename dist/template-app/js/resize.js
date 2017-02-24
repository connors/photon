// Global drag-related variables
var CURSOR_IN_DRAG_ZONE = false,
    CAN_DRAG = false,
    IS_DRAGGING = false;

// Get the root .pane-group element
var rootPaneGroup = Array.from(document.getElementsByClassName('pane-group'))[0];

// Build pane tree
buildPaneTree(rootPaneGroup);

// Rebuild tree on resize
window.onresize = function() { buildPaneTree(rootPaneGroup); }

// Build pane tree recursively
function buildPaneTree(el) {
  // Base case
  if (isPane(el) && !isPaneGroup(el)) {
    return ({ node: el });
  } else {
    if (isPaneGroup(el)) {
      var splitters;

      // Only allow .pane elements to pass through
      var panes = objToArr(el.childNodes).filter(function(child) {
        if (objToArr(child.classList).includes('pane')) return true;
        else return false;
      });

      // Append splitters to DOM then split panes equally
      appendSplitters(el, panes, isVerticalPaneGroup(el), function() {
        var elementDimension,
            splitterClass;

        // Set variables based on pane-group direction
        if (isVerticalPaneGroup(el)) {
          elementDimension = getExistingHeight(el);
          splitterClass = 'splitter-vertical';
        } else {
          elementDimension = getExistingWidth(el);
          splitterClass = 'splitter';
        }

        // Set the flex-basis for each pane
        panes.forEach(function(pane, i) {
          if (pane.style.flexBasis === '') {
            setFlexBasis(pane, (elementDimension / panes.length));
          }
        });

        // Push the splitters to an array
        splitters = objToArr(el.childNodes).filter(function(child) {
          if (objToArr(child.classList).includes(splitterClass)) return true;
          else return false;
        });
      });

      splitters.forEach(function(s, i) {
        s.onmousedown = resizer.bind(null, i, panes, isVerticalPaneGroup(el));
      })

      return {
        child_panes: panes.map(function(child) {
          return buildPaneTree(child)
        }),
        node: el,
        splitters: splitters,
        vertical: isVerticalPaneGroup(el)
      }
    }
  }
}

function appendSplitters(el, panes, isVertical, setSplitters) {
  // Appends a .splitter before every pane except for first child in the group
  panes.forEach(function(pane, i) {
    if (isVertical) {
      if (i !== 0 && !objToArr(pane.previousSibling.classList).includes('splitter-vertical')) {
        var splitter = document.createElement('div'),
            zone = document.createElement('div');
        splitter.classList.add('splitter-vertical');
        zone.classList.add('splitter-zone-vertical');
        el.insertBefore(splitter, pane);
        splitter.appendChild(zone);
      }
    } else {
      if (i !== 0 && !objToArr(pane.previousSibling.classList).includes('splitter')) {
        var splitter = document.createElement('div'),
            zone = document.createElement('div');
        splitter.classList.add('splitter');
        zone.classList.add('splitter-zone');
        el.insertBefore(splitter, pane);
        splitter.appendChild(zone);
      }
    }
  });
  // Set each .pane's flex-basis property after splitters have
  // been appended to the DOM
  setSplitters();
}

function resizer(i, panes, vertical, e) {
  CAN_DRAG = true;

  function resizePanes(prev, next, prevFlex, nextFlex) {
    setFlexBasis(prev, prevFlex);
    setFlexBasis(next, nextFlex);
  }

  // Vertical .pane-group resizing
  if (vertical) {
    var initialCursorY = e.clientY,
        topPane = panes[i],
        bottomPane = panes[i + 1],
        topPaneHeight = getExistingHeight(topPane),
        bottomPaneHeight = getExistingHeight(bottomPane),
        topPaneMaxHeight = getExistingMaxheight(topPane),
        bottomPaneMaxHeight = getExistingMaxheight(bottomPane),
        topPaneHasMaxHeight = !isNaN(topPaneMaxHeight),
        bottomPaneHasMaxHeight = !isNaN(bottomPaneMaxHeight);

    document.onmousemove = function (e) {
      if (CAN_DRAG) {
        IS_DRAGGING = true;
        var distanceTraveledY = initialCursorY - e.clientY,
            newTopPaneHeight = topPaneHeight - distanceTraveledY,
            newBottomPaneHeight = bottomPaneHeight + distanceTraveledY;

        // Allow resize only if new height < max height
        if ((topPaneHasMaxHeight && !bottomPaneHasMaxHeight) &&
            (newTopPaneHeight <= topPaneMaxHeight)) {
          resizePanes(topPane, bottomPane, newTopPaneHeight, newBottomPaneHeight);
        }
        else if ((!topPaneHasMaxHeight && bottomPaneHasMaxHeight) &&
                 (newBottomPaneHeight <= bottomPaneMaxHeight)) {
          resizePanes(topPane, bottomPane, newTopPaneHeight, newBottomPaneHeight);
        }
        else if ((topPaneHasMaxHeight && bottomPaneHasMaxHeight) &&
                (newTopPaneHeight <= topPaneMaxHeight) &&
                (newBottomPaneHeight <= bottomPaneMaxHeight)) {
          resizePanes(topPane, bottomPane, newTopPaneHeight, newBottomPaneHeight);
        }
        else if (!topPaneHasMaxHeight && !bottomPaneHasMaxHeight) {
          resizePanes(topPane, bottomPane, newTopPaneHeight, newBottomPaneHeight);
        }
      }
      document.onmouseup = function (e) {
        IS_DRAGGING = false;
        CAN_DRAG = false;
      }
    }
  }
  // Horizontal .pane-group resizing
  else {
    var initialCursorX = e.clientX,
        leftPane = panes[i],
        rightPane = panes[i + 1],
        leftPaneWidth = getExistingWidth(leftPane),
        rightPaneWidth = getExistingWidth(rightPane),
        leftPaneMaxWidth = getExistingMaxWidth(leftPane),
        rightPaneMaxWidth = getExistingMaxWidth(rightPane),
        leftPaneHasMaxWidth = !isNaN(leftPaneMaxWidth),
        rightPaneHasMaxWidth = !isNaN(rightPaneMaxWidth);

    document.onmousemove = function (e) {
      if (CAN_DRAG) {
        IS_DRAGGING = true;
        var distanceTraveledX = initialCursorX - e.clientX,
            newLeftPaneWidth = leftPaneWidth - distanceTraveledX,
            newRightPaneWidth = rightPaneWidth + distanceTraveledX;

        // Allow resize only if new width < max width
        if ((leftPaneHasMaxWidth && !rightPaneHasMaxWidth) &&
            (newLeftPaneWidth <= leftPaneMaxWidth)) {
          resizePanes(leftPane, rightPane, newLeftPaneWidth, newRightPaneWidth);
        }
        else if ((!leftPaneHasMaxWidth && rightPaneHasMaxWidth) &&
                 (newRightPaneWidth <= rightPaneMaxWidth)) {
          resizePanes(leftPane, rightPane, newLeftPaneWidth, newRightPaneWidth);
        }
        else if ((leftPaneHasMaxWidth && rightPaneHasMaxWidth) &&
                (newLeftPaneWidth <= leftPaneMaxWidth) &&
                (newRightPaneWidth <= rightPaneMaxWidth)) {
          resizePanes(leftPane, rightPane, newLeftPaneWidth, newRightPaneWidth);
        }
        else if (!leftPaneHasMaxWidth && !rightPaneHasMaxWidth) {
          resizePanes(leftPane, rightPane, newLeftPaneWidth, newRightPaneWidth);
        }
      }
      document.onmouseup = function (e) {
        IS_DRAGGING = false;
        CAN_DRAG = false;
      }
    }
  }
}

// Utility Functions
// App-specific utilities
function isPane(el) {
  return hasClass(el, 'pane');
}
function isPaneGroup(el) {
  return hasClass(el, 'pane-group');
}
function isVerticalPaneGroup(el) {
  return hasClass(el, 'pane-group-vertical');
}
// General utilities
function objToArr(obj) {
  if (Array.isArray(obj)) {
    return obj;
  } else {
    var arr = [];
    for (var key in obj) {
      arr.push(obj[key]);
    }
    return arr;
  }
}
function hasClass(el, className) {
  if (objToArr(el.classList).includes(className)) {
    return true;
  } else {
    return false;
  }
}
// Style utilities
function getExistingStyle(el, prop) {
  return parseInt(document.defaultView.getComputedStyle(el)[prop], 10);
}
function getExistingWidth(el) {
  return getExistingStyle(el, 'width');
}
function getExistingMaxWidth(el) {
  return getExistingStyle(el, 'maxWidth');
}
function getExistingHeight(el) {
  return getExistingStyle(el, 'height');
}
function getExistingMaxheight(el) {
  return getExistingStyle(el, 'maxHeight');
}
function setFlexBasis(el, flexBasis) {
  el.setAttribute('style', 'flex-basis: ' + flexBasis + 'px');
}
