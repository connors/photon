module.exports = {
  hasParentSelector(e, selector) {
    var children = [];
    while (e && "matches" in e && !e.matches(selector)) {
      children.push(e);
      e = e.parentNode;
    }
    children.push(e);
    return (e && "matches" in e && e.matches(selector)) ? children : false;
  },
  getTransDur(e) {
    return parseFloat(window.getComputedStyle(e, null).getPropertyValue("transition-duration").replace(/[a-z]/g, "").replace(/,/g, "."))
  },
  parseCSSProperty(value, type) {
    const typeParsers = {
      number(value) {
        return parseFloat(value.replace(/[^0-9\.,]/g, ""));
      }
    };
    return typeParsers[type](value);
  },
  objFillDefaults(obj, defaults) {
    for (let key in defaults) {
      if (defaults.hasOwnProperty(key)) {
        if (!(key in obj)) {
          obj[key] = defaults[key];
        }
        else if (typeof defaults[key] === "object" && defaults[key] != null) {
          obj[key] = this.objFillDefaults(obj[key], defaults[key]);
        }
      }
    }
    return obj;
  },
  setSVGAttributes(e, attributes = {}) {
    for (let name in attributes) {
      if (attributes.hasOwnProperty(name)) {
        e.setAttributeNS(null, name, attributes[name]);
      }
    }
  },
  arrayMerge(arrays) {
    return [].concat.apply([], arrays);
  },
  argumentsSort(argumentsList = [], order = {}) {
    const result = {};
    for (let arg of argumentsList) {
      let type = typeof arg;
      let key = order.keyFromValue(type);
      result[key] = arg;
      delete order[key];
    }
    return result;
  },
  getTemplate(templateScript) {
    return new Promise(function(resolve, reject) {
      if (templateScript.__templateChache) {
        resolve(templateScript.__templateChache);
      }
      else if (templateScript.src) {
        const templateRequest = new XMLHttpRequest();
        templateRequest.open("GET", templateScript.src, true);
        templateRequest.addEventListener("load", function(event) {
          templateScript.__templateChache = this.responseText;
          resolve(this.responseText);
        });
        templateRequest.addEventListener("error", function(event) {
          reject(event);
        });
        templateRequest.send();
      }
      else {
        resolve(templateScript.innerHTML);
      }
    });
  }
};

Array.merge = module.exports.arrayMerge;


Object.defineProperty(Array.prototype, "last", {
  get() {
    return this.lastFrom(0);
  }
});
Object.prototype.keyFromValue = function(value) {
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      if (this[key] === value) {
        return key;
      }
    }
  }
};
Array.prototype.indexOfKey = function(value, key, start = 0) {
  for (var i = start; i < this.length; i++) {
    if (this[i][key] === value) {
      return i;
    }
  }
  return -1;
}
Array.prototype.lastFrom = function(pos = 0) {
  return this[this.length - 1 - pos];
}

Math.roundDeep = function(number, deepness = 0) {
  const multi = Math.pow(10, deepness);
  return Math.round(number * multi) / multi;
};
Object.prototype.fillDefaults = function(defaults) {
  return module.exports.objFillDefaults(this, defaults);
};
